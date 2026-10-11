"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";

/**
 * How we work: the delivery stages and the commitments that come with them.
 * The stages show either the three-stage summary or all six stages (never
 * both, so nothing is repeated). The toggle stays in place, so focus is kept.
 */
export function Approach({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).approach;
  const [all, setAll] = useState(false);
  const stages = all ? t.stages : t.summary;

  return (
    <section id="approach" aria-labelledby="ap-title" className="bg-surface py-[clamp(112px,11vw,176px)]">
      <div className="page-container flex flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-5">
          <div className="flex flex-col gap-[22px]">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 id="ap-title" className="m-0 max-w-[16ch] text-[clamp(34px,4vw,58px)] font-bold leading-title text-balance">
              {t.title}
            </h2>
          </div>
          <button
            type="button"
            aria-expanded={all}
            aria-controls="approach-stages"
            onClick={() => setAll((v) => !v)}
            className="inline-flex min-h-12 items-center gap-3 border-0 border-b border-dashed border-vermilion bg-transparent px-0 pb-2 text-start text-base font-bold text-charcoal hover:text-vermilion-deep"
          >
            <span aria-hidden="true" className="inline-flex size-[26px] flex-none items-center justify-center rounded-full border border-line-strong font-normal">
              {all ? "−" : "+"}
            </span>
            {all ? t.hide : t.show}
          </button>
        </div>

        <ol
          id="approach-stages"
          aria-label={all ? t.allLabel : t.summaryLabel}
          className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-12 gap-y-10 p-0"
        >
          {stages.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-3.5 border-t-2 border-dotted border-line-strong pt-6">
              <span aria-hidden="true" className="text-small font-bold text-vermilion-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 text-[clamp(22px,2vw,28px)] font-bold leading-heading">{s.title}</h3>
              <p className="m-0 text-body leading-body text-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        {/* id="company" keeps older #company links working. */}
        <div id="company" className="flex flex-col gap-8 rounded-[20px] bg-white p-[clamp(24px,3.4vw,52px)]">
          <h3 className="m-0 text-[clamp(24px,2.4vw,32px)] font-bold leading-heading">{t.commitmentsTitle}</h3>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-12 gap-y-8 p-0">
            {t.commitments.map((item) => (
              <li key={item.title} className="flex flex-col gap-2.5 border-t border-divider pt-5">
                <h4 className="m-0 text-[20px] font-bold leading-heading">{item.title}</h4>
                <p className="m-0 text-body leading-body text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
