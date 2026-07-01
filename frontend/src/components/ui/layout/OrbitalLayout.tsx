"use client";

import React from "react";
import { useOrbitalLayoutWorklet } from "@/hooks/useOrbitalLayoutWorklet";

interface OrbitalLayoutProps {
  /** 0.1–1.0: how close to the container edge children orbit. */
  radiusFactor?: number;
  /** Start angle in degrees (CSS convention). -90 = 12 o'clock. */
  startAngleDeg?: number;
  /** Max child size in px. */
  childMaxSize?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Distributes children evenly around a circle via the `orbital` CSS
 * Layout Worklet (`display: layout(orbital)`). No browser currently
 * implements the CSS Layout API, so this always renders through the
 * flex-wrap fallback today (`@supports not (display: layout(orbital))`
 * in globals.css).
 */
export function OrbitalLayout({
  radiusFactor = 0.75,
  startAngleDeg = -90,
  childMaxSize = 120,
  children,
  className = "",
}: OrbitalLayoutProps) {
  useOrbitalLayoutWorklet();

  return (
    <div
      className={`orbital-container ${className}`}
      style={
        {
          "--orbit-radius-factor": radiusFactor,
          "--orbit-start-angle": `${startAngleDeg}deg`,
          "--orbit-child-max-size": `${childMaxSize}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
