"use client";

import { useRef, useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Close, Expand } from "@/components/ui/icons";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { ApprovalWorkspace } from "./ApprovalWorkspace";

/** One concept demonstration: static preview on the page, working version in a dialog. */
export function DemoSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).demo;
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <section id="examples" aria-labelledby="ex-title" className="pb-[clamp(96px,10vw,160px)] pt-[clamp(120px,12vw,192px)]">
      <div className="page-container flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div className="flex max-w-[760px] flex-col gap-[22px]">
            <span className="self-start rounded-full border border-charcoal px-3.5 py-1.5 text-micro font-bold uppercase ltr:tracking-[0.05em]">
              {t.badge}
            </span>
            <h2 id="ex-title" className="m-0 text-[clamp(34px,4vw,58px)] font-bold leading-title text-balance">
              {t.title}
            </h2>
            <p className="m-0 max-w-[34em] text-lg leading-body text-muted">{t.lead}</p>
          </div>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
            className="inline-flex min-h-[54px] items-center gap-2.5 rounded-full border-0 bg-charcoal px-7 text-base font-bold text-white transition-colors hover:bg-charcoal-hover"
          >
            {t.view} <Expand />
          </button>
        </div>

        {/* Static preview. Clicking anywhere on it (including its "Approve" action)
            opens the working demonstration; keyboard users use the button above,
            which does the same, so the overlay is not a second tab stop. */}
        <div className="group relative rounded-[clamp(18px,1.8vw,28px)] bg-surface p-[clamp(12px,4.4vw,72px)]">
          <ApprovalWorkspace locale={locale} interactive={false} />
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(true)}
            className="absolute inset-0 cursor-pointer rounded-[inherit] border-0 bg-transparent transition-shadow hover:shadow-[inset_0_0_0_2px_var(--color-line-strong)]"
          />
        </div>
        <p className="m-0 -mt-6 text-sm text-muted">{t.footnote}</p>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        labelledBy="dlg-demo-title"
        initialFocus={closeRef}
        panelClassName="flex w-[min(1200px,100vw)] flex-col rounded-[clamp(0px,1.8vw,24px)]"
      >
        <div className="sticky top-0 z-[1] flex items-center justify-between gap-4 border-b border-hairline bg-white px-[clamp(16px,3vw,36px)] py-4">
          <div className="flex min-w-0 flex-auto flex-wrap items-center gap-x-4 gap-y-2">
            <span className="rounded-full border border-charcoal px-3 py-[5px] text-micro font-bold uppercase ltr:tracking-[0.05em]">{t.badge}</span>
            <h2 id="dlg-demo-title" className="m-0 text-lg font-bold">
              {t.dialogTitle}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label={t.close}
            onClick={() => setOpen(false)}
            className="flex size-11 flex-none items-center justify-center rounded-full border border-divider bg-white text-charcoal hover:bg-surface"
          >
            <Close />
          </button>
        </div>
        <div className="flex-1 bg-surface p-[clamp(16px,3vw,40px)]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
              <span className="text-[clamp(20px,2vw,24px)] font-bold">{t.title}</span>
              <span className="text-small text-muted">{t.dialogHint}</span>
            </div>
            <ApprovalWorkspace locale={locale} interactive />
          </div>
          <p className="mb-0 mt-4 text-sm text-muted">{t.footnote}</p>
        </div>
      </Dialog>
    </section>
  );
}
