"use client";

import { useEffect } from "react";

/**
 * Loads the CSS Paint Worklet module implementing the `sdfChameleonShadow`
 * paint() function used by `.u-shadow-chameleon` (see globals.css).
 * No-op in browsers without CSS Painting API support — `.u-shadow-chameleon`
 * already falls back to the original `box-shadow: var(--shadow-chameleon)`.
 */
export function useChameleonShadowWorklet() {
  useEffect(() => {
    if (typeof CSS === "undefined" || !("paintWorklet" in CSS)) return;
    CSS.paintWorklet
      .addModule("/worklets/chameleon-shadow-worklet.js")
      .catch((err) => console.error("[sdfChameleonShadow] worklet failed to load:", err));
  }, []);
}
