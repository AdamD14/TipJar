"use client";
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
          <h3 className="font-mukta text-[#CCF7F4] text-lg font-bold">SecurityGatewayCard</h3>
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