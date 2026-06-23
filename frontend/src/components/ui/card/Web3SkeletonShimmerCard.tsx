import React from 'react';

/**
 * WARIANT 8: Karta Asynchronicznego Wygaszania / Oczekiwania Systemu (Web3 Skeleton Shimmer Card)
 * LOKALIZACJA W DRZEWIE: Generyczny element ładowania asynchronicznego (Layout / Feed / Wallet)
 * Opis: Optymalizacja Shimmera na procesory graficzne (GPU) za pomocą transformacji TranslateX.
 */
export const Web3SkeletonShimmerCard: React.FC = () => {
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
        .card-skeleton-loader {
          padding: 32px;
          background-color: var(--teal-800, #002F2F);
          position: relative;
        }
        .skeleton-glow-track {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(0, 69, 69, 0.5) 50%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: shimmerTranslate 1.8s infinite linear;
          z-index: 10;
          pointer-events: none;
        } 
        @keyframes shimmerTranslate {
          100% { transform: translateX(100%); }
        }
        .skeleton-orb {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--teal-700, #004545);
        }
        .skeleton-header {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }
        .skeleton-bar-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          flex-grow: 1;
        }
        .skeleton-bar {
          height: 12px;
          border-radius: 4px;
          background-color: var(--teal-700, #004545);
        }
        .title-bar { width: 60%; height: 16px; }
        .subtitle-bar { width: 35%; }
        .full-bar { width: 100%; margin-bottom: 12px; }
        .mid-bar { width: 75%; }
      `}</style>

      {/* Współdzielona struktura maskowania */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="squircle-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0.0575 0.0575,0 0.50 0 0.9425,0 1,0.0575 1,0.5 1,0.9425 0.9425,1 0.5,1 0.0575,1 0,0.9425 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      <div className="base-card card-skeleton-loader" aria-busy="true" aria-label="Synchronizacja warstwy danych">
        <div className="skeleton-glow-track"></div>
        <div className="skeleton-header">
          <div className="skeleton-orb"></div>
          <div className="skeleton-bar-wrapper">
            <div className="skeleton-bar title-bar"></div>
            <div className="skeleton-bar subtitle-bar"></div>
          </div>
        </div>
        <div className="skeleton-body">
          <div className="skeleton-bar full-bar"></div>
          <div className="skeleton-bar mid-bar"></div>
        </div>
      </div>
    </>
  );
};

export default Web3SkeletonShimmerCard;
