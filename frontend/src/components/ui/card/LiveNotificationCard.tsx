import React from 'react';

type LiveNotificationCardProps = {
	username: string;
	amount: number | string;
	message?: string;
};

export default function LiveNotificationCard({ username, amount, message }: LiveNotificationCardProps) {
return (
<div className="relative flex items-center justify-between p-5
mb-3 rounded-[16px] bg-[#002121]/80 backdrop-blur-xl border
border-[#CCF7F4]/10 shadow-[0_10px_30px_rgba(0,17,17,0.85)]
opacity-100 scale-100 rotate-0 blur-0
transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]
starting:opacity-0 starting:scale-75 starting:-rotate-6
starting:blur-2xl"
>
<div className="flex items-center gap-4">
{/* Holograficzny Avatar Placeholder z minimalistycznym
cieniem emisyjnym */}
<div className="w-12 h-12 rounded-full bg-gradient-to-tr
from-[#003737] to- p-[2px] shadow-[0_0_20px_rgba(255,215,0,0.4)]">
<div className="w-full h-full rounded-full bg-[#001717] flex items-center justify-center">
<svg width="20" height="20" viewBox="0 0 24 24"
fill="none" stroke="#FFD700" strokeWidth="2">
<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
<circle cx="12" cy="7" r="4" />
</svg>
</div>
</div>
<div className="flex flex-col">
<p className="text-sm font-bold text-white
tracking-wide">{username}</p>
<p className="text-xs text-[#CCF7F4]/50">{message}</p>
</div>
</div>
<div className="text-xl font-black text-
drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]">
+{amount} USDC
</div>
</div>
);
}