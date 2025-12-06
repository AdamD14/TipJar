"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { forwardRef } from "react";

// Twój spinner – zostawiam taki jaki miałeś, tylko z propsem className
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={clsx("animate-spin", className || "h-4 w-4")}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────

type Variant =
  | "primary"
  | "gold"
  | "solid"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "link";

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

// Button (bez href)
type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

// Link (z href)
type LinkProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    prefetch?: boolean;
  };

type Props = ButtonProps | LinkProps;

// ──────────────────────────────────────────────────────────────

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
    ref
  ) => {
    const isLink = "href" in rest && !!rest.href;

    const base = clsx(
      "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/60",
      "select-none disabled:opacity-60 disabled:cursor-not-allowed",
      "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
      fullWidth && "w-full",
      // rozmiary
      {
        "h-9 px-3 text-sm": size === "sm",
        "h-11 px-4 text-base": size === "md",
        "h-12 px-6 text-lg": size === "lg",
      },
      // warianty
      {
        // primary – złoty
        "bg-[#FFD700] text-[#003737] hover:brightness-110 active:brightness-95 shadow-lg shadow-[#FFD700]/20":
          variant === "primary",

        // gold – gradient
        "bg-gradient-to-r from-[#FFD700] via-[#ffde50] to-[#b38f00] text-black hover:from-[#b38f00] hover:via-[#FFD700] hover:to-[#ffde50] ring-1 ring-black/10 shadow-lg":
          variant === "gold",

        // solid – ciemny turkus
        "bg-[#166060] text-white hover:bg-[#1a7373] active:bg-[#145252] shadow-lg shadow-[#166060]/20":
          variant === "solid",

        "border border-white/20 text-white hover:bg-white/10 active:bg-white/15":
          variant === "secondary",

        "border border-white/20 text-white hover:bg-white/5 active:bg-white/10":
          variant === "outline",

        "text-white hover:bg-white/10 active:bg-white/15":
          variant === "ghost",

        "bg-red-600 text-white hover:bg-red-500 active:bg-red-700 shadow-lg shadow-red-600/20":
          variant === "danger",

        "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 active:bg-white/25":
          variant === "glass",

        "text-[#FFD700] hover:underline underline-offset-4":
          variant === "link",
      },
      className
    );

    const content = (
      <>
        {loading ? <Spinner className="h-4 w-4" /> : leftIcon}
        {children && <span>{children}</span>}
        {rightIcon}
      </>
    );

    // ───── LINK (poprawny sposób w Next.js App Router) ─────
    if (isLink) {
      const { href, prefetch = true, ...linkProps } = rest as LinkProps;

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

    // ───── BUTTON ─────
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={base}
        disabled={rest.disabled || loading}
        aria-busy={loading || undefined}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;