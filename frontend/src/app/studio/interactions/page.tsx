"use client";


import React, { useState } from 'react';
import { 
  Dices, 
  Gift, 
  Zap, 
  Crown, 
  Sparkles, 
  Settings2, 
  Eye, 
  Play, 
  Plus,
  ArrowRight
} from 'lucide-react';

const InteractionsPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Grywalizacja & Loot</h1>
          <p className="text-teal-50 font-medium mt-1">Angażuj społeczność poprzez interaktywne mechanizmy nagród.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-teal-25 rounded-md font-bold font-heading text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20">
           <Plus size={18} /> Nowa Interakcja
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* MYSTERY BOX SYSTEM (PDF str. 35) */}
        <div className="bg-teal-800 p-10 rounded-lg border border-teal-700 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 text-teal-700 group-hover:scale-110 transition-transform duration-1000">
             <Gift size={120} strokeWidth={1} />
           </div>
           <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full">
                 <Sparkles size={14} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Bestseller</span>
              </div>
              <h3 className="text-3xl font-bold font-heading text-teal-25 italic">Mystery Box 📦</h3>
              <p className="text-teal-50 font-medium leading-relaxed max-w-sm">
                Widzowie kupują skrzynki z losową nagrodą. Odblokowuj emotki, role na Discordzie lub fizyczne gadżety.
              </p>
              
              <div className="pt-6 space-y-4">
                 <div className="flex justify-between items-center p-4 bg-teal-700 rounded-md border border-teal-700">
                    <span className="text-xs font-bold text-teal-100 uppercase tracking-widest">Cena Boxa</span>
                    <span className="text-lg font-bold italic text-teal-500">10.00 USDC</span>
                 </div>
                 <div className="flex gap-3">
                    <button className="flex-1 py-4 bg-teal-850 text-teal-25 font-bold font-heading rounded-md text-[10px] uppercase tracking-widest hover:bg-teal-800 transition-all">Konfiguruj Drop</button>
                    <button className="p-4 bg-teal-700 text-teal-100 rounded-md hover:bg-teal-600 transition-all border border-teal-700"><Settings2 size={20} /></button>
                 </div>
              </div>
           </div>
        </div>

        {/* SPIN THE WHEEL (PDF str. 36) */}
        <div className="bg-teal-800 p-10 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-45 transition-transform duration-1000">
              <Dices size={120} strokeWidth={1} />
           </div>
           <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-gold-400 rounded-full border border-white/5">
                 <Zap size={14} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Live Interactive</span>
              </div>
              <h3 className="text-3xl font-bold font-heading italic">Spin the Wheel 🎡</h3>
              <p className="text-teal-100 font-medium leading-relaxed max-w-sm">
                Połącz z OBS. Każdy tip powyżej X kwoty triggeruje koło fortuny na Twoim streamie w czasie rzeczywistym.
              </p>
              
              <div className="pt-6 space-y-4">
                 <div className="flex justify-between items-center p-4 bg-white/5 rounded-md border border-white/5">
                    <span className="text-xs font-bold text-teal-50 uppercase tracking-widest">Prog Aktywacji</span>
                    <span className="text-lg font-bold italic text-gold-400">50.00+ USDC</span>
                 </div>
                 <div className="flex gap-3">
                    <button className="flex-1 py-4 bg-gold-400 text-teal-800 font-bold font-heading rounded-md text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all">Pobierz Overlay</button>
                    <button className="p-4 bg-white/10 text-teal-25 rounded-md hover:bg-white/20 transition-all border border-white/5"><Eye size={20} /></button>
                 </div>
              </div>
           </div>
        </div>

        {/* GACHA SYSTEM (PDF str. 37) */}
        <div className="bg-teal-850 p-10 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group lg:col-span-2">
           <Crown size={200} className="absolute -bottom-20 -right-20 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
           <div className="relative z-10 grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <h3 className="text-4xl font-bold font-heading italic tracking-tighter">Gacha Collectibles 💎</h3>
                 <p className="text-teal-100 font-medium leading-relaxed">
                   Stwórz kolekcję cyfrowych kart/artów. Fani mogą je kolekcjonować i wymieniać, budując unikalną wartość Twojej marki.
                 </p>
                 <ul className="space-y-4">
                    {['Rzadkie: 5%', 'Epickie: 1%', 'Legendarne: 0.1%'].map((rate, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-teal-50">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-600" /> {rate}
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="flex flex-col justify-end gap-6">
                 <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <p className="text-[10px] font-bold text-teal-50 uppercase tracking-widest mb-2">Aktywne Kolekcje</p>
                    <div className="flex -space-x-4">
                       {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-md border-4 border-teal-850 bg-teal-800 overflow-hidden"><img src={`https://picsum.photos/seed/${i+100}/100/100`} alt="" /></div>)}
                       <div className="w-12 h-12 rounded-md border-4 border-teal-850 bg-gold-400 flex items-center justify-center text-teal-800 font-bold text-xs">+3</div>
                    </div>
                 </div>
                 <button className="w-full py-5 bg-teal-600 text-teal-25 font-bold font-heading rounded-md transition-all flex items-center justify-center gap-3 hover:bg-teal-700 shadow-2xl shadow-teal-600/20">
                   Zarządzaj Kolekcjami <ArrowRight size={20} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionsPage;
