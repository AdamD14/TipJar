// public/worklets/frozen-grid-worklet.js
// CSS Paint Worklet — gold technical grid with procedural glitch offsets
// and a deterministic particle noise layer (no Math.random() per frame).
// Loaded by src/hooks/useFrozenGridWorklet.ts.
// Fallback for browsers without CSS Painting API support:
// src/components/ui/effects/FrozenNetworkGrid.tsx (SVG).

if (typeof registerPaint !== "undefined") {
  registerPaint(
    "frozenNetworkGrid",
    class {
      static get inputProperties() {
        return ["--grid-size", "--line-color", "--glitch-intensity", "--grid-opacity", "--grid-time", "--dpr"];
      }

      paint(ctx, geom, properties) {
        const size = this.parseNumber(properties.get("--grid-size"), 40);
        const color = this.parseColor(properties.get("--line-color"), "#FFD700");
        const glitch = this.parseNumber(properties.get("--glitch-intensity"), 0.03);
        const opacity = this.parseNumber(properties.get("--grid-opacity"), 0.09);
        const t = this.parseNumber(properties.get("--grid-time"), 0);
        const dpr = this.parseNumber(properties.get("--dpr"), 1);

        const { width, height } = geom;
        ctx.save();
        ctx.scale(dpr, dpr);
        const w = width / dpr;
        const h = height / dpr;

        ctx.globalAlpha = opacity;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.05 / dpr;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8 * glitch * 90;

        // Main grid + glitch (single path for performance)
        ctx.beginPath();
        for (let y = 0; y < h; y += size) {
          const off = Math.sin(t * 1.1 + y * 0.013) * glitch * 13;
          ctx.moveTo(0, y + off);
          ctx.lineTo(w, y + off);
        }
        for (let x = 0; x < w; x += size) {
          const off = Math.cos(t * 0.85 + x * 0.017) * glitch * 13;
          ctx.moveTo(x + off, 0);
          ctx.lineTo(x + off, h);
        }
        ctx.stroke();

        // Second, larger-scale glitch layer (parallax depth)
        ctx.globalAlpha = opacity * 0.55;
        ctx.shadowBlur = 5 * glitch * 65;
        ctx.lineWidth = 0.75 / dpr;
        ctx.beginPath();
        for (let y = 0; y < h; y += size * 1.7) {
          const off = Math.sin(t * 2.4 + y * 0.009) * glitch * 8;
          ctx.moveTo(0, y + off);
          ctx.lineTo(w, y + off);
        }
        ctx.stroke();

        // Deterministic particle noise (additive blend)
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = `rgba(255, 245, 200, ${glitch * 0.5})`;
        for (let i = 0; i < 35; i++) {
          const phase = t * 3.1 + i * 1.4;
          const x = w * (0.5 + 0.47 * Math.sin(phase));
          const y = h * (0.5 + 0.47 * Math.cos(phase * 1.7));
          const sz = 1.1 + Math.sin(phase * 4) * 1.1;
          ctx.fillRect(x, y, sz, sz * 0.7);
        }

        ctx.restore();
      }

      parseNumber(v, f) {
        if (typeof v === "number") return v;
        const n = parseFloat(v?.toString() || "");
        return isNaN(n) ? f : n;
      }

      parseColor(v, f) {
        const s = v?.toString() || "";
        return s || f;
      }
    }
  );
}
