"use client";

import React from 'react';

export interface CreatorIdentityHeroCardProps {
  name?: string;
  username?: string;
  onCardClick?: () => void;
}

export const CreatorIdentityHeroCard: React.FC<CreatorIdentityHeroCardProps> = ({
  name = 'CreatorIdentityHeroCard',
  username = '@component_label',
  onCardClick
}) => {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="squircle-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0.0575 0.0575,0 0.50 0 0.9425,0 1,0.0575 1,0.5 1,0.9425 0.9425,1 0.5,1 0.0575,1 0,0.9425 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      <article
        className="glass-liquid gpu-layer shadow-maestro elevation-z-3 squishy-3d
                    relative overflow-hidden isolate cursor-pointer outline-none
                    flex flex-col p-8 group"
        style={{
          '--elevation-z': 'var(--elevation-z-3)',
          clipPath: 'url(#squircle-clip)',
          background: 'var(--bg-surface-base)'
        } as React.CSSProperties}
        tabIndex={0}
        aria-label={`Profil Twórcy: ${name}`}
        onClick={onCardClick}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-opacity"
          style={{
            backgroundImage: `linear-gradient(135deg, color-mix(in oklch, var(--gold-400) 8%, transparent) 0%, color-mix(in oklch, var(--purple-300) 10%, transparent) 50%, color-mix(in oklch, var(--gold-400) 6%, transparent) 100%)`,
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 0%'
          }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--teal-300) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(circle at top right, black 10%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at top right, black 10%, transparent 85%)'
          }}
          aria-hidden="true"
        />

        <div className="flex items-center gap-6 relative z-10">
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-full z-[1] opacity-80 border-gold-subtle"
              style={{ background: `linear-gradient(135deg, var(--gold-400), var(--purple-300))` }}
            />
            <div
              className="w-[72px] h-[72px] rounded-full relative z-[2] overflow-hidden"
              aria-hidden="true"
            >
              <div className="skeleton-shimmer w-full h-full" />
            </div>
          </div>
          <div>
            <h1 className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold text-text-primary leading-none m-0 mb-1">
              {name}
            </h1>
            <p className="font-body text-text-quaternary text-[clamp(0.875rem,1.5vw,1rem)] m-0">
              {username}
            </p>
          </div>
        </div>
      </article>
    </>
  );
};

export default CreatorIdentityHeroCard;
