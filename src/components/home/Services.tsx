"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Dialog } from "@/components/ui/Dialog";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight, Close } from "@/components/ui/icons";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { DiscussLink, useEnquiry } from "./EnquiryProvider";

export function Services({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.services;
  const { openForm } = useEnquiry();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const svc = openIndex === null ? null : t.items[openIndex];

  return (
    <div className="px-[clamp(8px,1.4vw,20px)] pt-[clamp(8px,1.4vw,20px)]">
      <section
        id="services"
        aria-labelledby="svc-title"
        className="on-dark rounded-[var(--radius-panel)] bg-ink px-[clamp(16px,4vw,56px)] py-[clamp(80px,9vw,144px)] text-white"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6 border-b border-white/14 pb-10">
            <div className="flex flex-col gap-[22px]">
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h2 id="svc-title" className="m-0 max-w-[14ch] text-[clamp(36px,4.6vw,66px)] font-bold leading-title text-balance rtl:max-w-[20ch]">
                {t.title}
              </h2>
            </div>
            <p className="m-0 max-w-[400px] text-body leading-body text-on-dark-muted">{t.intro}</p>
          </div>

          {/* Each row describes the service on the page; the title button (stretched over the
              whole row) opens the detail dialog with typical work and how we approach it. */}
          <ul className="m-0 list-none p-0">
            {t.items.map((item, i) => (
              <li key={item.slug} className="border-b border-dashed border-vermilion/85">
                <div className="svc-row relative flex items-center gap-x-8 gap-y-4 rounded-xl px-[clamp(4px,1vw,16px)] py-[clamp(28px,3vw,44px)]">
                  <div className="flex min-w-0 flex-auto flex-wrap items-center gap-x-8 gap-y-3">
                    <h3 className="m-0 flex-[1_1_340px] text-[clamp(28px,3.2vw,46px)] font-bold leading-heading">
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => setOpenIndex(i)}
                        className="border-0 bg-transparent p-0 text-start text-inherit [font:inherit] after:absolute after:inset-0 after:rounded-xl after:content-['']"
                      >
                        {item.title}
                        <span className="sr-only">: {t.detailsHint}</span>
                        {/* Phones: the arrow sits after the title instead of taking a column. */}
                        <span aria-hidden="true" className="ms-3 inline-flex align-middle text-vermilion-soft sm:hidden">
                          <ArrowRight />
                        </span>
                      </button>
                    </h3>
                    <span aria-hidden="true" className="hidden flex-[0_0_56px] text-small text-vermilion-soft sm:block">
                      {item.num}
                    </span>
                    <p className="m-0 max-w-[460px] flex-[1_1_300px] text-body leading-body text-on-dark-muted">{item.lead}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="svc-arrow hidden size-12 flex-none items-center justify-center rounded-full border border-white/45 text-white sm:flex"
                  >
                    <ArrowRight />
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <DiscussLink className="inline-flex min-h-11 items-center gap-2.5 self-start pt-4 text-body text-white underline decoration-white/45 underline-offset-[6px] hover:decoration-white">
            {t.notSure} <ArrowRight />
          </DiscussLink>
        </div>
      </section>

      <Dialog
        open={svc !== null}
        onClose={() => setOpenIndex(null)}
        labelledBy="dlg-svc-title"
        initialFocus={closeRef}
        panelClassName="w-[min(820px,100vw)] rounded-[clamp(0px,1.8vw,24px)]"
      >
        {svc ? (
          <div className="flex flex-col gap-7 p-[clamp(24px,4vw,56px)]">
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-col gap-3.5">
                <span className="text-sm font-bold text-vermilion-deep">
                  {svc.num} · {t.detailLabel}
                </span>
                <h2 id="dlg-svc-title" className="m-0 text-[clamp(30px,3.4vw,44px)] font-bold leading-title">
                  {svc.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                aria-label={t.close}
                onClick={() => setOpenIndex(null)}
                className="flex size-11 flex-none items-center justify-center rounded-full border border-divider bg-white text-charcoal hover:bg-surface"
              >
                <Close />
              </button>
            </div>
            <p className="m-0 text-[clamp(18px,1.6vw,21px)] leading-body">{svc.lead}</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-10 gap-y-7">
              <div className="flex flex-col gap-2.5">
                <h3 className="m-0 text-caption font-bold uppercase text-muted ltr:tracking-[0.04em]">{t.typicalLabel}</h3>
                <ul className="m-0 list-none p-0 text-body">
                  {svc.typical.map((w) => (
                    <li key={w} className="border-t border-divider py-2.5">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="m-0 text-caption font-bold uppercase text-muted ltr:tracking-[0.04em]">{t.howLabel}</h3>
                <p className="m-0 border-t border-divider pt-2.5 text-body leading-body text-soft">{svc.how}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  // Close the dialog first (it returns focus to its trigger),
                  // then move focus to the enquiry form.
                  flushSync(() => setOpenIndex(null));
                  openForm();
                }}
                className="inline-flex min-h-[54px] items-center gap-2.5 rounded-full border-0 bg-vermilion px-7 text-base font-bold text-white transition-colors hover:bg-vermilion-deep"
              >
                {d.nav.cta}
              </button>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                className="min-h-[54px] border-0 bg-transparent px-1 text-base text-charcoal underline underline-offset-[5px] hover:text-vermilion"
              >
                {t.back}
              </button>
            </div>
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}
