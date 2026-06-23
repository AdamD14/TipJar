import React from 'react';

export interface PulseMomentumCardProps {
  title?: string;
  amount?: string;
  currency?: string;
}

/**
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/creator-pulse/
 * Komponent ucieleśniający tętno platformy (Creator Pulse) w czasie rzeczywistym.
 */
export const PulseMomentumCard: React.FC<PulseMomentumCardProps> = ({
  title = 'PulseMomentumCard',
  amount = '14,250.00',
  currency = 'USDC'
}) => {
  return (
    <article className="pulse-card" aria-labelledby="pulse-title">
      <header className="mb-4">
        <h3 id="pulse-title" className="text-[clamp(1.5rem,2.5vw+1rem,2.5rem)] font-bold font-['Mukta_Malar'] text-white">
          {title}
        </h3>
      </header>
      <div>
        <div className="tabular-metrics font-['Mukta_Malar'] font-bold text-[clamp(2.5rem,4vw+1.5rem,4rem)] text-[#FFD700] flex items-baseline gap-3" style={{ fontFeatureSettings: "'tnum'" }}>
          <span className="text-sm opacity-70 uppercase tracking-widest">{currency}</span>
          <span>{amount}</span>
        </div>
      </div>
    </article>
  );
};

export default PulseMomentumCard;