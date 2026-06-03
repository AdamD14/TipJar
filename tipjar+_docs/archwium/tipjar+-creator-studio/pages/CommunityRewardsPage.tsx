
import React from 'react';
import { 
  Medal, 
  Sparkles, 
  Settings2, 
  MessageSquare, 
  Trophy, 
  Zap, 
  Plus, 
  CheckCircle2,
  Users,
  Star,
  ShieldCheck
} from 'lucide-react';

const CommunityRewardsPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Nagrody & Odznaki</h1>
          <p className="text-slate-500 font-medium mt-1">Zarządzaj prestiżem swojej społeczności i integruj go z Discordem.</p>
        </div>
        <button className="px-8 py-3.5 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20 flex items-center gap-2">
           <Plus size={18} /> Nowa Odznaka
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* BADGES GALLERY */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-800 italic">Aktywne Odznaki Wizualne</h3>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wszystkie: 12</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                   { name: 'OG Supporter', tier: 'All', color: 'bg-emerald-500', icon: <Star size={24} /> },
                   { name: 'Big Tipper', tier: '100+', color: 'bg-amber-400', icon: <Trophy size={24} /> },
                   { name: 'Loyalty King', tier: '12m+', color: 'bg-[#006D6D]', icon: <Medal size={24} /> },
                   { name: 'Mystery Winner', tier: 'Drop', color: 'bg-purple-500', icon: <Sparkles size={24} /> },
                 ].map((badge, i) => (
                   <div key={i} className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center gap-3 group hover:border-[#006D6D] transition-all cursor-pointer">
                      <div className={`w-16 h-16 rounded-3xl ${badge.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                         {badge.icon}
                      </div>
                      <div>
                         <p className="text-xs font-black text-slate-800">{badge.name}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Tier: {badge.tier}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* DISCORD ROLES MAPPING */}
           <div className="bg-[#0a0f10] p-10 rounded-[3.5rem] text-white shadow-2xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5"><MessageSquare size={150} /></div>
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#5865F2] flex items-center justify-center shadow-lg"><MessageSquare size={24} /></div>
                    <h3 className="text-xl font-black italic">Automatyczne Role Discord</h3>
                 </div>
                 <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-lg">
                    Połącz swój serwer Discord, aby system automatycznie nadawał i odbierał role na podstawie statusu wsparcia.
                 </p>
                 
                 <div className="space-y-3">
                    {[
                      { role: 'Mecenas Gold', req: 'Subskrypcja Gold', status: 'Aktywne' },
                      { role: 'Supporter OG', req: 'Pierwszy Napiwek', status: 'Aktywne' },
                      { role: 'Loot Master', req: 'Otwarcie Mystery Boxa', status: 'Oczekuje' },
                    ].map((m, i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                         <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-[#5865F2]" />
                            <div>
                               <p className="text-sm font-black italic">{m.role}</p>
                               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Wymóg: {m.req}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <span className={`text-[9px] font-black uppercase ${m.status === 'Aktywne' ? 'text-emerald-400' : 'text-slate-500'}`}>{m.status}</span>
                            <button className="text-[10px] font-black text-[#FFD700] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Edytuj</button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* LOYALTY STATS */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#003737] p-8 rounded-[3rem] text-white shadow-2xl space-y-8 relative overflow-hidden group">
              <Trophy size={100} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                 <h3 className="text-xl font-black italic text-[#FFD700]">System Star Points</h3>
                 <p className="text-slate-300 text-xs font-medium leading-relaxed mt-4">
                    Widzowie automatycznie zbierają punkty lojalnościowe za każdą minutę streamu i każdy wysłany USDC.
                 </p>
                 <div className="mt-8 space-y-4">
                    <div className="flex justify-between items-center text-xs font-black uppercase">
                       <span>W obiegu</span>
                       <span className="text-[#FFD700]">42.5k PTS</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-black uppercase">
                       <span>Aktywnych graczy</span>
                       <span className="text-emerald-400">142</span>
                    </div>
                 </div>
                 <button className="w-full mt-8 py-4 bg-[#FFD700] text-[#003737] font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl">Konfiguruj Sklep</button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                 <Sparkles className="text-[#006D6D]" size={24} />
                 <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Gemini Engagement</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                "Twoi widzowie najchętniej walczą o odznakę 'Big Tipper' w piątkowe wieczory. Rozważ dodanie limitowanej odznaki 'Weekend Warrior'."
              </p>
           </div>
           
           <div className="bg-emerald-50 p-6 rounded-[2.5rem] border border-emerald-100 flex items-center gap-3">
              <ShieldCheck className="text-emerald-600" size={20} />
              <p className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">Blockchain Verified Rewards</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityRewardsPage;
