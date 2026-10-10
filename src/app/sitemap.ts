import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

/** Add each new page here (one entry per path, with both languages). */
const paths = [""];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((p) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${p}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${p}`])) },
    })),
  );
}
