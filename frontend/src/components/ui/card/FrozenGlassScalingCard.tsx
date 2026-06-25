"use client";
import React from 'react';

export interface FrozenGlassScalingCardProps {
  title?: string;
  nodesActive?: number;
  nodesTotal?: number;
  sparklinePoints?: string;
}

export const FrozenGlassScalingCard: React.FC<FrozenGlassScalingCardProps> = ({
  title = 'FrozenGlassScalingCard',
  nodesActive = 150,
  nodesTotal = 500,
  sparklinePoints = 'M0,20 L10,15 L20,18 L30,10 L40,12 L50,5 L60,8 L70,2 L80,4 L90,0 L100,2'
}) => {
  return (
    <article
      className="glass-liquid gpu-layer rounded-2xl p-6 relative overflow-hidden"
      style={{
        opacity: 0.92,
        transition: 'opacity 0.3s ease, filter 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1';
        const svg = e.currentTarget.querySelector('.sparkline-path') as SVGSVGElement | null;
        if (svg) svg.style.filter = 'drop-shadow(0 0 6px color-mix(in oklch, var(--gold-400) 40%, transparent))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.92';
        const svg = e.currentTarget.querySelector('.sparkline-path') as SVGSVGElement | null;
        if (svg) svg.style.filter = '';
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col">
        <h3
          className="font-heading font-bold"
          style={{
            fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {title}
        </h3>

        <div className="sparkline-container w-full h-12 my-4 overflow-visible">
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
            <path
              className="sparkline-path"
              d={sparklinePoints}
              fill="none"
              stroke="var(--gold-400)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              style={{ transition: 'filter 0.3s ease' }}
            />
          </svg>
        </div>

        <div
          className="text-sm font-semibold flex items-baseline gap-3"
          style={{
            color: 'var(--gold-400)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {nodesActive} / {nodesTotal} Nodes Active
        </div>
      </div>
    </article>
  );
};

export default FrozenGlassScalingCard;
