**Ostateczna, dopieszczona wersja (wszystko w jednym).**

### 1. `chamfer-border-worklet.js`

```js
if (typeof registerPaint !== "undefined") {
  registerPaint(
    "chamferBorder",
    class {
      static get inputProperties() {
        return ["--border-color", "--border-width", "--chamfer-size", "--chromatic-intensity", "--glow-intensity", "--sweep-time", "--dpr"];
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

        // Główny border
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

        // Light sweep
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
```

### 2. CSS (`chamfer-card.css`)

```css
.chamfer-card {
  position: relative;
  background: #0a0f14;
  padding: 1px;
  overflow: hidden;

  clip-path: polygon(
    18px 0, calc(100% - 18px) 0,
    100% 18px, 100% calc(100% - 18px),
    calc(100% - 18px) 100%, 18px 100%,
    0 calc(100% - 18px), 0 18px
  );

  --border-color: #a0b0ff;
  --border-width: 1.5;
  --chamfer-size: 18;
  --chromatic-intensity: 0.7;
  --glow-intensity: 0.6;
  --sweep-time: 0;
  --dpr: 1;
}

/* Worklet w Chrome */
@supports (background: paint(chamferBorder)) {
  .chamfer-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: paint(chamferBorder);
    pointer-events: none;
    z-index: 0;
  }
}

/* Fallback dla Firefox/Safari */
@supports not (background: paint(chamferBorder)) {
  .chamfer-card::before {
    content: "";
    position: absolute;
    inset: -2px;
    background: linear-gradient(90deg, transparent, #a0b0ff 25%, #ff4d8f 50%, #4dc3ff 75%, transparent);
    background-size: 250% 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .chamfer-card:hover::before,
  .chamfer-card.notify::before {
    opacity: 0.75;
    animation: sweep-fallback 1.4s ease-in-out forwards;
  }
}

@keyframes sweep-fallback {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### 3. Hook + Komponent

```tsx
// useChamferBorderWorklet.ts
import { useEffect } from "react";

export const useChamferBorderWorklet = () => {
  useEffect(() => {
    if ("paintWorklet" in CSS) {
      CSS.paintWorklet.addModule("/chamfer-border-worklet.js").catch(console.error);
    }
  }, []);
};

// ChamferCard.tsx
import React from "react";
import { useChamferBorderWorklet } from "../hooks/useChamferBorderWorklet";

interface ChamferCardProps {
  notify?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const ChamferCard: React.FC<ChamferCardProps> = ({ notify = false, children, className = "" }) => {
  useChamferBorderWorklet();
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  return (
    <div
      className={`chamfer-card ${notify ? "notify" : ""} ${className}`}
      style={{ "--dpr": dpr } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
```

