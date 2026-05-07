
import React from 'react';
import PublicHeader from '../components/PublicHeader';
import { Sparkles, Zap, BrainCircuit, Layout } from 'lucide-react';

export default function AIPage() {
  return (
    <main className="min-h-screen bg-[#001F1F] text-[#DDE0DA] pt-24 pb-20 selection:bg-[#006D6D]">
      <PublicHeader />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
           <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD700]/20 text-[#FFD700] rounded-full border border-[#FFD700]/10">
                 <Sparkles size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Wczesny Dostęp</span>
              </div>
              <h1 className="text-6xl font-black text-white italic tracking-tighter">AI Studio (Preview)</h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">
                Generator overlayów, inteligentne presety UI i copywriting dla twórców oparty o modele <span className="text-[#FFD700]">Gemini 3 Flash</span>.
              </p>
           </div>
           <div className="w-full md:w-[400px] aspect-square bg-[#0a0f10] rounded-[4rem] border-8 border-white/5 shadow-2xl flex items-center justify-center relative overflow-hidden group">
              <BrainCircuit size={200} className="text-[#006D6D] opacity-20 group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#006D6D]/20 to-transparent" />
           </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-[3rem] border border-white/10 bg-white/5 p-10 space-y-8">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3"><Layout size={18} /> Szybkie Presety AI</h3>
            <div className="grid grid-cols-2 gap-4">
              {['CTA Button', 'Card UI', 'Tip Widget', 'Profile Bio'].map(label => (
                <button key={label} className="rounded-2xl border-2 border-white/10 px-6 py-5 font-black text-[10px] uppercase tracking-widest text-white/80 hover:border-[#FFD700] hover:text-[#FFD700] transition-all">
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="rounded-[3rem] border border-white/10 bg-white/5 p-10 flex flex-col">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3"><Zap size={18} /> Twój Asystent</h3>
            <div className="flex-1 rounded-[2rem] bg-[#003737]/40 border border-white/5 p-8 flex flex-col justify-center text-center italic text-slate-400">
               <p>"Gemini analizuje Twój styl pisania, aby stworzyć bio, które najlepiej rezonuje z Twoją społecznością..."</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
