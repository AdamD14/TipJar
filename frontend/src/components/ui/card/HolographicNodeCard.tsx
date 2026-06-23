import React from 'react';

export interface HolographicNodeCardProps {
  nodeName?: string;
  latency?: string;
  peersCount?: number;
}

export const HolographicNodeCard: React.FC<HolographicNodeCardProps> = ({
  nodeName = 'HolographicNodeCard',
  latency = '12ms',
  peersCount = 144
}) => {
  return (
    <div className="relative w-full min-h-[220px] bg-[#001717] rounded-2xl border border-[#4D194D]/40 overflow-hidden shadow-[inset_0_0_50px_rgba(77,25,77,0.15)] flex flex-col items-center justify-center group">
      {/* Proceduralnie zakodowany Seamless SVG Isometric Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen transition-transform duration-[3s] group-hover:scale-105"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='M50 0L100 25L50 50L0 25z' fill='none' stroke='%234D194D' stroke-width='1'/%3E%3Cpath d='M0 25V75L50 100V50z' fill='none' stroke='%234D194D' stroke-width='1'/%3E%3Cpath d='M100 25V75L50 100V50z' fill='none' stroke='%234D194D' stroke-width='1'/%3E%3C/svg%3E")`, 
          backgroundSize: '100px 100px' 
        }}
      >
      </div>
      <div className="relative z-10 w-16 h-16 rounded-full border-2 border-[#9932CC] flex items-center justify-center shadow-[0_0_20px_rgba(77,25,77,0.6),inset_0_0_15px_rgba(77,25,77,0.6)] bg-[#001111]">
        {/* Jądro emisyjne pulsacyjne */}
        <div className="w-5 h-5 bg-[#9932CC] rounded-full shadow-[0_0_10px_#9932CC] animate-pulse"></div>
      </div>
      <div className="relative z-10 mt-5 text-center">
        <h3 className="font-mono text-[#E0F2F2] text-sm tracking-widest" style={{ textShadow: '0 0 8px rgba(224,242,242,0.4)' }}>
          {nodeName}
        </h3>
        <p className="font-mono text-[#CCF7F4]/70 text-[10px] mt-1">Latency: {latency} / Peers: {peersCount}</p>
      </div>
    </div>
  );
};