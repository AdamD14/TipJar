import React from 'react';

export interface TotalVolumeCardProps {
  title?: string;
  value?: string;
  currency?: string;
  changeText?: string;
  statusText?: string;
}

export const TotalVolumeCard: React.FC<TotalVolumeCardProps> = ({
  title = 'Total Volume Card',
  value = '14,500.50',
  currency = 'USDC',
  changeText = '+12.4% (30d)',
  statusText = 'Healthy velocity'
}) => {
  return (
    <>
      <style>{`
        .card-total-volume:hover {
          filter: brightness(1.05);
        }
        .card-total-volume:hover .volume-icon {
          filter: brightness(1.3);
        }
      `}</style>

      <div
        className="card-total-volume relative rounded-2xl p-6 border flex flex-col justify-between h-full transition-filter duration-300 ease"
        style={{
          backgroundColor: 'var(--teal-900, #002121)',
          borderColor: 'var(--teal-700, #004545)',
          boxShadow: 'inset 1px 1px 0 rgba(224,242,242,0.05), 0 8px 16px rgba(0,31,31,0.5)',
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <h4
            className="text-sm uppercase tracking-wider font-semibold"
            style={{
              color: 'var(--color-text-tertiary, #CCF7F4)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {title}
          </h4>
          <svg
            className="volume-icon w-5 h-5 transition-filter duration-300 ease"
            style={{ color: 'var(--teal-700, #005959)' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div>
          <div
            className="text-4xl tracking-tight relative inline-block"
            style={{
              fontFamily: 'var(--font-body)',
              fontFeatureSettings: '"tnum"',
              color: 'var(--color-text-secondary, #E0F2F2)',
            }}
          >
            <span
              className="relative z-10 font-bold"
              style={{
                textShadow: '-1px 1px 0 var(--teal-900, #001111), 1px 1px 0 var(--teal-900, #001111)',
              }}
            >
              {value}
            </span>
            <span
              className="text-xl ml-2 font-normal"
              style={{ color: 'var(--color-text-tertiary, #CCF7F4)' }}
            >
              {currency}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span
              className="text-xs px-2 py-1 rounded"
              style={{
                fontFamily: 'var(--font-body)',
                fontFeatureSettings: '"tnum"',
                backgroundColor: 'var(--teal-800, #003737)',
                color: 'var(--color-text-secondary, #E0F2F2)',
                border: '1px solid var(--teal-700, #005959)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {changeText}
            </span>
            <span
              className="text-xs"
              style={{
                fontFamily: 'var(--font-body)',
                fontFeatureSettings: '"tnum"',
                color: 'color-mix(in oklch, var(--color-text-tertiary, #CCF7F4) 60%, transparent)',
              }}
            >
              {statusText}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalVolumeCard;
