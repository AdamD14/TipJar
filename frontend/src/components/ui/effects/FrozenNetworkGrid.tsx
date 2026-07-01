"use client";

import React, { useMemo } from "react";

interface FrozenNetworkGridProps {
  /** Overall grid opacity (default 0.08). */
  opacity?: number;
  /** Grid line color (default `#FFD700` — gold). */
  lineColor?: string;
  /** Grid cell size in pixels (default 40). */
  cellSize?: number;
  /**
   * "standalone" renders a full absolutely-positioned <svg> covering its
   * container. "defs-only" returns just the <pattern> inside a single
   * <defs>, for a parent to reuse inside its own <svg>.
   */
  mode?: "standalone" | "defs-only";
}

const PATTERN_ID = "frozen-network-grid";

/**
 * SVG-based fallback for the `frozenNetworkGrid` CSS Paint Worklet (see
 * FrozenBackground.tsx / frozen-grid-worklet.js). Use this on browsers
 * without CSS Painting API support (Safari) where the animated,
 * glitch-and-noise Worklet version isn't available — renders a static,
 * lightweight vector grid instead.
 */
export const FrozenNetworkGrid: React.FC<FrozenNetworkGridProps> = React.memo(
  ({ opacity = 0.08, lineColor = "#FFD700", cellSize = 40, mode = "standalone" }) => {
    const patternContent = useMemo(
      () => (
        <pattern id={PATTERN_ID} width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
          {/* Horizontal grid lines — top and bottom of the cell only */}
          <line x1="0" y1="0" x2={cellSize} y2="0" stroke={lineColor} strokeWidth="1" strokeOpacity={1} />
          <line
            x1="0"
            y1={cellSize}
            x2={cellSize}
            y2={cellSize}
            stroke={lineColor}
            strokeWidth="1"
            strokeOpacity={1}
          />

          {/* Vertical grid lines — left and right edge of the cell only */}
          <line x1="0" y1="0" x2="0" y2={cellSize} stroke={lineColor} strokeWidth="1" strokeOpacity={1} />
          <line
            x1={cellSize}
            y1="0"
            x2={cellSize}
            y2={cellSize}
            stroke={lineColor}
            strokeWidth="1"
            strokeOpacity={1}
          />
        </pattern>
      ),
      [cellSize, lineColor]
    );

    if (mode === "defs-only") {
      return <defs>{patternContent}</defs>;
    }

    return (
      <svg aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ opacity }}>
        <defs>{patternContent}</defs>
        <rect width="100%" height="100%" fill={`url(#${PATTERN_ID})`} />
      </svg>
    );
  }
);

FrozenNetworkGrid.displayName = "FrozenNetworkGrid";
