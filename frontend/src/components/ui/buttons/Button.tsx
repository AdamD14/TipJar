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
        stroke={dark ? "var(--teal-900)" : "#ffffff"}
        strokeWidth="3"
        strokeLinecap="round"
        className="animate-dash"
      />
    </svg>
  );
}

type Variant = "primary" | "secondary" | "tertiary" | "ghost" | "danger" | "link" | "glass" | "cta-gold-01" | "cta-gold-02" | "cta-gold-03" | "cta-gold-04";
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

const GRADIENT_VARIANTS = new Set(["primary", "secondary", "tertiary", "cta-gold-01", "cta-gold-02", "cta-gold-03", "cta-gold-04"]);


const variantClasses: Record<Variant, string> = {
  primary: clsx(
    "text-teal-800 ",
   "bg-[linear-gradient(in_oklch_115deg,#ff8f00_0%,#ffd700_25%,#ffe100_96%,var(--gold-50)_100%)]",
   "shadow-[inset_0_1px_0px_rgba(255,255,255,0.45),inset_0_-3px_1px_rgba(120,35,0,0.5),inset_0_-5px_8px_rgba(120,35,0,0.25),0_4px_12px_rgba(0,0,0,0.3)]",
    "hover:brightness-[1.1] ",
    "focus-visible:ring-gold-400/70",
  ),secondary: clsx(
    "text-white font-bold tracking-tight",
     "bg-[linear-gradient(in_oklch_110deg,var(--color-purple-500)_0%,var(--color-purple-300)_50%,var(--color-purple-100)_100%)]",
     "shadow-[inset_0_1px_0px_rgba(232,121,249,0.4),inset_0_4px_10px_rgba(0,0,0,0.25),inset_0_-3px_1px_rgba(43,15,43,0.7),inset_0_-5px_8px_rgba(0,0,0,0.3),0_4px_14px_rgba(0,15,15,0.5)]",
     "hover:brightness-[1.1]",
     "focus-visible:ring-purple-300/70",
     "[&>span]:transition-transform [&>span]:duration-[300ms] [&>span]:[transition-timing-function:var(--ease-spring)]",
    
  ),
  
  tertiary: clsx(
    "text-white",
    "bg-[linear-gradient(in_oklch_110deg,var(--color-teal-800)_0%,var(--color-teal-500)_50%,var(--color-teal-300)_100%)]",
    "hover:brightness-[1.15]",
    "focus-visible:ring-teal-400/70",
  ),
  ghost: clsx(
    "bg-transparent text-teal-25 text-lg",
    "hover:bg-white/10 hover:brightness-[1.15]",
  ),
  danger: clsx(
    "bg-transparent text-error-base border border-error-base/60",
    "hover:bg-[rgba(255,82,82,0.1)]",
  ),
  link: clsx(
    "bg-transparent text-gold-400 h-auto px-0 rounded-none shadow-none border-none",
    "hover:underline underline-offset-4",
  ),
  glass: clsx(
    "bg-[rgba(0,31,31,0.44)] backdrop-blur-[20px] border border-white/[0.125] text-teal-25",
    "hover:bg-[rgba(0,31,31,0.6)] hover:border-white/20",
  ),
  "cta-gold-01": clsx(
    "cta-gold cta-gold-01",
    "h-14 px-9 text-xl rounded-[var(--radius-md)]",
  ),
  "cta-gold-02": clsx(
    "cta-gold cta-gold-02",
    "h-14 px-9 text-xl rounded-[var(--radius-md)]",
  ),
  "cta-gold-03": clsx(
    "cta-gold cta-gold-03",
    "h-14 px-9 text-xl rounded-[var(--radius-md)]",
  ),
  "cta-gold-04": clsx(
    "cta-gold cta-gold-04",
    "h-14 px-9 text-xl rounded-[var(--radius-lg)]",
  ),
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (
    {
      variant = "primary",
      size = "lg",
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
    const isGradient = GRADIENT_VARIANTS.has(variant);

  const isCtaGold = variant.startsWith("cta-gold");

  const base = clsx(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
    "font-heading font-semibold select-none",
    "transform-gpu will-change-transform",
    "transition-all duration-[300ms] [transition-timing-function:var(--ease-spring)]",
    isCtaGold
      ? "hover:-translate-y-0.5"
      : "hover:-translate-y-0.5 hover:shadow-2",
    isCtaGold
      ? "active:scale-[0.975] active:translate-y-[2px]"
      : "active:scale-[0.96] active:translate-y-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
    fullWidth && "w-full",
    !isCtaGold && {
      "h-8 px-4 text-sm rounded-[8px]": size === "sm",
      "h-10 px-5 text-base rounded-[8px]": size === "md",
      "h-14 px-6 text-xl rounded-[10px]": size === "lg",
    },
    variantClasses[variant],
    isGradient && "isolate",
    className,
  );

  const content = (
    <>
      {isGradient && !isCtaGold && !loading && (
        <span
          className="pointer-events-none absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] -translate-x-[140%] group-hover:animate-sheen"
          aria-hidden="true"
        />
      )}

      {loading ? <ButtonSpinner dark={variant === "primary"} /> : leftIcon}
      {isCtaGold ? (
        <span className={clsx("cta-gold-text relative", loading && "opacity-0 transition-opacity")}>
          {children}
        </span>
      ) : (
        <span className={clsx("relative inline-flex flex-col items-center", loading && "opacity-0 transition-opacity")}>
          {children}
          {variant === "primary" && (
            <span
              className="absolute bottom-0 w-[95%] h-[1px] bg-gold-100 saturate-[200%] blur-[2px] translate-y-[2px]"
              aria-hidden="true"
            />
          )}
        </span>
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
        disabled={(rest as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled || loading}
        aria-busy={loading || undefined}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;