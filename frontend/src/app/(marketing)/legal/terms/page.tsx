"use client";


import React from 'react';
import PublicHeader from '@/components/ui/layout/PublicHeader';

export default function LegalTermsPage() {
  return (
    <main className="min-h-screen bg-[#001F1F] text-[#DDE0DA] pt-24 pb-20">
      <PublicHeader />
      <article className="mx-auto max-w-3xl px-6 py-20 space-y-10">
        <header className="space-y-4">
           <p className="text-[10px] font-black text-[#006D6D] uppercase tracking-[0.4em]">Legal / Compliance</p>
           <h1 className="text-6xl font-black italic text-white tracking-tighter">Terms of Service</h1>
           <p className="text-slate-500 text-sm italic">Ostatnia aktualizacja: 24 sierpnia 2025</p>
        </header>
        
        <div className="prose prose-invert max-w-none space-y-8 font-medium text-slate-400 leading-relaxed">
          <section className="space-y-4">
             <h2 className="text-2xl font-black text-white italic">1. Postanowienia ogólne</h2>
             <p>Witamy w TipJar+. Niniejszy regulamin określa zasady korzystania z naszej platformy, która łączy tradycyjny interfejs użytkownika z technologią rozliczeń Web3. Korzystając z serwisu, akceptujesz poniższe warunki.</p>
          </section>

          <section className="space-y-4">
             <h2 className="text-2xl font-black text-white italic">2. Płatności i opłaty</h2>
             <p>Wszystkie transakcje napiwkowe realizowane są w stablecoinie USDC na sieciach Polygon lub Solana. TipJar+ pobiera prowizję operacyjną w wysokości 3.5%, która jest odejmowana automatycznie w momencie transakcji.</p>
          </section>

          <section className="space-y-4">
             <h2 className="text-2xl font-black text-white italic">3. Odpowiedzialność twórcy</h2>
             <p>Twórca jest odpowiedzialny za rozliczenie podatkowe otrzymanych środków zgodnie z prawem kraju swojej rezydencji. Platforma dostarcza narzędzia ułatwiające raportowanie, ale nie pełni roli płatnika podatku.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
