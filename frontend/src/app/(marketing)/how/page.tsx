"use client";


import React from 'react';
import PublicHeader from '@/components/studio/PublicHeader';
import Section from '@/components/studio/marketing/Section';
import { UserPlus, Wallet, Share2, Heart } from 'lucide-react';

const STEPS = [
  { n: 1, t: "Create Profile", d: "Zarejestruj się, dodaj Bio i dostosuj wygląd swojego studio.", icon: <UserPlus /> },
  { n: 2, t: "Connect Wallet", d: "Wybierz portfel on-chain (MetaMask) lub konto custodial.", icon: <Wallet /> },
  { n: 3, t: "Share Link", d: "Dodaj link profilu i widgety w swoich mediach społecznościowych.", icon: <Share2 /> },
  { n: 4, t: "Receive Tips", d: "USDC trafia bezpośrednio do Twojego portfela. Czysty zysk.", icon: <Heart /> },
];

export default function HowPage() {
  return (
    <main className="min-h-screen bg-[#001F1F] text-[#DDE0DA] pt-24 pb-20 selection:bg-[#006D6D]">
      <PublicHeader />
      <header className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-6xl font-black italic tracking-tighter text-white">How it works?</h1>
        <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-400 font-medium">Proces w 4 krokach — bez tarcia i zbędnej biurokracji.</p>
      </header>

      <Section title="Twoja droga do monetyzacji">
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {STEPS.map(s => (
            <li key={s.n} className="relative group">
              <div className="rounded-[2.5rem] bg-white/5 p-8 border border-white/5 h-full space-y-6 hover:bg-white/10 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-[#006D6D] flex items-center justify-center text-white shadow-xl">
                  {s.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Krok {s.n}</p>
                  <p className="mt-2 text-xl font-black text-white italic">{s.t}</p>
                  <p className="mt-3 text-sm text-[#BCC1B6] leading-relaxed">{s.d}</p>
                </div>
              </div>
              {s.n < 4 && <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10 z-10" />}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Integracje & Preview" subtitle="Dostarczamy narzędzia, których potrzebuje profesjonalny twórca.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {['Multi-Chain Wallets', 'Instant On/Off-ramp', 'Dynamic OBS Overlays'].map(tech => (
            <div key={tech} className="rounded-2xl bg-[#003737]/40 p-6 text-center border border-white/5 font-black uppercase text-xs tracking-widest text-[#FFD700]">
              {tech}
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
