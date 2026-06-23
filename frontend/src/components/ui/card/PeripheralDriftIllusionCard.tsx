import React from 'react';

export interface PeripheralDriftIllusionCardProps {
  title?: string;
}

/**
 * LOKALIZACJA W DRZEWIE: creator-desktop/analytics/ai-insights/
 * Neurokognitywna karta zjawiska asymetrii luminancji i mikrosakad (Test Skupienia).
 */
export const PeripheralDriftIllusionCard: React.FC<PeripheralDriftIllusionCardProps> = ({
  title = 'PeripheralDriftIllusionCard',
}) => {
  return (
    <article className="illusion-card bg-[#001F1F] border border-[#004C4C] rounded-2xl flex items-center p-6 gap-6">
      <div className="illusion-canvas w-[120px] h-[120px] flex-shrink-0" style={{ shapeRendering: 'crispEdges' }}>
        <svg width="120" height="120" viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <g id="drift-pattern-react">
              <path d="M50,50 L100,0 L100,50 Z" fill="#000000" />
              <path d="M50,50 L100,50 L100,100 Z" fill="#333333" />
              <path d="M50,50 L0,100 L50,100 Z" fill="#FFFFFF" />
              <path d="M50,50 L0,50 L0,0 Z" fill="#E6E6E6" />
            </g>
          </defs>
          <use href="#drift-pattern-react" x="0" y="0" transform="rotate(0, 50, 50)" />
          <use href="#drift-pattern-react" x="100" y="0" transform="rotate(90, 150, 50)" />
          <use href="#drift-pattern-react" x="0" y="100" transform="rotate(-90, 50, 150)" />
          <use href="#drift-pattern-react" x="100" y="100" transform="rotate(180, 150, 150)" />
        </svg>
      </div>
      <div className="illusion-content">
        <h3 className="text-[clamp(1.2rem,1.5vw+0.875rem,1.5rem)] font-semibold text-white font-['Mukta_Malar']">
          {title}
        </h3>
      </div>
    </article>
  );
};

export default PeripheralDriftIllusionCard;