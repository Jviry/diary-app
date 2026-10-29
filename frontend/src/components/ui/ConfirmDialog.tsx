"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  busy?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  busy = false,
  error,
  onConfirm,
  onClose,
}: ConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, busy, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex animate-fade-in items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      onClick={() => {
        if (!busy) onClose();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md animate-scale-in rounded-2xl border border-line/40 bg-paper p-6 shadow-2xl sm:p-8"
      >
        <h2
          id="confirm-dialog-title"
          className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-primary"
        >
          {title}
        </h2>
        <p
          id="confirm-dialog-description"
          className="mt-2 font-[family-name:var(--font-garamond)] text-[17px] leading-relaxed text-foreground"
        >
          {description}
        </p>
        {error && (
          <p
            role="alert"
            className="mt-3 animate-fade-in rounded-lg bg-blush/70 px-4 py-3 font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-primary"
          >
            {error}
          </p>
        )}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onClose}
            disabled={busy}
            className="focus-ring inline-flex items-center justify-center rounded-xl border border-line px-5 py-2.5 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-foreground transition-colors duration-200 hover:border-primary hover:text-primary disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={cn(
              "focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-white transition-all duration-200 hover:bg-primary-deep active:scale-[0.98] disabled:opacity-50"
            )}
          >
            {busy && <Spinner className="h-3.5 w-3.5" />}
            {busy ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
