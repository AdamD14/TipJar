import React from 'react';
export default function SpatialEventCard() {
return (
<div
  className="relative w-full max-w-sm aspect-square flex items-center justify-center gpu-layer overflow-hidden rounded-[32px]"
  style={{
    backgroundColor: 'var(--teal-900, #001111)',
    border: '1px solid var(--teal-800, #003737)',
    boxShadow: '0 20px 50px rgba(0,17,17,0.9)',
  }}
>
  {/* 1. SDF field bg */}
  <div
    className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none"
    style={{
      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(157,78,221,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,215,0,0.1) 0%, transparent 40%)`,
    }}
  />

  {/* 2. Shockwave Ripple — active only */}
  <div
    className="absolute inset-0 z-10 pointer-events-none opacity-0 active:opacity-100"
    style={{
      background: 'radial-gradient(circle at center, rgba(255,215,0,0.2) 0%, transparent 70%)',
      transition: 'all 0.3s ease-out',
    }}
  />

  {/* 3. Collision object */}
  <button
    className="relative z-20 w-48 h-48 rounded-full flex flex-col items-center justify-center group cursor-pointer"
    style={{
      backgroundColor: 'var(--teal-900, #001717)',
      border: '1px solid color-mix(in oklch, var(--gold-400, #FFD700) 20%, transparent)',
      boxShadow: '0 0 40px rgba(255,215,0,0.1), inset 0 0 30px rgba(0,33,33,0.9)',
      transition: 'all 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.filter = 'brightness(1.08)';
      e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--gold-400, #FFD700) 50%, transparent)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.filter = '';
      e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--gold-400, #FFD700) 20%, transparent)';
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.transform = 'scale(0.9)';
      e.currentTarget.style.boxShadow = 'inset 0 15px 40px rgba(0,0,0,0.95)';
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '0 0 40px rgba(255,215,0,0.1), inset 0 0 30px rgba(0,33,33,0.9)';
    }}
  >
    <span
      className="text-xs font-bold tracking-[0.2em] mb-3 group-active:opacity-0 transition-opacity"
      style={{ color: 'color-mix(in oklch, var(--color-text-tertiary, #CCF7F4) 60%, transparent)' }}
    >
      SpatialEventCard
    </span>
    <div
      className="w-16 h-16 rounded-full group-active:scale-50 transition-transform duration-200"
      style={{
        background: 'linear-gradient(to bottom right, var(--gold-400, #FFD700), var(--teal-700, #004C4C))',
        filter: 'drop-shadow(0 0 20px var(--gold-400, #FFD700))',
      }}
    />
  </button>
</div>
);
}
