import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/icons";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import heroPhoto from "../../../public/photos/ingen-photo-1.jpg";
import { DiscussLink } from "./EnquiryProvider";

export function Hero({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.hero;
  return (
    <div id="top" className="p-[clamp(8px,1.4vw,20px)]">
      <section
        aria-labelledby="hero-title"
        className="on-dark relative isolate flex min-h-[clamp(640px,56vw,820px)] flex-col overflow-hidden rounded-[var(--radius-panel)] bg-ink-photo text-white"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={heroPhoto}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className={`object-cover object-[66%_50%] ${locale === "ar" ? "photo-mirror" : ""}`}
          />
          <div className="absolute inset-0 bg-[rgb(16_17_17/0.36)]" />
        </div>

        {/* Room for the fixed header, which sits on the photograph at the top of the page. */}
        <div aria-hidden="true" className="h-[calc(44px+2*clamp(16px,2vw,28px))] flex-none" />

        <div className="flex flex-1 flex-col justify-end gap-7 px-[clamp(16px,3.4vw,48px)] pb-[clamp(32px,4vw,56px)] pt-[clamp(40px,5vw,80px)]">
          <p className="m-0 flex items-center gap-2.5 text-small">
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny brand SVG */}
            <img src="/brand/Ingen-Icon-Vermilion.svg" alt="" width={12} height={12} className="block size-3" />
            {t.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="m-0 max-w-[16ch] text-[clamp(38px,5.6vw,84px)] font-bold leading-display text-balance rtl:max-w-[18ch]"
          >
            {t.title}
          </h1>
          <p className="m-0 max-w-[34em] text-[clamp(17px,1.5vw,21px)] leading-body text-on-dark">{t.lead}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
            <DiscussLink className="inline-flex min-h-[54px] items-center gap-2.5 rounded-full bg-vermilion px-7 text-base font-bold text-white transition-colors hover:bg-vermilion-deep">
              {d.nav.cta} <ArrowUpRight />
            </DiscussLink>
            <a href="#services" className="inline-flex min-h-[54px] items-center text-base text-white underline underline-offset-[6px]">
              {t.secondary}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
