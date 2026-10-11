import { lang as rootLang } from "next/root-params";
import { ArrowUpRight } from "@/components/ui/icons";
import { getDictionary } from "@/content";
import { alternateLocale, isLocale } from "@/lib/i18n";
import { ENQUIRY_FORM_HASH } from "@/lib/sections";

/**
 * Localized 404, rendered inside the [lang] layout (so <html lang dir> is
 * right) for unknown paths under /en and /ar. Next adds noindex and the 404
 * status. Links lead back to the homepage, services and the enquiry form.
 */
export default async function NotFound() {
  const value = await rootLang();
  const locale = isLocale(value) ? value : "en";
  const d = getDictionary(locale);
  const t = d.notFound;
  const other = alternateLocale(locale);

  return (
    <>
      <title>{t.metaTitle}</title>
      <header className="page-container flex min-h-[88px] items-center justify-between gap-6">
        <a href={`/${locale}`} aria-label={d.nav.homeLabel} className="flex flex-none">
          {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG lockup, used unchanged */}
          <img src="/brand/Ingen-Lockup-Primary.svg" alt="Ingen" width={118} height={34} className="block h-[34px] w-auto" />
        </a>
        <a
          href={`/${other}`}
          lang={other}
          hrefLang={other}
          className={`inline-flex min-h-11 items-center text-small text-charcoal hover:text-vermilion-deep ${locale === "en" ? "font-arabic" : ""}`}
        >
          {d.nav.switchLabel}
        </a>
      </header>
      <main className="page-container flex min-h-[70vh] flex-col justify-center gap-6 py-[clamp(64px,10vw,128px)]">
        <p className="m-0 flex items-center gap-2.5 text-small text-muted">
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny brand SVG */}
          <img src="/brand/Ingen-Icon-Vermilion.svg" alt="" width={12} height={12} className="block size-3" />
          {t.label}
        </p>
        <h1 className="m-0 text-[clamp(34px,4vw,58px)] font-bold leading-title">{t.title}</h1>
        <p className="m-0 max-w-[36em] text-lg leading-body text-muted">{t.text}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
          <a
            href={`/${locale}`}
            className="inline-flex min-h-[54px] items-center rounded-full bg-vermilion px-7 text-base font-bold text-white hover:bg-vermilion-deep"
          >
            {t.home}
          </a>
          <a
            href={`/${locale}#services`}
            className="inline-flex min-h-[54px] items-center text-base text-charcoal underline underline-offset-[6px] hover:text-vermilion-deep"
          >
            {t.services}
          </a>
          <a
            href={`/${locale}${ENQUIRY_FORM_HASH}`}
            className="inline-flex min-h-[54px] items-center gap-2 text-base text-charcoal underline underline-offset-[6px] hover:text-vermilion-deep"
          >
            {t.cta} <ArrowUpRight />
          </a>
        </div>
      </main>
    </>
  );
}
