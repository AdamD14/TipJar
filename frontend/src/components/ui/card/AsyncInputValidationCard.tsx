"use client";
import React, { useState } from 'react';

export interface AsyncInputValidationCardProps {
  label?: string;
  errorMessage?: string;
  defaultVal?: string;
  minThreshold?: number;
  onValueChange?: (val: string) => void;
}

/**
 * WARIANT 5: Karta Transakcyjna (Async Input & Validation Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/wallet/deposit/
 * Opis: Twardy opór materiału, asynchroniczna walidacja WAI-ARIA i płynne unoszenie etykiety.
 */
export const AsyncInputValidationCard: React.FC<AsyncInputValidationCardProps> = ({
  label = 'AsyncInputValidationCard',
  errorMessage = 'Wartość transakcji poniżej minimalnego progu sieciowego.',
  defaultVal = '',
  minThreshold = 1,
  onValueChange
}) => {
  const [val, setVal] = useState(defaultVal);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setVal(rawVal);
    
    // Prosta asynchroniczna walidacja numeryczna na poziomie komponentu
    const numVal = parseFloat(rawVal);
    const invalid = isNaN(numVal) || numVal < minThreshold;
    setIsInvalid(invalid);

    if (onValueChange) {
      onValueChange(rawVal);
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
        .card-form {
          padding: 32px;
          background-color: var(--teal-700, #004545);
        }
        .input-orchestrator {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .transaction-input {
          width: 100%;
          background: transparent;
          border: 1px solid var(--teal-800, #002F2F);
          border-bottom: 2px solid var(--teal-800, #002F2F);
          color: #FFFFFF;
          padding: 24px 16px 8px 16px;
          font-family: var(--font-primary, 'Mukta Malar', sans-serif);
          font-size: 1.25rem;
          border-radius: 4px 4px 0 0;
          transition: border-color 150ms var(--ease-standard, cubic-bezier(0.4, 0.0, 0.2, 1)), background 150ms;
        }
        .floating-label {
          position: absolute;
          left: 16px;
          top: 18px;
          color: #5C7A7A;
          pointer-events: none;
          font-size: 1.1rem;
          transition: transform 150ms ease-out, font-size 150ms, color 150ms;
          transform-origin: left top;
        }
        .transaction-input:focus ~ .floating-label,
        .transaction-input:not(:placeholder-shown) ~ .floating-label {
          transform: translateY(-12px) scale(0.75);
          color: var(--purple-300, #9D4EDD);
          font-weight: 600;
        }
        .transaction-input:focus {
          outline: none; 
          border-bottom-color: var(--purple-300, #9D4EDD);
          background: rgba(0, 31, 31, 0.4);
        }
        .transaction-input[aria-invalid="true"] {
          border-color: var(--error-base, #FF5252);
          border-bottom-color: var(--error-base, #FF5252);
        }
        .transaction-input[aria-invalid="true"] ~ .floating-label {
          color: var(--error-base, #FF5252);
        }
        .error-feedback {
          margin-top: 8px;
          color: var(--error-base, #FF5252);
          font-size: 0.875rem;
          opacity: 0;
          height: 0;
          overflow: hidden;
          transition: opacity 200ms, height 200ms;
        }
        .transaction-input[aria-invalid="true"] ~ .error-feedback {
          opacity: 1;
          height: auto;
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

      <form className="base-card card-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-orchestrator">
          <input 
            type="text" 
            id="amount-input" 
            value={val}
            onChange={handleInputChange}
            className="transaction-input font-bold" 
            required 
            aria-invalid={isInvalid} 
            aria-describedby="amount-error" 
            placeholder=" " 
          />
          <label htmlFor="amount-input" className="floating-label">
            {label}
          </label>
          <div id="amount-error" className="error-feedback" aria-live="polite">
            {errorMessage}
          </div>
        </div>
      </form>
    </>
  );
};

export default AsyncInputValidationCard;