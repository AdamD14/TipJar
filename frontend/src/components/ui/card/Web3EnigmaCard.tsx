import React from 'react';

export interface Web3EnigmaCardProps {
  title?: string;
  statusText?: string;
}

export const Web3EnigmaCard: React.FC<Web3EnigmaCardProps> = ({
  title = 'Web3EnigmaCard',
  statusText = 'Gas Station Sponsored'
}) => {
  return (
    <>
      <style>{`
        .card-web3-enigma:hover {
          filter: brightness(1.04);
        }
        .card-web3-enigma:hover .status-orb {
          filter: brightness(1.4);
        }
        .status-orb {
          transition: filter 0.3s ease;
        }
      `}</style>

      <article
        className="card-web3-enigma rounded-xl relative overflow-hidden p-8 gpu-layer"
        style={{
          backgroundColor: 'var(--teal-900, #001F1F)',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundColor: 'color-mix(in oklch, var(--teal-700, #004C4C) 15%, transparent)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        />
        <div className="node-status-core relative z-20 flex items-center gap-4">
          <div
            className="status-orb w-3.5 h-3.5 rounded-full"
            aria-hidden="true"
            style={{
              backgroundColor: 'var(--gold-400, #FFD700)',
              animation: 'pulse-breath 3s ease-in-out infinite',
            }}
          />
          <div className="node-metrics flex flex-col min-w-0">
            <span
              className="text-[clamp(1rem,0.5vw+0.875rem,1.125rem)] font-bold truncate"
              style={{
                color: 'var(--color-text-primary, #f2f7f7)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {title}
            </span>
            <span
              className="text-xs truncate"
              style={{
                color: 'color-mix(in oklch, var(--color-text-tertiary, #CCF7F4) 75%, transparent)',
                fontFamily: 'var(--font-body)',
                fontFeatureSettings: '"tnum"',
              }}
            >
              {statusText}
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export default Web3EnigmaCard;
