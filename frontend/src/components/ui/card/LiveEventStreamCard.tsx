import React from 'react';

export interface LiveEventStreamCardProps {
  title?: string;
  amount?: string;
  currency?: string;
}

/**
 * WARIANT 3: Karta Asynchronicznego Powiadomienia SSE (Live Event Stream Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/notifications-preview/
 * Opis: Lekka karta powiadomienia oparta o natywne animacje i precyzyjne indeksowanie Z-axis.
 */
export const LiveEventStreamCard: React.FC<LiveEventStreamCardProps> = ({
  title = 'LiveEventStreamCard',
  amount = '5.00',
  currency = 'USDC'
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
        .card-notification {
          display: flex;
          position: relative;
          background: var(--teal-900, #001F1F);
          min-width: 320px;
          animation: slideInNotify 400ms var(--ease-enter, cubic-bezier(0.16, 1, 0.3, 1)) forwards;
        }
        @keyframes slideInNotify {
          0% { transform: translateY(24px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>

      {/* Współdzielona struktura maskowania */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="squircle-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0.0575 0.0575,0 0.50 0 0.9425,0 1,0.0575 1,0.5 1,0.9425 0.9425,1 0.5,1 0.0575,1 0,0.9425 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      <output className="base-card card-notification" aria-live="polite" role="status">
        <div className="w-1 bg-[#69F0AE] flex-shrink-0" />
        <div className="p-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-[rgba(105,240,174,0.1)] flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#69F0AE" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white font-medium text-sm truncate">{title}</span>
            <span className="text-[#69F0AE] font-semibold text-xs font-mono mt-0.5">
              + {amount} {currency}
            </span>
          </div>
        </div>
      </output>
    </>
  );
};

export default LiveEventStreamCard;