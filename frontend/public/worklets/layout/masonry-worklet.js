// public/worklets/layout/masonry-worklet.js
// CSS Layout Worklet — Pinterest-style column-packing masonry layout.
//
// IMPORTANT: as of writing, the CSS Layout API (registerLayout /
// CSS.layoutWorklet) is NOT implemented in any shipping browser (Chrome,
// Firefox, Safari, Edge) — unlike the Paint API, which did ship in
// Chromium. This file is forward-looking / speculative: it will not
// activate anywhere today. `.masonry-container` always falls back to a
// plain CSS Grid layout via `@supports not (display: layout(masonry))`
// (see globals.css), which is what every current browser will render.
// Loaded by src/hooks/useMasonryLayoutWorklet.ts (currently always a
// no-op, kept for when/if browser support ever lands).

if (typeof registerLayout !== "undefined") {
  registerLayout(
    "masonry",
    class {
      static get inputProperties() {
        return ["--masonry-columns", "--masonry-gap"];
      }

      static get layoutOptions() {
        return {
          childDisplay: "normal",
          sizing: "block-like",
        };
      }

      // Robust regardless of whether --masonry-columns/--masonry-gap are
      // registered via @property: prefers Typed OM's numeric `.value`
      // when available, falls back to parsing `.toString()` otherwise.
      readNumber(value, fallback) {
        if (!value) return fallback;
        const n = typeof value.value === "number" ? value.value : parseFloat(value.toString());
        return Number.isFinite(n) ? n : fallback;
      }

      readColumns(styleMap) {
        const n = this.readNumber(styleMap.get("--masonry-columns"), 3);
        return Math.max(1, Math.round(n) || 3);
      }

      readGap(styleMap) {
        const n = this.readNumber(styleMap.get("--masonry-gap"), 16);
        return Math.max(0, n);
      }

      async intrinsicSizes(children, edges, styleMap) {
        const columns = this.readColumns(styleMap);
        const gap = this.readGap(styleMap);

        const childrenSizes = await Promise.all(children.map((child) => child.intrinsicSizes()));
        const maxChildWidth = childrenSizes.reduce((max, sizes) => Math.max(max, sizes.maxContentSize), 0);

        // Full multi-column intrinsic width, not just the widest child
        // (the original draft ignored columns/gap entirely here).
        const maxContentSize = columns * maxChildWidth + (columns - 1) * gap;

        return { maxContentSize, minContentSize: maxChildWidth };
      }

      async layout(children, edges, constraints, styleMap, breakToken) {
        const gap = this.readGap(styleMap);
        // Never use more columns than there are children — avoids empty columns.
        const columns = Math.min(this.readColumns(styleMap), Math.max(1, children.length));

        const availableInlineSize = constraints.fixedInlineSize - edges.inline;

        if (availableInlineSize <= 0 || children.length === 0) {
          return {
            autoBlockSize: edges.blockStart + edges.blockEnd,
            childFragments: [],
          };
        }

        const columnWidth = (availableInlineSize - gap * (columns - 1)) / columns;

        const columnHeights = new Array(columns).fill(0);
        const columnOffsets = new Array(columns);
        for (let i = 0; i < columns; i++) {
          columnOffsets[i] = edges.inlineStart + i * (columnWidth + gap);
        }

        const childFragments = await Promise.all(
          children.map(async (child) => {
            let shortestIndex = 0;
            for (let i = 1; i < columns; i++) {
              if (columnHeights[i] < columnHeights[shortestIndex]) shortestIndex = i;
            }

            const fragment = await child.layoutNextFragment({ fixedInlineSize: columnWidth });

            fragment.inlineOffset = columnOffsets[shortestIndex];
            fragment.blockOffset = edges.blockStart + columnHeights[shortestIndex];

            columnHeights[shortestIndex] += fragment.blockSize + gap;

            return fragment;
          })
        );

        // Includes edges.blockStart — missing in the original draft, which
        // under-reported the container height by that amount.
        const maxColumnHeight = Math.max(...columnHeights);
        const autoBlockSize = edges.blockStart + Math.max(0, maxColumnHeight - gap) + edges.blockEnd;

        return { autoBlockSize, childFragments };
      }
    }
  );
}
