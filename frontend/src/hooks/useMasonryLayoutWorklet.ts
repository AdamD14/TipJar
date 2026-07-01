"use client";

import { useEffect } from "react";

/**
 * Loads the CSS Layout Worklet module implementing `layout(masonry)`,
 * used by `.masonry-container` (see globals.css).
 *
 * NOTE: the CSS Layout API (`CSS.layoutWorklet`) is not implemented in
 * any shipping browser as of now — this is currently always a no-op.
 * `.masonry-container` already falls back to a plain CSS Grid layout via
 * `@supports not (display: layout(masonry))`, so nothing breaks; kept
 * here so the worklet activates automatically if/when browsers ever add
 * support, with zero further code changes.
 */
export function useMasonryLayoutWorklet() {
  useEffect(() => {
    if (typeof CSS === "undefined" || !("layoutWorklet" in CSS)) return;
    (CSS as unknown as { layoutWorklet: Worklet }).layoutWorklet
      .addModule("/worklets/layout/masonry-worklet.js")
      .catch((err) => console.error("[masonry] layout worklet failed to load:", err));
  }, []);
}
