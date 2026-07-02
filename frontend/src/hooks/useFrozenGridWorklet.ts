"use client";

import { useEffect } from "react";

/**
 * Loads the CSS Paint Worklet module implementing the `frozenNetworkGrid`
 * paint() function used by `.frozen-grid-background` (see globals.css).
 * No-op in browsers without CSS Painting API support — use the
 * `FrozenNetworkGrid` SVG component as a fallback in that case.
 */
export function useFrozenGridWorklet() {
  useEffect(() => {
    if (typeof CSS === "undefined") return;

    const paintWorklet = (CSS as typeof CSS & {
      paintWorklet?: {
        addModule: (moduleName: string) => Promise<void>;
      };
    }).paintWorklet;

    if (!paintWorklet) return;

    paintWorklet
      .addModule("/worklets/frozen-grid-worklet.js")
      .catch((err) => console.error("[frozenNetworkGrid] worklet failed to load:", err));
  }, []);
}
