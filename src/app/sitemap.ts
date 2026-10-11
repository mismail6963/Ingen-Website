import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { absoluteUrl, localePath } from "@/lib/site";

/** Add each new public page here (one entry per path, with both languages). */
const paths = [""];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((p) =>
    locales.map((lang) => ({
      url: absoluteUrl(localePath(lang, p)),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(localePath(l, p))])),
          "x-default": absoluteUrl(localePath("en", p)),
        },
      },
    })),
  );
}
