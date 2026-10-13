/**
 * Public contact channels, supplied by Ingen. Never invent these (see the copy
 * rules in CLAUDE.md). An empty value hides that channel everywhere.
 */

/**
 * WhatsApp number in international format, digits only: country code first,
 * no "+", no leading 0 (for example a Saudi mobile 05X XXX XXXX becomes
 * "9665XXXXXXXX"). Empty: every WhatsApp button is hidden.
 */
export const WHATSAPP_NUMBER = "966555987440"; // +966 55 598 7440, supplied by Ingen (October 2026)

/** wa.me link that opens a chat with Ingen, with a pre-filled first message. */
export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
