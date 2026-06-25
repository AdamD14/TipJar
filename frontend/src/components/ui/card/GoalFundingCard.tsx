"use client";
import React from 'react';

export interface GoalFundingCardProps {
  title?: string;
  raised?: string;
  target?: string;
  currency?: string;
}

export const GoalFundingCard: React.FC<GoalFundingCardProps> = ({
  title = 'GoalFundingCard',
  raised = '1,450',
  target = '2,000',
  currency = 'USDC'
}) => {
  return (
    <article
      className="glass-liquid gpu-layer shadow-maestro elevation-z-1 rounded-xl p-6 flex justify-between items-center"
      style={{
        transition: 'filter 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'brightness(1.15)';
        const spinner = e.currentTarget.querySelector('.spinner-royal') as SVGSVGElement | null;
        if (spinner) spinner.style.animationDuration = '0.8s';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = '';
        const spinner = e.currentTarget.querySelector('.spinner-royal') as SVGSVGElement | null;
        if (spinner) spinner.style.animationDuration = '2s';
      }}
    >
      <style>{`
        .spinner-royal {
          animation: rotate 2s linear infinite;
          width: 48px;
          height: 48px;
          transition: animation-duration 0.3s ease;
        }
        .fluid-path {
          stroke-width: 3.36px;
          stroke-linecap: round;
          animation: fluid-dash 1.5s ease-in-out infinite;
        }
        @keyframes rotate {
          100% { transform: rotate(360deg); }
        }
        @keyframes fluid-dash {
          0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
          100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
        }
        @media (prefers-reduced-motion: reduce) {
          .spinner-royal { animation-duration: 10s; }
          .fluid-path { animation: none; stroke-dasharray: 126; }
        }
      `}</style>

      <div className="min-w-0 flex-1 mr-4">
        <h3
          className="font-heading font-bold text-md truncate"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        <span
          className="text-xs block mt-1"
          style={{
            color: 'var(--gold-400)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {raised} / {target} {currency}
        </span>
      </div>

      <div className="flex-shrink-0">
        <svg className="spinner-royal" viewBox="0 0 50 50" aria-hidden="true">
          <defs>
            <linearGradient id="gold-purple-flow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--gold-400)" />
              <stop offset="100%" stopColor="var(--purple-300)" />
            </linearGradient>
          </defs>
          <circle className="fluid-path" cx="25" cy="25" r="20" fill="none" stroke="url(#gold-purple-flow)" />
        </svg>
      </div>
    </article>
  );
};

export default GoalFundingCard;
