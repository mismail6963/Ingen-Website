import Link from "next/link";
import { DiscussLink } from "@/components/home/EnquiryProvider";
import { getDictionary } from "@/content";
import { alternateLocale, type Locale } from "@/lib/i18n";

const link = "py-2 text-charcoal hover:text-vermilion";
const heading = "pb-2 text-[13px] font-bold uppercase tracking-[0.04em] text-muted";

export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.footer;
  const other = alternateLocale(locale);

  return (
    <footer className="pb-[clamp(16px,2vw,28px)] pt-[clamp(96px,10vw,144px)]">
      <div className="page-container flex flex-col gap-14">
        <div className="flex flex-wrap justify-between gap-10">
          <p className="m-0 max-w-[440px] flex-[1_1_320px] text-2xl font-bold leading-[1.3]">
            {t.tagline} <span className="text-muted">{t.location}</span>
          </p>
          <div className="grid flex-[1_1_440px] grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] gap-7 text-base">
            <nav aria-label={t.explore} className="flex flex-col gap-0.5">
              <span className={heading}>{t.explore}</span>
              <a href="#services" className={link}>{d.nav.services}</a>
              <a href="#examples" className={link}>{d.nav.examples}</a>
              <a href="#approach" className={link}>{d.nav.approach}</a>
              <a href="#company" className={link}>{d.nav.company}</a>
            </nav>
            <div className="flex flex-col gap-0.5">
              <span className={heading}>{t.contact}</span>
              <DiscussLink className={link}>{d.nav.discuss}</DiscussLink>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className={heading}>{t.language}</span>
              <span className="py-2" aria-current="true">
                {t.current}
              </span>
              <Link href={`/${other}`} lang={other} hrefLang={other} className={`${link} ${other === "ar" ? "font-arabic" : ""}`}>
                {t.other}
              </Link>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG lockup, used unchanged */}
        <img src="/brand/Ingen-Lockup-Primary.svg" alt="Ingen" width={3946} height={1140} loading="lazy" className="block h-auto w-full" />

        <div className="flex flex-wrap justify-between gap-x-8 gap-y-3 border-t border-divider pt-5 text-[15px] text-muted">
          <span>{t.copyright}</span>
          <a href="#top" className="text-muted hover:text-vermilion">
            {t.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
