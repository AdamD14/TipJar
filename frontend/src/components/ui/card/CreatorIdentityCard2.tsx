import React from 'react';

export interface CreatorIdentityCard2Props {
  name?: string;
  role?: string;
  avatarUrl?: string;
}

/**
 * KARTA I: Wizytówka Tożsamości Twórcy (Creator Identity Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/creator-pulse/
 */
export const CreatorIdentityCard2: React.FC<CreatorIdentityCard2Props> = ({
  name = '@CreatorIdentityCard2',
  role = 'Decentralized System Architect',
  avatarUrl = 'logo.png'
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

export default CreatorIdentityCard2;