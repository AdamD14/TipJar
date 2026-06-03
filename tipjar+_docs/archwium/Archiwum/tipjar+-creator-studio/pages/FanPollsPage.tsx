
import React, { useState } from 'react';
import { 
  Vote, 
  Plus, 
  ChevronRight, 
  Clock, 
  Users, 
  BarChart2, 
  Zap, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

const FanPollsPage: React.FC = () => {
  const [activePoll, setActivePoll] = useState(true);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Ankiety & Feedback</h1>
          <p className="text-slate-500 font-medium mt-1">Angażuj widzów w decyzje dotyczące Twojego kanału.</p>
        </div>
        <button className="px-8 py-3.5 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20 flex items-center gap-2">
           <Plus size={18} /> Nowa Ankieta
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* ACTIVE POLL CARD */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform"><Vote size={150} /></div>
           <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                 <div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2 w-fit">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Aktywna na Streamie
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 italic mt-4">W co gramy w ten weekend? 🎮</h3>
                 </div>
                 <div className="text-right">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Oddanych głosów</p>
                    <p className="text-3xl font-black text-[#006D6D] italic">1,420</p>
                 </div>
              </div>

              <div className="space-y-6">
                 {[
                   { label: 'Elden Ring DLC', votes: '55%', color: 'bg-[#006D6D]' },
                   { label: 'Valorant z widzami', votes: '30%', color: 'bg-slate-200' },
                   { label: 'Indie Games Night', votes: '15%', color: 'bg-slate-100' },
                 ].map((opt, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-bold">
                         <span className="text-slate-700">{opt.label}</span>
                         <span className="text-[#006D6D]">{opt.votes}</span>
                      </div>
                      <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                         <div className={`h-full ${opt.color} rounded-full transition-all duration-1000`} style={{ width: opt.votes }} />
                      </div>
                   </div>
                 ))}
              </div>

              <div className="pt-8 border-t border-slate-50 flex justify-between items-center">
                 <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1.5"><Clock size={14} /> 2h 15m pozostało</span>
                    <span className="flex items-center gap-1.5"><Users size={14} /> Tylko Subskrybenci</span>
                 </div>
                 <div className="flex gap-3">
                    <button className="px-6 py-3 bg-slate-50 text-slate-500 font-black rounded-xl text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-slate-100">Zakończ</button>
                    <button className="px-6 py-3 bg-[#0a0f10] text-white font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg">Podgląd OBS <ExternalLink size={14} /></button>
                 </div>
              </div>
           </div>
        </div>

        {/* STATS & RECENT */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#003737] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <Sparkles size={80} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-125 transition-transform" />
              <h4 className="text-xl font-black italic text-[#FFD700]">Engagement Insight (AI)</h4>
              <p className="text-xs text-slate-400 font-medium mt-4 leading-relaxed">
                 "Ankiety z opcją 'Tylko Subskrybenci' zwiększają konwersję na subskrypcję Bronze o 12% w ciągu 24h od zakończenia głosowania."
              </p>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <h4 className="font-black text-sm uppercase tracking-widest text-slate-800">Ostatnio Zakończone</h4>
              <div className="space-y-4">
                 {[
                   { title: 'Nowy czas streamowania', winner: '20:00', date: '3 dni temu' },
                   { title: 'Kolorystyka Overlay', winner: 'Neon Blue', date: '1 tydz temu' }
                 ].map((h, i) => (
                   <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:border-[#006D6D] transition-all">
                      <p className="text-xs font-black text-slate-800">{h.title}</p>
                      <div className="flex justify-between items-center mt-2">
                         <span className="text-[10px] font-bold text-emerald-600 uppercase">Wybrano: {h.winner}</span>
                         <span className="text-[10px] text-slate-400">{h.date}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FanPollsPage;
