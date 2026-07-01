// public/worklets/chamfer-border-worklet.js
// CSS Paint Worklet — chamfered card edges with chromatic aberration and
// an ambient light sweep. Requires the matching @property registrations
// in globals.css (--sweep-time etc.), otherwise custom property
// animations are treated as plain strings and won't interpolate.
// Loaded by src/hooks/useChamferBorderWorklet.ts.

if (typeof registerPaint !== "undefined") {
  registerPaint(
    "chamferBorder",
    class {
      static get inputProperties() {
        return [
          "--border-color",
          "--border-width",
          "--chamfer-size",
          "--chromatic-intensity",
          "--glow-intensity",
          "--sweep-time",
          "--dpr",
        ];
      }

      paint(ctx, geom, properties) {
        const dpr = this.parseNumber(properties.get("--dpr"), 1);
        const { width, height } = geom;
        ctx.save();
        ctx.scale(dpr, dpr);

        const w = width / dpr;
        const h = height / dpr;
        const bw = this.parseNumber(properties.get("--border-width"), 1.5) / dpr;
        const chamfer = this.parseNumber(properties.get("--chamfer-size"), 18) / dpr;
        const color = this.parseColor(properties.get("--border-color"), "#a0b0ff");
        const chrom = this.parseNumber(properties.get("--chromatic-intensity"), 0.7);
        const glow = this.parseNumber(properties.get("--glow-intensity"), 0.6);
        const t = this.parseNumber(properties.get("--sweep-time"), 0);

        ctx.lineJoin = "round";

        // Main border
        ctx.strokeStyle = color;
        ctx.lineWidth = bw;
        ctx.shadowColor = color;
        ctx.shadowBlur = 14 * glow;
        this.drawChamfer(ctx, w, h, chamfer);
        ctx.stroke();

        // Chromatic aberration
        ctx.globalAlpha = 0.38 * chrom;
        ctx.shadowBlur = 9 * glow * chrom;

        ctx.strokeStyle = "#ff4d8f";
        this.drawChamfer(ctx, w, h, chamfer);
        ctx.stroke();

        ctx.strokeStyle = "#4dc3ff";
        this.drawChamfer(ctx, w, h, chamfer);
        ctx.stroke();

        // Ambient light sweep — driven by a continuously looping --sweep-time
        // (see @keyframes chamfer-sweep-time in globals.css), independent of
        // :hover. One full sine cycle per loop (phase 0 -> 2*PI).
        const phase = t * 0.0012;
        const alpha = 0.32 * Math.sin(phase * Math.PI * 2) * glow;
        if (alpha > 0.04) {
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = "#ffffff";
          ctx.shadowBlur = 24;
          ctx.lineWidth = bw * 1.15;
          this.drawChamfer(ctx, w, h, chamfer);
          ctx.stroke();
        }

        ctx.restore();
      }

      drawChamfer(ctx, w, h, c) {
        ctx.beginPath();
        ctx.moveTo(c, 0);
        ctx.lineTo(w - c, 0);
        ctx.lineTo(w, c);
        ctx.lineTo(w, h - c);
        ctx.lineTo(w - c, h);
        ctx.lineTo(c, h);
        ctx.lineTo(0, h - c);
        ctx.lineTo(0, c);
        ctx.closePath();
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
