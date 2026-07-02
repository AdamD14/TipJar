"use client";

import { useEffect } from "react";

/**
 * Loads the CSS Paint Worklet module implementing the `chamferBorder`
 * paint() function used by `.chamfer-card` (see globals.css).
 * No-op in browsers without CSS Painting API support (Safari/Firefox) —
 * `.chamfer-card` already ships a gradient-based fallback via `@supports`.
 */
export function useChamferBorderWorklet() {
  useEffect(() => {
    if (typeof CSS === "undefined") return;

    const paintWorklet = (CSS as typeof CSS & {
      paintWorklet?: {
        addModule: (moduleName: string) => Promise<void>;
      };
    }).paintWorklet;

    if (!paintWorklet) return;

    paintWorklet
      .addModule("/worklets/chamfer-border-worklet.js")
      .catch((err) => console.error("[chamferBorder] worklet failed to load:", err));
  }, []);
}
