```react
import React from 'react';

export interface CreatorIdentityCardProps {
  name?: string;
  role?: string;
  avatarUrl?: string;
}

/**
 * KARTA I: Wizytówka Tożsamości Twórcy (Creator Identity Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/creator-pulse/
 */
export const CreatorIdentityCard: React.FC<CreatorIdentityCardProps> = ({
  name = '@SatoshiNakamoto',
  role = 'Decentralized System Architect',
  avatarUrl = 'avatar-pixelart.png'
}) => {
  return (
    <>
      <style>{`
        .card-creator {
          background: var(--teal-800, #003737);
          border-radius: 12px;
          padding: 24px;
          position: relative;
          overflow: clip;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.4s;
        }
        .card-creator:hover {
          transform: translateY(-6px);
          background: var(--teal-600, #005959);
        }
        .glass-header {
          position: absolute;
          top: 0; left: 0; right: 0; height: 35%;
          background: linear-gradient(180deg, rgba(255, 215, 0, 0.1), transparent);
          contain: strict;
          transform: translateZ(0);
        }
        .global-link-hitbox::after {
          content: "";
          position: absolute; inset: 0; z-index: 10;
        }
        .avatar-retro {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          background: var(--teal-900, #001F1F);
          border: 1px solid var(--teal-700, #004C4C);
          margin-bottom: 16px;
          position: relative;
          z-index: 20;
        }
        .avatar-retro img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          image-rendering: pixelated;
        }
      `}</style>

      <article className="card-creator prismatic-glow">
        <div 
          className="glass-header" 
          style={{ filter: 'url(#liquid-refraction)' }}
        />
        <figure className="avatar-retro">
          <img src={avatarUrl} alt="Creator Identity" loading="lazy" />
        </figure>
        <div className="creator-meta relative z-20">
          <h2 className="font-mukta-light text-white text-xl font-light tracking-wide">
            {name}
          </h2>
          <p className="font-plex-sans text-[#CCF7F4]/70 text-sm">
            {role}
          </p>
        </div>
        <div className="interactive-surface">
          <a href="/profile" className="global-link-hitbox" aria-hidden="true"></a>
        </div>
      </article>

      {/* Definicja filtra wstrzykiwana bezpośrednio do DOM */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="liquid-refraction" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="smooth-base" />
            <feImage href="displacement-lens.svg" result="lens-map" />
            <feDisplacementMap 
              in="smooth-base" 
              in2="lens-map" 
              scale="25" 
              xChannelSelector="R" 
              yChannelSelector="G" 
              result="bent-light" 
            />
            <feColorMatrix 
              in="bent-light" 
              type="matrix" 
              values="1.1 0 0 0 0 0 1 0 0 0 0 0 1.2 0 0 0 0 0 1 0" 
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default CreatorIdentityCard;

```
```react
import React from 'react';

export interface StatisticsDashboardCardProps {
  label?: string;
  value?: string;
  trendText?: string;
}

/**
 * KARTA II: Analityka i Podsumowanie Danych (Statistics Dashboard Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/analytics/overview/
 */
export const StatisticsDashboardCard: React.FC<StatisticsDashboardCardProps> = ({
  label = 'Locked Liquidity',
  value = '14,500.50 USDC',
  trendText = '+12.4% (30d)'
}) => {
  return (
    <>
      <style>{`
        .card-stats {
          background: var(--teal-800, #003737);
          padding: 24px;
          border-radius: 12px;
          display: flex; 
          flex-direction: column; 
          gap: 16px;
        }
        .tnum-lock {
          font-feature-settings: "tnum";
          letter-spacing: 0;
        }
        .expandable-insight-drawer {
          height: 0;
          overflow: clip;
          opacity: 0;
          transition: height 0.45s cubic-bezier(0.42, 0.0, 0.2, 1.0), opacity 0.4s ease-out;
        }
        .card-stats:hover .expandable-insight-drawer {
          height: 50px;
          opacity: 1;
        }
      `}</style>

      <section className="card-stats group cursor-pointer">
        <header className="stats-header">
          <h3 className="font-mukta-regular text-[#CCF7F4]/60 text-sm font-normal">
            {label}
          </h3>
          <div className="data-value font-plex-mono text-white text-2xl font-bold my-1 tnum-lock">
            {value}
          </div>
          <div className="mt-1">
            <span className="text-sm font-bold text-[#00E676]">{trendText}</span>
            <span className="font-plex-sans text-[#CCF7F4]/40 text-xs ml-2">Healthy velocity</span>
          </div>
        </header>

        <div className="expandable-insight-drawer">
          <div className="w-full h-[14px] rounded-full bg-[#001111] shadow-[inset_1px_2px_4px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(204,247,244,0.05)] relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full w-[72%] bg-gradient-to-r from-[#003737] to-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.8)] rounded-full transition-all duration-1000 ease-in-out" 
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default StatisticsDashboardCard;

```
```react
import React from 'react';

export interface LiveToastMomentumProps {
  username?: string;
  amount?: string;
}

/**
 * KARTA III: Powiadomienie o Aktywności (Live Toast Momentum)
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/notifications-preview/
 */
export const LiveToastMomentum: React.FC<LiveToastMomentumProps> = ({
  username = '@0xSatoshi',
  amount = '5.00 USDC'
}) => {
  return (
    <>
      <style>{`
        .card-toast {
          position: fixed;
          bottom: 32px; right: 32px;
          z-index: 300;
          background: var(--teal-700, #004C4C);
          border: 1px solid rgba(77, 25, 77, 0.3);
          border-radius: 12px;
          padding: 16px 24px;
          display: flex; gap: 16px; align-items: center;
          animation: glideInUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .fan-identity-orb {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-400, #FFD700), var(--purple-300, #4D194D));
          flex-shrink: 0;
        }
        @keyframes glideInUp {
          0% { transform: translateY(50px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>

      <div className="card-toast" role="status" aria-live="polite">
        <div className="fan-identity-orb"></div>
        <div className="toast-message">
          <p className="font-plex-sans text-[#CCF7F4]/80 text-sm">
            Momentum: Wsparcie od <strong className="text-white font-bold">{username}</strong> ({amount})
          </p>
        </div>
      </div>
    </>
  );
};

export default LiveToastMomentum;

```
```react
import React from 'react';

export interface DigitalAssetNftCardProps {
  title?: string;
  imageUrl?: string;
  tokenId?: string;
  onBidClick?: (e: React.MouseEvent) => void;
}

/**
 * KARTA IV: Zasób Krypto (Digital Asset NFT / Katalizator Magnetyczny)
 * LOKALIZACJA W DRZEWIE: creator-desktop/studio/page/badges/
 */
export const DigitalAssetNftCard: React.FC<DigitalAssetNftCardProps> = ({
  title = 'CyberPunk Synth #11',
  imageUrl,
  tokenId = '11',
  onBidClick
}) => {
  return (
    <>
      <style>{`
        .card-nft {
          background: var(--teal-800, #003737);
          border-radius: 12px;
          position: relative;
          padding: 16px;
          box-shadow: inset -4px 4px 12px -2px rgba(255, 215, 0, 0.05);
        }
        .magnetic-badge {
          position: absolute;
          top: -10px; right: -10px;
          width: 20px; height: 20px;
          z-index: 20;
          animation: levitate-node 4s ease-in-out infinite;
        }
        .badge-core {
          width: 100%; height: 100%;
          border-radius: 50%;
          background: var(--gold-400, #FFD700);
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
        }
        .badge-shell {
          position: absolute; inset: -4px;
          border-radius: 50%;
          border: 1px solid var(--purple-300, #4D194D);
          filter: blur(0.5px);
        }
        .global-card-link::after { 
          content: ""; 
          position: absolute; 
          inset: 0; 
          z-index: 1; 
        }
        .btn-bid {
          position: relative; 
          z-index: 2;
          background: var(--teal-600, #005959); 
          color: var(--gold-400, #FFD700);
          border: none; 
          border-radius: 6px; 
          padding: 8px 16px;
          cursor: pointer;
        }
        .btn-bid:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px var(--teal-800, #003737), 0 0 0 5px var(--purple-300, #4D194D);
        }
        @keyframes levitate-node {
          0%, 100% { transform: translateY(0) scale(0.98); }
          50% { transform: translateY(-3px) scale(1.02); }
        }
        .asset-media {
          width: 100%;
          aspect-ratio: 1/1;
          background: var(--teal-900, #001F1F);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 12px;
        }
        .asset-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>

      <article className="card-nft">
        <div className="magnetic-badge">
          <div className="badge-core"></div>
          <div className="badge-shell"></div>
        </div>
        <figure className="asset-media">
          {imageUrl ? (
            <img src={imageUrl} alt={title} />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[#CCF7F4]/30">NFT ART</div>
          )}
        </figure>
        <div className="asset-data">
          <h4 className="font-mukta text-[#CCF7F4] font-bold text-lg mb-3">
            {title}
          </h4>
          <div className="action-layer">
            <button onClick={onBidClick} className="btn-bid font-plex-sans font-bold text-sm w-full text-center">
              Place Bid
            </button>
          </div>
        </div>
        <a href={`/asset/${tokenId}`} className="global-card-link" tabIndex={-1} aria-hidden="true"></a>
      </article>
    </>
  );
};

export default DigitalAssetNftCard;

```
```react
import React, { useState } from 'react';

export interface SecurityGatewayCardProps {
  hash?: string;
  onAuthorize?: () => Promise<void> | void;
}

/**
 * KARTA V: Brama Autoryzacyjna (Smart Contract Security Auth)
 * LOKALIZACJA W DRZEWIE: creator-desktop/wallet/payout-settings/
 */
export const SecurityGatewayCard: React.FC<SecurityGatewayCardProps> = ({
  hash = '0x892a...c42f',
  onAuthorize
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuthorize = async () => {
    setIsProcessing(true);
    // Debouncing / Ochrona przed rage-click
    setTimeout(async () => {
      if (onAuthorize) {
        await onAuthorize();
      }
      setIsProcessing(false);
    }, 300);
  };

  return (
    <>
      <style>{`
        .card-security-gateway {
          background: var(--teal-800, #003737);
          border-radius: 12px; 
          padding: 24px;
          position: relative; 
          overflow: hidden;
        }
        .gateway-shield {
          padding-bottom: 24px;
          transition: filter 0.4s cubic-bezier(0.9, 0.03, 0.1, 0.97);
        }
        .card-security-gateway:active .gateway-shield {
          filter: brightness(1.3) contrast(1.1) blur(1px);
        }
        .btn-destructive {
          background: var(--error-light, #FFB4AB);
          color: var(--teal-900, #001F1F);
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 600;
          border-radius: 8px; 
          padding: 12px 24px;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: center;
        }
        .btn-destructive.is-processing {
          opacity: 0.5;
          pointer-events: none;
          transition: opacity 0.2s cubic-bezier(0.2, 0.0, 0, 1);
        }
      `}</style>

      <section className="card-security-gateway">
        <div className="gateway-shield" style={{ filter: 'url(#cryo-voronoi)' }}>
          <h3 className="font-mukta text-[#CCF7F4] text-lg font-bold">Autoryzacja Wypłaty</h3>
          <p className="font-plex-sans text-[#CCF7F4]/60 text-xs mt-1">Sign Hash: {hash}</p>
        </div> 
        <div className="gateway-actions">
          <button 
            onClick={handleAuthorize} 
            className={`btn-destructive ${isProcessing ? 'is-processing' : ''}`}
          >
            {isProcessing ? 'Przetwarzanie...' : 'Autoryzuj On-Chain'}
          </button>
        </div>
      </section>

      {/* Definicja szumu Voronoi dla efektu krystalizacji */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="cryo-voronoi">
          <feTurbulence type="turbulence" baseFrequency="0.04 0.08" numOctaves="2" seed="9" result="crystals" />
          <feColorMatrix 
            in="crystals" 
            type="matrix" 
            values="0 0 0 0 0.30 0 0 0 0 0.10 0 0 0 0 0.30 0 0 0 1 0" 
            result="purple-matrix"
          />
          <feDisplacementMap in="SourceGraphic" in2="purple-matrix" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </>
  );
};

export default SecurityGatewayCard;

```
```react
import React from 'react';

export interface GoalFundingCardProps {
  title?: string;
  raised?: string;
  target?: string;
  currency?: string;
}

/**
 * KARTA VI: Interaktywny Wskaźnik Celu (Liquid Spinner Funding Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/active-goals/
 */
export const GoalFundingCard: React.FC<GoalFundingCardProps> = ({
  title = 'Nowy Sprzęt do Studio',
  raised = '1,450',
  target = '2,000',
  currency = 'USDC'
}) => {
  return (
    <>
      <style>{`
        .card-goal-funding {
          background: var(--teal-800);
          border-radius: 12px; 
          padding: 24px;
          display: flex; 
          justify-content: space-between; 
          align-items: center;
        }
        .spinner-royal {
          animation: rotate 2s linear infinite;
        }
        .spinner-royal.size-m {
          width: 48px; 
          height: 48px;
        }
        .fluid-path {
          stroke-width: 3.36px;
          stroke-linecap: round;
          animation: fluid-dash 1.5s ease-in-out infinite;
        }
        @keyframes rotate { 
          100% { transform: rotate(360deg); } 
        } 
        @keyframes fluid-dash {
          0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
          100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
        }
        @media (prefers-reduced-motion: reduce) {
          .spinner-royal { animation-duration: 10s; }
          .fluid-path { animation: none; stroke-dasharray: 126; }
        }
      `}</style>

      <article className="card-goal-funding">
        <div className="goal-header min-w-0 flex-1 mr-4">
          <h3 className="font-mukta text-white text-md font-bold truncate">{title}</h3>
          <span className="font-plex-mono text-[#FFD700] text-xs block mt-1" style={{ fontFeatureSettings: "'tnum'" }}>
            {raised} / {target} {currency}
          </span>
        </div>
        <div className="liquid-spinner-wrapper flex-shrink-0">
          <svg className="spinner-royal size-m" viewBox="0 0 50 50" aria-hidden="true">
            <defs>
              <linearGradient id="gold-purple-flow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--gold-400, #FFD700)" />
                <stop offset="100%" stopColor="var(--purple-300, #4D194D)" />
              </linearGradient>
            </defs>
            <circle className="fluid-path" cx="25" cy="25" r="20" fill="none" stroke="url(#gold-purple-flow)"></circle>
          </svg>
        </div>
      </article>
    </>
  );
};

export default GoalFundingCard;

```
```react
import React, { useState } from 'react';

export interface ContextualHelpCardProps {
  title?: string;
  tooltipText?: string;
}

/**
 * KARTA VII: Toggletip & Asysta Edukacyjna (Contextual Help Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/share/campaigns/
 */
export const ContextualHelpCard: React.FC<ContextualHelpCardProps> = ({
  title = 'Gas Sponsorowany (Paymaster)',
  tooltipText = 'System pokrywa za Ciebie opłaty sieciowe Polygon z użyciem relacji ERC-4337.'
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <style>{`
        .card-info-module { 
          background: var(--teal-800, #003737); 
          border-radius: 12px; 
          padding: 24px;
        }
        .header-with-help {
          display: flex; align-items: center; gap: 8px;
        }
        .toggletip-trigger {
          background: none; border: none; cursor: pointer; position: relative;
        }
        .toggletip-trigger:focus-visible {
          outline: 2px solid var(--purple-300, #4D194D); outline-offset: 2px;
          border-radius: 50%;
        }
        .toggletip-content {
          position: absolute; bottom: 120%; left: 50%; transform: translateX(-50%);
          width: max-content; max-width: 250px;
          background: var(--teal-700, #004C4C);
          padding: 12px 16px; border-radius: 8px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
          z-index: 500;
          opacity: 0; visibility: hidden;
          transition: opacity 0.2s ease-in, visibility 0.2s;
        }
        .toggletip-content.is-active {
          opacity: 1; visibility: visible;
        }
      `}</style>

      <article className="card-info-module">
        <div className="header-with-help">
          <h3 className="font-mukta text-[#CCF7F4] text-md font-bold">{title}</h3>
          <button 
            className="toggletip-trigger" 
            aria-label="Więcej informacji"
            onClick={handleToggle}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-300, #4D194D)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4M12 8h.01"></path>
            </svg>
            <span className={`toggletip-content font-plex-sans text-white text-xs ${isActive ? 'is-active' : ''}`} role="status">
              {tooltipText}
            </span>
          </button>
        </div>
      </article>
    </>
  );
};

export default ContextualHelpCard;

```
```react
import React from 'react';

export interface PrismaticContentCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onCtaClick?: () => void;
}

/**
 * KARTA VIII: Czysta Okluzja i Wyróżnienie Premium (Prismatic Content Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/studio/monetization/pricing-presets/
 */
export const PrismaticContentCard: React.FC<PrismaticContentCardProps> = ({
  title = 'Pro Trading Tier',
  description = 'Zdominuj arkusze danych on-chain.',
  buttonText = 'Uzyskaj Dostęp',
  onCtaClick
}) => {
  return (
    <>
      <style>{`
        .card-premium-bento {
          position: relative;
          background: var(--teal-800, #003737);
          border-radius: 12px; 
          padding: 24px;
        }
        .card-premium-bento::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(135deg, var(--gold-400, #FFD700) 0%, var(--teal-700, #004C4C) 40%, var(--purple-300, #4D194D) 100%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          pointer-events: none;
        }
        .btn-gold-cta {
          background: linear-gradient(135deg, #FFCC00 0%, #D4AF37 50%, #996515 100%);
          color: var(--teal-900, #001F1F); 
          font-weight: 600;
          border: none; 
          border-radius: 6px; 
          padding: 12px 24px;
          margin-top: 16px; 
          width: 100%;
          cursor: pointer;
        }
      `}</style>

      <article className="card-premium-bento">
        <div className="content-wrapper">
          <h3 className="font-mukta text-[#FFD700] text-lg font-bold">{title}</h3>
          <p className="font-plex-sans text-[#CCF7F4]/80 text-sm mt-1">{description}</p>
          <button onClick={onCtaClick} className="btn-gold-cta font-plex-sans">
            {buttonText}
          </button>
        </div>
      </article>
    </>
  );
};

export default PrismaticContentCard;

```
```react
import React from 'react';

export interface TacticalHudCardProps {
  systemStatus?: string;
}

/**
 * KARTA IX: Interfejs Nawigacji Optycznej (Tactical HUD Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/studio/live/overlays/
 */
export const TacticalHudCard: React.FC<TacticalHudCardProps> = ({
  systemStatus = 'SYSTEM: ONLINE'
}) => {
  return (
    <>
      <style>{`
        .card-tactical-hud {
          border-radius: 12px; 
          padding: 24px;
          height: 250px; 
          position: relative;
          background-color: var(--teal-900, #001F1F);
          border: 1px solid var(--teal-700, #004C4C);
        }
        .radar-scan {
          position: absolute; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%);
          width: 100px; 
          height: 100px;
          border-radius: 50%; 
          border: 1px solid rgba(77, 25, 77, 0.5);
        }
      `}</style>

      <article className="card-tactical-hud" style={{ backgroundImage: 'url(#tacticalPattern)' }}>
        <div className="hud-overlay absolute top-4 left-4 z-20">
          <h4 className="font-plex-mono text-[#FFD700] text-xs font-bold tracking-wide">
            {systemStatus}
          </h4>
        </div>
        <div className="radar-scan flex items-center justify-center">
          <div className="reticle-core w-2 h-2 rounded-full bg-[#FFD700]" />
        </div>
      </article>

      {/* Dynamicznie wstrzykiwany wzór HUD do powtórzeń w tle */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true">
        <defs>
          <pattern id="tacticalPattern" width="160" height="160" patternUnits="userSpaceOnUse">
            <rect width="160" height="160" fill="var(--teal-800, #003737)" />
            <path d="M 0 40 L 160 40 M 0 80 L 160 80 M 0 120 L 160 120" stroke="var(--teal-100, #ABE1E1)" strokeWidth="0.5" opacity="0.12" fill="none" />
            <circle cx="80" cy="80" r="18" stroke="var(--gold-400, #FFD700)" strokeWidth="0.75" fill="none" strokeDasharray="4 4" />
            <rect x="79.5" y="52" width="1" height="6" fill="var(--gold-400, #FFD700)" />
            <rect x="79.5" y="102" width="1" height="6" fill="var(--gold-400, #FFD700)" />
          </pattern>
        </defs>
      </svg>
    </>
  );
};

export default TacticalHudCard;

```
```react
import React from 'react';

/**
 * KARTA X: Szkielet Przygotowawczy (Skeleton Screen)
 * LOKALIZACJA W DRZEWIE: Generyczny element ładowania asynchronicznego
 */
export const SkeletonLoaderCard: React.FC = () => {
  return (
    <>
      <style>{`
        .card-skeleton-loader {
          background: var(--teal-800, #003737); 
          border-radius: 12px; 
          padding: 24px;
          display: flex; 
          gap: 16px; 
          align-items: center;
        }
        .skel-node {
          background-color: var(--teal-900, #001F1F);
          position: relative; 
          overflow: hidden;
          transform: translateZ(0);
        }
        .skel-circle { 
          width: 48px; 
          height: 48px; 
          border-radius: 50%;
          flex-shrink: 0; 
        }
        .skel-line { 
          height: 16px; 
          border-radius: 4px; 
        }
        .skel-line.full { 
          width: 100%; 
          margin-bottom: 8px; 
        }
        .skel-line.partial { 
          width: 65%; 
        }
        .skel-node::after {
          content: ""; 
          position: absolute; 
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(110deg, transparent 0%, var(--teal-700, #004C4C) 40%, var(--teal-700, #004C4C) 60%, transparent 100%);
          animation: gpu-shimmer 2s infinite linear;
        }
        @keyframes gpu-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .skel-node::after {
            animation: none;
            transform: none;
            background: var(--teal-700, #004C4C);
          }
        }
      `}</style>

      <article className="card-skeleton-loader w-full" aria-hidden="true">
        <div className="skel-node skel-circle"></div>
        <div className="skel-layout flex-1 min-w-0">
          <div className="skel-node skel-line full"></div>
          <div className="skel-node skel-line partial"></div>
        </div>
      </article>
    </>
  );
};

export default SkeletonLoaderCard;

```
