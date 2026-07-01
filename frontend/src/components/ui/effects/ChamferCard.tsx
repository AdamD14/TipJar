"use client";

import React from "react";
import { useChamferBorderWorklet } from "@/hooks/useChamferBorderWorklet";

interface ChamferCardProps {
  notify?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Card with chamfered, glowing edges rendered by the `chamferBorder` CSS
 * Paint Worklet: chromatic aberration + a looping ambient light sweep
 * (see @keyframes chamfer-sweep-time in globals.css). Falls back to an
 * animated gradient border on browsers without CSS Painting API support
 * (Safari/Firefox), via `@supports not`.
 */
export function ChamferCard({ notify = false, children, className = "" }: ChamferCardProps) {
  useChamferBorderWorklet();
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  return (
    <div
      className={`chamfer-card ${notify ? "notify" : ""} ${className}`}
      style={{ "--dpr": dpr } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
