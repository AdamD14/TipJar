"use client";

import {
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import clsx from "clsx";

/**
 * Modal — TipJar+ Design System (design.md §3.2)
 *
 * Desktop (≥640px):
 * - max-width: 600px (forms), 400px (confirmations)
 * - background: --bg-surface-modal (teal-800)
 * - border-radius: 16px
 * - padding: 24px
 * - shadow: --shadow-modal
 * - backdrop: rgba(0,31,31,0.85) + blur(4px)
 * - z-index: --z-modal (1000)
 * - heading: Mukta Malar Bold, 24px, teal-25 or gold-400
 *
 * Mobile (<640px) — Bottom Sheet:
 * - fixed; bottom:0; left:0; right:0
 * - height: 85vh
 * - border-radius: 16px 16px 0 0
 * - drag handle: 40×4px, border-subtle, centered
 * - close: swipe-down or X button
 * - entry animation: slide-up 400ms ease-enter
 */

type ModalSize = "form" | "confirm";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  title?: string;
  className?: string;
}

const MAX_W: Record<ModalSize, string> = {
  form: "max-w-[600px]",
  confirm: "max-w-[400px]",
};

export default function Modal({
  children,
  open,
  onClose,
  size = "form",
  title,
  className,
  ...rest
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEscape);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = prev;
    };
  }, [open, handleEscape]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleDragStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
  };

  const handleDragMove = (e: React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    if (delta > 60 && contentRef.current) {
      onClose();
      dragStartY.current = null;
    }
  };

  const handleDragEnd = () => {
    dragStartY.current = null;
  };

  if (!open) return null;

  return (
    <>
      {/* Desktop (≥640px) — centered dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={handleBackdropClick}
        className={clsx(
          "hidden sm:fixed sm:inset-0 sm:flex sm:items-center sm:justify-center",
          "z-modal",
          "bg-[rgba(0,31,31,0.85)]",
          "backdrop-blur-[4px]",
          "animate-fade-in",
          className,
        )}
      >
        <div
          ref={contentRef}
          className={clsx(
            MAX_W[size],
            "w-full mx-6",
            "bg-teal-800",
            "rounded-xl",
            "p-6",
            "shadow-modal",
            "border border-white/[0.05]",
            "animate-slide-down",
          )}
          {...rest}
        >
          {title && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl font-bold text-text-ds-primary">
                {title}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-teal-100 hover:text-text-ds-primary transition-colors duration-200 text-xl leading-none p-1"
              >
                ×
              </button>
            </div>
          )}
          {!title && (
            <div className="flex justify-end mb-2">
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-teal-100 hover:text-text-ds-primary transition-colors duration-200 text-xl leading-none p-1"
              >
                ×
              </button>
            </div>
          )}
          {children}
        </div>
      </div>

      {/* Mobile (<640px) — Bottom Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={clsx(
          "fixed inset-0 sm:hidden",
          "z-modal",
          "bg-[rgba(0,31,31,0.85)]",
          "backdrop-blur-[4px]",
          "animate-fade-in",
        )}
        onClick={handleBackdropClick}
      >
        <div
          ref={contentRef}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          className={clsx(
            "fixed bottom-0 left-0 right-0",
            "h-[85vh]",
            "bg-teal-800",
            "rounded-t-xl",
            "p-6",
            "shadow-modal",
            "border-t border-white/[0.05]",
            "animate-slide-up",
            "overflow-y-auto",
          )}
          {...rest}
        >
          {/* Drag handle */}
          <div className="flex justify-center mb-4" aria-hidden="true">
            <div className="w-10 h-1 rounded-full bg-border-subtle" />
          </div>

          {title && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl font-bold text-text-ds-primary">
                {title}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-teal-100 hover:text-text-ds-primary transition-colors duration-200 text-xl leading-none p-1"
              >
                ×
              </button>
            </div>
          )}
          {!title && (
            <div className="flex justify-end mb-2">
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-teal-100 hover:text-text-ds-primary transition-colors duration-200 text-xl leading-none p-1"
              >
                ×
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  );
}
