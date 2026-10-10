"use client";

import { useEffect, useRef } from "react";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  /** Element to focus when the dialog opens (usually the close button). */
  initialFocus?: React.RefObject<HTMLElement | null>;
  /** Classes for the visible panel. */
  panelClassName?: string;
  children: React.ReactNode;
};

/**
 * Modal built on the native <dialog> element: it provides the focus trap,
 * Escape-to-close, an inert background and focus return to the trigger.
 * Clicking the backdrop also closes it.
 */
export function Dialog({ open, onClose, labelledBy, initialFocus, panelClassName = "", children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      initialFocus?.current?.focus();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && el.open) {
      el.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open, initialFocus]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto max-h-dvh max-w-none overflow-visible bg-transparent p-[clamp(0px,2.4vw,40px)] text-charcoal backdrop:bg-[rgb(20_22_21/0.72)] open:flex open:items-center open:justify-center"
    >
      {open ? <div className={`max-h-[calc(100dvh-2*clamp(0px,2.4vw,40px))] overflow-auto bg-white ${panelClassName}`}>{children}</div> : null}
    </dialog>
  );
}
