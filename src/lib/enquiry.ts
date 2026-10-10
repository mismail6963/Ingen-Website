/**
 * Enquiry form contract, shared by the client form and the API route.
 * Keep validation rules here so both sides stay in step.
 */

export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // 5 MB

export const LIMITS = {
  name: 120,
  email: 254,
  org: 160,
  need: 5000,
  budget: 80,
  timing: 80,
  phone: 40,
} as const;

export type EnquiryFields = {
  name: string;
  email: string;
  org: string;
  need: string;
  budget: string;
  timing: string;
  phone: string;
};

export type EnquiryErrorKey = "name" | "emailEmpty" | "emailBad" | "need";
export type EnquiryErrors = Partial<Record<"name" | "email" | "need", EnquiryErrorKey>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(f: Pick<EnquiryFields, "name" | "email" | "need">): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (!f.name.trim()) e.name = "name";
  if (!f.email.trim()) e.email = "emailEmpty";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "emailBad";
  if (!f.need.trim()) e.need = "need";
  return e;
}

export type EnquiryResponse =
  | { ok: true }
  | { ok: false; reason: "invalid"; errors: EnquiryErrors }
  | { ok: false; reason: "not_configured" | "attachment_too_large" | "send_failed" | "bad_request" };
