"use client";

import type { ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";

type BoxVariant = "base" | "premium" | "purple" | "modal";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
  variant?: BoxVariant;
  noPadding?: boolean;
  className?: string;
  effectLevel?: "minimal" | "standard" | "ultra";
}

const BG: Record<BoxVariant, string> = {
  base: "bg-[linear-gradient(in_oklch_110deg,var(--teal-600)_10%,var(--teal-700)_40%,var(--teal-600)_100%)]",
  premium:
    "bg-[linear-gradient(in_oklch_110deg,var(--gold-600)_0%,var(--gold-400)_40%,var(--gold-300)_65%,var(--gold-500)_100%)]",
  purple:
    "bg-[linear-gradient(in_oklch_110deg,var(--teal-900)_0%,var(--purple-300)_70%,var(--text-primary)_97%,var(--text-primary)_100%)]",
  modal:
    "bg-[linear-gradient(in_oklch_115deg,var(--teal-800)_0%,var(--teal-600)_50%,var(--teal-500)_100%)]",
};

const HOVER_BG: Record<BoxVariant, string> = {
  base: "hover:bg-none hover:bg-teal-600",
  premium: "hover:bg-none hover:bg-gold-600",
  purple: "hover:bg-none hover:bg-purple-400",
  modal: "hover:bg-none hover:bg-teal-700",
};

export function Box({
  children,
  interactive = false,
  variant = "base",
  noPadding = false,
  className,
  effectLevel = "standard",
  ...rest
}: BoxProps) {
  return (
    <>
      {/* SVG Filters - tylko dla ultra */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          {/* Chromatic Prism - rozszczepienie światła na 3 kanały */}
          <filter id="chromatic-prism" x="-50%" y="-50%" width="200%" height="200%">
            {/* Przesunięcie kanału czerwonego o -2px */}
            <feOffset dx="-2" dy="0" in="SourceGraphic" result="red_layer" />
            {/* Przesunięcie kanału niebieskiego o +2px */}
            <feOffset dx="2" dy="0" in="SourceGraphic" result="blue_layer" />
            
            {/* Izolacja kanału R */}
            <feColorMatrix type="matrix" in="red_layer" result="red_only" values="
              0 0 0 0 0
              0 1 0 0 0
              0 0 0 0 0
              0 0 0 1 0
            " />
            
            {/* Izolacja kanału G */}
            <feColorMatrix type="matrix" in="SourceGraphic" result="green_only" values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 1 0 0
              0 0 0 1 0
            " />
            
            {/* Izolacja kanału B */}
            <feColorMatrix type="matrix" in="blue_layer" result="blue_only" values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 1 0 0
              0 0 0 1 0
            " />
            
            {/* Połączenie kanałów: R + G = cyan, G + B = yellow, R + B = magenta */}
            <feBlend mode="screen" in="red_only" in2="green_only" result="rg_mix" />
            <feBlend mode="screen" in="rg_mix" in2="blue_only" />
          </filter>
        </defs>
      </svg>
      
      <div
        className={clsx(
          // Base
          "group relative overflow-hidden",
          "rounded-[20px]",
          "min-w-[480px] min-h-[240px]",
          BG[variant],
          !noPadding && "p-6",
          
          // ============================================
          // MINIMAL - tylko inner shadow + podstawowy cień
          // ============================================
          effectLevel === "minimal" && [
            "border border-gold-subtle",
            "[box-shadow:var(--inner-shadow-card),var(--shadow-card-rest)]",
            interactive && [
              "cursor-pointer",
            
              HOVER_BG[variant],
              "hover:-translate-y-0.5",
              "hover:[box-shadow:var(--inner-shadow-card),var(--shadow-card-hover)]",
            ],
          ],
          
          // ============================================
          // STANDARD - glass-liquid + shadow-transition z ::after
          // ============================================
          effectLevel === "standard" && [
            "glass-liquid",
            "border-gold-subtle",
            "gpu-layer",
            "shadow-transition",
            "[box-shadow:var(--inner-shadow-card),var(--shadow-card-rest)]",
            interactive && [
              "cursor-pointer",
              "hover:elevation-z-3",
              "hover:[box-shadow:var(--inner-shadow-card),var(--shadow-card-hover-layer-1),var(--shadow-card-hover-layer-2)]",
            ],
          ],
          
          // ============================================
          // ULTRA - double wrapper (nie przecieka!) + chromatic prism
          // ============================================
          effectLevel === "ultra" && [
            "double-wrapper-outer",
            "glass-liquid",
            "border-gold-subtle",
            "gpu-layer",
            "util-optimize-animation",
            "shadow-transition",
            "[box-shadow:var(--inner-shadow-card),var(--shadow-card-rest)]",
            interactive && [
              "cursor-pointer",
              "hover:elevation-z-4",
              "hover:[filter:url(#chromatic-prism)]",
              "hover:[box-shadow:var(--inner-shadow-card),var(--shadow-card-hover-layer-1),var(--shadow-card-hover-layer-2),0_0_20px_rgba(255,215,0,0.1)]",
            ],
          ],
          
          className,
        )}
        {...rest}
      >
        {/* STANDARD/ULTRA: Topology SVG */}
        {(effectLevel === "standard" || effectLevel === "ultra") && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] transition-transform duration-300 [transition-timing-function:var(--ease-spring)] group-hover:scale-[1.03]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 10,20 L 35,45 L 75,25 L 95,60 M 35,45 L 50,85 L 75,25 M 50,85 L 85,75 M 10,20 L 50,85"
              fill="none"
              stroke="var(--teal-50)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="35" cy="45" r="1" fill="var(--teal-50)" />
            <circle cx="75" cy="25" r="1" fill="var(--teal-50)" />
            <circle cx="50" cy="85" r="1" fill="var(--teal-50)" />
          </svg>
        )}
        
        {/* ULTRA: Border glow SVG */}
        {effectLevel === "ultra" && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20 transition-opacity duration-500 group-hover:opacity-60"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,0 L 100,0 L 100,100 L 0,100 Z"
              fill="none"
              stroke={variant === "premium" ? "var(--gold-400)" : variant === "purple" ? "var(--purple-300)" : "var(--teal-300)"}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}
        
        {/* ULTRA: double-wrapper-inner - content nie przecieka */}
        {effectLevel === "ultra" ? (
          <div className="double-wrapper-inner relative z-10 overflow-hidden rounded-[20px]">
            {children}
          </div>
        ) : (
          <div className="relative z-10">
            {children}
          </div>
        )}
      </div>
    </>
  );
}