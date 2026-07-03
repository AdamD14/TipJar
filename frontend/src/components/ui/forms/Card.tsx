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

const HOVER_BG: Record<CardVariant, string> = {
  base: "hover:bg-teal-600",
  elevated: "hover:bg-teal-500",
  modal: "hover:bg-teal-700",
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
        
        // Glassmorphism z globals (Blok 2)
        "glass-liquid",
        "border-gold-subtle",
        
        // Volumetric shadow (Blok 5) — głębia 3D
        "card-volumetric",
        "shadow-maestro",
        
        // GPU acceleration — odciążenie main thread
        "util-gpu-composited",
        "gpu-layer",
        
        // Haptic glow on hover (Blok 1)
        interactive && "haptic-glow",
        
        // Touch prediction (Blok 4)
        interactive && "touch-predict",
        
        // Padding
        !noPadding && "p-6",
        
        // Interactive states — wzbogacone
        interactive && [
          "cursor-pointer",
          "shadow-transition",
          "squishy",
          HOVER_BG[variant],
          "hover:-translate-y-1.5",
          "hover:elevation-z-3",
          "hover:emissive-glow",
          "focus-visible:outline-none",
          "focus-visible:[box-shadow:var(--shadow-card-focus)]",
        ],
        
        // Noise texture dla premium feel (Blok 2)
        "texture-paper",
        
        className,
      )}
      {...rest}
    >
      {children}
      
      {/* Glow pseudo-element — ulepszony z tokenami */}
      {interactive && (
        <span
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 [transition-timing-function:cubic-bezier(0.25,0.8,0.25,1)] group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle at center, var(--purple-300), transparent 70%)",
            filter: "blur(var(--gpu-fallback-blur))",
            margin: "-2px",
            borderRadius: "14px",
            mixBlendMode: "screen",
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Inner sheen animation — premium highlight */}
      <span
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] [transition-timing-function:var(--ease-spring)]"
        style={{
          background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
          transform: "translateX(-140%)",
          animation: "sheen 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
