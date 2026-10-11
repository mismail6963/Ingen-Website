import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { absoluteUrl, SITE_URL } from "@/lib/site";

/**
 * JSON-LD for search engines: the Organization and the WebSite, linked by @id.
 * Keep it to facts the copy rules allow (no contact details, founding year,
 * prices, clients or social profiles until the client supplies them).
 */
export function StructuredData({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const orgId = `${SITE_URL}/#organization`;
  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: "Ingen",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/brand/Ingen-Lockup-Primary.svg") },
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
      publisher: { "@id": orgId },
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
