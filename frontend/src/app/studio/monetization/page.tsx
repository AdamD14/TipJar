"use client";

import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Trophy, 
  Zap, 
  Crown, 
  CheckCircle2, 
  Calendar,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const MonetizationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'goals' | 'tiers' | 'boosters'>('goals');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">Monetyzacja</h1>
          <p className="text-teal-50 font-medium mt-1">Skonfiguruj jak fani mogą Cię wspierać finansowo.</p>
        </div>
        <div className="flex p-1.5 bg-teal-700 rounded-md gap-1">
          {(['goals', 'tiers', 'boosters'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-md font-bold text-xs transition-all capitalize font-heading ${
                activeTab === tab ? 'bg-teal-800 text-teal-500 shadow-sm' : 'text-teal-50 hover:text-teal-25'
              }`}
            >
              {tab === 'goals' ? 'Cele' : tab === 'tiers' ? 'Progi' : 'Boostery'}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'goals' && <GoalsSection />}
        {activeTab === 'tiers' && <TiersSection />}
        {activeTab === 'boosters' && <BoostersSection />}
      </div>
    </div>
  );
};

function GoalsSection() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm relative overflow-hidden">
           <div className="flex justify-between items-start mb-10">
             <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-success-dark text-success-base rounded-full mb-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-success-base animate-pulse" />
                 <span className="text-[10px] font-bold uppercase tracking-widest font-heading">Aktywny Cel</span>
               </div>
               <h3 className="text-2xl font-bold text-teal-25 font-heading">Nowy Setup do Streamowania</h3>
               <p className="text-teal-100 font-medium mt-1">Zbieram na RTX 5090 i monitor 4K 240Hz!</p>
             </div>
             <button className="p-3 hover:bg-teal-700 rounded-md text-teal-100 transition-colors"><Plus size={24} /></button>
           </div>
           
           <div className="space-y-4">
             <div className="flex justify-between items-end font-bold italic">
               <span className="text-3xl text-teal-500">4,250.00 USDC</span>
               <span className="text-teal-100">z 10,000 USDC (42%)</span>
             </div>
             <div className="h-6 bg-teal-700 rounded-full overflow-hidden border border-teal-700 p-1 shadow-inner">
               <div className="h-full bg-gradient-to-r from-teal-500 to-[#00b0b0] rounded-full w-[42%] shadow-[0_0_15px_rgba(0,109,109,0.3)] transition-all duration-1000" />
             </div>
           </div>
           
           <div className="mt-10 pt-8 border-t border-teal-700 flex gap-10">
             <div><p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest font-heading">Wesprzyj</p><p className="font-bold text-teal-50 font-heading">124 Fanów</p></div>
             <div><p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest font-heading">Pozostało</p><p className="font-bold text-teal-50 font-heading">14 Dni</p></div>
             <div><p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest font-heading">Średnia wpłata</p><p className="font-bold text-teal-50 font-heading">34.20 USDC</p></div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-teal-850 p-8 rounded-lg text-teal-25 flex flex-col justify-between group cursor-pointer hover:ring-4 hover:ring-teal-500/20 transition-all">
             <div>
               <div className="w-12 h-12 rounded-md bg-white/10 flex items-center justify-center mb-6"><Calendar size={24} /></div>
               <h4 className="text-lg font-bold italic font-heading">Historia Celów</h4>
               <p className="text-teal-100 text-sm mt-2">Zobacz co udało się osiągnąć Twojej społeczności.</p>
             </div>
             <div className="mt-8 flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-teal-500 group-hover:gap-4 transition-all font-heading">Zobacz archiwum <ArrowRight size={16} /></div>
           </div>
           
           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm flex flex-col justify-between border-dashed border-2 border-teal-700 hover:border-teal-500 transition-colors cursor-pointer">
             <div className="flex flex-col items-center justify-center py-10 space-y-4">
               <div className="w-16 h-16 rounded-full bg-teal-700 flex items-center justify-center text-teal-100"><Plus size={32} /></div>
               <p className="font-bold text-teal-100 uppercase tracking-widest text-xs text-center font-heading">Dodaj nowy cel<br/>(Secondary Goal)</p>
             </div>
           </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-teal-850 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden">
           <Zap size={140} className="absolute -bottom-10 -right-10 opacity-5" />
           <h3 className="font-bold text-lg mb-6 flex items-center gap-2 font-heading"><Trophy size={18} className="text-gold-400" /> Pro Tip (AI)</h3>
           <p className="text-sm text-teal-100 leading-relaxed italic">"Twórcy, którzy ustawiają cele o 20% wyższe niż poprzednie, zauważają wzrost zaangażowania o 35% w pierwszym tygodniu."</p>
           <button className="w-full mt-8 py-4 bg-gold-400 text-teal-900 font-bold rounded-md text-xs uppercase tracking-widest font-heading">Sprawdź Statystyki</button>
        </div>
        
        <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-4">
           <h3 className="font-bold text-teal-25 text-sm uppercase tracking-widest font-heading">Ostatnie Wpłaty Celu</h3>
           {[1, 2, 3].map(i => (
             <div key={i} className="flex items-center justify-between py-2 border-b border-teal-700 last:border-0">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-teal-700 overflow-hidden shadow-sm border border-white"><img src={`https://picsum.photos/seed/${i}/50/50`} alt="" /></div>
                 <div><p className="text-xs font-bold text-teal-50 font-heading">Supporter_{i}</p><p className="text-[10px] text-teal-100 font-bold uppercase">2m temu</p></div>
               </div>
               <span className="text-xs font-bold text-success-base font-heading">+15.00</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function TiersSection() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* TIER 1 */}
        <div className="bg-teal-800 border border-teal-700 rounded-lg p-8 shadow-sm flex flex-col group hover:shadow-xl transition-all relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000"><Zap size={80} /></div>
           <div className="flex justify-between items-start mb-8">
             <div className="w-14 h-14 rounded-md bg-teal-700 flex items-center justify-center text-teal-100 group-hover:bg-teal-600 group-hover:text-teal-25 transition-colors"><Zap size={28} /></div>
             <div className="text-right">
                <p className="text-xs font-bold text-teal-100 uppercase tracking-widest font-heading">Bronze</p>
                <p className="text-2xl font-bold italic text-teal-25 font-heading">5 USDC<span className="text-xs text-teal-100 font-bold">/msc</span></p>
             </div>
           </div>
           <h3 className="text-xl font-bold text-teal-25 mb-2 font-heading">Kawa dla Twórcy ☕</h3>
           <p className="text-sm text-teal-50 mb-8 flex-1">Podstawowe wsparcie Twojej twórczości. Każda kawa się liczy!</p>
           <ul className="space-y-3 mb-10">
             <li className="flex items-center gap-2 text-xs font-bold text-teal-50"><CheckCircle2 size={16} className="text-success-base" /> Odznaka na streamie</li>
             <li className="flex items-center gap-2 text-xs font-bold text-teal-50"><CheckCircle2 size={16} className="text-success-base" /> Rola na Discordzie</li>
           </ul>
           <button className="w-full py-4 bg-teal-700 text-teal-50 font-bold rounded-md text-xs uppercase tracking-widest group-hover:bg-teal-600 group-hover:text-teal-25 transition-all shadow-sm font-heading">Edytuj Próg</button>
        </div>

        {/* TIER 2 - FEATURED */}
        <div className="bg-teal-850 rounded-lg p-8 shadow-2xl flex flex-col text-teal-25 ring-4 ring-gold-400/20 relative overflow-hidden scale-105 z-10">
           <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-400 text-teal-900 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-lg font-heading">Najpopularniejszy</div>
           <div className="flex justify-between items-start mt-4 mb-8">
             <div className="w-14 h-14 rounded-md bg-gold-400/20 flex items-center justify-center text-gold-400 border border-gold-400/10"><Crown size={28} /></div>
             <div className="text-right">
                <p className="text-xs font-bold text-gold-400 uppercase tracking-widest font-heading">Silver</p>
                <p className="text-2xl font-bold italic text-teal-25 font-heading">25 USDC<span className="text-xs text-teal-50 font-bold">/msc</span></p>
             </div>
           </div>
           <h3 className="text-xl font-bold text-teal-25 mb-2 italic underline decoration-gold-400 font-heading">Elite Member 💎</h3>
           <p className="text-sm text-teal-100 mb-8 flex-1">Dla tych, którzy chcą być częścią wewnętrznego kręgu mojej społeczności.</p>
           <ul className="space-y-3 mb-10">
             <li className="flex items-center gap-2 text-xs font-bold text-teal-100"><CheckCircle2 size={16} className="text-gold-400" /> Ekskluzywny kanał "Behind the scenes"</li>
             <li className="flex items-center gap-2 text-xs font-bold text-teal-100"><CheckCircle2 size={16} className="text-gold-400" /> Głosowanie nad tematami streamów</li>
             <li className="flex items-center gap-2 text-xs font-bold text-teal-100"><CheckCircle2 size={16} className="text-gold-400" /> Early access do materiałów</li>
           </ul>
           <button className="w-full py-4 bg-gold-400 text-teal-900 font-bold rounded-md text-xs uppercase tracking-widest shadow-xl shadow-gold-400/10 font-heading">Zarządzaj Progiem</button>
        </div>

        {/* TIER 3 */}
        <div className="bg-teal-800 border border-teal-700 rounded-lg p-8 shadow-sm flex flex-col group hover:shadow-xl transition-all relative overflow-hidden">
           <div className="flex justify-between items-start mb-8">
             <div className="w-14 h-14 rounded-md bg-teal-700 flex items-center justify-center text-teal-100 group-hover:bg-teal-800 group-hover:text-teal-25 transition-colors"><Trophy size={28} /></div>
             <div className="text-right">
                <p className="text-xs font-bold text-teal-100 uppercase tracking-widest font-heading">Gold</p>
                <p className="text-2xl font-bold italic text-teal-25 font-heading">100 USDC<span className="text-xs text-teal-100 font-bold">/msc</span></p>
             </div>
           </div>
           <h3 className="text-xl font-bold text-teal-25 mb-2 font-heading">Legendarny Mecenas 🏛️</h3>
           <p className="text-sm text-teal-50 mb-8 flex-1">Twoje imię na napisach końcowych każdego filmu. Jesteś fundamentem tego kanału.</p>
           <ul className="space-y-3 mb-10">
             <li className="flex items-center gap-2 text-xs font-bold text-teal-50"><CheckCircle2 size={16} className="text-teal-500" /> Wszystkie poprzednie benefity</li>
             <li className="flex items-center gap-2 text-xs font-bold text-teal-50"><CheckCircle2 size={16} className="text-teal-500" /> Raz w miesiącu rozmowa 1:1</li>
             <li className="flex items-center gap-2 text-xs font-bold text-teal-50"><CheckCircle2 size={16} className="text-teal-500" /> Odznaka "Patrona Złotego"</li>
           </ul>
           <button className="w-full py-4 bg-teal-700 text-teal-50 font-bold rounded-md text-xs uppercase tracking-widest group-hover:bg-teal-800 group-hover:text-teal-25 transition-all shadow-sm font-heading">Edytuj Próg</button>
        </div>
      </div>
      
      <button className="w-full py-8 border-4 border-dashed border-teal-700 rounded-lg flex items-center justify-center gap-4 text-teal-100 hover:text-teal-500 hover:border-teal-500 transition-all group font-heading">
         <div className="w-12 h-12 rounded-full bg-teal-700 flex items-center justify-center group-hover:bg-teal-500/10 transition-all"><Plus size={24} /></div>
         <span className="text-xl font-bold italic tracking-tighter font-heading">Stwórz nowy próg subskrypcji</span>
      </button>
    </div>
  );
}

