"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";

export function Approach({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).approach;
  const [all, setAll] = useState(false);

  return (
    <section id="approach" aria-labelledby="ap-title" className="bg-surface py-[clamp(112px,11vw,176px)]">
      <div className="page-container flex flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-5">
          <div className="flex flex-col gap-[22px]">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 id="ap-title" className="m-0 max-w-[14ch] text-[clamp(34px,4vw,58px)] font-bold leading-[1.08] text-balance">
              {t.title}
            </h2>
          </div>
          <button
            type="button"
            aria-expanded={all}
            aria-controls="all-stages"
            onClick={() => setAll((v) => !v)}
            className="inline-flex min-h-12 items-center gap-3 border-0 border-b border-dashed border-vermilion bg-transparent px-0 pb-2 text-base font-bold whitespace-pre text-charcoal hover:text-vermilion"
          >
            {all ? t.hide : t.show}
          </button>
        </div>

        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-x-12 gap-y-10 p-0">
          {t.summary.map((s) => (
            <li key={s.num} className="flex flex-col gap-3.5 border-t-2 border-dotted border-line-strong pt-6">
              <span className="text-[15px] font-bold text-vermilion-deep">{s.num}</span>
              <h3 className="m-0 text-[clamp(24px,2.2vw,30px)] font-bold leading-[1.15]">{s.title}</h3>
              <p className="m-0 text-[17px] leading-[1.55] text-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        {all ? (
          <ol
            id="all-stages"
            aria-label={t.allLabel}
            className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-10 rounded-[20px] bg-white p-[clamp(24px,3vw,40px)] text-base leading-[1.55]"
          >
            {t.stages.map((s, i) => (
              <li key={s.title} className="flex gap-4 border-b border-divider py-[18px]">
                <span className="flex-[0_0_32px] font-bold text-vermilion-deep">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <strong>{s.title}</strong> <span className="text-soft">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
