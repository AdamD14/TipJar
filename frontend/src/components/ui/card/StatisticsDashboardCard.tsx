import React from 'react';

export interface StatisticsDashboardCardProps {
  label?: string;
  value?: string;
  trendText?: string;
}

export const StatisticsDashboardCard: React.FC<StatisticsDashboardCardProps> = ({
  label = 'StatisticsDashboardCard',
  value = '14,500.50 USDC',
  trendText = '+12.4% (30d)'
}) => {
  return (
    <>
      <style>{`
        .card-stats {
          background: var(--teal-800, #003737);
          padding: 24px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: filter 0.3s ease;
        }
        .card-stats:hover {
          filter: brightness(1.04);
        }
        .tnum-lock {
          font-feature-settings: "tnum";
          letter-spacing: 0;
        }
        .expandable-insight-drawer {
          height: 0;
          overflow: clip;
          opacity: 0;
          transition: height 0.45s cubic-bezier(0.42, 0.0, 0.2, 1.0), opacity 0.4s ease-out;
        }
        .card-stats:hover .expandable-insight-drawer {
          height: 50px;
          opacity: 1;
        }
        .progress-bar-fill {
          filter: drop-shadow(0 0 8px var(--gold-400, #FFD700));
        }
      `}</style>

      <section className="card-stats glass-liquid gpu-layer group cursor-pointer">
        <header className="stats-header">
          <h3
            className="text-sm font-normal font-heading"
            style={{ color: 'color-mix(in oklch, var(--color-text-tertiary, #CCF7F4) 60%, transparent)' }}
          >
            {label}
          </h3>
          <div
            className="data-value text-white text-2xl font-bold my-1 tnum-lock"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {value}
          </div>
          <div className="mt-1">
            <span
              className="text-sm font-bold"
              style={{ color: 'var(--color-success-light, #00E676)' }}
            >
              {trendText}
            </span>
            <span
              className="text-xs ml-2"
              style={{
                color: 'color-mix(in oklch, var(--color-text-tertiary, #CCF7F4) 40%, transparent)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Healthy velocity
            </span>
          </div>
        </header>

        <div className="expandable-insight-drawer">
          <div
            className="w-full h-[14px] rounded-full relative overflow-hidden"
            style={{
              backgroundColor: 'var(--teal-900, #001111)',
              boxShadow: 'inset 1px 2px 4px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(204,247,244,0.05)',
            }}
          >
            <div
              className="absolute top-0 left-0 h-full w-[72%] bg-gradient-to-r from-[#003737] to-[#FFD700] rounded-full progress-bar-fill transition-all duration-1000 ease-in-out"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default StatisticsDashboardCard;
