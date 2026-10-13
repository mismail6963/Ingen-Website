import { DiscussLink } from "@/components/home/EnquiryProvider";
import { LanguageSwitch } from "@/components/site/LanguageSwitch";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";

const link = "inline-flex min-h-10 items-center text-charcoal hover:text-vermilion-deep";
const heading = "pb-2 text-caption font-bold uppercase text-muted ltr:tracking-[0.04em]";

export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.footer;

  return (
    <footer className="pb-[clamp(16px,2vw,28px)] pt-[clamp(96px,10vw,144px)]">
      <div className="page-container flex flex-col gap-14">
        <div className="flex flex-wrap justify-between gap-10">
          <p className="m-0 max-w-[440px] flex-[1_1_320px] text-2xl font-bold leading-heading">
            {t.tagline} <span className="text-muted">{t.location}</span>
          </p>
          <div className="grid flex-[1_1_440px] grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] gap-7 text-base">
            <nav aria-label={t.explore} className="flex flex-col gap-0.5">
              <span className={heading}>{t.explore}</span>
              <a href="#services" className={link}>{d.nav.services}</a>
              <a href="#examples" className={link}>{d.nav.demo}</a>
              <a href="#approach" className={link}>{d.nav.approach}</a>
              <a href="#faq" className={link}>{d.nav.faq}</a>
            </nav>
            <div className="flex flex-col gap-0.5">
              <span className={heading}>{t.contact}</span>
              <DiscussLink className={link}>{d.nav.cta}</DiscussLink>
              <WhatsAppLink locale={locale} label="short" className={`${link} gap-2`} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className={heading}>{t.language}</span>
              <span className="inline-flex min-h-10 items-center" aria-current="true">
                {t.current}
              </span>
              <LanguageSwitch locale={locale} className={`${link} ${locale === "en" ? "font-arabic" : ""}`}>
                {t.other}
              </LanguageSwitch>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG lockup, used unchanged */}
        <img src="/brand/Ingen-Lockup-Primary.svg" alt="Ingen" width={3946} height={1140} loading="lazy" className="block h-auto w-full" />

        <div className="flex flex-wrap justify-between gap-x-8 gap-y-3 border-t border-divider pt-5 text-small text-muted">
          <span>{t.copyright}</span>
          <a href="#top" className="text-muted hover:text-vermilion-deep">
            {t.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
