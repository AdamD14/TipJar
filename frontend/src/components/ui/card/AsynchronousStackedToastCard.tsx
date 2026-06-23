import React from 'react';

export interface AsynchronousStackedToastCardProps {
  title?: string;
  description?: string;
  stackIndex?: number; // Wyznacza skalę i z-index w osi Z
  toastDepth?: string; // np. "0px", "-16px"
  isDegraded?: boolean; // Prawda wyłącza obciążające GPU filtry tła
}

/**
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/notifications-preview/
 * Karta asynchronicznego stosu powiadomień w osi Z.
 */
export const AsynchronousStackedToastCard: React.FC<AsynchronousStackedToastCardProps> = ({
  title = 'AsynchronousStackedToastCard',
  description = '100.00 USDC verified on-chain.',
  stackIndex = 0,
  toastDepth = '0px',
  isDegraded = false
}) => {
  return (
    <div
      className="toast-stack-container relative transition-all duration-[400ms]"
      style={{
        transform: `translateY(${toastDepth}) scale(${1 - 0.05 * stackIndex})`,
        zIndex: 9999 - stackIndex,
        filter: `brightness(${1 - 0.15 * stackIndex})`
      }}
    >
      <article className={`toast-card rounded-xl p-4 flex gap-4 ${isDegraded ? 'background-degraded bg-[#001F1F]' : 'bg-[#004C4C] backdrop-blur-md shadow-2xl'}`}>
        {!isDegraded && (
          <div className="toast-icon w-4 h-4 bg-[#FFD700] rounded-full align-self-center animate-pulse flex-shrink-0" />
        )}
        <div className="toast-content flex flex-col min-w-0">
          <span className="text-[clamp(1rem,0.5vw+0.875rem,1.125rem)] font-bold text-white font-['IBM_Plex_Sans'] truncate">
            {title}
          </span>
          <span className="text-xs text-[#CCF7F4]/80 font-mono mt-0.5 truncate">
            {description}
          </span>
        </div>
      </article>
    </div>
  );
};

export default AsynchronousStackedToastCard;