function BoostersSection() {
  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-8">
        <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-md bg-warning-base/10 text-warning-base flex items-center justify-center shadow-inner"><Clock size={32} /></div>
              <div><h3 className="text-xl font-bold text-teal-25 font-heading">Tip Marathon ⏳</h3><p className="text-sm text-teal-100 font-medium">Uruchom ograniczony czasowo event na streamie.</p></div>
           </div>
           <p className="text-sm text-teal-50 leading-relaxed">System będzie odliczał czas do końca maratonu. Każdy tip wydłuża pasek postępu i dodaje unikalne efekty w OBS. Idealne do zbierania na specjalne okazje.</p>
           <div className="flex gap-4">
              <button className="flex-1 py-4 bg-warning-base text-teal-25 font-bold rounded-md text-xs uppercase tracking-widest hover:bg-warning-base/80 transition-all font-heading">Start Maratonu</button>
              <button className="px-6 py-4 bg-teal-700 text-teal-100 font-bold rounded-md text-xs uppercase tracking-widest border border-teal-700 hover:bg-teal-600 transition-all font-heading">Ustawienia</button>
           </div>
        </div>

        <div className="bg-teal-800 p-8 rounded-lg shadow-xl text-teal-25 space-y-6 relative overflow-hidden">
           <Crown size={120} className="absolute -bottom-10 -right-10 opacity-10 rotate-12" />
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-md bg-white/10 text-gold-400 flex items-center justify-center border border-white/5"><Trophy size={32} /></div>
              <div><h3 className="text-xl font-bold italic text-teal-25 font-heading">Milestone Rewards 🏅</h3><p className="text-sm text-teal-100 font-medium">Nagradzaj fanów za lojalność.</p></div>
           </div>
           <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-md border border-white/5">
                 <div className="flex items-center gap-3"><span className="text-xs font-bold text-teal-100 font-heading">#1</span><p className="text-xs font-bold">Złota Odznaka po 500 USDC</p></div>
                 <div className="w-10 h-6 bg-success-base/20 rounded-full flex items-center justify-end px-1 border border-success-base/30"><div className="w-4 h-4 bg-success-base rounded-full" /></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-md border border-white/5">
                 <div className="flex items-center gap-3"><span className="text-xs font-bold text-teal-100 font-heading">#2</span><p className="text-xs font-bold">Dostęp do grupy VIP po 1000 USDC</p></div>
                 <div className="w-10 h-6 bg-white/10 rounded-full flex items-center justify-start px-1 border border-white/10"><div className="w-4 h-4 bg-white/40 rounded-full" /></div>
              </div>
           </div>
           <button className="w-full py-4 bg-gold-400 text-teal-900 font-bold rounded-md text-xs uppercase tracking-widest hover:scale-[1.02] transition-all font-heading">Dodaj Milestone</button>
        </div>
      </div>
      
      <div className="bg-teal-800 p-10 rounded-lg border border-teal-700 shadow-sm flex flex-col justify-center items-center text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500"><Plus size={48} /></div>
          <h2 className="text-2xl font-bold italic text-teal-25 tracking-tighter font-heading">Więcej Narzędzi Engagementu...</h2>
          <p className="text-teal-100 font-medium max-w-sm">Dostarczamy gotowe moduły, które pomagają Ci budować relację z widzami i zwiększać dochody bez wysiłku.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-4 opacity-50">
             <span className="px-4 py-2 bg-teal-700 border border-teal-700 rounded-full text-[10px] font-bold uppercase tracking-widest font-heading">Mystery Box</span>
             <span className="px-4 py-2 bg-teal-700 border border-teal-700 rounded-full text-[10px] font-bold uppercase tracking-widest font-heading">Auction Tip</span>
             <span className="px-4 py-2 bg-teal-700 border border-teal-700 rounded-full text-[10px] font-bold uppercase tracking-widest font-heading">Community Poll</span>
          </div>
      </div>
    </div>
  );
}

export default MonetizationPage;
