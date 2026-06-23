import React from 'react';

type GenerativeAIInsightCardProps = {
  insight: string;
  metric: number;
  label: string;
};

export default function GenerativeAIInsightCard({ insight, metric, label }: GenerativeAIInsightCardProps) {
return (
<div className="@container w-full bg-[#001717] rounded-[24px] p-1
shadow-[0_15px_30px_rgba(0,17,17,0.7)]">
{/* Architektura układów ewolucyjnych ignorująca viewport okna
(Window) */}
<div className="relative w-full h-full p-6 rounded-[22px]
bg-gradient-to-b from-[#002828] to-[#001111] border
border-[#CCF7F4]/10
flex flex-col @md:flex-row justify-between items-start
@md:items-center gap-6"
>
<div className="flex-1">
<div className="flex items-center gap-2 mb-3">
<div className="w-6 h-6 rounded-md bg-/20 flex
items-center justify-center border border-/50
shadow-[0_0_10px_rgba(157,78,221,0.3)]">
<svg className="w-3 h-3 text-" viewBox="0 0 24 24"
fill="currentColor">
<path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12
6.5z" />
</svg>
</div>
<span className="text-xs font-bold text- uppercase
tracking-widest">
GenerativeAIInsightCard
</span>
</div>
{/* Płynna Typografia na osi Cqi (Container Query Inline)
bez Media Queries */}
<h3 className="text-white font-display leading-tight
font-medium" style={{ fontSize: 'clamp(1rem, 5cqi, 1.5rem)' }}> {insight}
</h3>
</div>
<div className="bg-[#001111] p-5 rounded-[16px] flex flex-col
items-center justify-center min-w-[140px]
shadow-[inset_0_2px_10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(204,247,244,0.
05)] border-t border-[#CCF7F4]/10">
<span className="text-[10px] text-[#CCF7F4]/60 mb-2
uppercase tracking-[0.2em] font-bold">{label}</span>
<span className="text-3xl font-black text-
drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
+{metric}%
</span>
</div>
</div>
</div>
);
}