"use client";
import React, { useRef } from 'react';

export interface PeripheralDriftIllusionCardProps {
  title?: string;
}

export const PeripheralDriftIllusionCard: React.FC<PeripheralDriftIllusionCardProps> = ({
  title = 'PeripheralDriftIllusionCard',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleHover = (entering: boolean) => {
    if (!svgRef.current) return;
    if (entering) {
      svgRef.current.style.animation = 'driftPulse 0.6s linear';
    } else {
      svgRef.current.style.animation = '';
    }
  };

  return (
    <article
      className="glass-liquid gpu-layer relative flex items-center p-6 gap-6 rounded-2xl"
      style={{
        border: '1px solid color-mix(in oklch, var(--teal-100) 15%, transparent)',
        transition: 'filter 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.03)'; handleHover(true); }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = ''; handleHover(false); }}
    >
      <div
        className="w-[120px] h-[120px] flex-shrink-0"
        style={{ shapeRendering: 'crispEdges' }}
      >
        <svg
          ref={svgRef}
          width="120"
          height="120"
          viewBox="0 0 200 200"
          className="w-full h-full"
        >
          <defs>
            <g id="drift-pattern-react">
              <path d="M50,50 L100,0 L100,50 Z" fill="#000000" />
              <path d="M50,50 L100,50 L100,100 Z" fill="#333333" />
              <path d="M50,50 L0,100 L50,100 Z" fill="#FFFFFF" />
              <path d="M50,50 L0,50 L0,0 Z" fill="#E6E6E6" />
            </g>
          </defs>
          <use href="#drift-pattern-react" x="0" y="0" transform="rotate(0, 50, 50)" />
          <use href="#drift-pattern-react" x="100" y="0" transform="rotate(90, 150, 50)" />
          <use href="#drift-pattern-react" x="0" y="100" transform="rotate(-90, 50, 150)" />
          <use href="#drift-pattern-react" x="100" y="100" transform="rotate(180, 150, 150)" />
        </svg>
      </div>
      <div>
        <h3
          className="font-semibold font-heading"
          style={{ color: 'var(--color-text-primary)', fontSize: 'clamp(1.2rem, 1.5vw + 0.875rem, 1.5rem)' }}
        >
          {title}
        </h3>
      </div>

      <style>{`
        @keyframes driftPulse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(90deg); }
        }
      `}</style>
    </article>
  );
};

export default PeripheralDriftIllusionCard;
