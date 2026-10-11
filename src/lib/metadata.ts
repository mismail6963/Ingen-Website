import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, localePath, OG_IMAGE } from "@/lib/site";

/**
 * Canonical, hreflang alternates, Open Graph and Twitter metadata for one
 * page in one language. Every public page should use this so the values stay
 * consistent. `path` is the part after the language ("" for the homepage).
 */
export function pageMetadata(locale: Locale, path = "", copy?: { title?: string; description?: string }): Metadata {
  const t = getDictionary(locale);
  const title = copy?.title ?? t.meta.title;
  const description = copy?.description ?? t.meta.description;
  const url = absoluteUrl(localePath(locale, path));
  const image = { url: absoluteUrl(OG_IMAGE.path(locale)), width: OG_IMAGE.width, height: OG_IMAGE.height, alt: t.meta.ogAlt };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(localePath(l, path))])),
        "x-default": absoluteUrl(localePath("en", path)),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Ingen",
      title,
      description,
      url,
      locale: locale === "ar" ? "ar_SA" : "en_GB",
      alternateLocale: locale === "ar" ? ["en_GB"] : ["ar_SA"],
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
