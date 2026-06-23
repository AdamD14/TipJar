import React from 'react';

export interface GoalFundingCardProps {
  title?: string;
  raised?: string;
  target?: string;
  currency?: string;
}

/**
 * KARTA VI: Interaktywny Wskaźnik Celu (Liquid Spinner Funding Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/active-goals/
 */
export const GoalFundingCard: React.FC<GoalFundingCardProps> = ({
  title = 'GoalFundingCard',
  raised = '1,450',
  target = '2,000',
  currency = 'USDC'
}) => {
  return (
    <>
      <style>{`
        .card-goal-funding {
          background: var(--teal-800);
          border-radius: 12px; 
          padding: 24px;
          display: flex; 
          justify-content: space-between; 
          align-items: center;
        }
        .spinner-royal {
          animation: rotate 2s linear infinite;
        }
        .spinner-royal.size-m {
          width: 48px; 
          height: 48px;
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

      <article className="card-goal-funding">
        <div className="goal-header min-w-0 flex-1 mr-4">
          <h3 className="font-mukta text-white text-md font-bold truncate">{title}</h3>
          <span className="font-plex-mono text-[#FFD700] text-xs block mt-1" style={{ fontFeatureSettings: "'tnum'" }}>
            {raised} / {target} {currency}
          </span>
        </div>
        <div className="liquid-spinner-wrapper flex-shrink-0">
          <svg className="spinner-royal size-m" viewBox="0 0 50 50" aria-hidden="true">
            <defs>
              <linearGradient id="gold-purple-flow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--gold-400, #FFD700)" />
                <stop offset="100%" stopColor="var(--purple-300, #4D194D)" />
              </linearGradient>
            </defs>
            <circle className="fluid-path" cx="25" cy="25" r="20" fill="none" stroke="url(#gold-purple-flow)"></circle>
          </svg>
        </div>
      </article>
    </>
  );
};

export default GoalFundingCard;