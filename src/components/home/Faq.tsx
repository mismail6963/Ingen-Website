"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";

export function Faq({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).faq;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-[clamp(120px,12vw,192px)]">
      <div className="page-container flex flex-wrap gap-x-20 gap-y-10">
        <div className="flex flex-[1_1_300px] flex-col gap-[22px]">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 id="faq-title" className="m-0 text-[clamp(34px,4vw,58px)] font-bold leading-[1.08]">
            {t.title}
          </h2>
        </div>
        <div className="min-w-0 flex-[2_1_560px] border-b border-divider">
          {t.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className="border-t border-divider">
                <h3 className="m-0 text-[length:inherit] font-[inherit]">
                  <button
                    type="button"
                    id={`faq-b${i}`}
                    aria-expanded={open}
                    aria-controls={`faq-p${i}`}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex min-h-[72px] w-full items-center justify-between gap-6 border-0 bg-transparent py-[22px] text-start text-[clamp(19px,1.7vw,23px)] font-bold leading-[1.3] text-charcoal hover:text-vermilion"
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="flex size-[34px] flex-none items-center justify-center rounded-full border border-line-strong text-xl font-normal leading-none"
                    >
                      {open ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                {open ? (
                  <div id={`faq-p${i}`} role="region" aria-labelledby={`faq-b${i}`} className="pb-7 pe-[clamp(0px,4vw,64px)]">
                    <p className="m-0 text-[17px] leading-[1.6] text-soft">{item.a}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
