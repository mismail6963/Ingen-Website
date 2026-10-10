"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type EnquiryContextValue = {
  formOpen: boolean;
  /** Opens the enquiry form (if needed), scrolls to it and focuses the first field. */
  openForm: (event?: React.SyntheticEvent) => void;
  formRef: React.RefObject<HTMLElement | null>;
  firstFieldRef: React.RefObject<HTMLInputElement | null>;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function revealForm(form: HTMLElement | null, field: HTMLInputElement | null) {
  form?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  field?.focus({ preventScroll: true });
}

/**
 * Every "Discuss your project" control on the page calls openForm, so all of
 * them lead to the same enquiry form.
 */
export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [formOpen, setFormOpen] = useState(false);
  const formRef = useRef<HTMLElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const openForm = useCallback(
    (event?: React.SyntheticEvent) => {
      event?.preventDefault();
      if (formOpen) revealForm(formRef.current, firstFieldRef.current);
      else setFormOpen(true); // EnquiryForm reveals itself on mount
    },
    [formOpen],
  );

  const value = useMemo(() => ({ formOpen, openForm, formRef, firstFieldRef }), [formOpen, openForm]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}

/** Link-styled trigger. Falls back to the #enquiry anchor without JavaScript. */
export function DiscussLink({
  className,
  children,
  onBeforeOpen,
}: {
  className?: string;
  children: React.ReactNode;
  onBeforeOpen?: () => void;
}) {
  const { openForm } = useEnquiry();
  return (
    <a
      href="#enquiry"
      className={className}
      onClick={(e) => {
        onBeforeOpen?.();
        openForm(e);
      }}
    >
      {children}
    </a>
  );
}
