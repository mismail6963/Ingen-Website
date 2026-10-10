@AGENTS.md

# Ingen website — project brief

This repo is the new website for **Ingen**, a
Riyadh-based software and AI company. The new domain is **ingensolutions.com**.
The homepage (English and Arabic) is built and approved. The next job is to
redesign the rest of the old nashr.net site in the same system.

Read this whole file before changing anything. It is the source of truth for
brand, copy rules and structure.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en
npm run build      # production build; must pass before every commit
npm run lint
npx tsc --noEmit   # run `npx next typegen` first on a fresh clone
```

## Stack

- Next.js 16 (App Router, Cache Components, Turbopack). This is newer than
  most training data. Check `node_modules/next/dist/docs/` before using an
  API you are unsure of. `middleware.ts` is now `src/proxy.ts`.
- React 19, TypeScript, Tailwind CSS v4 (tokens in `src/app/globals.css`).
- No UI library. Components are hand-built to match the approved design.

## Structure

```
src/
  app/
    [lang]/layout.tsx     root layout per language: <html lang dir>, fonts, metadata
    [lang]/page.tsx       homepage (section order is approved, do not reorder)
    [lang]/not-found.tsx
    api/enquiry/route.ts  enquiry form → email via Resend
    globals.css           brand tokens + the few custom CSS rules
    robots.ts, sitemap.ts, icon.svg
  components/
    home/                 homepage sections
    site/                 Header, Footer (shared by every page)
    ui/                   Dialog (native <dialog>), Eyebrow, icons
  content/
    en.ts                 all English copy (the Dictionary shape)
    ar.ts                 all Arabic copy, typed against en.ts
  lib/
    i18n.ts               locales, dir, alternate locale
    enquiry.ts            form validation shared by client and API
    site.ts               SITE_URL
  proxy.ts                redirects un-prefixed paths to /en or /ar
  fonts/                  Ingen Sans + IBM Plex Sans Arabic (OFL licences included)
public/
  brand/                  official logo SVGs, use unchanged
  photos/                 approved photography set (faces blurred)
```

**Every page lives under `/en/...` and `/ar/...`.** Add a page once in
`src/app/[lang]/<route>/page.tsx` and put its copy in both dictionaries. Never
hard-code customer-facing text in a component.

Client components get copy by calling `getDictionary(locale)` themselves
(dictionaries contain small functions, which can't be passed as props from
server components).

## Brand

**Colours** (tokens in `globals.css`; never write hex values in components):

| Token | Value | Use |
|---|---|---|
| `vermilion` | #C93C2B | primary actions, current step, accents. Use purposefully, not decoratively |
| `charcoal` | #202322 | text, dark buttons |
| white | #FFFFFF | page background |
| `surface` | #F4F4F1 | light panels |
| `divider` | #D9DCD8 | rules and borders |
| `muted` | #666A68 | secondary text on light backgrounds |

Derived tints used by the approved design: `vermilion-deep` #A93222 (hover, and
small vermilion text on light backgrounds for contrast), `vermilion-soft`
#E07A6D (small vermilion text on dark), `ink` #141615, `ink-photo` #1B1D1C,
`hairline` #E4E6E3, `line-strong` #B4B8B6, `soft` #444847, `on-dark` #EDEEEC,
`on-dark-muted` #C9CCCA.

**Type**
- Ingen Sans (custom, based on Sora): **Bold for headings, Regular for body.**
  Body copy 16–18px. Build hierarchy with size, weight and spacing.
- Arabic: IBM Plex Sans Arabic (Ingen Sans has no Arabic glyphs; the font
  stack falls back automatically). Arabic line-height is 1.8.

**Logo**: use the SVGs in `public/brand/` exactly as supplied. White lockup on
dark/photo backgrounds, Primary lockup (vermilion icon + charcoal) on light.
The vermilion icon is the section-label dot (`<Eyebrow>`).

**Photography**: only the approved set in `public/photos/`: dark, red-tinted,
faces blurred, small human imperfections. Mirror photos in Arabic
(`photo-mirror` class) so the subject faces into the reading direction.

**Layout**: generous spacing, restrained density. Rounded dark panels inset
from the page edge (`--radius-panel`). Standard width is `.page-container`
(1280px plus a responsive gutter). Mobile has a 16px gutter and no horizontal
scroll. Touch targets are at least 44px.

## Copy rules (non-negotiable)

Ingen has one real project and the client can't be named. So:

- **Never invent** clients or client relationships, testimonials, case
  studies, completed projects, performance or financial results, awards,
  certifications, partnerships, years of experience, team size, project
  prices, delivery times or response-time promises.
- Platform or technology logos must not imply a partnership.
- No placeholder case studies, empty stat cards, "trusted by" rows or
  lorem ipsum in anything customer-facing.
- Don't imply certifications or regulatory compliance.
- Don't claim every project includes Arabic and English.
- Don't invent contact details (phone, address, email). Leave them out until
  the client supplies real ones.
- Demonstrations are labelled **"Concept demonstration"** and use clearly
  sample data, with a note that they are not client projects.
- The company statement is fixed: "A Riyadh-based software and AI company,
  built around the needs of businesses and public-sector organisations."
- "Ingen" is never translated; it stays in Latin script in Arabic too.

## Arabic

- `ar.ts` is typed against `en.ts`; TypeScript fails the build if a key is
  missing.
- Lines marked `// REVIEW` were translated during the code handoff and have
  **not** been approved by a native copywriter. Get them reviewed before launch.
