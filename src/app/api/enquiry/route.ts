import { LIMITS, MAX_ATTACHMENT_BYTES, validateEnquiry, type EnquiryFields, type EnquiryResponse } from "@/lib/enquiry";

/**
 * POST /api/enquiry
 *
 * Receives the homepage enquiry form (multipart/form-data) and emails it to
 * the Ingen inbox through Resend (https://resend.com). Replying to the email
 * goes to the visitor (reply-to); the phone number is required and appears
 * at the top with call and WhatsApp links.
 *
 * Environment variables (see .env.example):
 *   RESEND_API_KEY  - Resend API key (required; a secret, set it in the host)
 *   ENQUIRY_TO      - optional override of the inbox (comma-separate several);
 *                     defaults to mohammed@ingensoloutions.com
 *   ENQUIRY_FROM    - optional override of the sender (RESEND_FROM also
 *                     accepted); defaults to website@ingensoloutions.com, which
 *                     needs the domain verified in Resend
 *
 * Without RESEND_API_KEY the route answers `not_configured` and the form tells
 * the visitor it couldn't be sent. It never pretends an enquiry was delivered.
 */

const json = (body: EnquiryResponse, status = 200) => Response.json(body, { status });

// Defaults supplied by Ingen (October 2026). Server-only: never import these
// into client code, or the address ends up in the page for spam bots.
const DEFAULT_ENQUIRY_TO = "mohammed@ingensoloutions.com";
const DEFAULT_ENQUIRY_FROM = "Ingen website <website@ingensoloutions.com>";

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

/** Arabic-Indic digits (٠-٩, ۰-۹) to 0-9, so phone links work whatever keyboard was used. */
function westernDigits(s: string) {
  return s.replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660)).replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
}

/** "+966 50 123 4567" → "+966501234567" for a tel: link. */
function phoneForLinks(phone: string) {
  const p = westernDigits(phone.trim());
  return (p.startsWith("+") ? "+" : "") + p.replace(/\D/g, "");
}

/**
 * International digits for a wa.me link, or null when the country can't be
 * known. Accepts +CC…, 00CC…, and Saudi mobiles written locally (05… / 5…).
 */
function whatsappDigits(phone: string) {
  const p = westernDigits(phone.trim());
  const digits = p.replace(/\D/g, "");
  if (p.startsWith("+")) return digits;
  if (digits.startsWith("00")) return digits.slice(2);
  if (/^05\d{8}$/.test(digits)) return `966${digits.slice(1)}`;
  if (/^5\d{8}$/.test(digits)) return `966${digits}`;
  return null;
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

  // Where enquiries go. ENQUIRY_TO in the host's settings overrides the
  // default inbox. The nashr.net-era LEAD_TO_EMAIL is deliberately not used
  // any more, so a leftover setting can't send enquiries to an old inbox.
  // The sender may still come from the older RESEND_FROM name, which may be
  // the address already verified in Resend; otherwise the default needs the
  // ingensoloutions.com domain verified in Resend.
  const { RESEND_API_KEY } = process.env;
  const ENQUIRY_TO = process.env.ENQUIRY_TO || DEFAULT_ENQUIRY_TO;
  const ENQUIRY_FROM = process.env.ENQUIRY_FROM || process.env.RESEND_FROM || DEFAULT_ENQUIRY_FROM;
  if (!RESEND_API_KEY || !ENQUIRY_TO || !ENQUIRY_FROM) {
    console.warn("[enquiry] Not configured: set RESEND_API_KEY in the host's environment settings.");
    return json({ ok: false, reason: "not_configured" }, 503);
  }

  // Contact details first, as links: Reply/Email, Call and WhatsApp work in one tap.
  const phoneDigits = phoneForLinks(fields.phone);
  const waDigits = whatsappDigits(fields.phone);
  type Row = [label: string, value: string, href?: string];
  const rows: Row[] = [
    ["Name", fields.name],
    ["Email", fields.email, `mailto:${fields.email}`],
    ["Phone", fields.phone, `tel:${phoneDigits}`],
    ["WhatsApp", waDigits ? `+${waDigits}` : "", waDigits ? `https://wa.me/${waDigits}` : undefined],
    ["Organisation", fields.org],
    ["Approximate budget (SAR)", fields.budget],
    ["Desired timing", fields.timing],
    ["Language", locale === "ar" ? "Arabic" : "English"],
    ["Attachment", attachment ? attachment.name : ""],
  ];
  const filled = rows.filter(([, v]) => v);

  const plain = [
    ...filled.map(([k, v, href]) => (href && k === "WhatsApp" ? `${k}: ${href}` : `${k}: ${v}`)),
    "",
    "What they want to build or improve:",
    fields.need,
  ].join("\n");
  const cell = (v: string, href?: string) =>
    href ? `<a href="${escapeHtml(href)}" style="color:#A93222">${escapeHtml(v)}</a>` : escapeHtml(v);
  const html = `
    <h2 style="font-family:sans-serif">New project enquiry</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${filled
        .map(
          ([k, v, href]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#666A68;vertical-align:top">${escapeHtml(k)}</td><td style="padding:4px 0">${cell(v, href)}</td></tr>`,
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
