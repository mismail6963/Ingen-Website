import type { MetadataRoute } from "next";
import { IS_NON_PRODUCTION_DEPLOYMENT, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments: keep crawlers out entirely.
  if (IS_NON_PRODUCTION_DEPLOYMENT) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
