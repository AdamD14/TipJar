import React from 'react';

type GatedContentCardProps = {
	isLocked: boolean;
	content?: React.ReactNode;
};

export default function GatedContentCard({ isLocked, content }: GatedContentCardProps) {
return (
<div className="relative w-full p-8 rounded-xl bg-teal-900 border border-teal-800 shadow-card-rest">
<div
className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none rounded-xl"
style={{
backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%234D194D' stroke-width='1'/%3E%3C/svg%3E")`,
backgroundPosition: 'center'
}}
/>
{isLocked ? (
<div className="relative z-10 flex flex-col items-center justify-center py-10">
<svg className="w-12 h-12 mb-4 text-teal-200" viewBox="0 0 24 24" fill="currentColor">
<path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm-3 5c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z" />
</svg>
<span className="text-xl font-bold tracking-[0.2em] text-teal-200">
Community Gated Card
</span>
</div>
) : (
<div className="relative z-10">
<div className="flex items-center gap-3 mb-4 border-b border-teal-800 pb-3">
<div className="w-3 h-3 rounded-full bg-purple-300 shadow-[0_0_12px_rgba(77,25,77,0.8)]" />
<span className="text-sm font-semibold text-gold-400 tracking-widest uppercase">Ekskluzywny Wpis</span>
</div>
<p className="text-teal-50 antialiased text-shadow-[0_0_8px_rgba(0,17,17,0.9)] leading-relaxed font-body">
{content}
</p>
</div>
)}
</div>
);
}
