
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
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Monetyzacja</h1>
          <p className="text-slate-500 font-medium mt-1">Skonfiguruj jak fani mogą Cię wspierać finansowo.</p>
        </div>
        <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-1">
          {(['goals', 'tiers', 'boosters'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all capitalize ${
                activeTab === tab ? 'bg-white text-[#006D6D] shadow-sm' : 'text-slate-500 hover:text-slate-700'
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
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="flex justify-between items-start mb-10">
             <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full mb-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Aktywny Cel</span>
               </div>
               <h3 className="text-2xl font-black text-slate-900">Nowy Setup do Streamowania</h3>
               <p className="text-slate-400 font-medium mt-1">Zbieram na RTX 5090 i monitor 4K 240Hz!</p>
             </div>
             <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors"><Plus size={24} /></button>
           </div>
           
           <div className="space-y-4">
             <div className="flex justify-between items-end font-black italic">
               <span className="text-3xl text-[#006D6D]">4,250.00 USDC</span>
               <span className="text-slate-300">z 10,000 USDC (42%)</span>
             </div>
             <div className="h-6 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-1 shadow-inner">
               <div className="h-full bg-gradient-to-r from-[#006D6D] to-[#00b0b0] rounded-full w-[42%] shadow-[0_0_15px_rgba(0,109,109,0.3)] transition-all duration-1000" />
             </div>
           </div>
           
           <div className="mt-10 pt-8 border-t border-slate-50 flex gap-10">
             <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wesprzyj</p><p className="font-black text-slate-700">124 Fanów</p></div>
             <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pozostało</p><p className="font-black text-slate-700">14 Dni</p></div>
             <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Średnia wpłata</p><p className="font-black text-slate-700">34.20 USDC</p></div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between group cursor-pointer hover:ring-4 hover:ring-[#006D6D]/20 transition-all">
             <div>
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6"><Calendar size={24} /></div>
               <h4 className="text-lg font-black italic">Historia Celów</h4>
               <p className="text-slate-400 text-sm mt-2">Zobacz co udało się osiągnąć Twojej społeczności.</p>
             </div>
             <div className="mt-8 flex items-center gap-2 font-black text-xs uppercase tracking-widest text-[#006D6D] group-hover:gap-4 transition-all">Zobacz archiwum <ArrowRight size={16} /></div>
           </div>
           
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between border-dashed border-2 border-slate-200 hover:border-[#006D6D] transition-colors cursor-pointer">
             <div className="flex flex-col items-center justify-center py-10 space-y-4">
               <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300"><Plus size={32} /></div>
               <p className="font-black text-slate-400 uppercase tracking-widest text-xs text-center">Dodaj nowy cel<br/>(Secondary Goal)</p>
             </div>
           </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-[#0a0f10] p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
           <Zap size={140} className="absolute -bottom-10 -right-10 opacity-5" />
           <h3 className="font-black text-lg mb-6 flex items-center gap-2"><Trophy size={18} className="text-[#FFD700]" /> Pro Tip (AI)</h3>
           <p className="text-sm text-slate-400 leading-relaxed italic">"Twórcy, którzy ustawiają cele o 20% wyższe niż poprzednie, zauważają wzrost zaangażowania o 35% w pierwszym tygodniu."</p>
           <button className="w-full mt-8 py-4 bg-[#FFD700] text-[#003737] font-black rounded-xl text-xs uppercase tracking-widest">Sprawdź Statystyki</button>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
           <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Ostatnie Wpłaty Celu</h3>
           {[1, 2, 3].map(i => (
             <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden shadow-sm border border-white"><img src={`https://picsum.photos/seed/${i}/50/50`} alt="" /></div>
                 <div><p className="text-xs font-black text-slate-700">Supporter_{i}</p><p className="text-[10px] text-slate-400 font-bold uppercase">2m temu</p></div>
               </div>
               <span className="text-xs font-black text-emerald-600">+15.00</span>
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
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col group hover:shadow-xl transition-all relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000"><Zap size={80} /></div>
           <div className="flex justify-between items-start mb-8">
             <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#006D6D] group-hover:text-white transition-colors"><Zap size={28} /></div>
             <div className="text-right">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Bronze</p>
                <p className="text-2xl font-black italic text-slate-900">5 USDC<span className="text-xs text-slate-400 font-bold">/msc</span></p>
             </div>
           </div>
           <h3 className="text-xl font-black text-slate-800 mb-2">Kawa dla Twórcy ☕</h3>
           <p className="text-sm text-slate-500 mb-8 flex-1">Podstawowe wsparcie Twojej twórczości. Każda kawa się liczy!</p>
           <ul className="space-y-3 mb-10">
             <li className="flex items-center gap-2 text-xs font-bold text-slate-600"><CheckCircle2 size={16} className="text-emerald-500" /> Odznaka na streamie</li>
             <li className="flex items-center gap-2 text-xs font-bold text-slate-600"><CheckCircle2 size={16} className="text-emerald-500" /> Rola na Discordzie</li>
           </ul>
           <button className="w-full py-4 bg-slate-50 text-slate-600 font-black rounded-2xl text-xs uppercase tracking-widest group-hover:bg-[#006D6D] group-hover:text-white transition-all shadow-sm">Edytuj Próg</button>
        </div>

        {/* TIER 2 - FEATURED */}
        <div className="bg-[#0a0f10] rounded-[2.5rem] p-8 shadow-2xl flex flex-col text-white ring-4 ring-[#FFD700]/20 relative overflow-hidden scale-105 z-10">
           <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FFD700] text-[#003737] rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg">Najpopularniejszy</div>
           <div className="flex justify-between items-start mt-4 mb-8">
             <div className="w-14 h-14 rounded-2xl bg-[#FFD700]/20 flex items-center justify-center text-[#FFD700] border border-[#FFD700]/10"><Crown size={28} /></div>
             <div className="text-right">
                <p className="text-xs font-black text-[#FFD700] uppercase tracking-widest">Silver</p>
                <p className="text-2xl font-black italic text-white">25 USDC<span className="text-xs text-slate-500 font-bold">/msc</span></p>
             </div>
           </div>
           <h3 className="text-xl font-black text-white mb-2 italic underline decoration-[#FFD700]">Elite Member 💎</h3>
           <p className="text-sm text-slate-400 mb-8 flex-1">Dla tych, którzy chcą być częścią wewnętrznego kręgu mojej społeczności.</p>
           <ul className="space-y-3 mb-10">
             <li className="flex items-center gap-2 text-xs font-bold text-slate-300"><CheckCircle2 size={16} className="text-[#FFD700]" /> Ekskluzywny kanał "Behind the scenes"</li>
             <li className="flex items-center gap-2 text-xs font-bold text-slate-300"><CheckCircle2 size={16} className="text-[#FFD700]" /> Głosowanie nad tematami streamów</li>
             <li className="flex items-center gap-2 text-xs font-bold text-slate-300"><CheckCircle2 size={16} className="text-[#FFD700]" /> Early access do materiałów</li>
           </ul>
           <button className="w-full py-4 bg-[#FFD700] text-[#003737] font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-[#FFD700]/10">Zarządzaj Progiem</button>
        </div>

        {/* TIER 3 */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col group hover:shadow-xl transition-all relative overflow-hidden">
           <div className="flex justify-between items-start mb-8">
             <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#003737] group-hover:text-white transition-colors"><Trophy size={28} /></div>
             <div className="text-right">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Gold</p>
                <p className="text-2xl font-black italic text-slate-900">100 USDC<span className="text-xs text-slate-400 font-bold">/msc</span></p>
             </div>
           </div>
           <h3 className="text-xl font-black text-slate-800 mb-2">Legendarny Mecenas 🏛️</h3>
           <p className="text-sm text-slate-500 mb-8 flex-1">Twoje imię na napisach końcowych każdego filmu. Jesteś fundamentem tego kanału.</p>
           <ul className="space-y-3 mb-10">
             <li className="flex items-center gap-2 text-xs font-bold text-slate-600"><CheckCircle2 size={16} className="text-[#006D6D]" /> Wszystkie poprzednie benefity</li>
             <li className="flex items-center gap-2 text-xs font-bold text-slate-600"><CheckCircle2 size={16} className="text-[#006D6D]" /> Raz w miesiącu rozmowa 1:1</li>
             <li className="flex items-center gap-2 text-xs font-bold text-slate-600"><CheckCircle2 size={16} className="text-[#006D6D]" /> Odznaka "Patrona Złotego"</li>
           </ul>
           <button className="w-full py-4 bg-slate-50 text-slate-600 font-black rounded-2xl text-xs uppercase tracking-widest group-hover:bg-[#003737] group-hover:text-white transition-all shadow-sm">Edytuj Próg</button>
        </div>
      </div>
      
      <button className="w-full py-8 border-4 border-dashed border-slate-200 rounded-[2.5rem] flex items-center justify-center gap-4 text-slate-400 hover:text-[#006D6D] hover:border-[#006D6D] transition-all group">
         <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#006D6D]/10 transition-all"><Plus size={24} /></div>
         <span className="text-xl font-black italic tracking-tighter">Stwórz nowy próg subskrypcji</span>
      </button>
    </div>
  );
}

function BoostersSection() {
  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shadow-inner"><Clock size={32} /></div>
              <div><h3 className="text-xl font-black text-slate-900">Tip Marathon ⏳</h3><p className="text-sm text-slate-400 font-medium">Uruchom ograniczony czasowo event na streamie.</p></div>
           </div>
           <p className="text-sm text-slate-500 leading-relaxed">System będzie odliczał czas do końca maratonu. Każdy tip wydłuża pasek postępu i dodaje unikalne efekty w OBS. Idealne do zbierania na specjalne okazje.</p>
           <div className="flex gap-4">
              <button className="flex-1 py-4 bg-orange-500 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-orange-600 transition-all">Start Maratonu</button>
              <button className="px-6 py-4 bg-slate-50 text-slate-400 font-black rounded-2xl text-xs uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all">Ustawienia</button>
           </div>
        </div>

        <div className="bg-[#003737] p-8 rounded-[3rem] shadow-xl text-white space-y-6 relative overflow-hidden">
           <Crown size={120} className="absolute -bottom-10 -right-10 opacity-10 rotate-12" />
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#FFD700] flex items-center justify-center border border-white/5"><Trophy size={32} /></div>
              <div><h3 className="text-xl font-black italic text-white">Milestone Rewards 🏅</h3><p className="text-sm text-slate-400 font-medium">Nagradzaj fanów za lojalność.</p></div>
           </div>
           <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="flex items-center gap-3"><span className="text-xs font-black text-slate-400">#1</span><p className="text-xs font-bold">Złota Odznaka po 500 USDC</p></div>
                 <div className="w-10 h-6 bg-emerald-500/20 rounded-full flex items-center justify-end px-1 border border-emerald-500/30"><div className="w-4 h-4 bg-emerald-500 rounded-full" /></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="flex items-center gap-3"><span className="text-xs font-black text-slate-400">#2</span><p className="text-xs font-bold">Dostęp do grupy VIP po 1000 USDC</p></div>
                 <div className="w-10 h-6 bg-white/10 rounded-full flex items-center justify-start px-1 border border-white/10"><div className="w-4 h-4 bg-white/40 rounded-full" /></div>
              </div>
           </div>
           <button className="w-full py-4 bg-[#FFD700] text-[#003737] font-black rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] transition-all">Dodaj Milestone</button>
        </div>
      </div>
      
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-[#006D6D]/10 flex items-center justify-center text-[#006D6D]"><Plus size={48} /></div>
          <h2 className="text-2xl font-black italic text-slate-900 tracking-tighter">Więcej Narzędzi Engagementu...</h2>
          <p className="text-slate-400 font-medium max-w-sm">Dostarczamy gotowe moduły, które pomagają Ci budować relację z widzami i zwiększać dochody bez wysiłku.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-4 opacity-50">
             <span className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest">Mystery Box</span>
             <span className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest">Auction Tip</span>
             <span className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest">Community Poll</span>
          </div>
      </div>
    </div>
  );
}

export default MonetizationPage;
