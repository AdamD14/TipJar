import React from 'react';

export interface AvatarItem {
  initials: string;
  rotation: string; // np. "135deg" lub "-45deg"
}

export interface SocialProofGamificationCardProps {
  title?: string;
  avatars?: AvatarItem[];
}

/**
 * LOKALIZACJA W DRZEWIE: creator-desktop/community/followers/ (alternatywnie: desktop/recommendations/)
 * Dymorfizm dowodu społecznego zabezpieczony twardym radial-gradientem przed zlewaniem.
 */
export const SocialProofGamificationCard: React.FC<SocialProofGamificationCardProps> = ({
  title = 'SocialProofGamificationCard',
  avatars = [
    { initials: 'AS', rotation: '135deg' },
    { initials: 'JD', rotation: '-45deg' },
    { initials: '+12', rotation: '45deg' }
  ]
}) => {
  return (
    <article className="social-proof-card bg-[#003737] border-l-4 border-[#4D194D] p-6">
      <div className="insight-header">
        <h4 className="text-[clamp(1rem,0.5vw+0.875rem,1.125rem)] font-bold text-[#E0F2F2] font-['IBM_Plex_Sans']">
          {title}
        </h4>
      </div>
      <div className="avatar-cluster flex mt-4">
        {avatars.map((avatar, idx) => (
          <div
            key={idx}
            className={`avatar-badge w-12 h-12 rounded-full relative ${idx > 0 ? 'margin-left-custom -ml-3' : ''}`}
            style={{
              mask: 'radial-gradient(circle at 100% 50%, transparent 18%, black 19%)',
              WebkitMask: 'radial-gradient(circle at 100% 50%, transparent 18%, black 19%)'
            }}
          >
            <div
              className="avatar-gradient w-full h-full rounded-full flex items-center justify-center text-[#001F1F] font-bold font-['IBM_Plex_Sans']"
              style={{
                background: `linear-gradient(${avatar.rotation}, #FFD700 0%, #4D194D 100%)`
              }}
            >
              {avatar.initials}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default SocialProofGamificationCard;