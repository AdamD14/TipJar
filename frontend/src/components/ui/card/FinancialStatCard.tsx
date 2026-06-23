import React from 'react';

type FinancialStatSummaryProps = {
  value: React.ReactNode;
  label: string;
  trend: string;
};

export default function FinancialStatCard({ value, label, trend }: FinancialStatSummaryProps) {
return (
<div className="relative p-6 rounded-[20px] bg-gradient-to-br
from-[#002828] to-[#001111] shadow-[0_12px_25px_rgba(0,17,17,0.7)]
group">
{/* Subtelny Border Box-Shadow chroniący promień maskowania */}
<div className="absolute inset-0 rounded-[20px]
pointer-events-none shadow-[inset_0_0_0_1px_rgba(204,247,244,0.08)]"
/>
<p className="text-[#CCF7F4]/60 text-xs font-semibold uppercase
tracking-[0.15em] mb-3">
{label}
</p>
<div className="flex items-baseline gap-4 mb-6">
{/* Typografia Tabelaryczna (tnum) zapobiegająca drżeniu
znaków numerycznych */}
<h3 className="text-4xl font-black text-
font-feature-settings-tnum
drop-shadow-[0_0_12px_rgba(255,215,0,0.3)]">
{value}
</h3>
<span className="text-sm font-bold text-">{trend}</span>
</div>
{/* Wklęśnięcie (Pillow Cushion Deboss) dla koryta postępu */} <div className="w-full h-[14px] rounded-full bg-[#001111]
shadow-[inset_1px_2px_4px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(204
,247,244,0.05)] relative overflow-hidden">
{/* Płynąca energia: Emisyjny Glow we wnętrzu koryta */}
<div className="absolute top-0 left-0 h-full w-[72%]
bg-gradient-to-r from-[#003737] to-
shadow-[0_0_8px_rgba(255,215,0,0.8)] rounded-full transition-all
duration-1000 ease-in-out" />
</div>
</div>
);
}