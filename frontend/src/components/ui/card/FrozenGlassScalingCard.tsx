import React from 'react';

export interface FrozenGlassScalingCardProps {
  title?: string;
  nodesActive?: number;
  nodesTotal?: number;
  sparklinePoints?: string;
}

/**
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/live-activity/ (alternatywnie: wallet/connected-wallets/)
 * Frozen Glass 3.0 z usieciowioną topologią narracyjną w tle.
 */
export const FrozenGlassScalingCard: React.FC<FrozenGlassScalingCardProps> = ({
  title = 'FrozenGlassScalingCard',
  nodesActive = 150,
  nodesTotal = 500,
  sparklinePoints = 'M0,20 L10,15 L20,18 L30,10 L40,12 L50,5 L60,8 L70,2 L80,4 L90,0 L100,2'
}) => {
  return (
    <article className="frozen-card relative overflow-hidden p-6 rounded-2xl bg-[rgba(0,76,76,0.15)] border border-[rgba(214,235,235,0.08)] backdrop-blur-md">
      <div className="frozen-network-overlay absolute inset-0 pointer-events-none opacity-80 z-0 bg-[url('#frozen-network-grid')]" aria-hidden="true" />
      <div className="card-content relative z-10 flex flex-col">
        <h3 className="text-[clamp(1rem,0.5vw+0.875rem,1.125rem)] font-bold text-[#E0F2F2] font-['IBM_Plex_Sans']">
          {title}
        </h3>
        <div className="sparkline-container w-full h-12 my-4 overflow-visible">
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
            <path
              d={sparklinePoints}
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="progress-metrics tabular-metrics text-sm font-semibold text-[#FFD700] flex items-baseline gap-3" style={{ fontFeatureSettings: "'tnum'" }}>
          {nodesActive} / {nodesTotal} Nodes Active
        </div>
      </div>
    </article>
  );
};

export default FrozenGlassScalingCard;