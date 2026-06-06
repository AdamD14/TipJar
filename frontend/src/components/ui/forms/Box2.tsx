"use client";

import type { ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";

type Box2Variant = "base" | "premium" | "purple" | "modal";

interface Box2Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  interactive?: boolean;
  variant?: Box2Variant;
  noPadding?: boolean;
  className?: string;
  hasArc?: boolean;
}

// 1. TERMOMETRIA OPTYCZNA 
const BG: Record<Box2Variant, string> = {
  base: "bg-[linear-gradient(in_oklch_115deg,var(--color-teal-850),var(--color-teal-800))]",
  premium:
    "bg-[linear-gradient(in_oklch_115deg,#f88008_0%,#f8b000_70%,#ffd700_97%,var(--gold-50)_97%,var(--gold-50)_100%)]",
  purple:
    "bg-[linear-gradient(in_oklch_110deg,var(--color-surface-app)_0%,var(--color-border-focus)_70%,var(--color-text-primary)_97%,var(--color-text-primary)_100%)]",
  modal:
    "bg-[linear-gradient(in_oklch_115deg,color-mix(in_oklch,var(--teal-800),transparent_56%)_0%,color-mix(in_oklch,var(--teal-600),transparent_56%)_50%,color-mix(in_oklch,var(--teal-500),transparent_56%)_100%)]",
};

// Gradienty dla stanów Hover — realizacja ucieczki nasycenia na osi Z
const HOVER_BG: Record<Box2Variant, string> = {
  base: "hover:bg-[linear-gradient(in_oklch_125deg,var(--color-teal-850),var(--color-teal-800))]",
  premium:
    "hover:bg-[linear-gradient(in_oklch_115deg,#fa9018_0%,#ffc010_70%,var(--gold-100)_97%,var(--gold-50)_100%)]",
  purple:
    "hover:bg-[linear-gradient(in_oklch_110deg,var(--color-border-focus)_0%,var(--color-purple-100)_70%,var(--color-text-primary)_97%,var(--color-text-primary)_100%)]",
  modal:
    "hover:bg-[linear-gradient(in_oklch_115deg,color-mix(in_oklch,var(--teal-700),transparent_50%)_0%,color-mix(in_oklch,var(--teal-500),transparent_50%)_50%,color-mix(in_oklch,var(--teal-300),transparent_50%)_100%)]",
};

export function Box2({
  children,
  interactive = false,
  variant = "base",
  noPadding = false,
  className,
  hasArc = false,
  ...rest
}: Box2Props) {
  return (
    <>
      {/* UKRYTA MATRYCA GEOMETRII I FILTRÓW SPRZĘTOWYCH SVG */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Geometria Gilotyny */}
          <clipPath id="arc-mask" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 0.85,0 Q 0.9,0 0.93,0.05 L 1,0.15 L 1,1 L 0,1 Z" />
          </clipPath>

          {/* Model Snella-Descartesa: POPRAWIONE WARTOŚCI MACIERZY KANAŁÓW RGB */}
          <filter id="chromatic-prism">
            {/* Przesunięcia warstw bocznych dla efektu rozszczepienia */}
            <feOffset dx="-2" dy="0" in="SourceGraphic" result="red_layer" />
            <feOffset dx="2" dy="0" in="SourceGraphic" result="blue_layer" />

            {/* Izolacja kanału czerwonego (R) */}
            <feColorMatrix
              type="matrix"
              in="red_layer"
              result="red_only"
              values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 1 0 0
              0 0 0 1 0"
            />

            {/* Izolacja kanału zielonego (G) */}
            <feColorMatrix
              type="matrix"
              in="SourceGraphic"
              result="green_only"
              values="
              0 0 0 0 0
              0 2 0 0 0
              0 0 1 0 0
              0 2 0 1 0"
            />

            {/* Izolacja kanału niebieskiego (B) */}
            <feColorMatrix
              type="matrix"
              in="blue_layer"
              result="blue_only"
              values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 1 0 0
              0 0 0 1 0"
            />

            {/* Łączenie kanałów w finalny pryzmat trybym Screen */}
            <feBlend
              mode="screen"
              in="red_only"
              in2="green_only"
              result="rg_mix"
            />
            <feBlend mode="screen" in="rg_mix" in2="blue_only" />
          </filter>
        </defs>
      </svg>

      <div
        className={clsx(
          "group relative overflow-hidden",
          BG[variant],
          "rounded-[20px]",
          "border border-teal-500/20",
          hasArc && "[clip-path:url(#arc-mask)]",

          "backdrop-blur-[20px]",
          variant === "modal" && "backdrop-saturate-[200%] border-teal-300/15",

          // NAPRAWIONE: Składnia domknięta poprawnie bez urwanych stringów
          interactive && [
            "cursor-pointer",
            "transition-all duration-[250ms] [transition-timing-function:var(--ease-spring)]",
            HOVER_BG[variant],
            "hover:-translate-y-0.5",
            "[box-shadow:var(--inner-shadow-card),var(--shadow-card-rest)]",
            "hover:[box-shadow:var(--inner-shadow-card),var(--shadow-card-hover)]",
            "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-card-focus)]",
          ],
          className,
        )}
        {...rest}
      >
        {/* TOPOLOGIA CONNECTION */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] transition-transform duration-[350ms] [transition-timing-function:var(--ease-spring)] group-hover:scale-[1.03]"
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

        {/* INWERSYJNE HALO */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,var(--color-border-focus)_0%,transparent_70%)] opacity-0 mix-blend-screen transition-opacity duration-500 group-focus-within:opacity-100 group-focus-within:animate-pulse-breath"
          aria-hidden="true"
        />

        {/* KONTENER STRUKTURY DANYCH */}
        <div className={clsx(!noPadding && "p-6", "relative z-10")}>
          {children}
        </div>

        {/* OCHRONA LINII + SNELL-DESCARTES PRISM EFFECT ON HOVER */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25 transition-all duration-300 group-hover:opacity-100 group-hover:[filter:url(#chromatic-prism)]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d={
              hasArc
                ? "M 0,0 L 85,0 Q 90,0 93,5 L 100,15 L 100,100 L 0,100 Z"
                : "M 0,0 L 100,0 L 100,100 L 0,100 Z"
            }
            fill="none"
            stroke={
              variant === "premium"
                ? "var(--gold-400)"
                : variant === "purple"
                  ? "var(--color-border-focus)"
                  : "var(--teal-300)"
            }
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </>
  );
}
