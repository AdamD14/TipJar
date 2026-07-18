```react
import React from 'react';

export interface CreatorIdentityHeroCardProps {
  name?: string;
  username?: string;
  avatarUrl?: string;
  onCardClick?: () => void;
}

/**
 * WARIANT 1: Karta Tożsamości Twórcy (Creator Identity Hero Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/creator-pulse/
 * Opis: Punkt centralny ekonomii twórców z płynną typografią i geometrycznym tłem wektorowym.
 */
export const CreatorIdentityHeroCard: React.FC<CreatorIdentityHeroCardProps> = ({
  name = 'Web3 Evangelist',
  username = '@decentralized_mind',
  avatarUrl = 'https://assets.tipjar.com/avatars/evangelist.webp',
  onCardClick
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
        .card-hero {
          display: flex;
          flex-direction: column;
          padding: 32px;
          background: linear-gradient(135deg, var(--teal-800, #002F2F) 0%, var(--teal-900, #001F1F) 100%);
          transition: transform 400ms var(--ease-spring, cubic-bezier(0.175, 0.885, 0.32, 1.275)), 
                      box-shadow 400ms var(--ease-spring, cubic-bezier(0.175, 0.885, 0.32, 1.275));
          cursor: pointer;
          outline: none;
        }
        .card-hero:hover, .card-hero:focus-visible {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6), 0 0 20px var(--gold-bloom, rgba(255, 215, 0, 0.15));
        }
        .hero-pattern-overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          background-image: url('data:image/svg+xml;utf8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M0 20h40M20 0v40" stroke="%239D4EDD" stroke-width="0.75" stroke-opacity="0.15"/></svg>');
          mask-image: radial-gradient(circle at top right, black 10%, transparent 85%);
          -webkit-mask-image: radial-gradient(circle at top right, black 10%, transparent 85%);
        }
        .hero-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          position: relative;
          z-index: 2;
        }
        .avatar-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-400, #FFD700), var(--purple-300, #9D4EDD));
          z-index: 1;
          opacity: 0.8;
        }
      `}</style>

      {/* Jednorazowy element definicji masek i filtrów (odporny na SSR) */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="squircle-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0.0575 0.0575,0 0.50 0 0.9425,0 1,0.0575 1,0.5 1,0.9425 0.9425,1 0.5,1 0.0575,1 0,0.9425 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      <article 
        className="base-card card-hero" 
        tabIndex={0} 
        aria-label={`Profil Twórcy: ${name}`}
        onClick={onCardClick}
      >
        <div className="hero-pattern-overlay" aria-hidden="true"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="avatar-container relative">
            <img 
              src={avatarUrl} 
              alt={`Awatar użytkownika ${name}`} 
              className="hero-avatar"
              loading="lazy" 
            />
            <div className="avatar-ring"></div>
          </div>
          <div className="hero-typography">
            <h1 className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold text-white leading-none m-0 mb-1">
              {name}
            </h1>
            <p className="text-[#5C7A7A] text-[clamp(0.875rem,1.5vw,1rem)] m-0 font-mono">
              {username}
            </p>
          </div>
        </div>
      </article>
    </>
  );
};

export default CreatorIdentityHeroCard;

```
```react
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
  label = 'Zgromadzony Kapitał',
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

```

```react
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
  title = 'Nowa subskrypcja',
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

```
```react
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
  label = 'Autoryzuj Paymastera',
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

```
```react
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
  label = 'Kwota Wparcia (USDC)',
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

```
```react
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
  metricLabel = 'Ranking Twórców'
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

```
```react
import React from 'react';

export interface WideRefractiveChartCardProps {
  title?: string;
  timeframe?: string;
  sparklinePoints?: string;
}

/**
 * WARIANT 7: Horyzontalna Karta Wykresów z Optyką Załamania (Wide Refractive Chart Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/analytics/earnings/
 * Opis: Zaawansowane ugięcie tła i aberracji optycznych za pomocą filtrów wektorowych SVG.
 */
