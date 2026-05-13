"use client";

import type { ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Card — TipJar+ Design System (design.md §3.1)
 *
 * Base:
 * - background: --bg-surface-base (teal-800)
 * - padding: 24px
 * - border-radius: 12px ("Friendly Modern")
 * - border: 1px solid rgba(255,255,255,0.05)
 * - shadow: --shadow-1
 *
 * Hover (when `interactive`):
 * - translateY(-6px)
 * - --shadow-2 + gold glow (rgba(255,215,0,0.1))
 * - transition: 200ms ease-standard
 *
 * Variants:
 * base — standard card (teal-800)
 * elevated — teal-700 background (card on card)
 * modal — matches modal surface (teal-800)
 */

type CardVariant = "base" | "elevated" | "modal";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
  variant?: CardVariant;
  noPadding?: boolean;
  className?: string;
}

const BG: Record<CardVariant, string> = {
  base: "bg-teal-800",
  elevated: "bg-teal-700",
  modal: "bg-teal-800",
};

export default function Card({
  children,
  interactive = false,
  variant = "base",
  noPadding = false,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={clsx(
        BG[variant],
        "rounded-lg border border-white/[0.05]",
        "shadow-1",
        !noPadding && "p-6",
        interactive && [
          "transition-all duration-200 ease-standard",
          "cursor-pointer",
          "hover:-translate-y-1.5",
          "hover:shadow-2",
          "hover:shadow-gold-glow",
        ],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
