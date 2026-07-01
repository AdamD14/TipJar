"use client";

import React from "react";
import { useMasonryLayoutWorklet } from "@/hooks/useMasonryLayoutWorklet";

interface MasonryLayoutProps {
  columns?: number;
  gap?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Pinterest-style column-packing layout via the `masonry` CSS Layout
 * Worklet (`display: layout(masonry)`). No browser currently implements
 * the CSS Layout API, so this always renders through the CSS Grid
 * fallback today (`@supports not (display: layout(masonry))` in
 * globals.css) — a `repeat(auto-fill, minmax(280px, 1fr))` grid that
 * looks reasonable on its own, not a "broken" state.
 */
export function MasonryLayout({ columns = 4, gap = 20, children, className = "" }: MasonryLayoutProps) {
  useMasonryLayoutWorklet();

  return (
    <div
      className={`masonry-container ${className}`}
      style={
        {
          "--masonry-columns": columns,
          "--masonry-gap": gap,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
