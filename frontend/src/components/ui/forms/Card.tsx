"use client";

import type { ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";


type CardVariant = "base" | "elevated" | "modal";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
  variant?: CardVariant;
  noPadding?: boolean;
  className?: string;
}

const BG: Record<CardVariant, string> = {
  base: "bg-teal-700",
  elevated: "bg-teal-600",
  modal: "bg-teal-800",
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
        // Base card surface
        BG[variant],
        "relative overflow-hidden",
        "rounded-xl",

        // Glassmorphism + gold border (Blok 2)
        "glass-liquid",
        "border-gold-subtle",

        // Volumetric shadow with resting fallback (Blok 5)
        "shadow-maestro",

        // GPU acceleration — odciążenie main thread
        "util-gpu-composited",
        "gpu-layer",

        // Padding
        !noPadding && "p-6",

        // Interactive states — .card-interactive from globals.css
        // (design.md Krok 3 §1.1: lift -6px, double shadow, glow, sheen)
        interactive && "card-interactive",

        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
