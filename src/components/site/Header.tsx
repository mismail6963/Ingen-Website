"use client";

import { useEffect, useRef, useState } from "react";
import { DiscussLink } from "@/components/home/EnquiryProvider";
import { LanguageSwitch } from "@/components/site/LanguageSwitch";
import { Close, MenuIcon } from "@/components/ui/icons";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";

/** Horizontal padding that lines the header up with the hero's content. */
const PAD_X = "px-[calc(clamp(8px,1.4vw,20px)+clamp(16px,3.4vw,48px))]";

/**
 * Fixed site header. At the top of the page it sits transparently on the hero
 * photograph (white logo and text, as in the approved design). Once the page
 * scrolls it becomes a compact white bar (64px, `--header-h`) so navigation
 * and the enquiry action stay in reach. globals.css sets scroll-padding-top
 * from the same variable, so anchors land below it.
 */
export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).nav;
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const items = [
    { href: "#services", label: t.services },
    { href: "#examples", label: t.demo },
    { href: "#approach", label: t.approach },
    { href: "#faq", label: t.faq },
  ];

  useEffect(() => {
    const update = () => setSolid(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Menu: Escape closes it (focus back on the toggle), as do a click outside
  // and widening the window to the desktop layout.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1001px)");
    const onResize = () => desktop.matches && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  const link = solid ? "text-charcoal hover:text-vermilion-deep" : "text-white hover:underline underline-offset-4";

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,padding] duration-200 ${
        solid
          ? "bg-white py-2.5 shadow-[0_1px_0_var(--color-hairline)]"
          : "on-dark bg-transparent pb-[clamp(16px,2vw,28px)] pt-[calc(clamp(8px,1.4vw,20px)+clamp(16px,2vw,28px))]"
      }`}
    >
      <a
        href="#main"
        className="absolute start-4 top-2 z-10 -translate-y-[200%] rounded-full bg-charcoal px-5 py-3 text-small font-bold text-white focus:translate-y-0"
      >
        {t.skip}
      </a>

      <div className={`flex min-h-11 items-center justify-between gap-x-6 ${PAD_X}`}>
        <a href="#top" aria-label={t.homeLabel} className="flex min-h-11 flex-none items-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG lockup, used unchanged */}
          <img
            src={solid ? "/brand/Ingen-Lockup-Primary.svg" : "/brand/Ingen-Lockup-White.svg"}
            alt="Ingen"
            width={118}
            height={34}
            className="block h-[28px] w-auto sm:h-[34px]"
          />
        </a>

        <nav aria-label={t.mainLabel} className="hidden items-center gap-7 text-small leading-tight min-[1001px]:flex">
          {items.map((i) => (
            <a key={i.href} href={i.href} className={`${link} inline-flex min-h-11 items-center`}>
              {i.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <LanguageSwitch
            locale={locale}
            className={`${link} hidden min-h-11 items-center px-1 text-small min-[480px]:inline-flex ${locale === "en" ? "font-arabic" : ""}`}
          >
            {t.switchLabel}
          </LanguageSwitch>
          <DiscussLink
            onBeforeOpen={() => setMenuOpen(false)}
            className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-4 text-small font-bold transition-colors max-[349px]:hidden sm:px-5 ${
              solid ? "bg-vermilion text-white hover:bg-vermilion-deep" : "bg-white text-charcoal hover:bg-surface"
            }`}
          >
            <span className="sm:hidden">{t.ctaShort}</span>
            <span className="hidden sm:inline">{t.cta}</span>
          </DiscussLink>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t.close : t.menu}
            onClick={() => setMenuOpen((v) => !v)}
            className={`inline-flex size-11 flex-none items-center justify-center rounded-full border bg-transparent min-[1001px]:hidden ${
              solid ? "border-line-strong text-charcoal" : "border-white/60 text-white"
            }`}
          >
            {menuOpen ? <Close /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={t.mainLabel}
        hidden={!menuOpen}
        className={`on-dark mx-[calc(clamp(8px,1.4vw,20px)+8px)] mt-3 max-h-[calc(100dvh-var(--header-h)-24px)] flex-col overflow-y-auto overscroll-contain rounded-2xl bg-charcoal px-5 pb-5 pt-1 text-lg text-white shadow-[0_12px_32px_rgb(0_0_0/0.18)] min-[1001px]:hidden ${
          menuOpen ? "flex" : ""
        }`}
      >
        {items.map((i) => (
          <a key={i.href} href={i.href} onClick={() => setMenuOpen(false)} className="border-b border-white/12 py-3.5 text-white hover:underline">
            {i.label}
          </a>
        ))}
        <LanguageSwitch
          locale={locale}
          className={`border-b border-white/12 py-3.5 text-white hover:underline ${locale === "en" ? "font-arabic" : ""}`}
        >
          {t.switchLabel}
        </LanguageSwitch>
        <DiscussLink
          onBeforeOpen={() => setMenuOpen(false)}
          className="mt-[18px] inline-flex min-h-[52px] items-center justify-center rounded-full bg-vermilion px-5 text-center text-base font-bold text-white transition-colors hover:bg-vermilion-deep"
        >
          {t.cta}
        </DiscussLink>
      </nav>
    </header>
  );
}
