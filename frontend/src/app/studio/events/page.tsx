"use client";


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
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">Wydarzenia & Drops</h1>
          <p className="text-teal-50 font-medium mt-1">Planuj maratony, zbiórki charytatywne i specjalne edycje loot-boxów.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-teal-850 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl font-heading">
           <Plus size={18} /> Nowy Event
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ACTIVE EVENT HIGHLIGHT */}
        <div className="lg:col-span-2 bg-teal-600 p-10 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
           <Zap size={200} className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
           <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                 <div className="px-4 py-1.5 bg-white/10 rounded-full border border-white/20 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Wydarzenie na żywo</span>
                 </div>
                 <Star className="text-gold-400 fill-gold-400" />
              </div>
              
              <div>
                 <h2 className="text-4xl font-bold italic tracking-tighter font-heading">Charity Stream: Save the Oceans 🌊</h2>
                 <p className="text-success-100 font-medium mt-2 max-w-lg">Wspólnie zbieramy środki na czyszczenie oceanów. Każde 10 USDC to 1kg wyłowionego plastiku.</p>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-3xl font-bold italic">3,750 <span className="text-lg opacity-50">/ 5,000 USDC</span></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-success-200">75% Celu</span>
                 </div>
                 <div className="h-4 bg-white/10 rounded-full overflow-hidden p-1 border border-white/5 shadow-inner">
                    <div className="h-full bg-gold-400 rounded-full w-[75%] shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all duration-1000" />
                 </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button className="px-8 py-4 bg-teal-700 text-teal-25 font-bold rounded-md text-xs uppercase tracking-widest hover:scale-105 transition-all font-heading">Panel Sterowania OBS</button>
                 <button className="px-8 py-4 bg-white/10 border border-white/10 font-bold rounded-md text-xs uppercase tracking-widest hover:bg-white/20 transition-all font-heading">Edytuj Event</button>
              </div>
           </div>
        </div>

        {/* STATS/INSIGHTS */}
        <div className="space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-md bg-teal-700 flex items-center justify-center text-teal-500"><Trophy size={24} /></div>
                 <div><h4 className="font-bold text-teal-25 italic font-heading">Ostatnie Sukcesy</h4><p className="text-[10px] text-teal-100 font-bold uppercase">Ostatnie 3 miesiące</p></div>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-xs font-bold text-teal-50"><span>Zakończone Eventy</span><span className="text-teal-500">8</span></div>
                 <div className="flex justify-between items-center text-xs font-bold text-teal-50"><span>Total Raised</span><span className="text-teal-500">12.5k USDC</span></div>
                 <div className="flex justify-between items-center text-xs font-bold text-teal-50"><span>Nowi Subskrybenci</span><span className="text-success-500">+142</span></div>
              </div>
           </div>

           <div className="bg-teal-850 p-8 rounded-lg text-teal-25 relative overflow-hidden group">
              <Users size={80} className="absolute -bottom-4 -right-4 opacity-5" />
              <p className="text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-2">Social Proof</p>
              <p className="text-sm font-bold leading-relaxed italic">"Wydarzenia charytatywne zwiększają zaufanie do Twojej marki o 40%. Widzowie chętniej wpłacają na cele wyższe."</p>
           </div>
        </div>
      </div>

      {/* UPCOMING EVENTS LIST (PDF str. 50) */}
      <div className="bg-teal-800 rounded-lg border border-teal-700 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-teal-700 flex justify-between items-center">
            <h3 className="font-bold text-xl italic text-teal-25 font-heading">Kalendarz Wydarzeń</h3>
            <button className="text-xs font-bold text-teal-500 uppercase tracking-widest flex items-center gap-2 font-heading">Widok Miesięczny <ArrowRight size={14} /></button>
         </div>
         <div className="divide-y divide-teal-700">
            {EVENTS.map(event => (
              <div key={event.id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-teal-700 transition-colors group">
                 <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className={`w-14 h-14 rounded-md flex items-center justify-center ${
                      event.status === 'Live' ? 'bg-success-50 text-success-600' : 'bg-teal-700 text-teal-100'
                    }`}>
                       {event.type === 'Charity' ? <Star size={24} /> : event.type === 'Gacha' ? <Zap size={24} /> : <CalendarDays size={24} />}
                    </div>
                    <div>
                       <div className="flex items-center gap-2">
                          <h4 className="font-bold text-teal-25 group-hover:text-teal-500 transition-colors font-heading">{event.title}</h4>
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-teal-700 text-teal-50 rounded-full uppercase tracking-widest">{event.type}</span>
                       </div>
                       <div className="flex items-center gap-4 mt-1">
                          <p className="text-xs text-teal-100 font-bold flex items-center gap-1"><Clock size={12} /> {event.date}</p>
                          <p className="text-xs text-teal-100 font-bold flex items-center gap-1"><Trophy size={12} /> Cel: {event.goal}</p>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${event.status === 'Live' ? 'text-success-500' : 'text-teal-100'}`}>{event.status}</span>
                    <button className="px-6 py-2.5 bg-teal-800 border border-teal-700 rounded-md font-bold text-[10px] uppercase tracking-widest hover:border-teal-500 hover:text-teal-500 transition-all font-heading">Zarządzaj</button>
                    <ChevronRight size={20} className="text-teal-100 group-hover:translate-x-1 transition-transform" />
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default EventsPage;
