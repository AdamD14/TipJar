// public/worklets/chameleon-shadow-worklet.js
// CSS Paint Worklet — soft, deep SDF-style shadow ("chameleon shadow").
// Registers paint() as `sdfChameleonShadow`.
// Wired into .u-shadow-chameleon in globals.css as a progressive
// enhancement over the existing box-shadow color-mix implementation.
// Loaded by src/hooks/useChameleonShadowWorklet.ts.

if (typeof registerPaint !== "undefined") {
  registerPaint(
    "sdfChameleonShadow",
    class {
      static get inputProperties() {
        return ["--shadow-intensity", "--chamfer-size", "--sdf-blur", "--accent-teal", "--dpr"];
      }

      paint(ctx, geom, properties) {
        const dpr = this.parseNumber(properties.get("--dpr"), 1);
        const { width, height } = geom;
        ctx.save();
        ctx.scale(dpr, dpr);

        const w = width / dpr;
        const h = height / dpr;
        const chamfer = this.parseNumber(properties.get("--chamfer-size"), 18) / dpr;
        const intensity = this.parseNumber(properties.get("--shadow-intensity"), 0.65);
        const blur = this.parseNumber(properties.get("--sdf-blur"), 24);
        const teal = this.parseColor(properties.get("--accent-teal"), "#003737");

        // Main soft SDF shadow
        ctx.shadowColor = teal;
        ctx.shadowBlur = blur * intensity * 1.1;

        ctx.fillStyle = `rgba(0, 55, 55, ${0.75 * intensity})`;
        this.drawSDFChamfer(ctx, w, h, chamfer + blur * 0.65);
        ctx.fill();

        // Subtle rim glow
        ctx.shadowBlur = 14 * intensity;
        ctx.fillStyle = `rgba(0, 75, 75, ${0.28 * intensity})`;
        this.drawSDFChamfer(ctx, w, h, chamfer + 6);
        ctx.fill();

        ctx.restore();
      }

      drawSDFChamfer(ctx, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(r, 0);
        ctx.lineTo(w - r, 0);
        ctx.lineTo(w, r);
        ctx.lineTo(w, h - r);
        ctx.lineTo(w - r, h);
        ctx.lineTo(r, h);
        ctx.lineTo(0, h - r);
        ctx.lineTo(0, r);
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
