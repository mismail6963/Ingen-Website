"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AlertIcon, ArrowUpRight, Check, Paperclip } from "@/components/ui/icons";
import { getDictionary } from "@/content";
import { MAX_ATTACHMENT_BYTES, validateEnquiry, type EnquiryErrors, type EnquiryResponse } from "@/lib/enquiry";
import type { Locale } from "@/lib/i18n";
import closingPhoto from "../../../public/photos/ingen-photo-8.jpg";
import { revealForm, useEnquiry } from "./EnquiryProvider";

type FailureReason = keyof ReturnType<typeof getDictionary>["form"]["failure"];
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "failed"; reason: FailureReason };

const field = "min-h-[52px] rounded-[10px] bg-white px-3.5 text-base text-charcoal";
const okBorder = "border border-line-strong";
const badBorder = "border-2 border-vermilion";
const label = "flex justify-between gap-3 text-small font-bold";
const ACCEPT = ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.rtf,.odt,.png,.jpg,.jpeg";

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
          <h2 id="enq-title" className="m-0 text-[clamp(38px,5.4vw,80px)] font-bold leading-display text-balance">
            {d.closing.title}
          </h2>
          <p className="m-0 max-w-[32em] text-[clamp(17px,1.5vw,20px)] leading-body text-on-dark">{d.closing.lead}</p>
          {!formOpen ? (
            <button
              type="button"
              aria-expanded={false}
              aria-controls="enquiry-form"
              onClick={openForm}
              className="inline-flex min-h-14 items-center gap-2.5 self-start rounded-full border-0 bg-vermilion px-[30px] text-body font-bold text-white transition-colors hover:bg-vermilion-deep"
            >
              {d.nav.cta} <ArrowUpRight />
            </button>
          ) : null}
        </div>
      </section>

      {formOpen ? <EnquiryForm locale={locale} /> : null}
    </div>
  );
}

/** Error message under a field: icon + "Error:" for screen readers, so it never relies on colour. */
function FieldError({ id, prefix, children }: { id: string; prefix: string; children: React.ReactNode }) {
  return (
    <p id={id} className="m-0 flex items-start gap-2 text-sm font-bold text-vermilion-deep">
      <AlertIcon />
      <span>
        <span className="sr-only">{prefix} </span>
        {children}
      </span>
    </p>
  );
}

