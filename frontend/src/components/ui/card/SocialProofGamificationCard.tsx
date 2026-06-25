import React from 'react';

export interface AvatarItem {
  initials: string;
  rotation: string;
}

export interface SocialProofGamificationCardProps {
  title?: string;
  avatars?: AvatarItem[];
}

export const SocialProofGamificationCard: React.FC<SocialProofGamificationCardProps> = ({
  title = 'SocialProofGamificationCard',
  avatars = [
    { initials: 'AS', rotation: '135deg' },
    { initials: 'JD', rotation: '-45deg' },
    { initials: '+12', rotation: '45deg' }
  ]
}) => {
  return (
    <>
      <style>{`
        .social-proof-card {
          transition: filter 0.3s ease;
        }
        .social-proof-card:hover {
          filter: brightness(1.05);
        }
        .social-proof-card:active {
          transform: scale(0.98);
        }
      `}</style>

      <article
        className="social-proof-card glass-liquid gpu-layer p-6"
        style={{
          backgroundColor: 'var(--teal-800, #003737)',
          borderLeft: '4px solid var(--gold-400, #FFD700)',
        }}
      >
        <div className="insight-header">
          <h4
            className="font-bold font-heading"
            style={{
              fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
              color: 'var(--color-text-secondary, #E0F2F2)',
            }}
          >
            {title}
          </h4>
        </div>
        <div className="avatar-cluster flex mt-4">
          {avatars.map((avatar, idx) => (
            <div
              key={idx}
              className={`avatar-badge w-12 h-12 rounded-full relative ${idx > 0 ? '-ml-3' : ''}`}
              style={{
                mask: 'radial-gradient(circle at 100% 50%, transparent 18%, black 19%)',
                WebkitMask: 'radial-gradient(circle at 100% 50%, transparent 18%, black 19%)',
              }}
            >
              <div
                className="avatar-gradient w-full h-full rounded-full flex items-center justify-center font-bold font-heading"
                style={{
                  background: `linear-gradient(${avatar.rotation}, var(--gold-400, #FFD700) 0%, var(--teal-700, #004C4C) 100%)`,
                  color: 'var(--teal-900, #001F1F)',
                }}
              >
                {avatar.initials}
              </div>
            </div>
          ))}
        </div>
      </article>
    </>
  );
};

export default SocialProofGamificationCard;
