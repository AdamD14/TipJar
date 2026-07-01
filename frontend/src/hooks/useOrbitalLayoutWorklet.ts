"use client";

import { useEffect } from "react";

/**
 * Loads the CSS Layout Worklet module implementing `layout(orbital)`,
 * used by `.orbital-container` (see globals.css).
 *
 * NOTE: same caveat as useMasonryLayoutWorklet — CSS.layoutWorklet is
 * not implemented in any shipping browser as of now, so this is
 * currently always a no-op. `.orbital-container` already falls back to
 * a flex-wrap layout via `@supports not (display: layout(orbital))`.
 */
export function useOrbitalLayoutWorklet() {
  useEffect(() => {
    if (typeof CSS === "undefined" || !("layoutWorklet" in CSS)) return;
    (CSS as unknown as { layoutWorklet: Worklet }).layoutWorklet
      .addModule("/worklets/layout/orbital-worklet.js")
      .catch((err) => console.error("[orbital] layout worklet failed to load:", err));
  }, []);
}
