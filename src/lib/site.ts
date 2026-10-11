import type { Locale } from "@/lib/i18n";

/**
 * Production origin: the one place the site's public address is defined.
 * Canonical links, hreflang alternates, Open Graph, structured data, the
 * sitemap and robots.txt all build on it, so they cannot drift apart.
 *
 * Deliberately a constant, not an environment variable: a preview deployment
 * or a stale host setting must never become the canonical origin.
 *
 * Note the spelling: ingensoloutions.com is the domain Ingen owns and serves
 * the site from. ingensolutions.com belongs to another company; do not
 * "correct" this. Changing domains is a business decision (see CLAUDE.md).
 */
export const SITE_URL = "https://www.ingensoloutions.com";

/** Absolute URL for a site path ("/en", "/brand/logo.svg"). */
export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

/** Public path of a page in a given language ("" is the homepage). */
export function localePath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}

/**
 * True for Vercel preview and development deployments. They are kept out of
 * search results (noindex + disallow) so they never compete with production.
 * Outside Vercel (local builds, other hosts) VERCEL_ENV is unset and the
 * site behaves as production.
 */
export const IS_NON_PRODUCTION_DEPLOYMENT = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

/** Social-preview images (1200×630), one per language. Generated from approved photography and the logo. */
export const OG_IMAGE = { width: 1200, height: 630, path: (locale: Locale) => `/og/ingen-${locale}.jpg` } as const;
