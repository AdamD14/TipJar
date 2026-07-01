"use client";

import type { CSSProperties } from "react";
import { useChamferBorderWorklet } from "@/hooks/useChamferBorderWorklet";
import { useFrozenGridWorklet } from "@/hooks/useFrozenGridWorklet";
import { useChameleonShadowWorklet } from "@/hooks/useChameleonShadowWorklet";
import { FrozenBackground } from "@/components/ui/effects/FrozenBackground";

// Worklet showcase — added on top of the existing cards to demonstrate
// chamferBorder, frozenNetworkGrid and sdfChameleonShadow. See the small
// on-card caption below for exactly what was added where.
export default function CardPage() {
  // Wymiary karty
  const w = 480;
  const h = 240;
  const bevel = 24; // rozmiar ścięcia w pikselach

  // Współczynniki w skali 0–1 (objectBoundingBox)
  const bX = bevel / w;
  const bY = bevel / h;

  // Ścieżka – wszystkie 4 rogi ścięte
  const clipPathD = `M ${bX},0 L ${1-bX},0 L 1,${bY} L 1,${1-bY} L ${1-bX},1 L ${bX},1 L 0,${1-bY} L 0,${bY} Z`;
  const rx = 12 / 480;
  const ry = 12 / 240;

  // Load the three Paint Worklet modules once for this page.
  useChamferBorderWorklet();
  useFrozenGridWorklet();
  useChameleonShadowWorklet();
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  return (
    <div className="grid grid-cols-2 gap-6 justify-center content-center justify-items-center items-center min-h-screen py-12">
      {/* KARTA z 4 ściętymi rogami i efektem chromatycznym */}
      {/* WORKLET SHOWCASE: chamferBorder Paint Worklet added via the
          .chamfer-card class (ambient light-sweep border), stacked on top
          of the pre-existing SVG clip-path + chromatic filter treatment
          below (kept untouched). */}
      <div
        className="relative chamfer-card w-[480px] h-[240px]"
        style={{
          clipPath: 'url(#cardClip)',
          background: 'linear-gradient(110deg in oklch, oklch(0.3294 0.0562 194.77) 0%, oklch(0.304938 0.052052 194.7689) 50%, oklch(0.3311 0.053 194.9) 100%)',
          '--dpr': dpr,
        } as CSSProperties}
      >
        <span className="absolute top-2 left-3 z-20 text-[10px] font-mono tracking-wide text-gold-400/80 pointer-events-none">
          chamferBorder Paint Worklet (added)
        </span>
        <svg className="absolute inset-0 w-full h-full pointer-events-none"
             style={{ opacity: 0.15 }}
             viewBox="0 0 480 240"
             preserveAspectRatio="none"
           >
          <rect width="480" height="240" fill="transparent" />
          <path fill="transparent" d="M0 0h960v480H0z"/>
          <g fill="none">
            <path stroke="var(--color-teal-450)" d="M100 0v150h100v150h200v180"/>
            <path stroke="var(--color-teal-450)" d="M108 50v92h100v150h200v188"/>
            <path stroke="var(--color-teal-200)" d="M120 100v30h100v150h200v200"/>
            <path stroke="var(--color-teal-450)" d="M0 200h150v200h150v80"/>
            <path stroke="var(--color-teal-200)" d="M0 210h140v180h150v90"/>
            <path stroke="var(--color-teal-200)" d="M50 220h80v160h150v100M500 0v200h200v200h20₀v8₀"/>
            <path stroke="var(--color-teal-100)" d="M5₀₀ ₁₆h₁₆v₁₆₈h₂₀₀v₂₀₀h₂₀₀v₉₆"/>
            <path stroke="var(--color-teal-200)" d="M5₀₀ ₃₂h₃₂v₁₃₆h₂₀₀v₂₀₀h₂₀₀v₁₁₂"/>
            <path stroke="var(--color-teal-300)" d="M400 400h200V200h200V0"/>
            <path stroke="var(--color-teal-100)" d="M400 416h216V184h200V0"/>
            <path stroke="var(--color-teal-200)" d="M200 0v100h100V0"/>
            <path stroke="var(--color-teal-100)" d="M220 0v120h60V0"/>
            <path stroke="var(--color-teal-450)" d="M120 130v150"/>
            <path stroke="var(--color-teal-450)" d="M140 390v90"/>
            <path stroke="var(--color-teal-200)" d="M516 184h200"/>
            <circle cx="200" cy="150" r="3" fill="var(--color-teal-200)"/>
            <circle cx="150" cy="400" r="3" fill="var(--color-teal-100)"/>
            <circle cx="600" cy="200" r="3" fill="var(--color-teal-300)"/>
            <circle cx="700" cy="400" r="3" fill="var(--color-teal-200)"/>
            <circle cx="800" cy="200" r="3" fill="var(--color-teal-100)"/>
            <circle cx="414" cy="414" r="3" fill="var(--color-teal-300)"/>
            <path fill="var(--color-teal-200)" d="M300 50h8v8h-8z"/>
            <path fill="var(--color-teal-100)" d="M800 200h12v12h-12z"/>
            <path fill="var(--color-teal-200)" d="M250 250h10v10h-10z"/>
          </g>
        </svg>
        <svg
     className="absolute inset-0 w-full h-full pointer-events-none"
     style={{ opacity: 0.15}}
     viewBox="0 0 480 240"     preserveAspectRatio="none">
  <rect width="480" height="240" fill="transparent" />
 <polyline points="10,10 10,100" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="10,10 100,10" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />
  <polyline points="20,20 20,80" fill="none" stroke="var(--color-teal-300)" strokeWidth="1" />
  <polyline points="20,20 80,20" fill="none" stroke="var(--color-teal-300)" strokeWidth="1" />
  <polyline points="30,30 30,60" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />
  <polyline points="30,30 60,30" fill="none" stroke="var(--color-teal-450)" strokeWidth="1" />
<polyline points="470,10 370,10" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />
  <polyline points="470,10 470,100" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="460,20 380,20" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="460,20 460,80" fill="none" stroke="var(--color-teal-300)" strokeWidth="1" />
  <polyline points="450,30 450,60" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="450,30 400,30" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />
<polyline points="10,230 100,230" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="10,230 10,150" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />
  <polyline points="20,220 90,220" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="20,220 20,160" fill="none" stroke="var(--color-teal-300)" strokeWidth="1" />
  <polyline points="30,210 30,180" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />
  <polyline points="30,210 70,210" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
<polyline points="470,230 470,140" fill="none" stroke="var(--color-teal-300)" strokeWidth="1" />
  <polyline points="470,230 370,230" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="460,220 460,160" fill="none" stroke="var(--color-teal-400)" strokeWidth="1" />
  <polyline points="460,220 380,220" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="450,210 450,180" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="450,210 400,210" fill="none" stroke="var(--color-teal-300)" strokeWidth="1" />
</svg>
        {/* Warstwa SVG z definicjami clip-path, filtrem i ramką */}
         <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
         viewBox="0 0 1 1"
          preserveAspectRatio="none"
        >
          <defs>
            {/* ClipPath dla 4 ściętych rogów */}
            <clipPath id="cardClip" clipPathUnits="objectBoundingBox">
              <path d={clipPathD} />
            </clipPath>

            {/* Filtr chromatyczny (rozszczepienie światła) */}
            <filter id="chromatic-prism">
              {/* Przesunięcia warstw */}
              <feOffset dx="-2" dy="0" in="SourceGraphic" result="red_layer" />
              <feOffset dx="2" dy="0" in="SourceGraphic" result="blue_layer" />

              {/* Red only */}
              <feColorMatrix
                type="matrix"
                in="red_layer"
                result="red_only"
                values="
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 1 0 0
                  0 0 0 1 0"
              />

              {/* Green only */}
              <feColorMatrix
                type="matrix"
                in="SourceGraphic"
                result="green_only"
                values="
                  0 0 0 0 0
                  0 2 0 0 0
                  0 0 1 0 0
                  0 2 0 1 0"
              />

              {/* Blue only */}
              <feColorMatrix
                type="matrix"
                in="blue_layer"
                result="blue_only"
                values="
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 1 0 0
                  0 0 0 1 0"
              />

              {/* Mieszanie */}
              <feBlend mode="screen" in="red_only" in2="green_only" result="rg_mix" />
              <feBlend mode="screen" in="rg_mix" in2="blue_only" />
            </filter>
          </defs>

          {/* Ramka (stroke) z nałożonym filtrem chromatycznym */}
          <path
            d={clipPathD}
            fill="none"
            stroke="var(--color-teal-50)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            filter="url(#chromatic-prism)"
          />
        </svg>

        {/* Treść karty */}
        <div className="w-full h-full flex items-center justify-center text-primary font-heading font-bold text-2xl">
          Desktop
        </div>
      </div>
      <div
  className="relative w-[480px] h-[240px]"
  style={{
    clipPath: 'url(#roundedClip)',
    background: 'linear-gradient(110deg in oklch, oklch(0.4559 0.0788 189.53) 0%, oklch(0.4147 0.0789 184.59) 50%, oklch(0.3833 0.0595 194.96) 100%)',
  }}
>
  {/* ===== WZÓR (tylko ta warstwa ma opacity) ===== */}
  <svg
     className="absolute inset-0 w-full h-full pointer-events-none"
     style={{ opacity: 0.2 }}
     viewBox="0 0 480 240"     preserveAspectRatio="none"
   >
  
  <rect width="480" height="240" fill="transparent" />

  
  <polyline points="10,10 10,100" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="10,10 100,10" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />
  <polyline points="20,20 20,80" fill="none" stroke="var(--color-teal-50)" strokeWidth="1" />
  <polyline points="20,20 80,20" fill="none" stroke="var(--color-teal-25)" strokeWidth="1" />
  <polyline points="30,30 30,60" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />
  <polyline points="30,30 60,30" fill="none" stroke="var(--color-teal-50)" strokeWidth="1" />

  
  <polyline points="470,10 370,10" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />
  <polyline points="470,10 470,100" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="460,20 380,20" fill="none" stroke="var(--color-teal-25)" strokeWidth="1" />
  <polyline points="460,20 460,80" fill="none" stroke="var(--color-teal-50)" strokeWidth="1" />
  <polyline points="450,30 450,60" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="450,30 400,30" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />

  
  <polyline points="10,230 100,230" fill="none" stroke="var(--color-teal-50)" strokeWidth="1" />
  <polyline points="10,230 10,150" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />
  <polyline points="20,220 90,220" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="20,220 20,160" fill="none" stroke="var(--color-teal-25)" strokeWidth="1" />
  <polyline points="30,210 30,180" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />
  <polyline points="30,210 70,210" fill="none" stroke="var(--color-teal-50)" strokeWidth="1" />

  
  <polyline points="470,230 470,140" fill="none" stroke="var(--color-teal-25)" strokeWidth="1" />
  <polyline points="470,230 370,230" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="460,220 460,160" fill="none" stroke="var(--color-teal-100)" strokeWidth="1" />
  <polyline points="460,220 380,220" fill="none" stroke="var(--color-teal-50)" strokeWidth="1" />
  <polyline points="450,210 450,180" fill="none" stroke="var(--color-teal-200)" strokeWidth="1" />
  <polyline points="450,210 400,210" fill="none" stroke="var(--color-teal-25)" strokeWidth="1" />

  
</svg>
  {/* ===== RAMKA SVG ===== */}
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1 1" preserveAspectRatio="none">
    <defs>
      <clipPath id="roundedClip" clipPathUnits="objectBoundingBox">
        <rect x="0" y="0" width="1" height="1" rx={rx} ry={ry} />
      </clipPath>
    </defs>
    <rect
      x="0" y="0" width="1" height="1"
      rx={rx} ry={ry}
      fill="none"
      stroke="var(--color-teal-100)"
      strokeWidth="1.5"
      vectorEffect="non-scaling-stroke"
    />
  </svg>

  {/* ===== TREŚĆ ===== */}
  <div className="w-full h-full flex items-center justify-center">
    Zaokrąglone rogi (SVG)
  </div>
</div>
    
    
    <div
  className="relative w-[480px] h-[240px]"
  style={{
    clipPath: 'url(#cardClip2)',
    filter: 'drop-shadow(1px 1px 2px var(--color-teal-500)) drop-shadow(-1px -1px 2px var(--color-teal-500))',
    background: 'linear-gradient(110deg in oklch, oklch(0.3603 0.0615 194.77) 0%, oklch(0.3912 0.0897 196.94) 50%, oklch(0.4147 0.0789 184.59) 100%)',
  }}
>
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1 1"
    preserveAspectRatio="none"
  >
    <defs>
      <clipPath id="cardClip2" clipPathUnits="objectBoundingBox">
        {/* TYLKO DWA ŚCIĘTE ROGI: prawy-górny i lewy-dolny */}
        <polygon points="0,0 0.9,0 1,0.2 1,1 0.1,1 0,0.8" />
      </clipPath>
    </defs>

    {/* Ramka SVG – dokładnie ten sam kształt */}
    <polygon
      points="0,0 0.9,0 1,0.2 1,1 0.1,1 0,0.8"
      fill="none"
      stroke="var(--color-teal-300)"
      strokeWidth="1.5"
      vectorEffect="non-scaling-stroke"
    />
  </svg>

  <div className="w-full h-full flex items-center justify-center">
    Dwa ścięte rogi (prawy-górny i lewy-dolny)
  </div>
</div>
      <div
        className="w-[480px] h-[240px]"
        style={{
          border: '1px solid var(--color-teal-300)',
          borderRadius: '36px',
          outline: '2px solid var(--color-teal-400)',
          background: 'linear-gradient(110deg in oklch, oklch(0.4147 0.0789 184.59) 0%, oklch(0.4559 0.0788 189.53) 50%, oklch(0.4147 0.0789 184.59) 100%)',
        }}
      />
      
      
      <div
        className="relative u-shadow-chameleon w-[480px] h-[240px]"
        style={{
         border: '2px solid var(--color-teal-300)',
        backdropFilter: 'blur(16px) saturate(160%)',
          borderRadius: '48px',
          background: 'linear-gradient(110deg in oklch, oklch(0.345 0.0587 194.8/0.8) 0%, oklch(0.3618 0.0613 200.12/0.8) 50%, oklch(0.3912 0.0897 196.94/0.8) 100%)',
          '--dpr': dpr,
        } as CSSProperties}
      >
        {/* WORKLET SHOWCASE: sdfChameleonShadow Paint Worklet, wired into
            the existing .u-shadow-chameleon utility (globals.css). */}
        <span className="absolute top-2 left-3 z-20 text-[10px] font-mono tracking-wide text-gold-400/80 pointer-events-none">
          sdfChameleonShadow Paint Worklet (added)
        </span>
      </div>
      <div
        className="relative w-[480px] h-[240px]"
        style={{
          border: '2px solid var(--color-teal-300)',
          borderRadius: '12px',
          filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1))',
          background: 'linear-gradient(110deg in oklch, oklch(0.3955 0.0634 193.37) 0%, oklch(0.4559 0.0788 189.53) 50%, oklch(0.4147 0.0789 184.59) 100%)',
        }}
      >
        {/* WORKLET SHOWCASE: frozenNetworkGrid Paint Worklet, added as an
            overlay layered under the pre-existing static SVG grid lines
            below (kept untouched). */}
        <FrozenBackground className="absolute inset-0 rounded-[12px] overflow-hidden" />
        <span className="absolute top-2 left-3 z-20 text-[10px] font-mono tracking-wide text-gold-400/80 pointer-events-none">
          frozenNetworkGrid Paint Worklet (added)
        </span>
        <svg className="absolute inset-0 w-full h-full pointer-events-none"
             style={{ opacity: 0.14 }}
             viewBox="0 0 480 240"
             preserveAspectRatio="none"
           >
          <rect width="480" height="240" fill="transparent" />
          <path fill="transparent" d="M0 0h960v480H0z"/>
          <g fill="none">
            <path stroke="var(--color-teal-50)" d="M100 0v150h100v150h200v180"/>
            <path stroke="var(--color-teal-50)" d="M108 50v92h100v150h200v188"/>
            <path stroke="var(--color-teal-100)" d="M120 100v30h100v150h200v200"/>
            <path stroke="var(--color-teal-50)" d="M0 200h150v200h150v80"/>
            <path stroke="var(--color-teal-25)" d="M0 210h140v180h150v90"/>
            <path stroke="var(--color-teal-100)" d="M50 220h80v160h150v100M500 0v200h200v200h20₀v8₀"/>
            <path stroke="var(--color-teal-50)" d="M5₀₀ ₁₆h₁₆v₁₆₈h₂₀₀v₂₀₀h₂₀₀v₉₆"/>
            <path stroke="var(--color-teal-25)" d="M5₀₀ ₃₂h₃₂v₁₃₆h₂₀₀v₂₀₀h₂₀₀v₁₁₂"/>
            <path stroke="#e0f2f2" d="M400 400h200V200h200V0"/>
            <path stroke="var(--color-teal-100)" d="M400 416h216V184h200V0"/>
            <path stroke="var(--color-teal-100)" d="M200 0v100h100V0"/>
            <path stroke="var(--color-teal-100)" d="M220 0v120h60V0"/>
            <path stroke="var(--color-teal-50)" d="M120 130v150"/>
            <path stroke="var(--color-teal-50)" d="M140 390v90"/>
            <path stroke="var(--color-teal-100)" d="M408 292v188"/>
            <path stroke="var(--color-teal-25)" d="M516 184h200"/>
            <circle cx="200" cy="150" r="3" fill="var(--color-teal-25)"/>
            <circle cx="150" cy="400" r="3" fill="var(--color-teal-50)"/>
            <circle cx="600" cy="200" r="3" fill="var(--color-teal-100)"/>
            <circle cx="700" cy="400" r="3" fill="var(--color-teal-100)"/>
            <circle cx="800" cy="200" r="3" fill="var(--color-teal-100)"/>
            <circle cx="414" cy="414" r="3" fill="var(--color-teal-50)"/>
            <path fill="var(--color-teal-25)" d="M300 50h8v8h-8z"/>
            <path fill="var(--color-teal-100)" d="M800 200h12v12h-12z"/>
            <path fill="var(--color-teal-25)" d="M250 250h10v10h-10z"/>
          </g>
        </svg>
      </div>
    </div>
  );
}

