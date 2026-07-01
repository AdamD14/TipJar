"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { useMasonryLayoutWorklet } from "@/hooks/useMasonryLayoutWorklet";

interface MasonryItemProps {
  gap: number;
  rowUnit: number;
  children: React.ReactNode;
}

/**
 * Wraps a single masonry child so its real rendered height can be
 * measured and translated into a `grid-row: span N` value — this is
 * what makes the CSS Grid fallback (see .masonry-container in
 * globals.css) actually pack items into empty gaps via
 * `grid-auto-flow: dense`, instead of leaving fixed-height holes.
 * Irrelevant to the (currently inert) `layout(masonry)` Worklet path,
 * which positions children itself and ignores grid-row entirely.
 *
 * Uses useLayoutEffect (not useEffect) so the span is corrected before
 * the browser paints, avoiding a flash of wrong layout. This triggers a
 * harmless "useLayoutEffect does nothing on the server" warning during
 * Next.js SSR — expected, not a bug.
 */
function MasonryItem({ gap, rowUnit, children }: MasonryItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rowSpan, setRowSpan] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const height = el.getBoundingClientRect().height;
      // Rows are separated by `gap`, so a naive height/rowUnit ratio
      // under-counts as span grows. Correct formula for the minimal N
      // satisfying N*(rowUnit+gap) - gap >= height:
      const span = Math.max(1, Math.ceil((height + gap) / (rowUnit + gap)));
      setRowSpan(span);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [gap, rowUnit]);

  return (
    <div ref={ref} style={{ gridRowEnd: `span ${rowSpan}` }}>
      {children}
    </div>
  );
}

interface MasonryLayoutProps {
  columns?: number;
  gap?: number;
  /** Base grid row height in px used by the CSS Grid fallback to compute row spans (default 8). */
  rowUnit?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Pinterest-style column-packing layout via the `masonry` CSS Layout
 * Worklet (`display: layout(masonry)`). No browser currently implements
 * the CSS Layout API, so this always renders through the CSS Grid
 * fallback today: `grid-auto-flow: dense` + a per-child measured
 * `grid-row: span N` (via MasonryItem above), which really does pack
 * items into empty gaps rather than leaving fixed-size holes.
 */
export function MasonryLayout({
  columns = 4,
  gap = 20,
  rowUnit = 8,
  children,
  className = "",
}: MasonryLayoutProps) {
  useMasonryLayoutWorklet();

  return (
    <div
      className={`masonry-container ${className}`}
      style={
        {
          "--masonry-columns": columns,
          "--masonry-gap": gap,
          "--masonry-row-unit": rowUnit,
        } as React.CSSProperties
      }
    >
      {React.Children.map(children, (child, index) => (
        <MasonryItem key={index} gap={gap} rowUnit={rowUnit}>
          {child}
        </MasonryItem>
      ))}
    </div>
  );
}
