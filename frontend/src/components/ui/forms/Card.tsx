"use client";

import type { ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Card — TipJar+ Design System (design.md §3.1)
 *
 * Base:
 * - background: --teal-700 (#004545)
 * - padding: 24px (p-6)
 * - border-radius: 12px (rounded-xl)
 * - border: 1px solid rgba(255,255,255,0.1)
 * - inner-shadow: inset 0 1px 2px rgba(0,0,0,0.2)
 * - backdrop-filter: blur(20px)
 * - shadow (rest): 0 4px 6px -1px rgba(0,0,0,0.5)
 *
 * Hover (when `interactive`):
 * - background: --teal-600 (#005959)
 * - translateY(-6px)
 * - Double box-shadow: 0 20px 25px -5px rgba(0,0,0,0.6), 0 0 10px rgba(252,194,1,0.1)
 * - Glow pseudo-element (::before) with linear-gradient + blur(10px)
 * - transition: 300ms --ease-premium (cubic-bezier(0.25, 0.8, 0.25, 1))
 *
 * Focus:
 * - box-shadow: 0 0 0 1px #FFD700, 0 0 0 4px rgba(255,215,0,0.25)
 *
 * Hardware acceleration: transform: translateZ(0)
 *
 * Variants:
 * base — standard card (teal-700)
 * elevated — teal-600 background (card on card)
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
  base: "bg-teal-700",
  elevated: "bg-teal-600",
  modal: "bg-teal-800",
};

const HOVER_BG: Record<CardVariant, string> = {
  base: "hover:bg-teal-600",
  elevated: "hover:bg-teal-500",
  modal: "hover:bg-teal-700",
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
        // Base card surface
        BG[variant],
        "relative overflow-hidden",
        "rounded-xl",
        "border border-white/10",
        "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)]",
        // Backdrop blur for glassmorphism
        "backdrop-blur-[20px]",
        // Inner shadow for depth
        "[box-shadow:inset_0_1px_2px_rgba(0,0,0,0.2),0_4px_6px_-1px_rgba(0,0,0,0.5)]",
        // Padding
        !noPadding && "p-6",
        // Hardware acceleration
        "[transform:translateZ(0)]",
        // Interactive states
        interactive && [
          "cursor-pointer",
          "transition-all duration-300 [transition-timing-function:cubic-bezier(0.25,0.8,0.25,1)]",
          HOVER_BG[variant],
          "hover:-translate-y-1.5",
          "hover:[box-shadow:inset_0_1px_2px_rgba(0,0,0,0.2),0_20px_25px_-5px_rgba(0,0,0,0.6),0_0_10px_rgba(252,194,1,0.1)]",
          "focus-visible:outline-none",
          "focus-visible:[box-shadow:0_0_0_1px_#FFD700,0_0_0_4px_rgba(255,215,0,0.25)]",
        ],
        className,
      )}
      {...rest}
    >
      {children}
      {/* Glow pseudo-element for interactive cards */}
      {interactive && (
        <span
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 [transition-timing-function:cubic-bezier(0.25,0.8,0.25,1)] group-hover:opacity-100 peer-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, #FFD700 0%, #3FB5B5 40%, #FFD700 100%)",
            filter: "blur(10px)",
            margin: "-2px",
            borderRadius: "14px",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
