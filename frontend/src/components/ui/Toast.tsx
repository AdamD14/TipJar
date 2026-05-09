"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Toast / Snackbar — TipJar+ Design System (system.md §4)
 *
 * Types: success | error | info | warning
 * - role="alert"  for error + warning  (intrusive, screen-reader interrupts)
 * - role="status" for success + info   (polite)
 *
 * Position:
 * - Desktop (≥640px): bottom-right, slide in from right
 * - Mobile  (<640px):  top, slide in from top + safe-area
 *
 * Duration: 4 000 ms, paused on hover.
 * Dismiss: auto-timeout | swipe | Escape | ✕ button
 */

/* ── Types ── */

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessage {
  id: number;
  type: ToastType;
  text: string;
  duration?: number;
}

/* ── Global imperative API ── */

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

/* ── Visual config (system.md §4.2) ── */

const TOAST_CONFIG: Record<
  ToastType,
  { accent: string; icon: string; role: "alert" | "status" }
> = {
  success: {
    accent: "#34d399", // Emerald
    icon: "✓",
    role: "status",
  },
  error: {
    accent: "#f43f5e", // Rose
    icon: "✕",
    role: "alert",
  },
  info: {
    accent: "#a78bfa", // Violet
    icon: "ℹ",
    role: "status",
  },
  warning: {
    accent: "#fbbf24", // Amber
    icon: "⚠",
    role: "alert",
  },
};

/* ── Individual Toast ── */

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

  // Escape key dismissal
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
      style={{
        /* Base (system.md §4.1) */
        background: "#002f2f",
        color: "#ffffff",
        padding: "14px 16px",
        borderRadius: "12px",
        boxShadow: "0px 8px 24px -4px rgba(0, 0, 0, 0.6)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        maxWidth: "400px",
        width: "100%",
        pointerEvents: "auto",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(0.96)" : undefined,
        transition: "opacity 200ms ease, transform 200ms ease",
        /* Desktop animation class is applied by parent */
      }}
    >
      {/* Accent bar */}
      <div
        aria-hidden="true"
        style={{
          width: "3px",
          alignSelf: "stretch",
          borderRadius: "2px",
          background: cfg.accent,
          flexShrink: 0,
        }}
      />

      {/* Icon */}
      <span
        aria-hidden="true"
        style={{
          fontSize: "16px",
          color: cfg.accent,
          fontWeight: 700,
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {cfg.icon}
      </span>

      {/* Message */}
      <span
        style={{
          flex: 1,
          fontSize: "0.875rem",
          fontFamily: "var(--font-body)",
          lineHeight: 1.5,
          color: "#d6ebeb",
        }}
      >
        {toast.text}
      </span>

      {/* Dismiss button */}
      <button
        onClick={dismiss}
        aria-label="Zamknij powiadomienie"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#5c7a7a",
          fontSize: "18px",
          lineHeight: 1,
          padding: "2px",
          flexShrink: 0,
          transition: "color 200ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#5c7a7a";
        }}
      >
        ×
      </button>
    </div>
  );
}

/* ── Toast Host (mount once in layout) ── */

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
      {/* Desktop: bottom-right (system.md §4.1) */}
      <div
        aria-live="polite"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: "var(--z-toast)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          pointerEvents: "none",
          /* Hidden on mobile via media query below */
        }}
        className="hidden sm:flex"
      >
        {queue.map((t) => (
          <div
            key={t.id}
            style={{
              animation:
                "toast-slide-in-desktop 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
            }}
          >
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>

      {/* Mobile: top with safe-area (system.md §4.1) */}
      <div
        aria-live="polite"
        style={{
          position: "fixed",
          top: `calc(24px + env(safe-area-inset-top))`,
          left: "16px",
          right: "16px",
          zIndex: "var(--z-toast)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          pointerEvents: "none",
        }}
        className="flex sm:hidden"
      >
        {queue.map((t) => (
          <div
            key={t.id}
            style={{
              animation:
                "toast-slide-in-mobile 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
            }}
          >
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </>
  );
}
