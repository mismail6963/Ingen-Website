// Renders public/og/ingen-{en,ar}.jpg (1200×630 social-preview images) from the
// approved hero photo, the unchanged white logo and the brand fonts.
// Run: node scripts/generate-og-images.mjs  (needs the `playwright` package and
// a Chromium it can launch, e.g. `npx playwright install chromium`).
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const R = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const copy = {
  en: { dir: "ltr", eyebrow: "Software and AI • Riyadh, Saudi Arabia", title: "Software and AI built around your business" },
  ar: { dir: "rtl", eyebrow: "برمجيات وذكاء اصطناعي • الرياض", title: "برمجيات وذكاء اصطناعي مبنية حول أعمالك" },
};
mkdirSync(`${R}/public/og`, { recursive: true });
const b = await chromium.launch();
for (const [lang, c] of Object.entries(copy)) {
  const html = `<!doctype html><html lang="${lang}" dir="${c.dir}"><head><meta charset="utf-8"><style>
  @font-face{font-family:Ingen;src:url(file://${R}/src/fonts/IngenSans-Regular.woff2);font-weight:400}
  @font-face{font-family:Ingen;src:url(file://${R}/src/fonts/IngenSans-Bold.woff2);font-weight:700}
  @font-face{font-family:Plex;src:url(file://${R}/src/fonts/IBMPlexSansArabic-Arabic-400.woff2);font-weight:400}
  @font-face{font-family:Plex;src:url(file://${R}/src/fonts/IBMPlexSansArabic-Arabic-700.woff2);font-weight:700}
  html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#1b1d1c}
  body{font-family:${lang === "ar" ? "Plex, Ingen" : "Ingen"},sans-serif;color:#fff;position:relative}
  .photo{position:absolute;inset:0;background:url(file://${R}/public/photos/ingen-photo-1.jpg) 66% 50%/cover;${lang === "ar" ? "transform:scaleX(-1);" : ""}}
  .shade{position:absolute;inset:0;background:linear-gradient(${lang === "ar" ? "270deg" : "90deg"},rgb(16 17 17/.78) 0%,rgb(16 17 17/.5) 55%,rgb(16 17 17/.25) 100%)}
  .c{position:absolute;inset:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
  .logo{height:46px;width:auto;align-self:flex-start}
  .e{display:flex;align-items:center;gap:12px;font-size:24px;margin:0 0 22px}
  .e img{width:14px;height:14px}
  h1{margin:0;font-size:${lang === "ar" ? 70 : 72}px;line-height:${lang === "ar" ? 1.3 : 1.05};font-weight:700;max-width:${lang === "ar" ? "15ch" : "14ch"}}
  </style></head><body><div class="photo"></div><div class="shade"></div><div class="c">
  <img class="logo" src="file://${R}/public/brand/Ingen-Lockup-White.svg" alt="">
  <div><p class="e"><img src="file://${R}/public/brand/Ingen-Icon-Vermilion.svg" alt="">${c.eyebrow}</p><h1>${c.title}</h1></div>
  </div></body></html>`;
  const file = join(tmpdir(), `ingen-og-${lang}.html`);
  writeFileSync(file, html);
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto("file://" + file, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `${R}/public/og/ingen-${lang}.jpg`, type: "jpeg", quality: 82 });
  await p.close();
}
await b.close();
