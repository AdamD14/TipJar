"use client";
import React, { useState } from 'react';

export interface SmartContractActionCardProps {
  label?: string;
  onActionExecute?: () => Promise<void> | void;
}

/**
 * WARIANT 4: Karta Głównej Akcji Blockchain (Smart Contract Action Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/quick-actions/
 * Opis: Zapobiega Cumulative Layout Shift (CLS) podczas przejścia w stan ładowania (Grid Stacking).
 */
export const SmartContractActionCard: React.FC<SmartContractActionCardProps> = ({
  label = 'SmartContractActionCard',
  onActionExecute
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (onActionExecute) {
        await onActionExecute();
      }
    } finally {
      setIsLoading(false);
    }
  };

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
        .card-action {
          width: 100%;
          padding: 20px 32px;
          background: var(--teal-800, #002F2F);
          border: 1px solid var(--purple-300, #9D4EDD);
          cursor: pointer;
          outline: none;
          transition: background 200ms var(--ease-standard, cubic-bezier(0.4, 0.0, 0.2, 1)), border-color 200ms;
        }
        .card-action:hover:not(:disabled) {
          background: var(--teal-700, #004545);
          border-color: #B388FF;
        }
        .action-grid-stack {
          display: grid;
          place-items: center;
        }
        .action-text, .action-spinner {
          grid-area: 1 / 1;
          transition: opacity 200ms var(--ease-standard, cubic-bezier(0.4, 0.0, 0.2, 1)), visibility 200ms;
        }
        .action-text {
          color: var(--purple-300, #9D4EDD);
          font-weight: 600;
          font-size: 1.1rem;
        }
        .action-spinner {
          opacity: 0;
          visibility: hidden;
        }
        .card-action.is-loading {
          cursor: wait;
          border-color: var(--teal-700, #004545);
        }
        .card-action.is-loading .action-text {
          opacity: 0;
          visibility: hidden;
        }
        .card-action.is-loading .action-spinner {
          opacity: 1;
          visibility: visible;
        }
        .spinner-svg {
          width: 24px;
          height: 24px;
        }
        .spinner-svg circle {
          stroke: var(--purple-300, #9D4EDD);
          stroke-linecap: round;
          animation: spinnerRotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          stroke-dasharray: 90, 150;
          stroke-dashoffset: 0;
        }
        @keyframes spinnerRotate {
          100% { transform: rotate(360deg); }
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

      <button 
        onClick={handleClick}
        className={`base-card card-action ${isLoading ? 'is-loading' : ''}`} 
        aria-busy={isLoading}
        disabled={isLoading}
      >
        <div className="action-grid-stack">
          <span className="action-text">{label}</span>
          <span className="action-spinner" aria-hidden="true">
            <svg viewBox="0 0 50 50" className="spinner-svg">
              <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
            </svg>
          </span>
        </div>
      </button>
    </>
  );
};

export default SmartContractActionCard;