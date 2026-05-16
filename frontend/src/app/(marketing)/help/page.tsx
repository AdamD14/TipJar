"use client";


import React from 'react';
import PublicHeader from '@/components/ui/layout/PublicHeader';
import { ChevronDown } from 'lucide-react';

const FAQ = [
  { q: "Jak zacząć jako twórca?", a: "To proste! Załóż konto w 30 sekund, uzupełnij swój profil publiczny o Bio i social media, a następnie udostępnij swój unikalny link fanom. Pierwsze wpłaty w USDC mogą trafić do Ciebie już tego samego dnia." },
  { q: "Jak fani mogą dodać środki do portfela?", a: "Fani mają dwie drogi: mogą skorzystać z wbudowanego widgetu On-ramp (płatność kartą/Apple Pay zamieniana na USDC) lub wysłać środki bezpośrednio ze swojego portfela on-chain (np. MetaMask) przez sieć Polygon lub Solana." },
  { q: "Czy mogę wypłacić zarobione USDC do banku?", a: "Tak. W sekcji Wallet znajdziesz opcję 'Off-ramp'. Współpracujemy z operatorami finansowymi, którzy pozwalają na wymianę USDC na EUR/PLN i przelew tradycyjny (SEPA/ELIXIR) bezpośrednio na Twoje konto bankowe." },
  { q: "Jakie są prowizje platformy?", a: "Nasza standardowa prowizja to 3.5% od transakcji. Dzięki wykorzystaniu technologii blockchain, unikamy opłat bankowych wynoszących często nawet 10-15%. Wspieramy rozwój gospodarki twórców bez zbędnych kosztów." },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-[#001F1F] text-[#DDE0DA] pt-24 pb-20">
      <PublicHeader />
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-6xl font-black italic text-white tracking-tighter text-center mb-16">Help Center</h1>
        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <details key={i} className="group rounded-[2rem] border border-white/10 bg-white/5 overflow-hidden transition-all">
              <summary className="flex items-center justify-between cursor-pointer p-8 font-black text-lg text-white list-none">
                {item.q}
                <ChevronDown size={20} className="text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-8 pb-8 text-slate-400 font-medium leading-relaxed border-t border-white/5 pt-6">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
