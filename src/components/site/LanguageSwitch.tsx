"use client";

import { alternateLocale, type Locale } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/sections";

/**
 * The section the reader is looking at: the URL fragment if its section is
 * still in view, otherwise the last section whose top has passed a reading
 * line just below the fixed header. Empty at the top of the page (hero).
 */
function currentSectionHash(): string {
  const root = document.documentElement;
  const header = parseFloat(getComputedStyle(root).getPropertyValue("--header-h")) || 64;
  const readingLine = header + window.innerHeight * 0.3;
  const known = SECTION_IDS as readonly string[];

  const hashId = decodeURIComponent(window.location.hash.slice(1));
  const hashEl = known.includes(hashId) ? document.getElementById(hashId) : null;
  if (hashEl) {
    const r = hashEl.getBoundingClientRect();
    if (r.top < readingLine && r.bottom > header) return `#${hashId}`;
  }

  let current = "";
  for (const id of known) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < readingLine) current = id;
  }
  return current ? `#${current}` : "";
}

/**
 * Link to the same page in the other language, keeping the reader's place.
 * Without JavaScript it is a plain link to the other homepage. Only the
 * section anchor is carried over: never form data.
 */
export function LanguageSwitch({
  locale,
  className,
  children,
}: {
  locale: Locale;
  className?: string;
  children: React.ReactNode;
}) {
  const other = alternateLocale(locale);
  const base = `/${other}`;
  return (
    <a
      href={base}
      lang={other}
      hrefLang={other}
      className={className}
      // Updating href during the click (before the browser follows it) keeps
      // normal link behaviour: new tab, middle click, copy link.
      onClick={(e) => {
        e.currentTarget.href = base + currentSectionHash();
      }}
      onAuxClick={(e) => {
        e.currentTarget.href = base + currentSectionHash();
      }}
    >
      {children}
    </a>
  );
}
