"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check } from "@/components/ui/icons";
import { getDictionary } from "@/content";
import { MAX_ATTACHMENT_BYTES, validateEnquiry, type EnquiryErrors, type EnquiryResponse } from "@/lib/enquiry";
import type { Locale } from "@/lib/i18n";
import closingPhoto from "../../../public/photos/ingen-photo-8.jpg";
import { revealForm, useEnquiry } from "./EnquiryProvider";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; reason: keyof ReturnType<typeof getDictionary>["form"]["failure"] };

const field = "min-h-[52px] rounded-[10px] bg-white px-3.5 text-base text-charcoal";
const okBorder = "border border-line-strong";
const badBorder = "border-2 border-vermilion";
const label = "flex justify-between gap-3 text-[15px] font-bold";

export function Enquiry({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const { formOpen, openForm } = useEnquiry();

  return (
    <div id="enquiry" className="px-[clamp(8px,1.4vw,20px)]">
      <section
        aria-labelledby="enq-title"
        className="on-dark relative isolate box-border flex min-h-[clamp(520px,46vw,680px)] flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] bg-ink-photo px-[clamp(16px,3.4vw,56px)] py-[clamp(40px,5vw,72px)] text-white"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={closingPhoto}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            className={`object-cover object-[72%_50%] ${locale === "ar" ? "photo-mirror" : ""}`}
          />
          <div className="absolute inset-0 bg-[rgb(15_16_16/0.42)]" />
        </div>
        <div className="flex max-w-[820px] flex-col gap-6">
          <h2 id="enq-title" className="m-0 text-[clamp(38px,5.4vw,80px)] font-bold leading-[1.04] text-balance">
            {d.closing.title}
          </h2>
          <p className="m-0 max-w-[32em] text-[clamp(17px,1.5vw,20px)] text-on-dark">{d.closing.lead}</p>
          {!formOpen ? (
            <button
              type="button"
              aria-expanded={false}
              aria-controls="enquiry-form"
              onClick={openForm}
              className="inline-flex min-h-14 items-center gap-2.5 self-start rounded-full border-0 bg-vermilion px-[30px] text-[17px] font-bold text-white transition-colors hover:bg-vermilion-deep"
            >
              {d.closing.cta} <ArrowUpRight />
            </button>
          ) : null}
        </div>
      </section>

      {formOpen ? <EnquiryForm locale={locale} /> : null}
    </div>
  );
}

function EnquiryForm({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).form;
  const { formRef, firstFieldRef } = useEnquiry();
  const [values, setValues] = useState({ name: "", email: "", org: "", need: "", budget: "", timing: t.timingOptions[0], phone: "" });
  const [file, setFile] = useState<File | null>(null);
  const [more, setMore] = useState(false);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Opening the form from any "Discuss your project" control lands here.
  useEffect(() => {
    revealForm(formRef.current, firstFieldRef.current);
  }, [formRef, firstFieldRef]);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (tried) setErrors(validateEnquiry(next));
  };

  const msg = (key: EnquiryErrors[keyof EnquiryErrors]) => (key ? t.messages[key] : "");
  const errorList = (["name", "email", "need"] as const).filter((k) => errors[k]).map((k) => ({ k, text: msg(errors[k]) }));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateEnquiry(values);
    setTried(true);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ kind: "idle" });
      return;
    }
    if (file && file.size > MAX_ATTACHMENT_BYTES) {
      setStatus({ kind: "failed", reason: "attachment_too_large" });
      return;
    }

    const body = new FormData(e.currentTarget);
    body.set("locale", locale);
    if (!file) body.delete("file");

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body });
      const data = (await res.json().catch(() => ({ ok: false, reason: "send_failed" }))) as EnquiryResponse;
      if (data.ok) {
        setStatus({ kind: "sent" });
      } else if (data.reason === "invalid") {
        setErrors(data.errors);
        setStatus({ kind: "idle" });
      } else {
        setStatus({ kind: "failed", reason: data.reason });
      }
    } catch {
      setStatus({ kind: "failed", reason: "network" });
    }
  }

  function startOver() {
    setValues({ name: "", email: "", org: "", need: "", budget: "", timing: t.timingOptions[0], phone: "" });
    setFile(null);
    setMore(false);
    setErrors({});
    setTried(false);
    setStatus({ kind: "idle" });
  }

  return (
    <section
      id="enquiry-form"
      ref={formRef}
      aria-labelledby="form-title"
      className="mx-auto flex max-w-[calc(1240px+2*clamp(8px,2.6vw,36px))] scroll-mt-4 flex-wrap gap-x-[72px] gap-y-10 px-[clamp(8px,2.6vw,36px)] pb-[clamp(24px,3vw,40px)] pt-[clamp(56px,6vw,96px)]"
    >
      <div className="flex flex-[1_1_280px] flex-col gap-7">
        <div className="flex flex-col gap-2.5">
          <h2 id="form-title" className="m-0 text-[clamp(28px,2.8vw,40px)] font-bold leading-[1.12]">
            {t.title}
          </h2>
          <p className="m-0 text-[17px] text-muted">{t.lead}</p>
        </div>
        <dl className="m-0 flex flex-col gap-5 text-base leading-normal">
          {t.notes.map((n) => (
            <div key={n.term} className="flex flex-col gap-1 border-t border-divider pt-4">
              <dt className="font-bold">{n.term}</dt>
              <dd className="m-0 text-muted">{n.text}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="min-w-0 flex-[2_1_520px] rounded-[22px] border border-divider p-[clamp(20px,3vw,44px)]">
        {status.kind === "sent" ? (
          <div role="status" className="flex flex-col gap-[18px]">
            <span aria-hidden="true" className="flex size-[52px] items-center justify-center rounded-full bg-charcoal">
              <Check size={22} strokeWidth={1.8} />
            </span>
            <h3 className="m-0 text-[clamp(26px,2.6vw,36px)] font-bold leading-[1.15]">{t.success.title}</h3>
            <p className="m-0 text-[17px] text-soft">{t.success.text}</p>
            <button
              type="button"
              onClick={startOver}
              className="min-h-12 self-start rounded-full border border-charcoal bg-white px-[22px] text-[15px] text-charcoal hover:bg-surface"
            >
              {t.success.back}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate aria-labelledby="form-title" className="relative flex flex-col gap-[22px]">
            <p className="m-0 text-[15px] text-muted">{t.requiredNote}</p>

            {errorList.length > 0 ? (
              <div role="alert" className="flex flex-col gap-1.5 rounded-xl border-2 border-vermilion px-4 py-3.5">
                <span className="font-bold">{t.errorSummary}</span>
                {errorList.map((er) => (
                  <a key={er.k} href={`#f-${er.k}`} className="text-[15px] text-vermilion-deep underline">
                    {er.text}
                  </a>
                ))}
              </div>
            ) : null}

            {status.kind === "failed" ? (
              <div role="alert" className="rounded-xl border-2 border-vermilion px-4 py-3.5 font-bold">
                {t.failure[status.reason]}
              </div>
            ) : null}

            {/* Spam trap: hidden from people, often filled in by bots. */}
            <div aria-hidden="true" className="pointer-events-none absolute size-px overflow-hidden opacity-0 [clip-path:inset(50%)]">
              <label htmlFor="f-website">Website</label>
              <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="f-name" className={label}>
                  {t.name} <span className="font-normal text-muted">{t.required}</span>
                </label>
                <input
                  id="f-name"
                  name="name"
                  ref={firstFieldRef}
                  type="text"
                  autoComplete="name"
                  maxLength={120}
                  value={values.name}
                  onChange={set("name")}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "f-name-err" : undefined}
                  className={`${field} ${errors.name ? badBorder : okBorder}`}
                />
                {errors.name ? (
                  <p id="f-name-err" className="m-0 text-sm font-bold text-vermilion-deep">
                    {msg(errors.name)}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="f-email" className={label}>
                  {t.email} <span className="font-normal text-muted">{t.required}</span>
                </label>
                <input
                  id="f-email"
                  name="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={254}
                  value={values.email}
                  onChange={set("email")}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "f-email-err" : undefined}
                  className={`${field} rtl:text-right ${errors.email ? badBorder : okBorder}`}
                />
                {errors.email ? (
                  <p id="f-email-err" className="m-0 text-sm font-bold text-vermilion-deep">
                    {msg(errors.email)}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="f-org" className={label}>
                {t.org} <span className="font-normal text-muted">{t.optional}</span>
              </label>
              <input id="f-org" name="org" type="text" autoComplete="organization" maxLength={160} value={values.org} onChange={set("org")} className={`${field} ${okBorder}`} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="f-need" className={label}>
                {t.need} <span className="flex-none font-normal text-muted">{t.required}</span>
              </label>
              <textarea
                id="f-need"
                name="need"
                rows={4}
                maxLength={5000}
                value={values.need}
                onChange={set("need")}
                aria-required="true"
                aria-invalid={!!errors.need}
                aria-describedby={`f-need-hint${errors.need ? " f-need-err" : ""}`}
                placeholder={t.needPlaceholder}
                className={`min-h-32 resize-y rounded-[10px] bg-white px-3.5 py-3 text-base leading-normal text-charcoal ${errors.need ? badBorder : okBorder}`}
              />
              <span id="f-need-hint" className="text-sm text-muted">
                {t.needHint}
              </span>
              {errors.need ? (
                <p id="f-need-err" className="m-0 text-sm font-bold text-vermilion-deep">
                  {msg(errors.need)}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                aria-expanded={more}
                aria-controls="more-fields"
                onClick={() => setMore((v) => !v)}
                className="inline-flex min-h-11 items-center gap-2.5 self-start border-0 bg-transparent p-0 text-start text-[15px] font-bold text-charcoal hover:text-vermilion"
              >
                <span aria-hidden="true" className="inline-flex size-[26px] flex-none items-center justify-center rounded-full border border-line-strong font-normal">
                  {more ? "−" : "+"}
                </span>
                <span>
                  {t.more} <span className="font-normal text-muted">{t.moreOptional}</span>
                </span>
              </button>

              {/* Kept mounted (just hidden) so typed values survive collapsing. */}
              <div id="more-fields" hidden={!more} className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-budget" className="text-[15px] font-bold">
                    {t.budget}
                  </label>
                  <div className={`flex min-h-[52px] items-stretch overflow-hidden rounded-[10px] bg-white ${okBorder}`}>
                    <span aria-hidden="true" className="inline-flex items-center border-e border-divider bg-surface pe-3 ps-3.5 text-[15px] font-bold text-muted">
                      {t.currency}
                    </span>
                    <input
                      id="f-budget"
                      name="budget"
                      type="text"
                      inputMode="text"
                      autoComplete="off"
                      maxLength={80}
                      placeholder={t.budgetPlaceholder}
                      value={values.budget}
                      onChange={set("budget")}
                      aria-describedby="f-budget-hint"
                      className="min-w-0 flex-1 border-0 bg-transparent px-3.5 text-base text-charcoal"
                    />
                  </div>
                  <span id="f-budget-hint" className="text-[13px] text-muted">
                    {t.budgetHint}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-timing" className="text-[15px] font-bold">
                    {t.timing}
                  </label>
                  <select id="f-timing" name="timing" value={values.timing} onChange={set("timing")} className={`${field} px-3 ${okBorder}`}>
                    {t.timingOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-phone" className="text-[15px] font-bold">
                    {t.phone}
                  </label>
                  <input
                    id="f-phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={40}
                    value={values.phone}
                    onChange={set("phone")}
                    className={`${field} rtl:text-right ${okBorder}`}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-file" className="text-[15px] font-bold">
                    {t.file}
                  </label>
                  <input
                    id="f-file"
                    name="file"
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.rtf,.odt,.png,.jpg,.jpeg"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    aria-describedby="f-file-hint"
                    className="box-border min-h-[52px] max-w-full rounded-[10px] border border-dashed border-line-strong bg-[#fafaf8] px-3 py-2.5 text-sm text-charcoal"
                  />
                  <span id="f-file-hint" className="text-[13px] text-muted">
                    {file ? t.fileAttached(file.name) : t.fileHint}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="min-h-[58px] rounded-full border-0 bg-vermilion text-[17px] font-bold text-white transition-colors hover:bg-vermilion-deep disabled:cursor-wait disabled:opacity-70"
            >
              {status.kind === "sending" ? t.sending : t.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
