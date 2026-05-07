"use client";


import React from 'react';
import { Users, Star, Medal, Crown, Search, Filter, MessageSquare, ExternalLink, Sparkles, Heart } from 'lucide-react';

const SUPPORTERS_DATA = [
  { id: '1', name: 'CryptoPanda_99', tier: 'Gold', total: 1250, joinDate: '12 Maj 2024', status: 'Active', sentiment: 'Bardzo Pozytywny', lastMsg: 'Uwielbiam te Twoje tutoriale o Web3!' },
  { id: '2', name: 'Marcin_K', tier: 'Silver', total: 450, joinDate: '01 Cze 2024', status: 'Active', sentiment: 'Pozytywny', lastMsg: 'Dobra robota ze streamem wczoraj.' },
  { id: '3', name: 'Fan_Numer_1', tier: 'Bronze', total: 120, joinDate: '15 Cze 2024', status: 'Inactive', sentiment: 'Neutralny', lastMsg: 'Czekam na więcej gier.' },
  { id: '4', name: 'Alex_V', tier: 'Gold', total: 890, joinDate: '20 Lip 2024', status: 'Active', sentiment: 'Bardzo Pozytywny', lastMsg: 'Mój ulubiony kanał na platformie!' },
];

const SupportersPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Twoja Społeczność</h1>
          <p className="text-slate-500 font-medium mt-1">Zarządzaj swoimi subskrybentami i najbardziej lojalnymi fanami.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3.5 bg-[#006D6D] text-white rounded-2xl font-black flex items-center gap-2 hover:bg-[#005a5a] transition-all shadow-xl shadow-[#006D6D]/20 text-xs uppercase tracking-widest">
            <MessageSquare size={18} /> Globalna Wiadomość
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Aktywni Subskrybenci</p>
              <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter">248</h3>
              <p className="text-xs text-emerald-500 font-bold mt-2 flex items-center gap-1"><Star size={12} fill="currentColor" /> +12 w tym tygodniu</p>
           </div>
           
           {/* AI SENTIMENT SUMMARY (PDF str. 39) */}
           <div className="bg-[#0a0f10] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
              <Sparkles size={80} className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-black text-[#FFD700] uppercase tracking-widest mb-4">Sentiment AI</p>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Heart size={20} className="text-rose-500 fill-rose-500" />
                    <div>
                       <p className="text-sm font-black italic">88% Zadowolenia</p>
                       <p className="text-[10px] text-slate-500 font-bold leading-tight">Twoja społeczność docenia regularność postów.</p>
                    </div>
                 </div>
              </div>
              <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Pełny Raport Gemini</button>
           </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
              <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-64">
                   <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input type="text" placeholder="Szukaj fana..." className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#006D6D]" />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead><tr className="bg-slate-50/50"><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Użytkownik</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status Sentymentu</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ostatnia Wiadomość</th><th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Suma</th></tr></thead>
                    <tbody className="divide-y divide-slate-50">
                       {SUPPORTERS_DATA.map(supporter => (
                         <tr key={supporter.id} className="hover:bg-slate-50/30 transition-colors group">
                           <td className="px-8 py-5">
                             <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300 font-black"><Users size={18} /></div>
                               <div><p className="text-sm font-black text-slate-800">{supporter.name}</p><span className="text-[9px] font-black text-slate-400 uppercase">{supporter.tier}</span></div>
                             </div>
                           </td>
                           <td className="px-8 py-5">
                             <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                               supporter.sentiment.includes('Bardzo') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
                             }`}>
                               {supporter.sentiment}
                             </span>
                           </td>
                           <td className="px-8 py-5"><p className="text-xs text-slate-500 italic max-w-xs truncate">"{supporter.lastMsg}"</p></td>
                           <td className="px-8 py-5 text-right"><p className="text-sm font-black italic text-[#006D6D]">{supporter.total.toFixed(2)} USDC</p></td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SupportersPage;
