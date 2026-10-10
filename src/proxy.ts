import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

/**
 * Every page lives under /en or /ar. Requests without a language prefix
 * (for example "/" or an old nashr.net path) are redirected, choosing Arabic
 * when the browser prefers it.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (isLocale(first)) return;

  // Use the browser's first (most preferred) language only.
  const preferred = (request.headers.get("accept-language") ?? "").split(",")[0].split(";")[0].trim().toLowerCase();
  const prefersArabic = preferred === "ar" || preferred.startsWith("ar-");
  const locale = prefersArabic ? "ar" : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next and Vercel internals (Analytics posts to
  // /_vercel/insights/*), static files (anything with a dot), and paths that
  // already carry a language. Skipping /en and /ar keeps their prerendered
  // HTML served straight from the CDN edge without a proxy round trip.
  matcher: ["/((?!api|_next|_vercel|(?:en|ar)(?:/|$)|.*\\..*).*)"],
};
