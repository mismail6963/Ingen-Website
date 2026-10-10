"use client";

import Link from "next/link";
import { useState } from "react";
import { DiscussLink } from "@/components/home/EnquiryProvider";
import { getDictionary } from "@/content";
import { alternateLocale, type Locale } from "@/lib/i18n";

const navLink = "text-white hover:text-white hover:underline underline-offset-4";

/** Header sits on top of the hero photograph (white text). */
export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).nav;
  const [menuOpen, setMenuOpen] = useState(false);
  const other = alternateLocale(locale);
  const items = [
    { href: "#services", label: t.services },
    { href: "#examples", label: t.examples },
    { href: "#approach", label: t.approach },
    { href: "#company", label: t.company },
  ];

  return (
    <>
      <header className="flex items-center justify-between gap-x-8 gap-y-4 px-[clamp(16px,3.4vw,48px)] py-[clamp(16px,2vw,28px)]">
        <a href="#top" aria-label={t.homeLabel} className="flex flex-none">
          {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG lockup, used unchanged */}
          <img src="/brand/Ingen-Lockup-White.svg" alt="Ingen" width={118} height={34} className="block h-[34px] w-auto" />
        </a>

        <nav aria-label={t.mainLabel} className="hidden items-center gap-8 text-[15px] leading-tight min-[1001px]:flex">
          {items.map((i) => (
            <a key={i.href} href={i.href} className={navLink}>
              {i.label}
            </a>
          ))}
          <DiscussLink className={navLink}>{t.contact}</DiscussLink>
        </nav>

        <div className="flex items-center gap-x-5 gap-y-3">
          <Link
            href={`/${other}`}
            lang={other}
            hrefLang={other}
            className={`${navLink} inline-flex min-h-11 items-center text-[15px] ${other === "ar" ? "font-arabic" : ""}`}
          >
            {t.switchLabel}
          </Link>
          <DiscussLink className="hidden min-h-11 items-center rounded-full bg-white px-5 text-[15px] text-charcoal transition-colors hover:bg-surface sm:inline-flex">
            {t.discuss}
          </DiscussLink>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/60 bg-transparent px-4 text-[15px] text-white min-[1001px]:hidden"
          >
            {menuOpen ? t.close : t.menu}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label={t.mainLabel}
          className="mx-[clamp(16px,3.4vw,48px)] flex flex-col rounded-2xl bg-charcoal px-5 pb-5 pt-1 text-lg min-[1001px]:hidden"
        >
          {items.map((i) => (
            <a key={i.href} href={i.href} onClick={() => setMenuOpen(false)} className={`${navLink} border-b border-white/12 py-3.5`}>
              {i.label}
            </a>
          ))}
          <DiscussLink
            onBeforeOpen={() => setMenuOpen(false)}
            className="mt-[18px] inline-flex min-h-[52px] items-center justify-center rounded-full bg-vermilion text-base font-bold text-white transition-colors hover:bg-vermilion-deep"
          >
            {t.discuss}
          </DiscussLink>
        </nav>
      ) : null}
    </>
  );
}
