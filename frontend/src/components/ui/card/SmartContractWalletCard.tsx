import React from 'react';
export default function SmartContractWalletCard({ balance }: { balance: number | string }) {
return (
<div className="relative perspective-[1200px] w-full max-w-sm">
<div
  className="glass-liquid gpu-layer relative w-full p-8 rounded-[24px] transform-gpu transition-transform duration-500"
  style={{
    background: 'radial-gradient(ellipse at top right, var(--teal-800, #003737) 0%, var(--teal-900, #001111) 100%)',
    border: '1px solid color-mix(in oklch, var(--color-text-tertiary, #CCF7F4) 15%, transparent)',
    boxShadow: '0 25px 50px rgba(0,17,17,0.9)',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'rotateX(3deg) rotateY(-3deg)';
    e.currentTarget.style.filter = 'brightness(1.03)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = '';
    e.currentTarget.style.filter = '';
  }}
>
  <div
    className="absolute inset-0 pointer-events-none rounded-[24px]"
    style={{
      boxShadow: 'inset 1px 1px 0 rgba(204,247,244,0.1), inset -1px -1px 0 rgba(0,0,0,0.5)',
    }}
  />
  <div className="relative z-10 flex justify-between items-center mb-12">
    <div className="flex items-center gap-3">
      <div
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ backgroundColor: 'var(--gold-400, #FFD700)', filter: 'drop-shadow(0 0 12px var(--gold-400, #FFD700))' }}
      />
      <span
        className="text-sm font-semibold tracking-widest uppercase font-heading"
        style={{ color: 'var(--color-text-tertiary, #CCF7F4)' }}
      >
        SmartContractWalletCard
      </span>
    </div>
    <span
      className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest"
      style={{
        backgroundColor: 'var(--teal-900, #001111)',
        color: 'var(--gold-400, #FFD700)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
      }}
    >
      GASLESS
    </span>
  </div>
  <div className="relative z-10">
    <p
      className="text-xs mb-2 tracking-widest uppercase font-bold"
      style={{ color: 'color-mix(in oklch, var(--color-text-tertiary, #CCF7F4) 50%, transparent)' }}
    >
      Dostępne Aktywa
    </p>
    <div className="flex items-baseline gap-2">
      <span
        className="text-3xl font-light"
        style={{ color: 'color-mix(in oklch, var(--color-text-primary, #f2f7f7) 50%, transparent)' }}
      >
        $
      </span>
      <p
        className="text-6xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-white to-[#CCF7F4]"
      >
        {balance}
      </p>
    </div>
  </div>
  <div
    className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none rounded-[24px]"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  />
</div>
</div>
);
}
