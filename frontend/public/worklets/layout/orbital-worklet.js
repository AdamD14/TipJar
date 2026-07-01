// public/worklets/layout/orbital-worklet.js
// CSS Layout Worklet — distributes children evenly around a circle
// (radial/orbital menu layout).
//
// IMPORTANT: same caveat as masonry-worklet.js — the CSS Layout API is
// not implemented in any shipping browser today. `.orbital-container`
// always falls back to a flex-wrap layout via
// `@supports not (display: layout(orbital))` (see globals.css).
// Loaded by src/hooks/useOrbitalLayoutWorklet.ts (currently a no-op).

if (typeof registerLayout !== "undefined") {
  registerLayout(
    "orbital",
    class {
      static get inputProperties() {
        return ["--orbit-radius-factor", "--orbit-start-angle", "--orbit-child-max-size"];
      }

      static get layoutOptions() {
        return {
          childDisplay: "normal",
          sizing: "block-like",
        };
      }

      readNumber(value, fallback) {
        if (!value) return fallback;
        const n = typeof value.value === "number" ? value.value : parseFloat(value.toString());
        return Number.isFinite(n) ? n : fallback;
      }

      // Converts an <angle> Typed OM value to radians regardless of the
      // unit it was authored in (deg, grad, turn, rad) via `.to()`.
      // Falls back to treating the raw number as already being in
      // radians when the property isn't @property-registered as
      // <angle> (e.g. a plain unitless value, or unset).
      // Fixes a bug in the source spec, which read CSSUnitValue.value
      // directly for a documented `deg` input and fed it straight into
      // Math.cos()/Math.sin() (which require radians) without converting.
      readAngleRadians(value, fallbackRadians) {
        if (!value) return fallbackRadians;
        if (typeof value.to === "function") {
          try {
            return value.to("rad").value;
          } catch {
            // Not an angle-compatible unit — fall through.
          }
        }
        return this.readNumber(value, fallbackRadians);
      }

      async intrinsicSizes(children, edges, styleMap) {
        // Approximate: the real geometry is only known once the actual
        // container size is available in layout() below.
        return { maxContentSize: 1000, minContentSize: 200 };
      }

      async layout(children, edges, constraints, styleMap, breakToken) {
        const radiusFactor = Math.max(0.1, this.readNumber(styleMap.get("--orbit-radius-factor"), 0.75));
        const startAngle = this.readAngleRadians(styleMap.get("--orbit-start-angle"), -Math.PI / 2);
        const maxChildSizeRaw = this.readNumber(styleMap.get("--orbit-child-max-size"), Infinity);
        const maxChildSize = maxChildSizeRaw > 0 ? maxChildSizeRaw : Infinity;

        const availableWidth = constraints.fixedInlineSize - edges.inline;
        const availableHeight = (constraints.fixedBlockSize || availableWidth) - edges.block;

        if (availableWidth <= 0 || availableHeight <= 0 || children.length === 0) {
          return {
            autoBlockSize: edges.blockStart + edges.blockEnd,
            childFragments: [],
          };
        }

        const centerX = edges.inlineStart + availableWidth / 2;
        const centerY = edges.blockStart + availableHeight / 2;
        const orbitRadius = (Math.min(availableWidth, availableHeight) / 2) * radiusFactor;

        const angleStep = (2 * Math.PI) / children.length;

        const childFragments = await Promise.all(
          children.map(async (child, index) => {
            const childSize = Math.min(maxChildSize, orbitRadius * 0.6);
            const childConstraints = {
              fixedInlineSize: childSize,
              fixedBlockSize: childSize,
            };

            const fragment = await child.layoutNextFragment(childConstraints);

            const angle = startAngle + angleStep * index;
            const cx = centerX + orbitRadius * Math.cos(angle);
            const cy = centerY + orbitRadius * Math.sin(angle);

            fragment.inlineOffset = cx - fragment.inlineSize / 2;
            fragment.blockOffset = cy - fragment.blockSize / 2;

            return fragment;
          })
        );

        const maxExtent = Math.max(
          ...childFragments.map((f) => Math.abs(f.blockOffset - centerY) + f.blockSize / 2)
        );

        const autoBlockSize = edges.blockStart + Math.max(availableHeight, maxExtent * 2) + edges.blockEnd;

        return { autoBlockSize, childFragments };
      }
    }
  );
}
