import React from 'react';

export interface UsdcFinancialSummaryCardProps {
  balance?: string;
  label?: string;
  token?: string;
}

/**
 * WARIANT 2: Karta Głównego Salda (USDC Financial Summary Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/wallet/balance/
 * Opis: Prezentacja salda USDC zabezpieczona przed drganiami tekstu ("Financial Jitter") za pomocą tnum.
 */
export const UsdcFinancialSummaryCard: React.FC<UsdcFinancialSummaryCardProps> = ({
  balance = '4,250.00',
  label = 'UsdcFinancialSummaryCard',
  token = 'USDC'
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
        .card-finance {
          padding: 32px;
          background: linear-gradient(110deg, var(--teal-800, #002F2F) 0%, rgba(0, 69, 69, 0.3) 100%);
          border: 1px solid var(--teal-700, #004545);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .token-badge {
          background: rgba(255, 215, 0, 0.1);
          color: var(--gold-400, #FFD700);
          padding: 4px 12px; 
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.875rem;
          border: 1px solid rgba(255, 215, 0, 0.25);
        }
        .tabular-data {
          font-family: var(--font-primary, 'Mukta Malar', sans-serif);
          font-feature-settings: "tnum";
          color: var(--gold-400, #FFD700);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.02em;
          text-shadow: 0 0 24px var(--gold-bloom, rgba(255, 215, 0, 0.15));
        }
        .finance-chart-abstract {
          height: 48px;
          width: 100%;
          margin-top: 32px;
          background: repeating-linear-gradient(90deg, var(--teal-700, #004545) 0 4px, transparent 4px 12px);
          mask-image: linear-gradient(to right, black 20%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, black 20%, transparent 100%);
          opacity: 0.5;
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

      <section className="base-card card-finance" aria-labelledby="balance-heading">
        <div className="flex justify-between items-center mb-6">
          <span id="balance-heading" className="text-[#D6EBEB] text-sm font-semibold tracking-wider uppercase">
            {label}
          </span>
          <div className="token-badge" aria-hidden="true">
            {token}
          </div>
        </div>
        <div>
          <h2 className="tabular-data font-bold">
            {balance}
          </h2>
        </div>
        <div className="finance-chart-abstract" aria-hidden="true"></div>
      </section>
    </>
  );
};

export default UsdcFinancialSummaryCard;
