import React from 'react';

export interface BentoCellMicroCardProps {
  percentageChange?: string;
  metricValue?: string;
  metricLabel?: string;
}

/**
 * WARIANT 6: Karta Asymetrycznej Siatki Analitycznej Bento (Bento Cell 1x1 Metric)
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/growth-snapshot/
 * Opis: Skompresowany, zbalansowany rzut metryczny z rygorystycznym pozycjonowaniem aspect-ratio.
 */
export const BentoCellMicroCard: React.FC<BentoCellMicroCardProps> = ({
  percentageChange = '+14%',
  metricValue = 'Top 5%',
  metricLabel = 'BentoCellMicroCard'
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
        .card-bento-micro {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px;
          aspect-ratio: 1 / 1;
          grid-column: span 1;
          grid-row: span 1;
          border: 1px solid rgba(255, 255, 255, 0.03);
        }
        .bento-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .stat-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(255,215,0,0.2), transparent);
          color: var(--gold-400, #FFD700);
          display: grid;
          place-items: center;
        }
        .trend-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 100px;
        }
        .trend-badge.positive {
          background-color: rgba(105, 240, 174, 0.15);
          color: var(--success-light, #69F0AE);
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

      <div className="base-card card-bento-micro">
        <div className="bento-header">
          <div className="stat-icon">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </div>
          <span className="trend-badge positive optical-typography-align">
            {percentageChange}
          </span>
        </div>
        <div className="bento-data mt-auto">
          <h3 className="text-white text-xl font-bold leading-tight m-0 mb-1">
            {metricValue}
          </h3>
          <span className="text-[#5C7A7A] text-xs font-semibold block">
            {metricLabel}
          </span>
        </div>
      </div>
    </>
  );
};

export default BentoCellMicroCard;
