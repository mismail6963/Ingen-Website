# Ingen website

Website for Ingen (https://www.ingensoloutions.com). English and Arabic.

The production address is fixed in `src/lib/site.ts`. Note the spelling:
`ingensolutions.com` (without the extra "o") belongs to another company.

```bash
npm install
cp .env.example .env.local   # add Resend settings to send real enquiries
npm run dev                  # http://localhost:3000
```

- `/en` and `/ar`: homepage (approved v4 design, revised after the October 2026 audit)
- `/en/*` and `/ar/*` that don't exist: localized 404 (real 404 status)
- `/api/enquiry`: enquiry form → email via Resend

See **CLAUDE.md** for brand rules, copy rules, structure and the plan for the
rest of the site.

## Deploying

Any Next.js host works (Vercel is simplest). Set `RESEND_API_KEY` in the
host's environment settings and verify `ingensoloutions.com` in Resend.
Enquiries go to mohammed@ingensoloutions.com from
website@ingensoloutions.com by default; `ENQUIRY_TO` / `ENQUIRY_FROM` override
them.

`NEXT_PUBLIC_SITE_URL` is no longer used: canonical links, hreflang, Open
Graph, structured data, the sitemap and robots.txt all come from `SITE_URL` in
`src/lib/site.ts`. On Vercel, preview deployments (`VERCEL_ENV=preview`) are
served with `noindex` and a `Disallow: /` robots.txt automatically.

Social-preview images (`public/og/ingen-{en,ar}.jpg`, 1200×630) are generated
from the approved photo and logo: `node scripts/generate-og-images.mjs` (needs
Playwright with Chromium available).

## Carried over from nashr.net

This repo used to hold the NASHR site. These production fixes were kept:

- `vercel.json`: deploys to the `fra1` region.
- `next.config.ts`: HTML is revalidated by browsers on every visit (stops
  Safari serving a stale page shell after a deploy) and cached at the CDN edge.
- `src/proxy.ts`: skips `/en` and `/ar` so their static HTML comes straight
  from the edge, and skips `/_vercel` so Analytics keeps working.
- `src/app/[lang]/layout.tsx`: reload-once recovery if a JS chunk fails to
  load, Vercel Analytics and Speed Insights, JSON-LD structured data.
- `/api/enquiry` still accepts the old sender name `RESEND_FROM`. The old
  `LEAD_TO_EMAIL` is no longer read, so enquiries can't go to an old inbox.

## Licences

Ingen Sans and IBM Plex Sans Arabic are under the SIL Open Font License (see
`src/fonts/`). Logos and photography were created for Ingen; do not reuse them elsewhere.
