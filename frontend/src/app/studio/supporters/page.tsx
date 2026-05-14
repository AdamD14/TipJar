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
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">Twoja Społeczność</h1>
          <p className="text-teal-50 font-medium mt-1">Zarządzaj swoimi subskrybentami i najbardziej lojalnymi fanami.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3.5 bg-teal-600 text-teal-25 rounded-md font-bold flex items-center gap-2 hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/20 text-xs uppercase tracking-widest font-heading">
            <MessageSquare size={18} /> Globalna Wiadomość
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm">
              <p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest mb-1 font-heading">Aktywni Subskrybenci</p>
              <h3 className="text-4xl font-bold text-teal-25 italic tracking-tighter font-heading">248</h3>
              <p className="text-xs text-success-base font-bold mt-2 flex items-center gap-1"><Star size={12} fill="currentColor" /> +12 w tym tygodniu</p>
           </div>
           
           {/* AI SENTIMENT SUMMARY (PDF str. 39) */}
           <div className="bg-teal-850 p-8 rounded-lg text-teal-25 shadow-xl relative overflow-hidden group">
              <Sparkles size={80} className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-4 font-heading">Sentiment AI</p>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Heart size={20} className="text-error-base fill-error-base" />
                    <div>
                       <p className="text-sm font-bold italic font-heading">88% Zadowolenia</p>
                       <p className="text-[10px] text-teal-50 font-bold leading-tight">Twoja społeczność docenia regularność postów.</p>
                    </div>
                 </div>
              </div>
              <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-md text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all font-heading">Pełny Raport Gemini</button>
           </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
           <div className="bg-teal-800 rounded-lg border border-teal-700 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
              <div className="p-8 border-b border-teal-700 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-64">
                   <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-100" />
                   <input type="text" placeholder="Szukaj fana..." className="w-full bg-teal-700 border border-teal-700 rounded-md pl-12 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-teal-500" />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead><tr className="bg-teal-700"><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-[0.2em] font-heading">Użytkownik</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-[0.2em] font-heading">Status Sentymentu</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-[0.2em] font-heading">Ostatnia Wiadomość</th><th className="px-8 py-5 text-right text-[10px] font-bold text-teal-100 uppercase tracking-[0.2em] font-heading">Suma</th></tr></thead>
                    <tbody className="divide-y divide-teal-700">
                       {SUPPORTERS_DATA.map(supporter => (
                         <tr key={supporter.id} className="hover:bg-teal-700 transition-colors group">
                           <td className="px-8 py-5">
                             <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-md bg-teal-700 flex items-center justify-center text-teal-100 font-bold"><Users size={18} /></div>
                               <div><p className="text-sm font-bold text-teal-25 font-heading">{supporter.name}</p><span className="text-[9px] font-bold text-teal-100 uppercase">{supporter.tier}</span></div>
                             </div>
                           </td>
                           <td className="px-8 py-5">
                             <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                               supporter.sentiment.includes('Bardzo') ? 'bg-success-dark text-success-base' : 'bg-teal-700 text-teal-50'
                             }`}>
                               {supporter.sentiment}
                             </span>
                           </td>
                           <td className="px-8 py-5"><p className="text-xs text-teal-50 italic max-w-xs truncate">"{supporter.lastMsg}"</p></td>
                           <td className="px-8 py-5 text-right"><p className="text-sm font-bold italic text-teal-500 font-heading">{supporter.total.toFixed(2)} USDC</p></td>
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
