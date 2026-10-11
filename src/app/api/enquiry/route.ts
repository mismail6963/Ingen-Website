import { LIMITS, MAX_ATTACHMENT_BYTES, validateEnquiry, type EnquiryFields, type EnquiryResponse } from "@/lib/enquiry";

/**
 * POST /api/enquiry
 *
 * Receives the homepage enquiry form (multipart/form-data) and emails it to
 * the Ingen inbox through Resend (https://resend.com).
 *
 * Required environment variables (see .env.example):
 *   RESEND_API_KEY  - Resend API key
 *   ENQUIRY_TO      - inbox that receives enquiries (comma-separate several)
 *   ENQUIRY_FROM    - sender on a domain verified in Resend, e.g. "Ingen website <website@ingensoloutions.com>"
 *   (LEAD_TO_EMAIL / RESEND_FROM from the old nashr.net setup also work.)
 *
 * If any are missing the route answers `not_configured` and the form tells
 * the visitor it couldn't be sent. It never pretends an enquiry was delivered.
 */

const json = (body: EnquiryResponse, status = 200) => Response.json(body, { status });

// Best-effort rate limit per IP. On serverless hosts each instance has its own
// memory, so treat this as a speed bump, not protection. Add a shared limiter
// (for example Upstash or the host's firewall rules) before heavy traffic.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function text(form: FormData, key: keyof EnquiryFields) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, LIMITS[key]) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, reason: "bad_request" }, 400);
  }

  // Honeypot filled in: answer as if it worked, send nothing.
  if (typeof form.get("website") === "string" && (form.get("website") as string).trim() !== "") {
    return json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json({ ok: false, reason: "send_failed" }, 429);

  const fields: EnquiryFields = {
    name: text(form, "name"),
    email: text(form, "email"),
    org: text(form, "org"),
    need: text(form, "need"),
    budget: text(form, "budget"),
    timing: text(form, "timing"),
    phone: text(form, "phone"),
  };
  const locale = form.get("locale") === "ar" ? "ar" : "en";

  const errors = validateEnquiry(fields);
  if (Object.keys(errors).length) return json({ ok: false, reason: "invalid", errors }, 422);

  const file = form.get("file");
  const attachment = file instanceof File && file.size > 0 ? file : null;
  if (attachment && attachment.size > MAX_ATTACHMENT_BYTES) {
    return json({ ok: false, reason: "attachment_too_large" }, 413);
  }

  // LEAD_TO_EMAIL and RESEND_FROM are the names the nashr.net deployment
  // already uses; accepted as fallbacks so the form works without renaming.
  const { RESEND_API_KEY } = process.env;
  const ENQUIRY_TO = process.env.ENQUIRY_TO || process.env.LEAD_TO_EMAIL;
  const ENQUIRY_FROM = process.env.ENQUIRY_FROM || process.env.RESEND_FROM;
  if (!RESEND_API_KEY || !ENQUIRY_TO || !ENQUIRY_FROM) {
    console.warn("[enquiry] Not configured: set RESEND_API_KEY, ENQUIRY_TO and ENQUIRY_FROM.");
    return json({ ok: false, reason: "not_configured" }, 503);
  }

  const rows: [string, string][] = [
    ["Name", fields.name],
    ["Email", fields.email],
    ["Organisation", fields.org],
    ["Approximate budget (SAR)", fields.budget],
    ["Desired timing", fields.timing],
    ["Phone", fields.phone],
    ["Language", locale === "ar" ? "Arabic" : "English"],
    ["Attachment", attachment ? attachment.name : ""],
  ];
  const filled = rows.filter(([, v]) => v);

  const plain = [...filled.map(([k, v]) => `${k}: ${v}`), "", "What they want to build or improve:", fields.need].join("\n");
  const html = `
    <h2 style="font-family:sans-serif">New project enquiry</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${filled
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#666A68;vertical-align:top">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="font-family:sans-serif">What they want to build or improve</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(fields.need)}</p>`;

  const payload: Record<string, unknown> = {
    from: ENQUIRY_FROM,
    to: ENQUIRY_TO.split(",").map((s) => s.trim()).filter(Boolean),
    reply_to: fields.email,
    subject: `Project enquiry: ${fields.name}${fields.org ? ` (${fields.org})` : ""}`,
    text: plain,
    html,
  };
  if (attachment) {
    const buf = Buffer.from(await attachment.arrayBuffer());
    payload.attachments = [{ filename: attachment.name.slice(0, 200), content: buf.toString("base64") }];
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[enquiry] Resend responded", res.status, await res.text().catch(() => ""));
      return json({ ok: false, reason: "send_failed" }, 502);
    }
  } catch (err) {
    console.error("[enquiry] Resend request failed", err);
    return json({ ok: false, reason: "send_failed" }, 502);
  }

  return json({ ok: true });
}
