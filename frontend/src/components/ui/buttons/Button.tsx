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

type Variant = "primary" | "secondary" | "tertiary" | "ghost" | "danger" | "link" | "glass";
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

const GRADIENT_VARIANTS = new Set(["primary", "secondary", "tertiary"]);

// KINEMATYKA OKLCH (Redystrybucja pigmentu z Twoich nowych slajdów)
const variantClasses: Record<Variant, string> = {
  primary: clsx(
    "text-teal-800 ",
    // Ucieczka od marchewki: startujemy z luksusowego, ciemnego bursztynu (#cc5500)
   "bg-[linear-gradient(in_oklch_115deg,#ff8f00_0%,#ffd700_25%,#ffe100_96%,var(--gold-50)_100%)]",
  // ANATOMIA TRÓJWYMIARU: 
   // 1. inset 0 1px -> jasna niteczka światła na górnej krawędzi
   // 2. inset 0 -2px -> Twoja "druga linia" (ostry, fizyczny ciemny rant na dole)+   // 3. inset 0 -5px -> miękkie cieniowanie bryły od dołu
   // 4. na końcu klasyczny, lekki cień zewnętrzny, żeby przycisk "wisiał" nad tłem
   "shadow-[inset_0_1px_0px_rgba(255,255,255,0.45),inset_0_-3px_1px_rgba(120,35,0,0.5),inset_0_-5px_8px_rgba(120,35,0,0.25),0_4px_12px_rgba(0,0,0,0.3)]",
  // Przeorganizowanie jasności na hover, żeby zachować głębię rantu
    "hover:brightness-[1.1] ",
    "focus-visible:ring-gold-400/70",
  ),secondary: clsx(
    "text-white font-bold tracking-tight",
    // Przestrzeń OKLCH eliminuje siwiznę na przejściu ciemny fiolet -> jasny fiolet
    "bg-[linear-gradient(in_oklch_110deg,var(--color-purple-500)_0%,var(--color-purple-300)_50%,var(--color-purple-100)_100%)]",
    
    // ANATOMIA WTOPIONEGO SZKŁA (Organic Głębia):
    // 1. inset 0 1px -> cieniutka niteczka fioletowo-różowego światła na górze (pasuje do bazy)
    // 2. inset 0 4px 10px -> wewnętrzny cień (Ambient Occlusion) dający mięsistą głębię w środku
    // 3. inset 0 -3px 1px -> głęboki, fioletowo-czarny fizyczny rant na dole (zamiast brązu)
    // 4. Na końcu REALNY, głęboki cień zewnętrzny z domieszką czerni tealu, wtapiający bryłę w tło
    "shadow-[inset_0_1px_0px_rgba(232,121,249,0.4),inset_0_4px_10px_rgba(0,0,0,0.25),inset_0_-3px_1px_rgba(43,15,43,0.7),inset_0_-5px_8px_rgba(0,0,0,0.3),0_4px_14px_rgba(0,15,15,0.5)]",
    
    "hover:brightness-[1.1]",
    "focus-visible:ring-purple-300/70",

    // Harmonia systemu: sprężynujący tekst 1.05x na hover (taki sam jak w primary)
    "[&>span]:transition-transform [&>span]:duration-[300ms] [&>span]:[transition-timing-function:var(--ease-spring)]",
    
  ),
  
  tertiary: clsx(
    "text-white",
    // Przestrzeń OKLCH dla czystego, głębokiego tealu
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
    // Klasyczna struktura Liquid Glass z Twojego systemu
    "bg-[rgba(0,31,31,0.44)] backdrop-blur-[20px] border border-white/[0.125] text-teal-25",
    "hover:bg-[rgba(0,31,31,0.6)] hover:border-white/20",
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

    const base = clsx(
      "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
      "font-heading font-semibold select-none",
      "transform-gpu will-change-transform",
      
      // INERCJA MASY: Płynna mechanika sprężyny zamiast linearnego ease
      "transition-all duration-[300ms] [transition-timing-function:var(--ease-spring)]",
      "hover:-translate-y-0.5 hover:shadow-2",
      "active:scale-[0.96] active:translate-y-0",
      
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app",
      "disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
      fullWidth && "w-full",

      {
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
        {/* LASEROWY REFLEKS (Procedural Sheen ze slajdu 1 i 5) */}
        {isGradient && !loading && (
          <span 
            className="pointer-events-none absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] -translate-x-[140%] group-hover:animate-sheen" 
            aria-hidden="true"
          />
        )}
        
        {loading ? <ButtonSpinner dark={variant === "primary"} /> : leftIcon}
       {/* WARSTWA TEKSTOWA I NITEczKA ŚWIATŁA (Jubilerstowo Interfejsu) */}
       <span className={clsx("relative inline-flex flex-col items-center", loading && "opacity-0 transition-opacity")}>
         {/* Główny napis */}
         {children}
         
         {/* Twoja niteczka: Błysk 1px #ffe100 bezpośrednio pod napisem */}
         {variant === "primary" && (
          <span 
             className="absolute bottom-0 w-[95%] h-[1px] bg-gold-100 saturate-[200%] blur-[2px] translate-y-[2px]" 
             aria-hidden="true"
           />
         )}
       </span>
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