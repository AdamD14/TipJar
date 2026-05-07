"use client";


import React from 'react';
import PublicHeader from '@/components/studio/PublicHeader';
import Section from '@/components/studio/marketing/Section';
import { ShieldCheck, Zap, Globe, Coins } from 'lucide-react';

export default function WhyPage() {
  return (
    <main className="min-h-screen bg-[#001F1F] text-[#DDE0DA] pt-24 pb-20 selection:bg-[#006D6D]">
      <PublicHeader />
      <header className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-6xl font-black italic tracking-tighter text-white">Why TipJar+?</h1>
        <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-400 font-medium leading-relaxed">
          Monetyzacja twórczości w USDC bez cenzury i pośredników. <br/>
          <span className="text-[#FFD700]">Web2 UX, Web3 settlement.</span>
        </p>
      </header>

      <Section title="Problem → Rozwiązanie" subtitle="Zarabiaj bez arbitralnych blokad i wysokich prowizji.">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { t: "1. Block & demonetyzacja", d: "Platformy Web2 ograniczają zasięg i przychody na podstawie algorytmów.", icon: <ShieldCheck className="text-rose-500" /> },
            { t: "2. Wysokie prowizje", d: "Płatności kartą i tradycyjne wypłaty pożerają do 30% Twojej marży.", icon: <Coins className="text-amber-500" /> },
            { t: "3. Rozwiązanie: TipJar+", d: "Micro-tips w USDC, natychmiastowe rozliczenia on-chain i globalny zasięg.", icon: <Zap className="text-[#FFD700]" /> }
          ].map((item, i) => (
            <div key={i} className="rounded-3xl bg-[#003737]/40 p-8 border border-white/5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">{item.icon}</div>
              <p className="font-black text-white text-lg italic">{item.t}</p>
              <p className="text-sm text-[#BCC1B6] leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Dlaczego USDC?">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <ul className="space-y-6">
              {[
                "Stabilny kurs powiązany z USD — prosta komunikacja wartości dla fanów.",
                "Szybkie i niemal darmowe transakcje on-chain (Polygon/Solana).",
                "Pełna interoperacyjność — Twoje środki są Twoją własnością, nie platformy."
              ].map((text, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-1 font-black text-xs">✓</div>
                  <p className="font-bold text-slate-300">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-80 h-80 bg-gradient-to-br from-[#006D6D] to-[#FFD700]/20 rounded-[4rem] flex items-center justify-center shadow-2xl relative overflow-hidden">
             <div className="text-9xl opacity-20">🪙</div>
             <Globe size={160} className="text-white/20 absolute -bottom-10 -right-10" />
          </div>
        </div>
      </Section>
    </main>
  );
}
