import React from 'react';

export interface PremiumSubscriptionCardProps {
  tierName?: string;
  title?: string;
  description?: string;
  onUpgrade?: () => void;
}

export const PremiumSubscriptionCard: React.FC<PremiumSubscriptionCardProps> = ({
  tierName = 'PRO TIER',
  title = 'Gala Dinner',
  description = 'Unlock gasless microtransactions, programmable wallet automations, and zero platform fees.',
  onUpgrade
}) => {
  return (
    <div className="relative p-[2px] rounded-2xl w-full isolate overflow-hidden group hover:scale-[1.02] transition-transform duration-[400ms]">
      {/* Obracający się gradient conic symulujący błysk fotonowy na krawędzi */}
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#FFD700,#001717,#FFD700)] animate-spin -z-10" style={{ animationDuration: '4s' }}></div>
      <div className="absolute inset-[2px] bg-[#001717] rounded-[14px] -z-10 shadow-[inset_0_20px_50px_-20px_rgba(255,215,0,0.15)]"></div>
      
      <div className="p-6 h-full flex flex-col relative z-10">
        <div className="w-max px-3 py-1 bg-[#4D194D]/40 border border-[#9932CC] rounded-full font-mono text-[10px] text-[#E0F2F2] tracking-widest mb-5 shadow-[0_0_10px_rgba(77,25,77,0.6)]">
          {tierName}
        </div>
        <h3 className="font-['Mukta_Malar'] text-[#FFD700] text-3xl font-light drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">{title}</h3>
        <p className="font-sans text-[#E0F2F2] text-sm mt-3 mb-8 leading-relaxed">{description}</p>
        <button 
          onClick={onUpgrade}
          className="mt-auto w-full py-3.5 rounded-xl bg-[#FFD700] text-[#001F1F] font-bold font-mono tracking-wide shadow-[0_6px_20px_rgba(255,215,0,0.3)] hover:shadow-[0_10px_30px_rgba(255,215,0,0.5)] active:scale-95 transition-all duration-300 cursor-pointer"
        >
          PremiumSubscriptionCard
        </button>
      </div>
    </div>
  );
};