import React from 'react';

export interface TacticalOverrideCardProps {
  systemLabel?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onExecute?: () => void;
}

export const TacticalOverrideCard: React.FC<TacticalOverrideCardProps> = ({
  systemLabel = 'System Terminal',
  title = 'TacticalOverrideCard',
  description = 'Initiate hardware bypass protocol on sector 7G.',
  buttonText = 'Execute Protocol',
  onExecute
}) => {
  return (
    <>
      <style>{`
        .tactical-override-wrap {
          transition: filter 0.3s ease;
        }
        .tactical-override-wrap:hover {
          filter: brightness(1.08);
        }
      `}</style>

      <div
        className="tactical-override-wrap relative w-full h-[280px] p-[1px] gpu-layer"
        style={{
          filter: 'drop-shadow(0 15px 25px rgba(0,31,31,0.9))',
        }}
      >
        <div
          className="w-full h-full relative overflow-hidden flex flex-col"
          style={{
            background: 'linear-gradient(to bottom right, var(--teal-900, #002121), var(--teal-900, #001111))',
            clipPath: 'polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)',
          }}
        >
          {/* Bevel border */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              border: '1.5px solid color-mix(in oklch, var(--teal-700, #005959) 50%, transparent)',
              clipPath: 'polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)',
            }}
          />
          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-2 h-2 border-t border-l" style={{ borderColor: 'var(--teal-700)' }} />
          <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r" style={{ borderColor: 'var(--teal-700)' }} />

          <div className="p-8 relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-start">
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{
                  color: 'var(--teal-700, #007373)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.9)',
                }}
              >
                {systemLabel}
              </span>
              <svg
                className="w-4 h-4 animate-pulse"
                style={{ color: 'var(--teal-700, #007373)' }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
            <div className="mt-auto">
              <h3
                className="text-2xl font-light tracking-wide font-heading"
                style={{ color: 'var(--color-text-secondary, #E0F2F2)' }}
              >
                {title}
              </h3>
              <p
                className="text-xs mt-1 mb-5"
                style={{
                  color: 'color-mix(in oklch, var(--color-text-tertiary, #CCF7F4) 60%, transparent)',
                }}
              >
                {description}
              </p>
              <button
                onClick={onExecute}
                className="w-full px-6 py-3 bg-transparent text-xs uppercase tracking-[0.15em] transition-all duration-300 backdrop-blur-sm cursor-pointer active:scale-[0.98]"
                style={{
                  border: '1px solid color-mix(in oklch, var(--gold-400, #FFD700) 80%, transparent)',
                  color: 'var(--gold-400, #FFD700)',
                  boxShadow: 'inset 0 0 12px rgba(255,215,0,0.1), 0 0 12px rgba(255,215,0,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--gold-400, #FFD700) 10%, transparent)';
                  e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(255,215,0,0.25), 0 0 20px rgba(255,215,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'inset 0 0 12px rgba(255,215,0,0.1), 0 0 12px rgba(255,215,0,0.1)';
                }}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
