
import React from 'react';
import { 
  Gavel, 
  Vote, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldAlert, 
  Users,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const GovernancePage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Governance (DAO)</h1>
          <p className="text-slate-500 font-medium mt-1">Platforma zarządzana przez twórców. Twój głos to przyszłość Web3.</p>
        </div>
        <div className="flex items-center gap-3 bg-[#4D194D] px-6 py-3 rounded-2xl border border-white/10 shadow-xl shadow-black/20">
           <TrendingUp size={18} className="text-[#FFD700]" />
           <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Twoja Siła Głosu: <span className="text-[#FFD700]">1.25k VP</span></span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ACTIVE PROPOSALS */}
        <div className="lg:col-span-2 space-y-6">
           <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.3em] px-4">Aktywne Głosowania DAO</h3>
           
           {[
             { id: 'TIP-42', title: 'Obniżenie fee dla Subskrypcji do 3%', status: 'Voting Active', votes: '124k / 500k', time: '2d pozostało' },
             { id: 'TIP-43', title: 'Wdrożenie USDC Native na Solana Mainnet', status: 'Voting Active', votes: '380k / 500k', time: '12h pozostało' },
           ].map((p, i) => (
             <div key={i} className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-100 shadow-sm group hover:ring-2 hover:ring-[#4D194D]/10 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <span className="text-[10px] font-black text-[#4D194D] uppercase tracking-widest italic">{p.id}</span>
                      <h4 className="text-xl font-black text-slate-800 italic mt-1">{p.title}</h4>
                   </div>
                   <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {p.status}
                   </div>
                </div>
                
                <div className="space-y-4">
                   <div className="flex justify-between items-end text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>Kworum Blockchain</span>
                      <span className="text-[#4D194D]">{p.votes} VP</span>
                   </div>
                   <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                      <div className={`h-full bg-[#4D194D] rounded-full transition-all duration-[2000ms] ease-out`} style={{ width: i === 0 ? '25%' : '76%' }} />
                   </div>
                   <div className="flex justify-between items-center pt-2">
                      <p className="text-xs font-bold text-slate-400 flex items-center gap-2"><Clock size={14} /> {p.time}</p>
                      <button className="flex items-center gap-2 font-black text-xs text-[#FFD700] bg-[#003737] px-6 py-2.5 rounded-xl uppercase tracking-widest group-hover:scale-105 transition-all">Głosuj <ArrowRight size={16} /></button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* GOVERNANCE SIDEBAR */}
        <div className="space-y-6">
           <div className="bg-[#4D194D] p-8 rounded-[3rem] text-white shadow-2xl space-y-8 relative overflow-hidden group">
              <Gavel size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                 <h3 className="text-xl font-black italic text-[#FFD700]">Web3 Governance</h3>
                 <p className="text-purple-100 text-sm font-medium leading-relaxed mt-4">
                    Twoja lojalność na TipJar+ przekłada się na Voting Power. Użytkownicy z poziomu Pro kształtują roadmapę technologiczną platformy.
                 </p>
                 <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-purple-300 font-bold uppercase tracking-widest">Uczestników DAO</span>
                       <span className="font-black italic">14.2k</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-purple-300 font-bold uppercase tracking-widest">On-Chain Votes</span>
                       <span className="font-black italic text-[#FFD700]">1.2M</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-widest">Ostatnie Wyniki</h3>
              <div className="space-y-4">
                 {[
                   { label: 'TIP-41: Custom Overlays', res: 'Przyjęte' },
                   { label: 'TIP-40: Fee Increase', res: 'Odrzucone' }
                 ].map((h, i) => (
                   <div key={i} className="flex justify-between items-center text-xs font-bold border-b border-slate-50 pb-3 last:border-0">
                      <span className="text-slate-500 italic">{h.label}</span>
                      <span className={h.res === 'Przyjęte' ? 'text-emerald-500' : 'text-[#4D194D]'}>{h.res}</span>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-[#FFD700] text-[#003737] font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-black/5">Złóż Własną Propozycję</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GovernancePage;
