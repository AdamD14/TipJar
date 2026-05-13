"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import clsx from "clsx";

/**
 * Button — TipJar+ Design System (design.md §2.1)
 *
 * Variants:
 * primary — gold CTA (--gold-400 bg, --teal-900 text — WCAG AAA)
 * secondary — purple outline (--purple-300)
 * ghost — transparent, white text
 * danger — destructive (--error-base)
 * link — text-only, gold underline on hover
 * glass — glassmorphism surface
 *
 * Sizes (8-pt grid):
 * sm — 40px height, 16px padding-x, 14px font, 16px icon, 8px radius
 * md — 48px height, 24px padding-x, 16px font, 20px icon, 8px radius (default)
 * lg — 56px height, 32px padding-x, 18px font, 24px icon, 8px radius
 *
 * Touch target: "sm" uses a pseudo-element to hit 44px minimum.
 */

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
        stroke={dark ? "rgba(0,31,31,0.25)" : "rgba(255,255,255,0.2)"}
        strokeWidth="3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={dark ? "#001F1F" : "#ffffff"}
        strokeWidth="3"
        strokeLinecap="round"
        className="animate-dash"
      />
    </svg>
  );
}

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "link"
  | "glass"
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

    const base = clsx(
      "inline-flex items-center justify-center gap-2",
      "font-heading font-semibold select-none",
      "transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D194D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#001F1F]",
      "disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none",
      fullWidth && "w-full",

      /* ── Sizes (8-pt grid) — design.md §2.1 ── */
      {
        "relative h-10 px-4 text-[14px] rounded-[8px] before:absolute before:inset-[-2px] before:content-['']":
          size === "sm",
        "h-12 px-6 text-base rounded-[8px]": size === "md",
        "h-14 px-8 text-[18px] rounded-[8px]": size === "lg",
      },

      /* ── Primary — gold bg, teal-900 text (WCAG AAA) — design.md §2.1.2 ── */
      (variant === "primary" || variant === "gold") && [
        "bg-gold-400 text-teal-900",
        "shadow-1",
        "hover:bg-gold-300 hover:shadow-2 hover:-translate-y-0.5",
        "active:bg-gold-500 active:scale-[0.98] active:translate-y-0 active:shadow-1",
      ],

      /* ── Secondary — purple outline — design.md §2.1.3 ── */
      (variant === "secondary" || variant === "outline") && [
        "bg-transparent text-purple-300 border border-purple-300",
        "hover:bg-[rgba(77,25,77,0.1)] hover:-translate-y-0.5",
        "active:bg-[rgba(77,25,77,0.15)] active:scale-[0.98] active:translate-y-0",
        "focus-visible:ring-[#4D194D]",
      ],

      /* ── Solid (legacy alias) — teal solid ── */
      variant === "solid" && [
        "bg-teal-600 text-white border border-teal-500",
        "hover:bg-teal-500 hover:-translate-y-0.5",
        "active:bg-teal-700 active:scale-[0.98]",
      ],

      /* ── Ghost — transparent, teal-25 text ── */
      variant === "ghost" && [
        "bg-transparent text-teal-25",
        "hover:bg-white/10 hover:-translate-y-0.5",
        "active:bg-white/15 active:scale-[0.98]",
      ],

      /* ── Danger — destructive — design.md §2.1.4 ── */
      variant === "danger" && [
        "bg-transparent text-error-base border border-error-base/60",
        "hover:bg-[rgba(255,82,82,0.1)] hover:-translate-y-0.5",
        "active:bg-[rgba(255,82,82,0.15)] active:scale-[0.98]",
        "focus-visible:ring-[#FF5252]",
      ],

      /* ── Link — text only ── */
      variant === "link" && [
        "bg-transparent text-gold-400 h-auto px-0 rounded-none",
        "hover:underline underline-offset-4",
        "active:opacity-70",
      ],

      /* ── Glass — glassmorphism ── */
      variant === "glass" && [
        "bg-[rgba(0,31,31,0.44)] backdrop-blur-[20px] border border-white/[0.125] text-teal-25",
        "hover:bg-[rgba(0,31,31,0.6)] hover:-translate-y-0.5",
        "active:scale-[0.98]",
      ],

      /* ── Disabled overrides — design.md §2.1.2 ── */
      "disabled:bg-teal-850 disabled:text-teal-200 disabled:border-none disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:bg-teal-850",

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
