
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
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Grywalizacja & Loot</h1>
          <p className="text-slate-500 font-medium mt-1">Angażuj społeczność poprzez interaktywne mechanizmy nagród.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20">
           <Plus size={18} /> Nowa Interakcja
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* MYSTERY BOX SYSTEM (PDF str. 35) */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 text-slate-50 group-hover:scale-110 transition-transform duration-1000">
             <Gift size={120} strokeWidth={1} />
           </div>
           <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full">
                 <Sparkles size={14} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Bestseller</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 italic">Mystery Box 📦</h3>
              <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                Widzowie kupują skrzynki z losową nagrodą. Odblokowuj emotki, role na Discordzie lub fizyczne gadżety.
              </p>
              
              <div className="pt-6 space-y-4">
                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Cena Boxa</span>
                    <span className="text-lg font-black italic text-[#006D6D]">10.00 USDC</span>
                 </div>
                 <div className="flex gap-3">
                    <button className="flex-1 py-4 bg-[#0a0f10] text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-[#003737] transition-all">Konfiguruj Drop</button>
                    <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"><Settings2 size={20} /></button>
                 </div>
              </div>
           </div>
        </div>

        {/* SPIN THE WHEEL (PDF str. 36) */}
        <div className="bg-[#003737] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-45 transition-transform duration-1000">
              <Dices size={120} strokeWidth={1} />
           </div>
           <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-[#FFD700] rounded-full border border-white/5">
                 <Zap size={14} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Live Interactive</span>
              </div>
              <h3 className="text-3xl font-black italic">Spin the Wheel 🎡</h3>
              <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
                Połącz z OBS. Każdy tip powyżej X kwoty triggeruje koło fortuny na Twoim streamie w czasie rzeczywistym.
              </p>
              
              <div className="pt-6 space-y-4">
                 <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Prog Aktywacji</span>
                    <span className="text-lg font-black italic text-[#FFD700]">50.00+ USDC</span>
                 </div>
                 <div className="flex gap-3">
                    <button className="flex-1 py-4 bg-[#FFD700] text-[#003737] font-black rounded-2xl text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all">Pobierz Overlay</button>
                    <button className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all border border-white/5"><Eye size={20} /></button>
                 </div>
              </div>
           </div>
        </div>

        {/* GACHA SYSTEM (PDF str. 37) */}
        <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group lg:col-span-2">
           <Crown size={200} className="absolute -bottom-20 -right-20 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
           <div className="relative z-10 grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <h3 className="text-4xl font-black italic tracking-tighter">Gacha Collectibles 💎</h3>
                 <p className="text-slate-400 font-medium leading-relaxed">
                   Stwórz kolekcję cyfrowych kart/artów. Fani mogą je kolekcjonować i wymieniać, budując unikalną wartość Twojej marki.
                 </p>
                 <ul className="space-y-4">
                    {['Rzadkie: 5%', 'Epickie: 1%', 'Legendarne: 0.1%'].map((rate, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#006D6D]" /> {rate}
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="flex flex-col justify-end gap-6">
                 <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Aktywne Kolekcje</p>
                    <div className="flex -space-x-4">
                       {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-xl border-4 border-[#0a0f10] bg-slate-800 overflow-hidden"><img src={`https://picsum.photos/seed/${i+100}/100/100`} alt="" /></div>)}
                       <div className="w-12 h-12 rounded-xl border-4 border-[#0a0f10] bg-[#FFD700] flex items-center justify-center text-[#003737] font-black text-xs">+3</div>
                    </div>
                 </div>
                 <button className="w-full py-5 bg-[#006D6D] text-white font-black rounded-3xl transition-all flex items-center justify-center gap-3 hover:bg-[#004D4D] shadow-2xl shadow-[#006D6D]/20">
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
