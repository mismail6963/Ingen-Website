# Ingen website

Website for Ingen (ingensolutions.com), formerly NASHR. English and Arabic.

```bash
npm install
cp .env.example .env.local   # add Resend settings to send real enquiries
npm run dev                  # http://localhost:3000
```

- `/en` and `/ar`: homepage (approved v4 design)
- `/api/enquiry`: enquiry form → email via Resend

See **CLAUDE.md** for brand rules, copy rules, structure and the plan for the
rest of the site.

## Deploying

Any Next.js host works (Vercel is simplest). Set `NEXT_PUBLIC_SITE_URL`,
`RESEND_API_KEY`, `ENQUIRY_TO` and `ENQUIRY_FROM` in the host's environment
settings. Verify the sending domain in Resend before going live.

## Carried over from nashr.net

This repo used to hold the NASHR site. These production fixes were kept:

- `vercel.json`: deploys to the `fra1` region.
- `next.config.ts`: HTML is revalidated by browsers on every visit (stops
  Safari serving a stale page shell after a deploy) and cached at the CDN edge.
- `src/proxy.ts`: skips `/en` and `/ar` so their static HTML comes straight
  from the edge, and skips `/_vercel` so Analytics keeps working.
- `src/app/[lang]/layout.tsx`: reload-once recovery if a JS chunk fails to
  load, Vercel Analytics and Speed Insights, JSON-LD structured data.
- `/api/enquiry` also accepts the old env names `LEAD_TO_EMAIL` and
  `RESEND_FROM`, so the existing Vercel settings keep the form working.

## Licences

Ingen Sans and IBM Plex Sans Arabic are under the SIL Open Font License (see
`src/fonts/`). Logos and photography were created for Ingen; do not reuse them elsewhere.
