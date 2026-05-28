"use client";

import type { ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";


type BoxVariant = "base" | "premium" |"purple" | "modal";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
  variant?: BoxVariant;
  noPadding?: boolean;
  className?: string;
  hasArc?: boolean; // DODANE: nowa opcja sterowania kształtem
}

const BG: Record<BoxVariant, string> = {
  base: "bg-[linear-gradient(in_oklch_110deg,var(--teal-900),var(--teal-300))]",
  premium: "bg-[linear-gradient(in_oklch_110deg,#f88008_0%,#f8b000_60%,#ffd700_95%,var(--gold-50)_100%)]",
  purple:"bg-[linear-gradient(in_oklch_110deg,var(--color-surface-app)_0%,var(--color-border-focus)_70%,var(--color-text-primary)_97%,var(--color-text-primary)_100%)]",
  modal: "bg-[linear-gradient(in_oklch_115deg,var(--teal-800)_0%,var(--teal-600)_50%,var(--teal-500)_100%)]",
};

const HOVER_BG: Record<BoxVariant, string> = {
  base: "hover:bg-teal-600",
  premium: "hover:bg-gold-600",
  purple: "hover:bg-purple-400",
  modal: "hover:bg-teal-700",
};

export function Box({
  children,
  interactive = false,
  variant = "base",
  noPadding = false,
  className,
  hasArc = false, // DODANE: domyślnie róg NIE jest ścięty
  ...rest
}: BoxProps) {
  return (
    <>
      {/* Kod SVG wyrenderuje się TYLKO gdy hasArc jest na true */}
    {hasArc && (
      <svg width="0" height="0" className="absolute">
       <defs>
          <clipPath id="arc-mask" clipPathUnits="objectBoundingBox">
           <path d="M 0,0 L 0.85,0 Q 0.9,0 0.93,0.05 L 1,0.15 L 1,1 L 0,1 Z" />
           </clipPath>
        </defs>
      </svg>
     )}
    <div
      className={clsx(
        // Base box surface
      "group",
        BG[variant],
        "relative overflow-hidden",
        "rounded-[20px]",
        "border border-white/10",
        "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)]",
        // Klasa wycinająca wskoczy do Tailwinda TYLKO gdy hasArc jest na true
       hasArc && "[clip-path:url(#arc-mask)]",
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
          "transition-all duration-[350ms] [transition-timing-function:var(--ease-spring)]",
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
        {/* DODANE: Wektorowe linie tła (Topologia Connection ze slajdu 13) */}
    <svg       className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]"
      viewBox="0 0 100 100"
       preserveAspectRatio="none"
     >
       {/* Linie tworzące konstelację sieci */}
       <path
         d="M 10,20 L 35,45 L 75,25 L 95,60 M 35,45 L 50,85 L 75,25 M 50,85 L 85,75 M 10,20 L 50,85"
         fill="none"
         stroke="var(--teal-50)"
         strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
     {/* Małe węzły (kropki na złączeniach linii) */}
      <circle cx="35" cy="45" r="1" fill="var(--teal-100)" />
      <circle cx="75" cy="25" r="1" fill="var(--teal-100)" />
      <circle cx="50" cy="85" r="1" fill="var(--teal-100)" />
    </svg>
      {children}
      {/* NOWY ŚWIAT: Wektorowa ramka oświetleniowa (Slajd 4) */}
     {/* Opacity zmienia się płynnie na hover dzięki płynnemu transition (GPU) */}
    <svg 
       className="absolute inset-0 w-full h-full pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-100" 
       viewBox="0 0 100 100" 
       preserveAspectRatio="none"
     >
      <path 
        d={hasArc 
           ? "M 0,0 L 85,0 Q 90,0 93,5 L 100,15 L 100,100 L 0,100 Z" // Ramka dla ściętej karty
           : "M 0,0 L 100,0 L 100,100 L 0,100 Z"                  // Ramka dla zwykłej karty
         } 
        fill="none" 
         // Podpinamy kolor oświetlenia w zależności od wariantu
         stroke={variant === "premium" ? "var(--gold-400)" : "var(--teal-300)"} 
         strokeWidth="1"
         vectorEffect="non-scaling-stroke"
       />
     </svg>
    </div>
    </>
  );
}
