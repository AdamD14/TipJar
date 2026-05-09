import type { ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Card — TipJar+ Design System (system.md §3.1)
 *
 * Base:
 *  - background: --bg-surface-base (#003737)
 *  - padding: 24px
 *  - border-radius: 12px ("Friendly Modern")
 *  - border: 1px solid rgba(255,255,255,0.05)
 *  - shadow: --shadow-1
 *
 * Hover (when `interactive`):
 *  - translateY(-6px)
 *  - --shadow-2 + gold glow (rgba(252,194,1,0.1))
 *  - transition: 200ms ease-standard
 *
 * Variants:
 *  base        — standard card
 *  elevated    — teal-700 background (card on card)
 *  modal       — matches modal surface
 */

type CardVariant = "base" | "elevated" | "modal";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Enables hover lift + gold glow animation */
  interactive?: boolean;
  /** Visual variant */
  variant?: CardVariant;
  /** Remove default padding */
  noPadding?: boolean;
  className?: string;
}

const BG: Record<CardVariant, string> = {
  base:     "bg-teal-800",      // #003737
  elevated: "bg-teal-700",      // #004545
  modal:    "bg-teal-800",      // #003737
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
        // base styles
        BG[variant],
        "rounded-lg border border-white/[0.05]",
        "shadow-1",
        !noPadding && "p-6",

        // interactive hover (system.md §3.1)
        interactive && [
          "transition-all duration-200",
          "ease-standard",          // custom easing from tailwind.config
          "cursor-pointer",
          "hover:-translate-y-1.5", // ≈ translateY(-6px)
          "hover:shadow-2",
          "hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6),0_0_10px_rgba(252,194,1,0.1)]",
        ],

        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
