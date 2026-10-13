import { ChatIcon } from "@/components/ui/icons";
import { getDictionary } from "@/content";
import { WHATSAPP_NUMBER, whatsappHref } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";

/**
 * "Message us on WhatsApp": a secondary contact route beside the enquiry form.
 * Renders nothing until a number is set in lib/contact.ts.
 */
export function WhatsAppLink({
  locale,
  className,
  label = "cta",
}: {
  locale: Locale;
  className?: string;
  /** Which label to show: the full call to action or the short "WhatsApp". */
  label?: "cta" | "short";
}) {
  if (!WHATSAPP_NUMBER) return null;
  const t = getDictionary(locale).whatsapp;
  return (
    <a href={whatsappHref(t.message)} target="_blank" rel="noopener noreferrer" className={className}>
      <ChatIcon />
      <span>
        {t[label]}
        <span className="sr-only"> {t.newTab}</span>
      </span>
    </a>
  );
}
