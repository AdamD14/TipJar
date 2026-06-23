import React from 'react';
export default function SpatialEventCard() {
return (
<div className="relative w-full max-w-sm aspect-square flex
items-center justify-center bg-[#001111] rounded-[32px]
overflow-hidden border border-[#003737]
shadow-[0_20px_50px_rgba(0,17,17,0.9)]">
{/* 1. Abstrakcja Pól SDF - Proceduralny, organiczny wektor tła
rezonujący ze światłem */} <div
className="absolute inset-0 z-0 opacity-40 mix-blend-screen
pointer-events-none"
style={{
backgroundImage: `radial-gradient(circle at 50% 50%,
rgba(157,78,221,0.15) 0%, transparent 60%), radial-gradient(circle at
80% 20%, rgba(255,215,0,0.1) 0%, transparent 40%)`
}}
/>
{/* 2. Emisyjna Fala Uderzeniowa (Shockwave Ripple) wyzwalana
wyłącznie przy aktywacji */}
<div className="absolute inset-0 z-10
bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.2)_0%,transparen
t_70%)] opacity-0 active:opacity-100 active:scale-150 transition-all
duration-300 ease-out pointer-events-none" />
{/* 3. Kolizyjny Obiekt Przestrzenny z twardym rzutem cieniowym
*/}
<button className="relative z-20 w-48 h-48 rounded-full
bg-[#001717] border border-/20
shadow-[0_0_40px_rgba(255,215,0,0.1),inset_0_0_30px_rgba(0,33,33,0.9)]
flex flex-col items-center justify-center group cursor-pointer
hover:border-/50
hover:shadow-[0_0_60px_rgba(255,215,0,0.25),inset_0_0_40px_rgba(0,17,1
7,1)]
active:scale-90
active:shadow-[inset_0_15px_40px_rgba(0,0,0,0.95)] transition-all
duration-200"
>
<span className="text-[#CCF7F4]/60 text-xs font-bold
tracking-[0.2em] mb-3 group-active:opacity-0 transition-opacity">
SpatialEventCard
</span>
<div className="w-16 h-16 rounded-full bg-gradient-to-br from-
to- shadow-[0_0_20px_rgba(255,215,0,0.6)] group-active:scale-50
transition-transform duration-200" />
</button>
</div>
);
}