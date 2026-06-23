import React from 'react';

type GatedContentCardProps = {
	isLocked: boolean;
	content?: React.ReactNode;
};

export default function GatedContentCard({ isLocked, content }: GatedContentCardProps) {
return (
<div className="relative w-full p-8 rounded-[16px] bg-[#001A1A]
border border-[#003737] shadow-[0_8px_20px_rgba(0,17,17,0.8)]"> {/* Abstrakcyjny mikro-wzór zagnieżdżony jako tło */}
<div
className="absolute inset-0 z-0 opacity-[0.03]
pointer-events-none rounded-[16px]"
style={{
backgroundImage: `url("data:image/svg+xml,%3Csvg width='60'
height='60' viewBox='0 0 60 60'
xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0
30z' fill='none' stroke='%239D4EDD' stroke-width='1'/%3E%3C/svg%3E")`,
backgroundPosition: 'center'
}}
/>
{isLocked? (
<div className="relative z-10 flex flex-col items-center
justify-center py-10">
<svg className="w-12 h-12 mb-4 text-[#001111]
drop-shadow-[0_1px_1px_rgba(204,247,244,0.15)]" viewBox="0 0 24 24"
fill="currentColor">
<path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2.897-2
2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897
2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm-3 5c0-1.654
1.346-3 3-3s3 1.346 3 3v3H9V7z" />
</svg>
{/* Tekst Wytłoczony (Letterpress) - optyczne wklęśnięcie w
materiał */}
<span className="text-xl font-bold tracking-[0.2em]
text-[#ffd700]
text-shadow-[0px_1px_0px_rgba(204,247,244,0.15),0px_-1px_0px_rgba(0,0,
0,0.8)]">
Community Gated Card
</span>
</div>
) : (
<div className="relative z-10">
<div className="flex items-center gap-3 mb-4 border-b
border-[#003737] pb-3">
<div className="w-3 h-3 rounded-full bg-
shadow-[0_0_12px_rgba(157,78,221,0.8)]" />
<span className="text-sm font-semibold text-
tracking-widest uppercase">Ekskluzywny Wpis</span>
</div>
{/* Tekst Odcięty (Decoupling) chroniący przed halacją na
tłach gradientowych */}
<p className="text-[#CCF7F4] antialiased
text-shadow-[0_0_8px_rgba(0,17,17,0.9)] leading-relaxed font-body">
{content} </p>
</div>
)}
</div>
);
}