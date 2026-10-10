import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        // HTML documents only (never hashed /_next/ assets, API routes or
        // files with an extension). Carried over from nashr.net:
        // - Browser: revalidate every visit, so Safari's aggressive disk cache
        //   can never serve a stale shell pointing at /_next/static hashes that
        //   a later deploy deleted ("HTML loads, assets 404, page stuck").
        // - CDN: cache the static HTML at the edge (s-maxage). Vercel purges
        //   the edge on every deploy, so this is fast and never stale.
        source: "/((?!_next/|api/|.*\\..*).*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate, s-maxage=31536000" }],
      },
    ];
  },
};

export default nextConfig;
