"use client";

import React from "react";
import { useFrozenGridWorklet } from "@/hooks/useFrozenGridWorklet";

interface FrozenBackgroundProps {
  gridSize?: number;
  lineColor?: string;
  glitchIntensity?: number;
  opacity?: number;
  className?: string;
}

/**
 * Gold technical grid with procedural glitch offsets and particle noise,
 * rendered by the `frozenNetworkGrid` CSS Paint Worklet. On browsers
 * without CSS Painting API support, `.frozen-grid-background` degrades to
 * a static linear-gradient grid (see globals.css) — use `FrozenNetworkGrid`
 * (SVG) instead if the animated look is required on Safari too.
 */
export function FrozenBackground({
  gridSize = 40,
  lineColor = "#FFD700",
  glitchIntensity = 0.03,
  opacity = 0.09,
  className = "",
}: FrozenBackgroundProps) {
  useFrozenGridWorklet();
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  return (
    <div
      aria-hidden="true"
      className={`frozen-grid-background ${className}`}
      style={
        {
          "--grid-size": gridSize,
          "--line-color": lineColor,
          "--glitch-intensity": glitchIntensity,
          "--grid-opacity": opacity,
          "--dpr": dpr,
        } as React.CSSProperties
      }
    />
  );
}
