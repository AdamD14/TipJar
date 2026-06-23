import React from 'react';

export interface DestructiveRollbackCardProps {
  title?: string;
  errorMessage?: string;
  buttonText?: string;
  onRetryClick?: () => void;
}

/**
 * WARIANT 9: Karta Porażki Walidacyjnej i Odrzucenia (Destructive Rollback Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/wallet/transactions/ (alternatywnie: wallet/settings/)
 */
export const DestructiveRollbackCard: React.FC<DestructiveRollbackCardProps> = ({
  title = 'DestructiveRollbackCard',
  errorMessage = 'Zewnętrzna sieć odrzuciła podpis transakcji (Gas Error). Twoje saldo pozostało nienaruszone.',
  buttonText = 'Ponów próbę sieciową',
  onRetryClick
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
        .card-rollback {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 24px;
          background-color: var(--error-dark, #3D1010);
          border-left: 4px solid var(--error-base, #FF5252);
        }
        @media (min-width: 640px) {
          .card-rollback {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        .btn-retry {
          background: transparent;
          color: var(--error-base, #FF5252);
          border: 1px solid var(--error-base, #FF5252);
          padding: 10px 20px;
          border-radius: 6px;
          font-family: var(--font-primary, 'Mukta Malar', sans-serif);
          font-weight: 600;
          cursor: pointer;
          transition: all 150ms var(--ease-standard, cubic-bezier(0.4, 0.0, 0.2, 1));
          white-space: nowrap;
        }
        .btn-retry:hover {
          background: var(--error-base, #FF5252);
          color: var(--error-dark, #3D1010);
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

      <output className="base-card card-rollback" role="alert">
        <div className="flex gap-4 items-start">
          <div className="text-[#FF5252] flex-shrink-0 mt-0.5">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[#FF5252] text-lg font-semibold m-0 mb-1">
              {title}
            </h3>
            <p className="text-[#D6EBEB] text-sm m-0 leading-relaxed">
              {errorMessage}
            </p>
          </div>
        </div>
        <button onClick={onRetryClick} className="btn-retry text-sm">
          {buttonText}
        </button>
      </output>
    </>
  );
};

export default DestructiveRollbackCard;
