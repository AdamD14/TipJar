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
  name = 'CreatorIdentityHeroCard',
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