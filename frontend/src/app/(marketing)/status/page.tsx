"use client";


import React from 'react';
import PublicHeader from '@/components/ui/layout/PublicHeader';
import { Activity, CheckCircle, AlertTriangle } from 'lucide-react';

const COMPONENTS = [
  { name: "API Engine", status: "Operational", desc: "Core services and data synchronization." },
  { name: "Custodial Wallets", status: "Operational", desc: "User hosted wallet infrastructure." },
  { name: "On-ramp Bridge", status: "Degraded", desc: "Payment processor gateway (Stripe/Circle)." },
  { name: "OBS Overlays", status: "Operational", desc: "Live streaming alert services." },
  { name: "AI Insight Engine", status: "Operational", desc: "Gemini 3 Flash model connectivity." },
];

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-[#001F1F] text-[#DDE0DA] pt-24 pb-20">
      <PublicHeader />
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="flex items-center justify-between mb-16">
           <h1 className="text-5xl font-black italic text-white tracking-tighter">System Status</h1>
           <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Global: Healthy
           </div>
        </div>

        <div className="rounded-[3.5rem] border border-white/10 bg-white/5 overflow-hidden shadow-2xl">
          <div className="p-10 divide-y divide-white/5">
            {COMPONENTS.map((c, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-between py-8 first:pt-0 last:pb-0 gap-6">
                <div>
                  <h4 className="text-xl font-black text-white italic">{c.name}</h4>
                  <p className="text-sm text-slate-500 font-medium mt-1">{c.desc}</p>
                </div>
                <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg ${
                  c.status === "Operational" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                  c.status === "Degraded" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : 
                  "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                }`}>
                  {c.status === "Operational" ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                  {c.status}
                </div>
              </div>
            ))}
          </div>
          <div className="p-8 bg-white/5 border-t border-white/5 text-center">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center justify-center gap-3">
                <Activity size={14} /> Ostatnia aktualizacja: przed chwilą
             </p>
          </div>
        </div>
      </section>
    </main>
  );
}