export const WideRefractiveChartCard: React.FC<WideRefractiveChartCardProps> = ({
  title = 'Przepustowość L2 (Polygon)',
  timeframe = 'Ostatnie 7 dni',
  sparklinePoints = 'M0,35 Q10,15 25,25 T50,10 T75,20 T100,5'
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
        .card-bento-wide {
          grid-column: span 2;
          display: flex;
          flex-direction: column;
          padding: 24px; 
          min-height: 220px;
        }
        .glass-refractive-surface {
          background-color: rgba(0, 31, 31, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          filter: url(#liquid-glass-refraction);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 24px;
        }
        .vector-chart-container {
          flex-grow: 1;
          position: relative;
        }
        .smooth-vector-line {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .smooth-vector-line path {
          vector-effect: non-scaling-stroke;
          stroke-width: 2;
          stroke-linejoin: round;
        }
      `}</style>

      {/* Wyizolowany filtr refrakcji szkła i maskowanie superelipsy */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="squircle-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0.0575 0.0575,0 0.50 0 0.9425,0 1,0.0575 1,0.5 1,0.9425 0.9425,1 0.5,1 0.0575,1 0,0.9425 0,0.5" />
          </clipPath>
          <filter id="liquid-glass-refraction" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.4 0" in="noise" result="softNoise" />
            <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="12" xChannelSelector="R" yChannelSelector="G" result="refracted" />
            <feOffset dx="1.5" dy="0" in="refracted" result="red-shift"/>
            <feOffset dx="-1.5" dy="0" in="refracted" result="blue-shift"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" in="red-shift" result="red-channel"/> 
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" in="blue-shift" result="blue-channel"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" in="refracted" result="green-channel"/>
            <feBlend mode="screen" in="red-channel" in2="blue-channel" result="magenta-cyan" />
            <feBlend mode="screen" in="magenta-cyan" in2="green-channel" />
          </filter>
        </defs>
      </svg>

      <section className="base-card card-bento-wide glass-refractive-surface">
        <div className="chart-header">
          <h3 className="text-white text-md font-semibold m-0">{title}</h3>
          <span className="text-[#5C7A7A] text-xs font-mono">{timeframe}</span>
        </div>
        <div className="vector-chart-container h-24">
          <svg preserveAspectRatio="none" viewBox="0 0 100 40" className="smooth-vector-line">
            <path 
              d={sparklinePoints} 
              fill="none" 
              stroke="var(--purple-300, #9D4EDD)" 
            />
            <path 
              d={`${sparklinePoints} L100,40 L0,40 Z`} 
              fill="url(#purple-fade-refractive)" 
            />
            <linearGradient id="purple-fade-refractive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#9D4EDD" stopOpacity="0"/>
            </linearGradient>
          </svg>
        </div>
      </section>
    </>
  );
};

export default WideRefractiveChartCard;

```
```react
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

```
```react
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
  title = 'Zatrzymano Operację',
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

```
```react
import React, { useRef, useEffect } from 'react';

export interface TopLayerWebAuthnModalOverlayProps {
  isOpen?: boolean;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * WARIANT 10: Transcendentalna Karta Modalna (Top Layer WebAuthn Modal Overlay)
 * LOKALIZACJA W DRZEWIE: creator-desktop/wallet/settings/
 * Opis: Ucieczka z pułapek z-index i overflow za pomocą natywnego API Warstwy Najwyższej (<dialog>).
 */
export const TopLayerWebAuthnModalOverlay: React.FC<TopLayerWebAuthnModalOverlayProps> = ({
  isOpen = false,
  title = 'Podpis Kryptograficzny',
  description = 'Użyj klucza sprzętowego urządzenia (Passkey) aby autoryzować przekaz USDC bez opłat sieciowych.',
  onConfirm,
  onCancel
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Bezpieczna synchronizacja stanu otwarcia z natywnym API przeglądarki
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
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
        .card-transcendent-modal {
          padding: 0;
          margin: auto;
          border: 1px solid var(--teal-700, #004545);
          background: var(--teal-800, #002F2F);
          border-radius: 16px;
          width: 90vw;
          max-width: 420px;
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          opacity: 0;
          transform: translateY(16px) scale(0.98);
          transition: opacity 300ms var(--ease-enter, cubic-bezier(0.16, 1, 0.3, 1)), 
                      transform 300ms var(--ease-enter, cubic-bezier(0.16, 1, 0.3, 1));
        }
        .card-transcendent-modal[open] {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .card-transcendent-modal::backdrop {
          background-color: rgba(0, 31, 31, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: backdrop-filter 300ms var(--ease-enter, cubic-bezier(0.16, 1, 0.3, 1));
        }
        .btn-cancel {
          background: transparent;
          border: none;
          color: #D6EBEB; 
          font-weight: 600;
          font-family: var(--font-primary, 'Mukta Malar', sans-serif);
          padding: 12px 24px;
          cursor: pointer;
        }
        .btn-cancel:hover { color: #FFFFFF; }
        .btn-authorize {
          background: var(--gold-400, #FFD700);
          color: var(--teal-900, #001F1F);
          border: none;
          font-family: var(--font-primary, 'Mukta Malar', sans-serif);
          font-weight: 700;
          padding: 12px 32px;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 150ms, background 150ms;
        }
        .btn-authorize:hover {
          background: var(--gold-500, #FFC312);
        }
        .btn-authorize:active {
          transform: scale(0.96);
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

      <dialog 
        ref={dialogRef} 
        id="webauthn-modal" 
        className="base-card card-transcendent-modal"
        onClose={handleClose}
      >
        <form method="dialog" className="p-0 m-0">
          <div className="p-8 pb-4 text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[rgba(255,215,0,0.1)] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.2)]">
              <svg width="24" height="24" fill="none" stroke="var(--gold-400, #FFD700)" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold font-['Mukta_Malar'] m-0">
              {title}
            </h2>
          </div>
          <div className="px-8 text-center text-sm leading-relaxed text-[#CCF7F4]/70">
            <p className="m-0">{description}</p>
          </div>
          <div className="p-8 flex justify-end gap-4">
            <button 
              type="button" 
              onClick={handleClose} 
              className="btn-cancel"
            >
              Odrzuć
            </button>
            <button 
              type="button" 
              onClick={handleConfirm} 
              className="btn-authorize"
            >
              Autoryzuj
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default TopLayerWebAuthnModalOverlay;

```