function EnquiryForm({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).form;
  const { formRef, firstFieldRef } = useEnquiry();
  const empty = { name: "", email: "", org: "", need: "", budget: "", timing: t.timingOptions[0], phone: "" };
  const [values, setValues] = useState(empty);
  const [file, setFile] = useState<File | null>(null);
  const [more, setMore] = useState(false);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const sendingRef = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const failureRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const fileTooLarge = !!file && file.size > MAX_ATTACHMENT_BYTES;

  // Opening the form from any "Tell us about your project" control lands here.
  useEffect(() => {
    revealForm(formRef.current, firstFieldRef.current);
  }, [formRef, firstFieldRef]);

  // Move focus to the outcome so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (status.kind === "sent") successRef.current?.focus();
    if (status.kind === "failed") failureRef.current?.focus();
  }, [status]);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (tried) setErrors(validateEnquiry(next));
  };

  const msg = (key: EnquiryErrors[keyof EnquiryErrors]) => (key ? t.messages[key] : "");
  const errorList = (["name", "email", "need"] as const).filter((k) => errors[k]).map((k) => ({ k, text: msg(errors[k]) }));

  function chooseFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
    if (status.kind === "failed" && status.reason === "attachment_too_large") setStatus({ kind: "idle" });
  }

  function removeFile() {
    if (fileRef.current) fileRef.current.value = "";
    setFile(null);
    if (status.kind === "failed" && status.reason === "attachment_too_large") setStatus({ kind: "idle" });
    fileRef.current?.focus();
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // One request at a time: ignore repeat submits (double click, Enter) while sending.
    if (sendingRef.current) return;

    const errs = validateEnquiry(values);
    setTried(true);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ kind: "idle" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    if (fileTooLarge) {
      setMore(true);
      requestAnimationFrame(() => fileRef.current?.focus());
      return;
    }

    const body = new FormData(e.currentTarget);
    body.set("locale", locale);
    if (!file) body.delete("file");

    sendingRef.current = true;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body });
      // A 413 can come from the host before the API runs (request body limit).
      const fallback: EnquiryResponse = { ok: false, reason: res.status === 413 ? "attachment_too_large" : "send_failed" };
      const data = (await res.json().catch(() => fallback)) as EnquiryResponse;
      // Success only when the server confirms it accepted the enquiry.
      if (res.ok && data.ok) {
        setStatus({ kind: "sent" });
      } else if (!data.ok && data.reason === "invalid") {
        setErrors(data.errors);
        setStatus({ kind: "idle" });
        requestAnimationFrame(() => summaryRef.current?.focus());
      } else {
        setStatus({ kind: "failed", reason: data.ok ? "send_failed" : data.reason });
      }
    } catch {
      setStatus({ kind: "failed", reason: "network" });
    } finally {
      sendingRef.current = false;
    }
  }

  function startOver() {
    setValues(empty);
    setFile(null);
    setMore(false);
    setErrors({});
    setTried(false);
    setStatus({ kind: "idle" });
    requestAnimationFrame(() => firstFieldRef.current?.focus());
  }

  const sending = status.kind === "sending";

  return (
    <section
      id="enquiry-form"
      ref={formRef}
      aria-labelledby="form-title"
      // Phones: intro, form, then notes (so the form follows the heading directly).
      // Wide screens: intro and notes in the first column, the form beside them.
      className="mx-auto grid max-w-[calc(1240px+2*clamp(8px,2.6vw,36px))] grid-cols-1 gap-x-[72px] gap-y-8 px-[clamp(8px,2.6vw,36px)] pb-[clamp(24px,3vw,40px)] pt-[clamp(56px,6vw,96px)] min-[900px]:grid-cols-[minmax(260px,1fr)_minmax(0,2fr)] min-[900px]:grid-rows-[auto_1fr]"
    >
      <div className="flex flex-col gap-2.5 min-[900px]:col-start-1 min-[900px]:row-start-1">
        <h2 id="form-title" className="m-0 text-[clamp(28px,2.8vw,40px)] font-bold leading-title">
          {t.title}
        </h2>
        <p className="m-0 text-body leading-body text-muted">{t.lead}</p>
      </div>

      <dl className="m-0 flex flex-col gap-5 self-start text-base leading-body min-[900px]:col-start-1 min-[900px]:row-start-2">
        {t.notes.map((n) => (
          <div key={n.term} className="flex flex-col gap-1 border-t border-divider pt-4">
            <dt className="font-bold">{n.term}</dt>
            <dd className="m-0 text-muted">{n.text}</dd>
          </div>
        ))}
      </dl>

      <div className="min-w-0 rounded-[22px] border border-divider p-[clamp(20px,3vw,44px)] max-[899px]:row-start-2 min-[900px]:col-start-2 min-[900px]:row-span-2 min-[900px]:row-start-1">
        {status.kind === "sent" ? (
          <div role="status" className="flex flex-col gap-[18px]">
            <span aria-hidden="true" className="flex size-[52px] items-center justify-center rounded-full bg-charcoal">
              <Check size={22} strokeWidth={1.8} />
            </span>
            <h3 ref={successRef} tabIndex={-1} className="m-0 text-[clamp(26px,2.6vw,36px)] font-bold leading-heading">
              {t.success.title}
            </h3>
            <p className="m-0 text-body leading-body text-soft">{t.success.text}</p>
            <button
              type="button"
              onClick={startOver}
              className="min-h-12 self-start rounded-full border border-charcoal bg-white px-[22px] text-small text-charcoal hover:bg-surface"
            >
              {t.success.back}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate aria-labelledby="form-title" aria-busy={sending} className="relative flex flex-col gap-[22px]">
            {/* Reassurance first, on every screen size: no technical brief needed. */}
            <p className="m-0 rounded-xl bg-surface px-4 py-3.5 text-small leading-body text-soft">
              <strong className="text-charcoal">{t.reassurance.term}</strong> {t.reassurance.text}
            </p>

            <p className="m-0 text-small text-muted">{t.requiredNote}</p>

            {errorList.length > 0 ? (
              <div
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                className="flex flex-col gap-1.5 rounded-xl border-2 border-vermilion px-4 py-3.5"
              >
                <span className="flex items-start gap-2 font-bold">
                  <span className="text-vermilion-deep">
                    <AlertIcon />
                  </span>
                  {t.errorSummary}
                </span>
                {errorList.map((er) => (
                  <a key={er.k} href={`#f-${er.k}`} className="ps-6 text-small text-vermilion-deep underline">
                    {er.text}
                  </a>
                ))}
              </div>
            ) : null}

            {status.kind === "failed" ? (
              <div
                ref={failureRef}
                tabIndex={-1}
                role="alert"
                className="flex items-start gap-2 rounded-xl border-2 border-vermilion px-4 py-3.5 font-bold"
              >
                <span className="text-vermilion-deep">
                  <AlertIcon />
                </span>
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
                  <FieldError id="f-name-err" prefix={t.errorPrefix}>
                    {msg(errors.name)}
                  </FieldError>
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
                  <FieldError id="f-email-err" prefix={t.errorPrefix}>
                    {msg(errors.email)}
                  </FieldError>
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
                className={`min-h-32 resize-y rounded-[10px] bg-white px-3.5 py-3 text-base leading-body text-charcoal ${errors.need ? badBorder : okBorder}`}
              />
              <span id="f-need-hint" className="text-sm text-muted">
                {t.needHint}
              </span>
              {errors.need ? (
                <FieldError id="f-need-err" prefix={t.errorPrefix}>
                  {msg(errors.need)}
                </FieldError>
              ) : null}
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                aria-expanded={more}
                aria-controls="more-fields"
                onClick={() => setMore((v) => !v)}
                className="inline-flex min-h-11 items-center gap-2.5 self-start border-0 bg-transparent p-0 text-start text-small font-bold text-charcoal hover:text-vermilion-deep"
              >
                <span aria-hidden="true" className="inline-flex size-[26px] flex-none items-center justify-center rounded-full border border-line-strong font-normal">
                  {more ? "−" : "+"}
                </span>
                <span>
                  {t.more} <span className="font-normal text-muted">{t.moreOptional}</span>
                </span>
              </button>

              {/* Kept mounted (just hidden) so typed values and the chosen file survive collapsing. */}
              <div id="more-fields" hidden={!more} className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-budget" className="text-small font-bold">
                    {t.budget}
                  </label>
                  <div className={`flex min-h-[52px] items-stretch overflow-hidden rounded-[10px] bg-white focus-within:outline-3 focus-within:outline-offset-3 focus-within:outline-charcoal ${okBorder}`}>
                    <span aria-hidden="true" className="inline-flex items-center border-e border-divider bg-surface pe-3 ps-3.5 text-small font-bold text-muted">
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
                      className="min-w-0 flex-1 border-0 bg-transparent px-3.5 text-base text-charcoal focus-visible:outline-none focus-visible:[box-shadow:none]"
                    />
                  </div>
                  <span id="f-budget-hint" className="text-caption text-muted">
                    {t.budgetHint}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-timing" className="text-small font-bold">
                    {t.timing}
                  </label>
                  <select id="f-timing" name="timing" value={values.timing} onChange={set("timing")} className={`${field} px-3 ${okBorder}`}>
                    {t.timingOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-phone" className="text-small font-bold">
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

                {/* File picker. The native input stays in the form (and in the tab
                    order) but is visually hidden; the localized label below acts as
                    its button, so no browser-language "Choose file" text appears. */}
                <div className="flex flex-col gap-1.5">
                  <span id="f-file-label" className="text-small font-bold">
                    {t.file}
                  </span>
                  <input
                    ref={fileRef}
                    id="f-file"
                    name="file"
                    type="file"
                    accept={ACCEPT}
                    onChange={chooseFile}
                    aria-labelledby="f-file-label"
                    aria-describedby={`f-file-status f-file-hint${fileTooLarge ? " f-file-err" : ""}`}
                    aria-invalid={fileTooLarge}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="f-file"
                    className={`box-border flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-[10px] border border-dashed bg-field px-3.5 py-2.5 text-small font-bold text-charcoal hover:bg-surface peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-charcoal ${
                      fileTooLarge ? "border-2 border-solid border-vermilion" : "border-line-strong"
                    }`}
                  >
                    <Paperclip />
                    {file ? t.fileReplace : t.fileChoose}
                  </label>
                  <span id="f-file-status" className="text-caption text-charcoal [overflow-wrap:anywhere]">
                    {file ? t.fileSelected(file.name, t.fileSize(file.size)) : t.fileNone}
                  </span>
                  {file ? (
                    <button
                      type="button"
                      onClick={removeFile}
                      className="min-h-11 self-start border-0 bg-transparent p-0 text-small text-charcoal underline underline-offset-4 hover:text-vermilion-deep"
                    >
                      {t.fileRemove}
                    </button>
                  ) : null}
                  {fileTooLarge ? (
                    <FieldError id="f-file-err" prefix={t.errorPrefix}>
                      {t.fileTooLarge}
                    </FieldError>
                  ) : null}
                  <span id="f-file-hint" className="text-caption text-muted">
                    {t.fileHint}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="min-h-[58px] rounded-full border-0 bg-vermilion px-6 text-body font-bold text-white transition-colors hover:bg-vermilion-deep disabled:cursor-wait disabled:opacity-70"
            >
              {sending ? t.sending : t.submit}
            </button>
            {/* Announces the sending state; the outcome is announced by the alert or success message. */}
            <p role="status" className="sr-only">
              {sending ? t.sending : ""}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
