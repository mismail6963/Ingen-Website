import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/site/StructuredData";
import { getDictionary } from "@/content";
import { dirFor, isLocale, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const ingenSans = localFont({
  src: [
    { path: "../../fonts/IngenSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/IngenSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ingen",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const plexArabic = localFont({
  src: [
    { path: "../../fonts/IBMPlexSansArabic-Arabic-400.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/IBMPlexSansArabic-Arabic-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-plex-arabic",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const ASSET_RECOVERY =
  "(function(){var R=/Loading chunk|ChunkLoadError|Importing a module script failed|module script failed|dynamically imported module/i;function reloadOnce(k){try{if(sessionStorage.getItem(k))return;sessionStorage.setItem(k,'1');}catch(e){}location.reload();}window.addEventListener('error',function(e){var t=e&&e.target;if(t&&(t.tagName==='SCRIPT'||t.tagName==='LINK')){var u=t.src||t.href||'';if(u.indexOf('/_next/static/')!==-1){reloadOnce('__ingen_asset_reload');return;}}var m=(e&&(e.message||(e.error&&e.error.message)))||'';if(R.test(m))reloadOnce('__ingen_chunk_reload');},true);window.addEventListener('unhandledrejection',function(e){var r=e&&e.reason;if(R.test((r&&(r.message||r))+''))reloadOnce('__ingen_chunk_reload');});window.addEventListener('load',function(){try{sessionStorage.removeItem('__ingen_asset_reload');sessionStorage.removeItem('__ingen_chunk_reload');}catch(e){}});try{if('serviceWorker' in navigator&&navigator.serviceWorker.getRegistrations){navigator.serviceWorker.getRegistrations().then(function(rs){if(!rs||!rs.length)return;rs.forEach(function(r){r.unregister();});if(window.caches&&caches.keys){caches.keys().then(function(ks){ks.forEach(function(k){caches.delete(k);});}).catch(function(){});}reloadOnce('__ingen_sw_reload');}).catch(function(){});}}catch(e){}})();";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "Ingen",
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "ar" ? "ar_SA" : "en_GB",
      url: `/${lang}`,
      images: [{ url: "/photos/ingen-photo-1.jpg", width: 2400, height: 1357 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#202322",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} dir={dirFor(lang)} className={`${ingenSans.variable} ${plexArabic.variable}`}>
      <body>
        {/* Asset-delivery recovery, carried over from nashr.net. If a
            /_next/static chunk fails to load (a stale shell after a redeploy,
            a dropped request), reload once for fresh HTML instead of leaving a
            half-working page. Also unregisters any leftover service worker
            from an older version of the site. sessionStorage caps it at one
            reload; no effect when assets load normally. */}
        <script dangerouslySetInnerHTML={{ __html: ASSET_RECOVERY }} />
        <StructuredData locale={lang} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
