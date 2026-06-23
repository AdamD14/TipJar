import React from 'react';
type CreatorIdentityCardProps = {
  name: string;
  role: string;
};

export default function CreatorIdentityCard({ name, role }: CreatorIdentityCardProps) {
return (
<div className="relative w-full max-w-md overflow-hidden
rounded-[24px] bg-[#003737] shadow-[0_15px_35px_rgba(0,17,17,0.9)]
group">
{/* 1px SVG Micro-Grid wstrzyknięty jako tło, nadający
techniczny sznyk */} <div
className="absolute inset-0 z-0 opacity-[0.07]
pointer-events-none"
style={{
backgroundImage: `url("data:image/svg+xml,%3Csvg width='40'
height='40' viewBox='0 0 40 40'
xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1
1h38v38H1V1z' fill='%23CCF7F4' fill-opacity='1'
fill-rule='evenodd'/%3E%3C/svg%3E")`,
backgroundSize: '20px 20px'
}}
/>
{/* Optyczna Wypukłość (Bevel) za pomocą podwójnego cienia
wewnętrznego */}
<div className="absolute inset-0 z-10 pointer-events-none
rounded-[24px]
shadow-[inset_1px_1px_0_rgba(204,247,244,0.1),inset_-1px_-1px_0_rgba(0
,17,17,0.8)]" />
<div className="relative z-20 p-8 flex flex-col items-center">
{/* Kontener Awatara: Architektura Liquid Glass z kompensacją
nasycenia */}
<div className="relative w-28 h-28 mb-6 rounded-full
bg-[#003737]/40 backdrop-blur-2xl backdrop-saturate-200
shadow-[0_10px_25px_rgba(0,17,17,0.8)] border border-[#CCF7F4]/15
p-1">
<img src="/avatar-creator.webp" alt={name} className="w-full
h-full object-cover rounded-full" />
{/* Emissive Neon Glow Indicator - samoświecący obiekt
sygnalizujący status "Live" */}
<div className="absolute bottom-1 right-1 w-5 h-5
rounded-full bg- shadow-[0_0_15px_rgba(255,215,0,0.8)] border-2
border-[#001717]" />
</div>
<h2 className="text-2xl font-bold tracking-tight text-white
mb-1 drop-shadow-[0_2px_4px_rgba(0,17,17,0.9)]">
{name}
</h2>
<p className="text-sm font-semibold text- uppercase
tracking-[0.2em]">
{role}
</p>
</div>
</div>
); }