import React from 'react';

export interface CreatorPulseCardProps {
  name?: string;
  handle?: string;
  avatarUrl?: string;
  isSynced?: boolean;
  onSupportClick?: () => void;
}

export const CreatorPulseCard: React.FC<CreatorPulseCardProps> = ({
  name = '0xMaestro',
  handle = '@synth_architect',
  avatarUrl,
  isSynced = true,
  onSupportClick
}) => {
  return (
    <div className="relative p-[1px] group rounded-2xl w-full h-full drop-shadow-[0_8px_16px_rgba(0,31,31,0.6)] isolate transform-gpu">
      {/* Kapsuła wewnętrzna i tło z proceduralnym mikrowzorem 1px */}
      <div className="relative w-full h-full bg-[#003737] rounded-2xl overflow-hidden flex flex-col p-6 z-10 transition-transform duration-[400ms] ease-out group-hover:-translate-y-1">
        {/* Minimalistyczna siatka 1px w tle dla technicznego charakteru */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(171,225,225,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(171,225,225,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none mix-blend-overlay"></div>
        
        <div className="flex items-center gap-4 relative z-20">
          {/* Avatar w kontrze (Pixel Art estetyka Y2K) */}
          <div className="w-16 h-16 bg-[#001F1F] rounded-md border border-[#007373] p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center flex-shrink-0">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover rounded-sm" />
            ) : (
              <svg className="w-10 h-10" style={{ imageRendering: 'pixelated' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" shapeRendering="crispEdges">
                <rect width="8" height="8" fill="#001F1F"/>
                <rect x="2" y="2" width="4" height="4" fill="#3FB5B5"/>
                <rect x="3" y="1" width="2" height="1" fill="#FFD700"/>
                <rect x="2" y="3" width="1" height="1" fill="#4D194D"/>
                <rect x="5" y="3" width="1" height="1" fill="#4D194D"/>
                <rect x="3" y="5" width="2" height="1" fill="#FFD700"/>
              </svg>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-['Mukta_Malar'] text-[#E0F2F2] text-xl tracking-[0.05em] leading-[1.1] font-bold truncate">{name}</h3>
            <span className="font-mono text-[#CCF7F4] text-sm font-medium truncate">{handle}</span>
          </div>
        </div>

        <div className="mt-auto pt-6 flex justify-between items-center relative z-20">
          {/* Web3 Active Indicator */}
          <span className="text-[#00FFCC] font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2 select-none">
            <span className={`w-2 h-2 rounded-full bg-[#00FFCC] shadow-[0_0_8px_#00FFCC] ${isSynced ? 'animate-pulse' : 'opacity-40'}`}></span>
            {isSynced ? 'Node Synced' : 'Offline'}
          </span>
          {/* Przycisk CTA: Monopol Luksusowego Złota */}
          <button 
            onClick={onSupportClick}
            className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#001F1F] px-4 py-2 rounded-lg font-sans font-bold text-sm shadow-[0_4px_12px_rgba(255,215,0,0.15)] transition-all duration-[250ms] active:scale-95 hover:shadow-[0_8px_20px_rgba(255,215,0,0.3)] cursor-pointer"
          >
            SUPPORT
          </button>
        </div>
      </div>
      {/* Hardware Accelerated Shadow Layer (The Maestro Hack) */}
      <div className="absolute inset-0 rounded-2xl shadow-[0_20px_25px_rgba(0,31,31,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity -z-10"></div>
    </div>
  );
};