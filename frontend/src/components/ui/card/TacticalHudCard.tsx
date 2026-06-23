import React from 'react';

export interface TacticalHudCardProps {
  systemStatus?: string;
}

/**
 * KARTA IX: Interfejs Nawigacji Optycznej (Tactical HUD Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/studio/live/overlays/
 */
export const TacticalHudCard: React.FC<TacticalHudCardProps> = ({
  systemStatus = 'TacticalHudCard'
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

      <article className="TacticalHudCard" style={{ backgroundImage: 'url(#tacticalPattern)' }}>
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