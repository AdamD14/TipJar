import React from 'react';

export interface WideRefractiveChartCardProps {
  title?: string;
  timeframe?: string;
  sparklinePoints?: string;
}

/**
 * WARIANT 7: Horyzontalna Karta Wykresów z Optyką Załamania (Wide Refractive Chart Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/analytics/earnings/
 * Opis: Zaawansowane ugięcie tła i aberracji optycznych za pomocą filtrów wektorowych SVG.
 */
export const WideRefractiveChartCard: React.FC<WideRefractiveChartCardProps> = ({
  title = 'WideRefractiveChartCard',
  timeframe = 'Ostatnie 7 dni',
  sparklinePoints = 'M0,35 Q10,15 25,25 T50,10 T75,20 T100,5'
}) => {
  return (
    <>
      <style>{`
        .base-card {
          position: relative;
          clip-path: url(#squircle-clip);
          background-color: var(--teal-800, #002F2F);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          contain: layout paint style;
          isolation: isolate;
        }
        .card-bento-wide {
          grid-column: span 2;
          display: flex;
          flex-direction: column;
          padding: 24px; 
          min-height: 220px;
        }
        .glass-refractive-surface {
          background-color: rgba(0, 31, 31, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          filter: url(#liquid-glass-refraction);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 24px;
        }
        .vector-chart-container {
          flex-grow: 1;
          position: relative;
        }
        .smooth-vector-line {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .smooth-vector-line path {
          vector-effect: non-scaling-stroke;
          stroke-width: 2;
          stroke-linejoin: round;
        }
      `}</style>

      {/* Wyizolowany filtr refrakcji szkła i maskowanie superelipsy */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="squircle-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0.0575 0.0575,0 0.50 0 0.9425,0 1,0.0575 1,0.5 1,0.9425 0.9425,1 0.5,1 0.0575,1 0,0.9425 0,0.5" />
          </clipPath>
          <filter id="liquid-glass-refraction" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.4 0" in="noise" result="softNoise" />
            <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="12" xChannelSelector="R" yChannelSelector="G" result="refracted" />
            <feOffset dx="1.5" dy="0" in="refracted" result="red-shift"/>
            <feOffset dx="-1.5" dy="0" in="refracted" result="blue-shift"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" in="red-shift" result="red-channel"/> 
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" in="blue-shift" result="blue-channel"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" in="refracted" result="green-channel"/>
            <feBlend mode="screen" in="red-channel" in2="blue-channel" result="magenta-cyan" />
            <feBlend mode="screen" in="magenta-cyan" in2="green-channel" />
          </filter>
        </defs>
      </svg>

      <section className="base-card card-bento-wide glass-refractive-surface">
        <div className="chart-header">
          <h3 className="text-white text-md font-semibold m-0">{title}</h3>
          <span className="text-[#5C7A7A] text-xs font-mono">{timeframe}</span>
        </div>
        <div className="vector-chart-container h-24">
          <svg preserveAspectRatio="none" viewBox="0 0 100 40" className="smooth-vector-line">
            <path 
              d={sparklinePoints} 
              fill="none" 
              stroke="var(--purple-300, #9D4EDD)" 
            />
            <path 
              d={`${sparklinePoints} L100,40 L0,40 Z`} 
              fill="url(#purple-fade-refractive)" 
            />
            <linearGradient id="purple-fade-refractive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#9D4EDD" stopOpacity="0"/>
            </linearGradient>
          </svg>
        </div>
      </section>
    </>
  );
};

export default WideRefractiveChartCard;