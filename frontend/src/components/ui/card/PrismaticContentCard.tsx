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
  title = 'PrismaticContentCard',
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
