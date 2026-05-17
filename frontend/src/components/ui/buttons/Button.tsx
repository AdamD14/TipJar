"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import clsx from "clsx";

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
  | "tertiary"
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
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type LinkButtonProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    prefetch?: boolean;
  };

type Props = ButtonProps | LinkButtonProps;

const GRADIENT_VARIANTS = new Set(["primary", "secondary", "tertiary", "gold"]);

const LEGACY_VARIANT_MAP: Partial<Record<Variant, Variant>> = {
  gold: "primary",
  solid: "tertiary",
  outline: "secondary",
};

const variantClasses = {
  primary: clsx(
    "text-black",
    "bg-[linear-gradient(180deg,#FFE658_0%,#FFD700_40%,#B38F00_100%)]",
    "hover:bg-[linear-gradient(180deg,#FFF085_0%,#FFE331_40%,#C19A00_100%)]",
    "active:bg-[linear-gradient(180deg,#E6C200_0%,#E0B700_38%,#A07600_100%)]",
    "shadow-[0_10px_24px_rgba(0,0,0,0.35)] ring-1 ring-black/10",
    "hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:-translate-y-0.5",
    "active:translate-y-px active:shadow-[0_6px_16px_rgba(0,0,0,0.3)]",
    "focus-visible:ring-gold-400/70 focus-visible:ring-offset-purple-300",
  ),
  secondary: clsx(
    "text-white",
    "bg-[linear-gradient(180deg,#5a2b5a_0%,var(--color-purple-300)_40%,#2b0f2b_100%)]",
    "hover:bg-[linear-gradient(180deg,#7a347a_0%,var(--color-purple-300)_40%,#3a113a_100%)]",
    "active:bg-[linear-gradient(180deg,#541a54_0%,#451245_38%,#2b0f2b_100%)]",
    "shadow-2 ring-1 ring-black/10",
    "hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:-translate-y-0.5",
    "active:translate-y-px active:shadow-[0_6px_16px_rgba(0,0,0,0.3)]",
    "focus-visible:ring-purple-300/70 focus-visible:ring-offset-teal-900",
  ),
  tertiary: clsx(
    "text-white",
    "bg-[linear-gradient(180deg,#0d9488_0%,var(--color-teal-400)_40%,#065f46_100%)]",
    "hover:bg-[linear-gradient(180deg,#14b8a6_0%,var(--color-teal-400)_40%,#047857_100%)]",
    "active:bg-[linear-gradient(180deg,#0f766e_0%,#0d9488_38%,#064e3b_100%)]",
    "shadow-2 ring-1 ring-black/10",
    "hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:-translate-y-0.5",
    "active:translate-y-px active:shadow-[0_6px_16px_rgba(0,0,0,0.3)]",
    "focus-visible:ring-teal-400/70 focus-visible:ring-offset-teal-900",
  ),
  ghost: clsx(
    "bg-transparent text-teal-25",
    "hover:bg-white/10 hover:-translate-y-0.5",
    "active:bg-white/15 active:scale-[0.98]",
  ),
  danger: clsx(
    "bg-transparent text-error-base border border-error-base/60",
    "hover:bg-[rgba(255,82,82,0.1)] hover:-translate-y-0.5",
    "active:bg-[rgba(255,82,82,0.15)] active:scale-[0.98]",
  ),
  link: clsx(
    "bg-transparent text-gold-400 h-auto px-0 rounded-none",
    "hover:underline underline-offset-4",
    "active:opacity-70",
  ),
  glass: clsx(
    "bg-[rgba(0,31,31,0.44)] backdrop-blur-[20px] border border-white/[0.125] text-teal-25",
    "hover:bg-[rgba(0,31,31,0.6)] hover:-translate-y-0.5",
    "active:scale-[0.98]",
  ),
  gold: "",
  solid: "",
  outline: "",
} satisfies Record<Variant, string>;

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
    const resolved = LEGACY_VARIANT_MAP[variant] ?? variant;
    const isLink = "href" in rest && !!rest.href;
    const isGradient = GRADIENT_VARIANTS.has(resolved);

    const base = clsx(
      "group relative inline-flex items-center justify-center gap-2",
      "font-heading font-semibold select-none",
      "transform-gpu will-change-transform",
      "transition-transform transition-colors duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app",
      "disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none",
      fullWidth && "w-full",

      {
        "relative h-10 px-4 text-[14px] rounded-[8px] before:absolute before:inset-[-2px] before:content-['']":
          size === "sm",
"h-12 px-6 text-base rounded-[8px]": size === "md",
      "h-14 px-8 text-[18px] rounded-[8px]": size === "lg",
      },

      variantClasses[resolved],

      isGradient && "isolate",

      "disabled:bg-teal-850 disabled:text-teal-200 disabled:border-none disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:bg-teal-850",

      className,
    );

    const content = (
      <>
        {loading ? <ButtonSpinner dark={resolved === "primary"} /> : leftIcon}
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
