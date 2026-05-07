"use client";


import React from 'react';
import PublicHeader from '@/components/studio/PublicHeader';

export default function LegalDMCAPage() {
  return (
    <main className="min-h-screen bg-[#001F1F] text-[#DDE0DA] pt-24 pb-20">
      <PublicHeader />
      <article className="mx-auto max-w-3xl px-6 py-20 space-y-10">
        <header className="space-y-4">
           <p className="text-[10px] font-black text-[#006D6D] uppercase tracking-[0.4em]">Copyright / IP</p>
           <h1 className="text-6xl font-black italic text-white tracking-tighter">DMCA Notice</h1>
        </header>
        
        <div className="prose prose-invert max-w-none space-y-8 font-medium text-slate-400 leading-relaxed">
          <p>Szanujemy własność intelektualną. Jeśli uważasz, że treści publikowane w profilach TipJar+ naruszają Twoje prawa autorskie, prosimy o przesłanie zgłoszenia na adres copyright@tipjar.plus.</p>
          <h2 className="text-2xl font-black text-white italic">Wymagane informacje</h2>
          <p>Twoje zgłoszenie musi zawierać precyzyjny link do spornego profilu, opis dzieła naruszonego oraz oświadczenie o dobrej wierze.</p>
        </div>
      </article>
    </main>
  );
}
