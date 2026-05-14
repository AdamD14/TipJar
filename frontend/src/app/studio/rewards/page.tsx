"use client";


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
          <h1 className="font-heading text-4xl font-bold text-teal-25 tracking-tight italic">Nagrody & Odznaki</h1>
          <p className="text-teal-50 font-medium mt-1">Zarządzaj prestiżem swojej społeczności i integruj go z Discordem.</p>
        </div>
        <button className="font-heading px-8 py-3.5 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 flex items-center gap-2">
           <Plus size={18} /> Nowa Odznaka
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* BADGES GALLERY */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-teal-800 p-10 rounded-lg border border-teal-700 shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                 <h3 className="font-heading text-xl font-bold text-teal-25 italic">Aktywne Odznaki Wizualne</h3>
                 <span className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">Wszystkie: 12</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                   { name: 'OG Supporter', tier: 'All', color: 'bg-success-base', icon: <Star size={24} /> },
                   { name: 'Big Tipper', tier: '100+', color: 'bg-gold-400', icon: <Trophy size={24} /> },
                   { name: 'Loyalty King', tier: '12m+', color: 'bg-teal-600', icon: <Medal size={24} /> },
                   { name: 'Mystery Winner', tier: 'Drop', color: 'bg-purple-300', icon: <Sparkles size={24} /> },
                 ].map((badge, i) => (
                   <div key={i} className="p-6 bg-teal-700 rounded-lg border border-teal-700 flex flex-col items-center text-center gap-3 group hover:border-teal-500 transition-all cursor-pointer">
                      <div className={`w-16 h-16 rounded-md ${badge.color} flex items-center justify-center text-teal-25 shadow-lg group-hover:scale-110 transition-transform`}>
                         {badge.icon}
                      </div>
                      <div>
                         <p className="text-xs font-bold text-teal-25">{badge.name}</p>
                         <p className="text-[9px] font-bold text-teal-100 uppercase mt-1">Tier: {badge.tier}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* DISCORD ROLES MAPPING */}
           <div className="bg-teal-850 p-10 rounded-lg text-teal-25 shadow-2xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5"><MessageSquare size={150} /></div>
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-[#5865F2] flex items-center justify-center shadow-lg"><MessageSquare size={24} /></div>
                    <h3 className="font-heading text-xl font-bold italic">Automatyczne Role Discord</h3>
                 </div>
                 <p className="text-teal-100 text-sm font-medium leading-relaxed max-w-lg">
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
                               <p className="text-sm font-bold italic">{m.role}</p>
                               <p className="text-[10px] text-teal-50 font-bold uppercase tracking-widest mt-1">Wymóg: {m.req}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <span className={`text-[9px] font-bold uppercase ${m.status === 'Aktywne' ? 'text-emerald-400' : 'text-teal-50'}`}>{m.status}</span>
                            <button className="text-[10px] font-bold text-[#FFD700] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Edytuj</button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* LOYALTY STATS */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg text-teal-25 shadow-2xl space-y-8 relative overflow-hidden group">
              <Trophy size={100} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                 <h3 className="text-xl font-bold italic text-[#FFD700]">System Star Points</h3>
                 <p className="text-teal-100 text-xs font-medium leading-relaxed mt-4">
                    Widzowie automatycznie zbierają punkty lojalnościowe za każdą minutę streamu i każdy wysłany USDC.
                 </p>
                 <div className="mt-8 space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold uppercase">
                       <span>W obiegu</span>
                       <span className="text-[#FFD700]">42.5k PTS</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold uppercase">
                       <span>Aktywnych graczy</span>
                       <span className="text-emerald-400">142</span>
                    </div>
                 </div>
                 <button className="w-full mt-8 py-4 bg-[#FFD700] text-[#003737] font-bold rounded-2xl text-[10px] uppercase tracking-widest shadow-xl">Konfiguruj Sklep</button>
              </div>
           </div>

           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                 <Sparkles className="text-teal-500" size={24} />
                 <h3 className="font-heading font-bold text-teal-25 text-sm uppercase tracking-widest">Gemini Engagement</h3>
              </div>
              <p className="text-xs text-teal-50 font-medium leading-relaxed italic">
                "Twoi widzowie najchętniej walczą o odznakę 'Big Tipper' w piątkowe wieczory. Rozważ dodanie limitowanej odznaki 'Weekend Warrior'."
              </p>
           </div>
           
           <div className="bg-success-dark p-6 rounded-lg border border-emerald-100 flex items-center gap-3">
              <ShieldCheck className="text-success-base" size={20} />
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Blockchain Verified Rewards</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityRewardsPage;
