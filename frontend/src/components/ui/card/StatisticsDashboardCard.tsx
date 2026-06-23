import React from 'react';

export interface StatisticsDashboardCardProps {
  label?: string;
  value?: string;
  trendText?: string;
}

/**
 * KARTA II: Analityka i Podsumowanie Danych (Statistics Dashboard Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/analytics/overview/
 */
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
      `}</style>

      <section className="card-stats group cursor-pointer">
        <header className="stats-header">
          <h3 className="font-mukta-regular text-[#CCF7F4]/60 text-sm font-normal">
            {label}
          </h3>
          <div className="data-value font-plex-mono text-white text-2xl font-bold my-1 tnum-lock">
            {value}
          </div>
          <div className="mt-1">
            <span className="text-sm font-bold text-[#00E676]">{trendText}</span>
            <span className="font-plex-sans text-[#CCF7F4]/40 text-xs ml-2">Healthy velocity</span>
          </div>
        </header>

        <div className="expandable-insight-drawer">
          <div className="w-full h-[14px] rounded-full bg-[#001111] shadow-[inset_1px_2px_4px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(204,247,244,0.05)] relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full w-[72%] bg-gradient-to-r from-[#003737] to-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.8)] rounded-full transition-all duration-1000 ease-in-out" 
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default StatisticsDashboardCard;