- Use logical properties (`ps-`, `pe-`, `ms-`, `me-`, `border-e`, `text-start`)
  so layouts mirror automatically. Directional icons use `rtl:-scale-x-100`.
- Email and phone inputs are `dir="ltr"`.

## Enquiry form

- Every "Discuss your project" control calls `openForm()` from
  `EnquiryProvider`, which opens the same form, scrolls to it and focuses the
  Name field. New pages that need a contact action should use `<DiscussLink>`
  or link to `/{lang}#enquiry`.
- `POST /api/enquiry` validates (same rules as the client), checks a
  honeypot, rate-limits per IP (best effort, in memory), and emails the
  enquiry through Resend with an optional attachment up to 5 MB.
- Set `RESEND_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM` (see `.env.example`). If
  they are missing the API returns `not_configured` and the form tells the
  visitor the enquiry could not be sent. Never show a success state that
  isn't true.

## Accessibility checklist (every page)

Visible `:focus-visible` outlines, `aria-expanded` on toggles, dialogs via
`ui/Dialog` (native `<dialog>`: focus trap, Escape, focus return), labelled
form fields with inline errors and an error summary, `prefers-reduced-motion`
respected, alt text on meaningful images (`alt=""` on decorative photos),
contrast ≥ 4.5:1 for body text.

## Next: redesigning the rest of nashr.net

1. **Inventory first.** List every page on nashr.net (`/en` and `/ar`) and
   decide with the client which pages carry over, merge or are retired. Don't
   copy old claims over without checking them against the copy rules above.
2. Likely pages: a page per service (`/[lang]/services/<slug>`; slugs already
   exist in `content/*.ts`), Approach, Company/About, Contact (reuse the
   enquiry form), Privacy and Terms (client must supply real policy text).
3. Service rows on the homepage currently open a detail dialog. When service
   pages exist, link each row to its page instead and keep the dialog content
   as the page's starting copy.
4. Move Header and Footer into a shared layout once there is more than one
   page, and make in-page anchors (`#services`) become `/{lang}#services`
   from other pages.
5. Add each new path to `src/app/sitemap.ts`.
6. Add redirects from old nashr.net URLs to their new homes (proxy.ts or
   `next.config.ts` redirects) when the domain moves.

## Deployment fixes from nashr.net (keep)

This repo previously held the NASHR site and deploys to the same Vercel
project. The README lists the production fixes carried over (HTML
Cache-Control headers, proxy matcher, chunk-load recovery, Analytics). Don't
remove them without checking why they exist in git history.

## Source design

The approved design lives in the Claude Design canvas "Ingen Website"
(Homepage v4, English refined + Arabic). When in doubt, match it.
