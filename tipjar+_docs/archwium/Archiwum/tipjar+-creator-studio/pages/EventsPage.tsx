
import React from 'react';
import { 
  CalendarDays, 
  Sparkles, 
  Trophy, 
  Users, 
  ChevronRight, 
  Plus, 
  Clock, 
  Zap,
  Star,
  ArrowRight
} from 'lucide-react';

const EVENTS = [
  { id: 1, title: 'Charity Stream: Save the Oceans', type: 'Charity', status: 'Live', progress: 75, goal: '5000 USDC', date: 'Trwa teraz' },
  { id: 2, title: 'Mystery Box Drop #4', type: 'Gacha', status: 'Upcoming', date: 'Jutro, 18:00', goal: '200 skrzynek' },
  { id: 3, title: '24H Subathon', type: 'Special', status: 'Scheduled', date: '25 Sierpnia', goal: '200 subs' },
];

const EventsPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Wydarzenia & Drops</h1>
          <p className="text-slate-500 font-medium mt-1">Planuj maratony, zbiórki charytatywne i specjalne edycje loot-boxów.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-[#0a0f10] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
           <Plus size={18} /> Nowy Event
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ACTIVE EVENT HIGHLIGHT */}
        <div className="lg:col-span-2 bg-[#006D6D] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
           <Zap size={200} className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
           <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                 <div className="px-4 py-1.5 bg-white/10 rounded-full border border-white/20 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Wydarzenie na żywo</span>
                 </div>
                 <Star className="text-[#FFD700] fill-[#FFD700]" />
              </div>
              
              <div>
                 <h2 className="text-4xl font-black italic tracking-tighter">Charity Stream: Save the Oceans 🌊</h2>
                 <p className="text-emerald-100 font-medium mt-2 max-w-lg">Wspólnie zbieramy środki na czyszczenie oceanów. Każde 10 USDC to 1kg wyłowionego plastiku.</p>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-3xl font-black italic">3,750 <span className="text-lg opacity-50">/ 5,000 USDC</span></span>
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-200">75% Celu</span>
                 </div>
                 <div className="h-4 bg-white/10 rounded-full overflow-hidden p-1 border border-white/5 shadow-inner">
                    <div className="h-full bg-[#FFD700] rounded-full w-[75%] shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all duration-1000" />
                 </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button className="px-8 py-4 bg-white text-[#006D6D] font-black rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-all">Panel Sterowania OBS</button>
                 <button className="px-8 py-4 bg-white/10 border border-white/10 font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-white/20 transition-all">Edytuj Event</button>
              </div>
           </div>
        </div>

        {/* STATS/INSIGHTS */}
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#006D6D]"><Trophy size={24} /></div>
                 <div><h4 className="font-black text-slate-800 italic">Ostatnie Sukcesy</h4><p className="text-[10px] text-slate-400 font-black uppercase">Ostatnie 3 miesiące</p></div>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-xs font-bold text-slate-600"><span>Zakończone Eventy</span><span className="text-[#006D6D]">8</span></div>
                 <div className="flex justify-between items-center text-xs font-bold text-slate-600"><span>Total Raised</span><span className="text-[#006D6D]">12.5k USDC</span></div>
                 <div className="flex justify-between items-center text-xs font-bold text-slate-600"><span>Nowi Subskrybenci</span><span className="text-emerald-500">+142</span></div>
              </div>
           </div>

           <div className="bg-[#0a0f10] p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
              <Users size={80} className="absolute -bottom-4 -right-4 opacity-5" />
              <p className="text-[10px] font-black text-[#FFD700] uppercase tracking-widest mb-2">Social Proof</p>
              <p className="text-sm font-bold leading-relaxed italic">"Wydarzenia charytatywne zwiększają zaufanie do Twojej marki o 40%. Widzowie chętniej wpłacają na cele wyższe."</p>
           </div>
        </div>
      </div>

      {/* UPCOMING EVENTS LIST (PDF str. 50) */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-black text-xl italic text-slate-800">Kalendarz Wydarzeń</h3>
            <button className="text-xs font-black text-[#006D6D] uppercase tracking-widest flex items-center gap-2">Widok Miesięczny <ArrowRight size={14} /></button>
         </div>
         <div className="divide-y divide-slate-50">
            {EVENTS.map(event => (
              <div key={event.id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors group">
                 <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      event.status === 'Live' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                       {event.type === 'Charity' ? <Star size={24} /> : event.type === 'Gacha' ? <Zap size={24} /> : <CalendarDays size={24} />}
                    </div>
                    <div>
                       <div className="flex items-center gap-2">
                          <h4 className="font-black text-slate-800 group-hover:text-[#006D6D] transition-colors">{event.title}</h4>
                          <span className="text-[9px] font-black px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full uppercase tracking-widest">{event.type}</span>
                       </div>
                       <div className="flex items-center gap-4 mt-1">
                          <p className="text-xs text-slate-400 font-bold flex items-center gap-1"><Clock size={12} /> {event.date}</p>
                          <p className="text-xs text-slate-400 font-bold flex items-center gap-1"><Trophy size={12} /> Cel: {event.goal}</p>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${event.status === 'Live' ? 'text-emerald-500' : 'text-slate-300'}`}>{event.status}</span>
                    <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-[#006D6D] hover:text-[#006D6D] transition-all">Zarządzaj</button>
                    <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default EventsPage;
