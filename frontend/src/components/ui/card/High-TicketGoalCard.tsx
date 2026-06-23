import React from 'react';
export default function AdvancedGoalCard({ title, percentage }: { title: string; percentage: number }) {
return (
/* 1. Kapsuła Zewnętrzna (Double Wrapper): Odpowiada wyłącznie za
dystrybucję cienia za pomocą drop-shadow omijając box-shadow */
<div className="relative w-full p-[1px] filter
drop-shadow-[0_12px_20px_rgba(157,78,221,0.25)]
hover:drop-shadow-[0_15px_30px_rgba(157,78,221,0.4)] transition-all
duration-500">
{/* 2. Kapsuła Wewnętrzna: Wykonuje bezlitosne cięcie wektorowe
(clip-path) bez ryzyka utraty aury */}
<div
className="relative w-full bg-gradient-to-br from-[#001717]
to-[#001111] overflow-hidden"
style={{ clipPath: "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" } as React.CSSProperties}
>
{/* Szklana Krawędź Optyczna (Glassmorphic Rim Light) ukryta
pod wektorem cięcia */}
<div className="absolute inset-0 pointer-events-none
shadow-[inset_1px_1px_0_rgba(204,247,244,0.15),inset_-1px_-1px_0_rgba(
0,0,0,0.8)]" />
<div className="p-8 relative z-10">
<div className="flex justify-between items-end mb-6">
<h4 className="text-[#CCF7F4] text-xl font-display font-bold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,17,17,0.9)]">
{title}
</h4>
<span className="text-[#CCF7F4] text-2xl font-black font-feature-settings-tnum">
{percentage}%
</span>
</div>
<div className="relative w-full h-[6px] bg-[#002121] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
<div
className="absolute top-0 left-0 h-full bg-[#9d4edd] shadow-[0_0_12px_rgba(157,78,221,0.8)]"
style={{ width: `${percentage}%` }}
/>
{/* Wektor Akcentujący Postęp */}
<div
className="absolute top-1/2 -translate-y-1/2 w-3 h-6 bg-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.9)]"
style={{ left: `calc(${percentage}% - 6px)` }}
/>
</div>
</div>
</div>
</div>
);
}