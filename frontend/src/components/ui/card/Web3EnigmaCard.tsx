import React from 'react';

export interface Web3EnigmaCardProps {
  title?: string;
  statusText?: string;
}

/**
 * LOKALIZACJA W DRZEWIE: creator-desktop/wallet/connected-wallets/ (alternatywnie: desktop/live-activity/)
 * Bezpieczny Enklawa odrzucająca złożoność on-chain na rzecz interfejsu Web2.5.
 */
export const Web3EnigmaCard: React.FC<Web3EnigmaCardProps> = ({
  title = 'Web3EnigmaCard',
  statusText = 'Gas Station Sponsored'
}) => {
  return (
    <article className="crypto-node-card bg-[#001F1F] rounded-xl relative overflow-hidden p-8" style={{ transform: 'translate3d(0, 0, 0)' }}>
      <div className="node-glass-layer absolute inset-0 bg-[rgba(0,76,76,0.15)] backdrop-blur-xl z-10" />
      <div className="node-status-core relative z-20 flex items-center gap-4">
        <div 
          className="status-orb w-3.5 h-3.5 rounded-full bg-[#4D194D] shadow-[0_0_16px_#4D194D]" 
          aria-hidden="true" 
          style={{ animation: 'breathe 3s ease-in-out infinite' }}
        />
        <div className="node-metrics flex flex-col min-w-0">
          <span className="text-[clamp(1rem,0.5vw+0.875rem,1.125rem)] font-bold text-white font-['IBM_Plex_Sans'] truncate">
            {title}
          </span>
          <span className="text-xs text-[#CCF7F4]/75 font-mono truncate">
            {statusText}
          </span>
        </div>
      </div>
    </article>
  );
};

export default Web3EnigmaCard;
