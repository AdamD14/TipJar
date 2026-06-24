"use client";

import React from 'react';

export interface CreatorIdentityHeroCardProps {
  name?: string;
  username?: string;
  avatarUrl?: string;
  onCardClick?: () => void;
}

export const CreatorIdentityHeroCard: React.FC<CreatorIdentityHeroCardProps> = ({
  name = 'CreatorIdentityHeroCard',
  username = '@decentralized_mind',
  avatarUrl = 'https://assets.tipjar.com/avatars/evangelist.webp',
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
        className="relative overflow-hidden isolate bg-surface-base shadow-2 cursor-pointer outline-none
                    flex flex-col p-8
                    transition-transform duration-400 ease-spring,shadow duration-400 ease-spring
                    hover:-translate-y-2 hover:scale-[1.02] hover:shadow-card-hover
                    focus-visible:-translate-y-2 focus-visible:scale-[1.02] focus-visible:shadow-card-hover"
        style={{
          clipPath: 'url(#squircle-clip)',
          background: 'linear-gradient(135deg, var(--color-teal-800) 0%, var(--color-teal-900) 100%)'
        }}
        tabIndex={0}
        aria-label={`Profil Twórcy: ${name}`}
        onClick={onCardClick}
      >
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"40\" height=\"40\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 20h40M20 0v40\" stroke=\"%239D4EDD\" stroke-width=\"0.75\" stroke-opacity=\"0.15\"/></svg>')",
            maskImage: 'radial-gradient(circle at top right, black 10%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at top right, black 10%, transparent 85%)'
          }}
          aria-hidden="true"
        />
        <div className="flex items-center gap-6 relative z-10">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full z-[1] opacity-80"
              style={{ background: 'linear-gradient(135deg, var(--color-gold-400), var(--color-purple-300))' }}
            />
            <img
              src={avatarUrl}
              alt={`Awatar użytkownika ${name}`}
              className="w-[72px] h-[72px] rounded-full object-cover relative z-[2]"
              loading="lazy"
            />
          </div>
          <div>
            <h1 className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold text-text-primary leading-none m-0 mb-1">
              {name}
            </h1>
            <p className="font-mono text-teal-100/50 text-[clamp(0.875rem,1.5vw,1rem)] m-0">
              {username}
            </p>
          </div>
        </div>
      </article>
    </>
  );
};

export default CreatorIdentityHeroCard;
