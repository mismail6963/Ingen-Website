import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

/**
 * JSON-LD for search engines: the Organization and the WebSite, linked by @id.
 * Keep it to facts the copy rules allow (no contact details, founding year,
 * prices or clients until the client supplies them).
 */
export function StructuredData({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Ingen",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/Ingen-Icon-Vermilion.svg`,
      description: t.meta.description,
      address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
      knowsLanguage: ["en", "ar"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Ingen",
      inLanguage: ["en", "ar"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
