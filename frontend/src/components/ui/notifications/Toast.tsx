"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import clsx from "clsx";

/**
 * Toast / Snackbar — TipJar+ Design System (design.md §3.4)
 *
 * Types: success | error | info | warning
 * - role="alert" for error + warning (intrusive, screen-reader interrupts)
 * - role="status" for success + info (polite)
 *
 * Position:
 * - Desktop (≥640px): bottom-right, slide in from right
 * - Mobile (<640px): top, slide in from top + safe-area
 *
 * Duration: 4 000 ms, paused on hover.
 * Dismiss: auto-timeout | swipe | Escape | ✕ button
 *
 * Accent colors (design.md §3.4):
 * success → --success-base (#00E676)
 * error   → --error-base   (#FF5252)
 * info    → --info-base     (#66D9E8)
 * warning → --warning-base  (#FF9100)
 */

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessage {
  id: number;
  type: ToastType;
  text: string;
  duration?: number;
}

type PushFn = (m: Omit<ToastMessage, "id">) => void;
let pushGlobal: PushFn | null = null;

export function useToast() {
  return {
    push: (m: { type: ToastType; text: string; duration?: number }) =>
      pushGlobal?.(m),
    success: (text: string, duration?: number) =>
      pushGlobal?.({ type: "success", text, duration }),
    error: (text: string, duration?: number) =>
      pushGlobal?.({ type: "error", text, duration }),
    info: (text: string, duration?: number) =>
      pushGlobal?.({ type: "info", text, duration }),
    warning: (text: string, duration?: number) =>
      pushGlobal?.({ type: "warning", text, duration }),
  };
}

const TOAST_CONFIG: Record<
  ToastType,
  { accent: string; icon: string; role: "alert" | "status" }
> = {
  success: { accent: "var(--success-base)", icon: "✓", role: "status" },
  error: { accent: "var(--error-base)", icon: "✕", role: "alert" },
  info: { accent: "var(--info-base)", icon: "ℹ", role: "status" },
  warning: { accent: "var(--warning-base)", icon: "⚠", role: "alert" },
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastMessage;
  onDismiss: (id: number) => void;
}) {
  const cfg = TOAST_CONFIG[toast.type];
  const duration = toast.duration ?? 4000;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onDismiss(toast.id), 200);
  }, [onDismiss, toast.id]);

  const startTimer = useCallback(() => {
    timerRef.current = setTimeout(dismiss, duration);
  }, [dismiss, duration]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startTimer]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dismiss]);

  return (
    <div
      role={cfg.role}
      aria-live={cfg.role === "alert" ? "assertive" : "polite"}
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
      className={clsx(
        "flex items-center gap-3",
        "bg-teal-800",
        "text-text-ds-primary",
        "px-4 py-[14px]",
        "rounded-lg",
        "shadow-toast",
        "border border-white/[0.1]",
        "max-w-[400px] w-full",
        "pointer-events-auto",
        "transition-[opacity,transform] duration-200 ease-standard",
        exiting && "opacity-0 scale-[0.96]",
      )}
    >
      <div
        aria-hidden="true"
        className="w-[3px] self-stretch rounded-sm flex-shrink-0"
        style={{ background: cfg.accent }}
      />

      <span
        aria-hidden="true"
        className="text-base font-bold leading-none flex-shrink-0"
        style={{ color: cfg.accent }}
      >
        {cfg.icon}
      </span>

      <span className="flex-1 text-sm font-body leading-relaxed text-text-ds-secondary">
        {toast.text}
      </span>

      <button
        onClick={dismiss}
        aria-label="Zamknij powiadomienie"
        className={clsx(
          "bg-transparent border-none cursor-pointer",
          "text-teal-600",
          "text-lg leading-none p-0.5 flex-shrink-0",
          "transition-colors duration-200",
          "hover:text-text-ds-primary",
        )}
      >
        ×
      </button>
    </div>
  );
}

export default function ToastHost() {
  const [queue, setQueue] = useState<ToastMessage[]>([]);

  useEffect(() => {
    pushGlobal = (m) =>
      setQueue((s) => [...s, { id: Date.now() + Math.random(), ...m }]);
    return () => {
      pushGlobal = null;
    };
  }, []);

  const dismiss = useCallback((id: number) => {
    setQueue((s) => s.filter((t) => t.id !== id));
  }, []);

  if (queue.length === 0) return null;

  return (
    <>
      {/* Desktop: bottom-right (design.md §3.4) */}
      <div
        aria-live="polite"
        className={clsx(
          "hidden sm:flex",
          "fixed bottom-6 right-6",
          "z-toast",
          "flex-col gap-[10px]",
          "pointer-events-none",
        )}
      >
        {queue.map((t) => (
          <div key={t.id} className="animate-toast-desktop">
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>

      {/* Mobile: top + safe-area (design.md §3.4) */}
      <div
        aria-live="polite"
        className={clsx(
          "flex sm:hidden",
          "fixed left-4 right-4",
          "z-toast",
          "flex-col gap-[10px]",
          "pointer-events-none",
        )}
        style={{ top: "calc(24px + env(safe-area-inset-top))" }}
      >
        {queue.map((t) => (
          <div key={t.id} className="animate-toast-mobile">
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </>
  );
}
