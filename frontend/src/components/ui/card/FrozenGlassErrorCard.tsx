import React from 'react';

export interface FrozenGlassErrorCardProps {
  title?: string;
  description?: string;
}

export const FrozenGlassErrorCard: React.FC<FrozenGlassErrorCardProps> = ({
  title = 'FrozenGlassErrorCard',
  description = 'The cryptographic node failed to respond. Ice protocols engaged. Retrying in 10s.'
}) => {
  return (
    <div className="relative bg-[#001111] rounded-2xl p-8 overflow-hidden border border-[#002121] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
      {/* Proceduralna tekstura szronu - krystaliczna dyspersja (szum SVG) */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      ></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
        {/* Ikona wygaszonego ostrzeżenia */}
        <div className="w-14 h-14 rounded-full border border-[#FFB4AB]/30 flex items-center justify-center bg-[#FFB4AB]/5 shadow-[0_0_20px_rgba(255,180,171,0.15)] mb-5 backdrop-blur-sm">
          <svg className="w-6 h-6 text-[#FFB4AB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="font-['Mukta_Malar'] text-[#FFB4AB] text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{title}</h3>
        <p className="font-mono text-[#E0F2F2]/50 text-xs mt-2 max-w-[80%] leading-relaxed">{description}</p>
      </div>
    </div>
  );
};