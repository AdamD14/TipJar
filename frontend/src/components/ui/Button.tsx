"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import clsx from "clsx";

/**
 * Button — TipJar+ Design System (system.md §2.1)
 *
 * Variants:
 *  primary    — gold CTA  (#FFD700 bg, #003737 text — WCAG AAA)
 *  secondary  — purple/gold outline
 *  ghost      — transparent, white text
 *  danger     — destructive action
 *  link       — text-only, gold underline on hover
 *  glass      — glassmorphism surface
 *
 * Sizes (8-pt grid):
 *  sm  — 40px height, 16px padding-x
 *  md  — 48px height, 24px padding-x  (default)
 *  lg  — 56px height, 32px padding-x
 *
 * Touch target: "sm" uses a pseudo-element to hit 44px minimum.
 */

/* ── Inline spinner (matches Spinner.tsx gradient look, small size) ── */
function ButtonSpinner({ dark }: { dark?: boolean }) {
  return (
    <svg
      className="animate-[spin_1.5s_linear_infinite]"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={dark ? "rgba(0,55,55,0.25)" : "rgba(255,255,255,0.2)"}
        strokeWidth="3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={dark ? "#003737" : "#ffffff"}
        strokeWidth="3"
        strokeLinecap="round"
        className="animate-dash"
      />
    </svg>
  );
}

/* ─────────────────── Types ─────────────────── */

type Variant =
  | "primary"   // gold CTA
  | "secondary" // purple outline
  | "ghost"     // transparent
  | "danger"    // destructive
  | "link"      // text-only
  | "glass"     // glassmorphism
  // legacy aliases — kept for backward compat
  | "gold"
  | "solid"
  | "outline";

type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

export type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkButtonProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    prefetch?: boolean;
  };

type Props = ButtonProps | LinkButtonProps;

/* ─────────────────── Component ─────────────────── */

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      leftIcon,
      rightIcon,
      loading = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const isLink = "href" in rest && !!rest.href;

    /* ── Base (shared across all variants) ── */
    const base = clsx(
      // layout
      "inline-flex items-center justify-center gap-2",
      "font-heading font-semibold select-none",
      "transition-all duration-200",
      // focus ring — system.md: --border-focus (purple-300)
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d4edd] focus-visible:ring-offset-2 focus-visible:ring-offset-[#001f1f]",
      // disabled
      "disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none",
      // full width
      fullWidth && "w-full",

      /* ── Sizes (8-pt grid) ── */
      {
        // Small: 40px height, 44px touch area via relative + ::before
        "relative h-10 px-4 text-sm rounded-[8px] before:absolute before:inset-[-2px] before:content-['']":
          size === "sm",
        // Medium: 48px (default)
        "h-12 px-6 text-base rounded-[8px]": size === "md",
        // Large: 56px
        "h-14 px-8 text-lg rounded-[8px]": size === "lg",
      },

      /* ── Variants ── */
      // PRIMARY — gold bg, teal text (WCAG AAA 11.2:1)
      variant === "primary" && [
        "bg-gold-400 text-teal-800",
        "shadow-1",
        "hover:bg-gold-300 hover:shadow-2 hover:-translate-y-0.5",
        "active:bg-gold-500 active:scale-[0.98] active:translate-y-0 active:shadow-1",
        !loading && "active:scale-[0.98]",
      ],

      // GOLD (alias for primary)
      variant === "gold" && [
        "bg-gold-400 text-teal-800",
        "shadow-1",
        "hover:bg-gold-300 hover:shadow-2 hover:-translate-y-0.5",
        "active:bg-gold-500 active:scale-[0.98]",
      ],

      // SECONDARY — purple outline
      (variant === "secondary" || variant === "outline") && [
        "bg-transparent text-purple-300 border border-purple-300",
        "hover:bg-purple-300/10 hover:-translate-y-0.5",
        "active:bg-purple-300/15 active:scale-[0.98] active:translate-y-0",
        "focus-visible:ring-[#9d4edd]",
      ],

      // SOLID (legacy alias) — teal solid
      variant === "solid" && [
        "bg-teal-600 text-white border border-teal-500",
        "hover:bg-teal-500 hover:-translate-y-0.5",
        "active:bg-teal-700 active:scale-[0.98]",
      ],

      // GHOST — transparent, white text
      variant === "ghost" && [
        "bg-transparent text-white",
        "hover:bg-white/10 hover:-translate-y-0.5",
        "active:bg-white/15 active:scale-[0.98]",
      ],

      // DANGER — destructive (system.md §1.4)
      variant === "danger" && [
        "bg-transparent text-[#b00020] border border-[#b00020]/60",
        "hover:bg-[#b00020]/5 hover:-translate-y-0.5",
        "active:bg-[#b00020]/10 active:scale-[0.98]",
        "focus-visible:ring-[#b00020]",
      ],

      // LINK — text only
      variant === "link" && [
        "bg-transparent text-gold-400 h-auto px-0 rounded-none",
        "hover:underline underline-offset-4",
        "active:opacity-70",
      ],

      // GLASS — glassmorphism
      variant === "glass" && [
        "bg-[rgba(0,31,31,0.44)] backdrop-blur-[20px] border border-white/[0.125] text-white",
        "hover:bg-[rgba(0,31,31,0.6)] hover:-translate-y-0.5",
        "active:scale-[0.98]",
      ],

      className,
    );

    const content = (
      <>
        {loading ? (
          <ButtonSpinner dark={variant === "primary" || variant === "gold"} />
        ) : (
          leftIcon
        )}
        {children && (
          <span className={loading ? "opacity-0" : undefined}>{children}</span>
        )}
        {!loading && rightIcon}
      </>
    );

    if (isLink) {
      const { href, prefetch = true, ...linkProps } = rest as LinkButtonProps;
      return (
        <Link
          href={href}
          prefetch={prefetch}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={base}
          {...linkProps}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        className={base}
        disabled={
          (rest as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled ||
          loading
        }
        aria-busy={loading || undefined}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
