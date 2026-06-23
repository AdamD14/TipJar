import React from 'react';
export default function ActionCard({ label, subtitle }: { label: string; subtitle: string }) {
return (
<button className="relative w-full p-6 rounded-[16px] bg-[#001717]
outline-none group cursor-pointer text-left
transition-all duration-300 ease-out
@media(hover:hover):hover:-translate-y-1
active:scale-[0.98] active:translate-y-0" >
{/* 1. Cień Bazowy - Spoczynek (Z-1) */}
<div className="absolute inset-0 rounded-[16px]
shadow-[0_6px_15px_rgba(0,17,17,0.7)] transition-opacity duration-300
group-hover:opacity-0" />
{/* 2. Cień Uniesienia - Anticipation (Z-3), optymalizowany
przez Hardware Compositing */}
<div className="absolute inset-0 rounded-[16px]
shadow-[0_25px_35px_-5px_rgba(0,17,17,0.9)] opacity-0
transition-opacity duration-300 will-change-opacity
@media(hover:hover):group-hover:opacity-100" />
{/* 3. Wklęśnięcie Reakcyjne (Depress) + Emisyjny Błysk na dotyk
(Kinetic Shock) */}
<div className="absolute inset-0 rounded-[16px] bg-[#002828]
shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(0,17,17,
1)] opacity-0 transition-opacity duration-100
group-active:opacity-100" />
<div className="relative z-10 flex items-center
justify-between">
<div>
<span className="block text-lg font-bold text-[#CCF7F4]
group-hover:text- transition-colors duration-200">
{label}
</span>
<span className="block text-xs font-medium text- mt-1">
{subtitle}
</span>
</div>
<div className="w-10 h-10 rounded-full bg-[#003737] flex
items-center justify-center border border-[#CCF7F4]/10
shadow-[0_0_10px_rgba(0,17,17,0.5)] group-active:scale-90
transition-transform">
<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
stroke="#FFD700" strokeWidth="2" strokeLinecap="round"
strokeLinejoin="round">
<path d="M5 12h14M12 5l7 7-7 7"/>
</svg>
</div>
</div>
</button>
);
}