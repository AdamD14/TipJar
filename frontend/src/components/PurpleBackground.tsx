import React from "react";

type Props = {
  /** Kąt gradientu w stopniach (0 = poziomy w prawo). */
  angleDeg?: number;
  /** Kolory gradientu od lewej‑góry do prawej‑dołu (min. 2). */
  stops?: string[];
  /** Krycie (0–1) dla ziarna – 0.035 to subtelne „antibanding”. */
  noiseOpacity?: number;
  /** Krycie (0–1) dla winiety. */
  vignetteOpacity?: number;
  className?: string;
};

export default function PurpleBackground({
  angleDeg = 135,
  // Domyślna paleta: głęboki fiolet -> purpura -> ciemny fiolet
  stops = ["#2B0E2E", "#5B175C", "#1A0B1D"],
  noiseOpacity = 0.035,
  vignetteOpacity = 0.25,
  className = "",
}: Props) {
  // linearny gradient w SVG używa kąta jako wektora; liczymy współrzędne z kąta
  const rad = (angleDeg * Math.PI) / 180;
  const x2 = 50 + Math.cos(rad) * 50;
  const y2 = 50 + Math.sin(rad) * 50;
  const x1 = 100 - x2;
  const y1 = 100 - y2;

  return (
    <div className={["absolute inset-0 -z-10", className].join(" ")}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full block"
        aria-hidden
      >
        <defs>
          {/* Gradient główny */}
          <linearGradient id="bg-grad" x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}>
            {stops.map((c, i) => (
              <stop
                key={i}
                offset={`${(i / (stops.length - 1)) * 100}%`}
                stopColor={c}
              />
            ))}
          </linearGradient>

          {/* Szum przeciw bandingowi */}
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues={`0 ${noiseOpacity}`} />
              <feFuncR type="table" tableValues="0 1" />
              <feFuncG type="table" tableValues="0 1" />
              <feFuncB type="table" tableValues="0 1" />
            </feComponentTransfer>
          </filter>

          {/* Winieta (ciemne brzegi) */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
            <stop offset="60%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity={`${vignetteOpacity}`} />
          </radialGradient>
        </defs>

        {/* Warstwa gradientu */}
        <rect x="0" y="0" width="100" height="100" fill="url(#bg-grad)" />

        {/* Delikatny diagonalny „sheen” */}
        <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <rect x="0" y="0" width="100" height="100" fill="url(#sheen)" />

        {/* Szum */}
        <rect x="0" y="0" width="100" height="100" filter="url(#noise)" />

        {/* Winieta */}
        <rect x="0" y="0" width="100" height="100" fill="url(#vignette)" />
      </svg>
    </div>
  );
}

