"use client";

import { useState } from "react";
import { Check } from "@/components/ui/icons";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";

/** Stage index per sample request: 0 submitted, 1 manager, 2 finance, 3 approved. */
const START = [2, 1, 1];
const LAST = 3;

type Props = {
  locale: Locale;
  /** false: static preview on the page. true: working demo inside the dialog. */
  interactive: boolean;
};

export function ApprovalWorkspace({ locale, interactive }: Props) {
  const t = getDictionary(locale).demo;
  const [stages, setStages] = useState(START);
  const [sel, setSel] = useState(0);
  const req = t.sampleRequests[sel];
  const stage = stages[sel];
  const next = t.next[stage];
  const openCount = stages.filter((s) => s < LAST).length;

  const status = (k: number) => (k === LAST ? t.status.approved : k === 1 ? t.status.manager : t.status.finance);
  const approve = () => setStages((a) => a.map((s, i) => (i === sel && s < LAST ? s + 1 : s)));
  const reset = () => {
    setStages(START);
    setSel(0);
  };

  const ApproveTag = interactive ? "button" : "span";

  const body = (
    <>
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-[clamp(16px,2vw,24px)] py-4">
        <span className="flex items-center gap-2.5 text-small font-bold">
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny brand SVG */}
          <img src="/brand/Ingen-Icon-Vermilion.svg" alt="" width={14} height={14} className="block size-3.5" />
          {t.requests}
          {interactive ? <span className="text-caption font-normal text-muted">{t.openCount(openCount)}</span> : null}
        </span>
        {interactive ? (
          <button
            type="button"
            onClick={reset}
            className="min-h-10 border-0 bg-transparent px-1 text-sm text-charcoal underline underline-offset-4 hover:text-vermilion"
          >
            {t.reset}
          </button>
        ) : (
          <span className="text-caption text-muted">{t.openCount(openCount)}</span>
        )}
      </div>

      <div className={interactive ? "flex flex-wrap" : "flex"}>
        {/* Request list. Hidden in the static preview below desktop width so the detail stays readable. */}
        <div
          role={interactive ? "group" : undefined}
          aria-label={interactive ? t.requests : undefined}
          className={
            interactive
              ? "flex min-w-0 max-w-full flex-[1_1_280px] flex-col gap-1 border-hairline p-3 max-sm:border-b sm:border-e"
              : "hidden flex-[0_0_300px] flex-col gap-1 border-e border-hairline p-3 lg:flex"
          }
        >
          {t.sampleRequests.map((r, i) => {
            const k = stages[i];
            const Tag = interactive ? "button" : "span";
            return (
              <Tag
                key={r.id}
                {...(interactive ? { type: "button" as const, "aria-pressed": i === sel, onClick: () => setSel(i) } : {})}
                className={`flex flex-col gap-2 rounded-xl border-0 px-4 py-3.5 text-start text-charcoal ${
                  i === sel ? "bg-surface" : "bg-white"
                } ${interactive ? "hover:bg-surface-hover" : ""}`}
              >
                <span className="flex w-full justify-between gap-2 text-micro text-muted">
                  <bdi>{r.id}</bdi>
                  <span>{r.amount}</span>
                </span>
                <span className="font-bold leading-heading text-balance">{r.title}</span>
                <span className={`inline-flex items-center gap-1.5 text-micro font-bold ${k === LAST ? "text-charcoal" : "text-vermilion-deep"}`}>
                  <span className={`size-[7px] rounded-full ${k === LAST ? "bg-charcoal" : "bg-vermilion"}`} />
                  {status(k)}
                </span>
              </Tag>
            );
          })}
        </div>

        {/* Request detail: title, stage, next action. */}
        <div
          className={`@container flex min-w-0 flex-col gap-[clamp(22px,2.4vw,32px)] p-[clamp(20px,3vw,40px)] ${interactive ? "flex-[3_1_420px]" : "flex-auto"}`}
        >
          <div className="flex flex-col gap-2">
            <span className="text-micro font-bold uppercase text-muted ltr:tracking-[0.05em]">
              <bdi>{req.id}</bdi> · {req.dept}
            </span>
            <span className="text-[clamp(22px,2.2vw,30px)] font-bold leading-heading text-balance">{req.title}</span>
            <span className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
              <span>{req.amount}</span>
              <span>{t.requestedBy(req.by)}</span>
            </span>
          </div>

          {/* Four columns when there is room; a vertical list in narrow containers
              (phones, and the preview beside the request list) so labels never collide. */}
          <ol aria-label={t.stagesLabel} className="m-0 grid list-none grid-cols-4 p-0 @max-[26rem]:grid-cols-1 @max-[26rem]:gap-3">
            {t.stages.map((name, k) => {
              const done = k < stage || stage === LAST;
              const cur = k === stage && stage < LAST;
              return (
                <li
                  key={name}
                  aria-current={cur ? "step" : undefined}
                  className="flex min-w-0 flex-col gap-2.5 @max-[26rem]:flex-row @max-[26rem]:items-center @max-[26rem]:gap-3"
                >
                  <span className="flex items-center">
                    <span
                      className={`box-border flex size-[26px] flex-none items-center justify-center rounded-full border-2 ${
                        done ? "border-charcoal bg-charcoal" : cur ? "border-vermilion bg-white" : "border-divider bg-white"
                      }`}
                    >
                      {done ? <Check /> : cur ? <span className="size-2.5 rounded-full bg-vermilion" /> : null}
                    </span>
                    {k < LAST ? (
                      <span className={`mx-1.5 h-0.5 flex-1 @max-[26rem]:hidden ${k < stage || stage === LAST ? "bg-charcoal" : "bg-divider"}`} />
                    ) : null}
                  </span>
                  <span className={`pe-2 text-caption font-bold leading-heading [overflow-wrap:anywhere] ${done ? "text-charcoal" : cur ? "text-vermilion-deep" : "text-muted"}`}>
                    {name}
                    <span className="sr-only">, {done ? t.stepState.done : cur ? t.stepState.current : t.stepState.waiting}</span>
                  </span>
                </li>
              );
            })}
          </ol>

          {next ? (
            <div
              aria-live={interactive ? "polite" : undefined}
              className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-2xl border border-hairline p-[clamp(18px,2vw,24px)] ${
                stage === LAST ? "bg-surface" : "bg-white"
              }`}
            >
              <span className="flex flex-[1_1_260px] flex-col gap-1.5">
                <span className={`text-micro font-bold uppercase ltr:tracking-[0.05em] ${stage === LAST ? "text-charcoal" : "text-vermilion-deep"}`}>
                  {next.label}
                </span>
                <span className="text-[clamp(17px,1.5vw,20px)] font-bold leading-heading text-balance">{next.text}</span>
                <span className="text-sm text-muted">{next.who}</span>
              </span>
              {stage < LAST ? (
                <ApproveTag
                  {...(interactive ? { type: "button" as const, onClick: approve } : {})}
                  className={`inline-flex items-center rounded-full border-0 bg-vermilion px-6 text-small font-bold text-white ${
                    interactive ? "min-h-12 transition-colors hover:bg-vermilion-deep" : "min-h-[46px]"
                  }`}
                >
                  {stage === 1 ? t.approveAs.manager : t.approveAs.finance}
                </ApproveTag>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );

  if (interactive) {
    return (
      <div className="flex flex-col overflow-hidden rounded-[20px] bg-white text-small leading-body shadow-[0_0_0_1px_var(--color-hairline)]">{body}</div>
    );
  }
  return (
    <div
      role="img"
      aria-label={t.previewLabel}
      className="mx-auto flex max-w-[1060px] flex-col overflow-hidden rounded-[20px] bg-white text-small leading-body shadow-[0_1px_0_var(--color-divider),0_0_0_1px_var(--color-hairline)]"
    >
      {body}
    </div>
  );
}
