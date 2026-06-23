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
    <div className="relative w-full h-[280px] p-[1px] filter drop-shadow-[0_15px_25px_rgba(0,31,31,0.9)] group">
      {/* Kapsuła wewnętrzna ścinająca narożniki clip-path */}
      <div className="w-full h-full bg-gradient-to-br from-[#002121] to-[#001111] relative overflow-hidden flex flex-col" style={{ clipPath: 'polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)' }}>
        {/* Bevel */}
        <div className="absolute inset-0 border-[1.5px] border-[#005959]/50 pointer-events-none" style={{ clipPath: 'polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)' }}></div>
        {/* Celowniki w narożnikach */}
        <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#007373]"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#007373]"></div>
        
        <div className="p-8 relative z-10 h-full flex flex-col">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[#007373] text-[10px] tracking-[0.2em] uppercase" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}>
              {systemLabel}
            </span>
            <svg className="w-4 h-4 text-[#007373] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <div className="mt-auto">
            <h3 className="font-['Mukta_Malar'] text-[#E0F2F2] text-2xl font-light tracking-wide">{title}</h3>
            <p className="font-mono text-[#CCF7F4]/60 text-xs mt-1 mb-5">{description}</p>
            <button 
              onClick={onExecute}
              className="w-full px-6 py-3 bg-transparent border border-[#FFD700]/80 text-[#FFD700] font-mono text-xs uppercase tracking-[0.15em] shadow-[inset_0_0_12px_rgba(255,215,0,0.1),0_0_12px_rgba(255,215,0,0.1)] hover:bg-[#FFD700]/10 hover:shadow-[inset_0_0_20px_rgba(255,215,0,0.25),0_0_20px_rgba(255,215,0,0.3)] active:scale-[0.98] transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
