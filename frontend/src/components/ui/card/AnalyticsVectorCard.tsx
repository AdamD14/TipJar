import React from 'react';
export default function AnalyticsGrid() {
const metrics: Array<{ title: string; value: string | number; diff: string }> = [];
return (
<div className="group flex flex-wrap gap-5 w-full">
{metrics.map((stat: { title: string; value: string | number; diff: string }, i: number) => (
<div
key={i}
className="relative bg-[#001717]/80 backdrop-blur-xl border
border-[#CCF7F4]/10 p-6 w-full flex-1 min-w-[200px] rounded-[16px]
shadow-[0_8px_16px_rgba(0,17,17,0.6)]
transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)]
group-hover:not-hover:opacity-30
group-hover:not-hover:scale-95
group-hover:not-hover:blur-[2px]"
>
{/* Optyczna spójność za pomocą Logical Properties: mbe
(margin-block-end) */}
<h3 className="mbe-3 font-display text-xs font-bold text-
uppercase tracking-[0.1em]">
{stat.title}
</h3>
<div className="flex justify-between items-end">
<p className="text-3xl font-black text-white font-feature-settings-tnum drop-shadow-[0_2px_4px_rgba(0,17,17,0.8)]">
{stat.value}
</p>
<span className="text-sm font-bold text-
mb-1">{stat.diff}</span>
</div>
</div>
))}
</div>
);
}