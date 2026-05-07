
import React from 'react';
import PublicHeader from '../components/PublicHeader';
import { Search, HelpCircle, ArrowRight } from 'lucide-react';

const CATS = [
  { t: "Konto i Logowanie", d: "Rejestracja, weryfikacja 2FA, odzyskiwanie dostępu." },
  { t: "Płatności & Wallet", d: "Portfel USDC, on/off-ramp, limity wypłat." },
  { t: "Narzędzia Twórcy", d: "Widgety, overlaye, cele i systemy subskrypcji." },
  { t: "Prywatność & Dane", d: "Twoje uprawnienia i bezpieczeństwo dokumentów KYC." },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#001F1F] text-[#DDE0DA] pt-24 pb-20">
      <PublicHeader />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <header className="text-center mb-16 space-y-6">
          <h1 className="text-6xl font-black italic tracking-tighter text-white">Support Hub</h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">Centrum pomocy i zgłoszeń technicznych TipJar+.</p>
          <div className="max-w-xl mx-auto relative">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" />
             <input type="text" placeholder="W czym możemy Ci dzisiaj pomóc?" className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 text-sm font-bold focus:outline-none focus:border-[#006D6D] transition-all" />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {CATS.map((c, i) => (
            <div key={i} className="rounded-[3rem] border border-white/10 bg-white/5 p-10 group hover:border-[#006D6D] transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <HelpCircle size={32} className="text-[#006D6D]" />
                <ArrowRight size={24} className="text-slate-700 group-hover:text-white transition-all group-hover:translate-x-2" />
              </div>
              <h3 className="text-2xl font-black text-white italic">{c.t}</h3>
              <p className="mt-3 text-slate-400 font-medium leading-relaxed">{c.d}</p>
              <div className="mt-8 h-32 w-full rounded-3xl bg-[#003737]/20 border border-white/5 overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#006D6D]/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
