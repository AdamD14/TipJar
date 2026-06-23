import React from 'react';
export default function SmartContractWalletCard({ balance }: { balance: number | string }) {
return (
<div className="relative perspective-[1200px] w-full max-w-sm">
<div className="relative w-full p-8 rounded-[24px]
bg-[radial-gradient(ellipse_at_top_right,#003737_0%,#001111_100%)]
transform-gpu transition-transform duration-500
hover:rotate-x-[3deg] hover:-rotate-y-[3deg]
shadow-[0_25px_50px_rgba(0,17,17,0.9)] border
border-[#CCF7F4]/15"
>
<div className="absolute inset-0 pointer-events-none
rounded-[24px]
shadow-[inset_1px_1px_0_rgba(204,247,244,0.1),inset_-1px_-1px_0_rgba(0
,0,0,0.5)]" />
<div className="relative z-10 flex justify-between
items-center mb-12"> <div className="flex items-center gap-3">
{/* Pulsacyjny Wektor Aktywacyjny */}
<div className="w-2 h-2 rounded-full bg-
shadow-[0_0_12px_rgba(255,215,0,0.8)] animate-pulse" />
<span className="text-[#CCF7F4] text-sm font-semibold
tracking-widest uppercase">SmartContractWalletCard</span>
</div>
<span className="px-3 py-1 rounded-full bg-[#001111] text-
text-[10px] font-black tracking-widest
shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
GASLESS
</span>
</div>
<div className="relative z-10">
<p className="text-xs text-[#CCF7F4]/50 mb-2 tracking-widest
uppercase font-bold">Dostępne Aktywa</p>
<div className="flex items-baseline gap-2">
<span className="text-3xl text-white/50
font-light">$</span>
<p className="text-6xl font-black text-transparent
bg-clip-text bg-gradient-to-r from-white to-[#CCF7F4]
font-feature-settings-tnum drop-shadow-[0_4px_8px_rgba(0,17,17,0.8)]">
{balance}
</p>
</div>
</div>
{/* Szum Teksturowy (Atmospheric Noise) na spód karty
zapobiegający bandingowi */}
<div
className="absolute inset-0 opacity-[0.02] mix-blend-overlay
pointer-events-none rounded-[24px]"
style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg
viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter
id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise'
baseFrequency='0.65' numOctaves='3'
stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25'
height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
/>
</div>
</div>
);
}