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
    <div className="relative bg-[#002121] rounded-2xl p-6 border border-[#004545] shadow-[inset_1px_1px_0_rgba(224,242,242,0.05),0_8px_16px_rgba(0,31,31,0.5)] flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-['Mukta_Malar'] text-[#CCF7F4] text-sm uppercase tracking-wider font-semibold">{title}</h4>
        <svg className="w-5 h-5 text-[#3FB5B5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <div>
        {/* IBM Plex Mono z holograficznym, wielowarstwowym podświetleniem tekstu chroniącym przed halacją */}
        <div className="font-mono text-4xl text-[#E0F2F2] tracking-tight relative inline-block">
          <span className="relative z-10 font-bold" style={{ textShadow: "-1px 1px 0 #001111, 1px 1px 0 #001111, 0px 0px 10px rgba(255,215,0,0.5)" }}>
            {value}
          </span>
          <span className="text-xl text-[#CCF7F4] ml-2 font-normal">{currency}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="bg-[#003737] text-[#E0F2F2] font-mono text-xs px-2 py-1 rounded border border-[#005959] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            {changeText}
          </span>
          <span className="font-mono text-[#76CBCB] text-xs">{statusText}</span>
        </div>
      </div>
    </div>
  );
};