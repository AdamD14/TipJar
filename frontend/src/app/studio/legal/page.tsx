"use client";


import React from 'react';
import { 
  Scale, 
  FileText, 
  ShieldCheck, 
  Plus, 
  Download, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  ExternalLink,
  Lock,
  Zap
} from 'lucide-react';

const CONTRACTS = [
  { id: 1, name: 'Umowa Sponsorska: Logitech', date: '12.08.2025', status: 'Signed', type: 'Sponsorship' },
  { id: 2, name: 'Licencja na Assety: Emotes Pack', date: '05.08.2025', status: 'Active', type: 'IP Rights' },
  { id: 3, name: 'Contract: G-Fuel Integration', date: '20.07.2025', status: 'Archived', type: 'Campaign' },
];

const LegalCenterPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Centrum Prawne</h1>
          <p className="text-slate-500 font-medium mt-1">Automatyczne kontrakty, zarządzanie IP i ochrona prawna Twojej marki.</p>
        </div>
        <button className="px-8 py-3.5 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20 flex items-center gap-2">
           <Plus size={18} /> Nowy Kontrakt (AI)
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* CONTRACTS OVERVIEW */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                 <h3 className="font-black text-xl italic text-slate-800">Moje Kontrakty</h3>
                 <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase text-slate-400">Wszystkie</button>
                    <button className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase text-slate-400">Podpisane</button>
                 </div>
              </div>
              
              <div className="overflow-x-auto flex-1">
                 <table className="w-full">
                    <thead><tr className="bg-slate-50/50"><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Nazwa Umowy</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Typ</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th><th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th></tr></thead>
                    <tbody className="divide-y divide-slate-50">
                       {CONTRACTS.map(contract => (
                         <tr key={contract.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#006D6D] transition-all">
                                    <FileText size={20} />
                                 </div>
                                 <span className="text-sm font-black text-slate-800 italic">{contract.name}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{contract.type}</span>
                           </td>
                           <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                contract.status === 'Signed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                contract.status === 'Active' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                'bg-slate-50 text-slate-400 border border-slate-100'
                              }`}>{contract.status}</span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-4">
                                 <span className="text-xs font-bold text-slate-400">{contract.date}</span>
                                 <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-300 transition-all"><Download size={16} /></button>
                              </div>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* LEGAL TOOLS & AI */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#003737] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <Zap size={100} className="absolute -bottom-6 -right-6 opacity-10" />
              <h3 className="text-xl font-black italic text-[#FFD700] mb-4">Contract Generator (Gemini)</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">Stwórz prawnie wiążącą umowę w 30 sekund. Wybierz szablon, podaj dane marki, a Gemini zajmie się resztą.</p>
              <div className="mt-8 space-y-3">
                 <button className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/20">Generator NDA</button>
                 <button className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-white hover:bg-white/20">Umowa Sponsorship</button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                 <ShieldCheck className="text-[#006D6D]" size={24} />
                 <h3 className="font-black text-slate-800 italic uppercase text-sm tracking-widest">Ochrona Twojego IP</h3>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">"TipJar+ automatycznie timestampuje Twoje assety na blockchainie, tworząc niezbijalny dowód Twojego autorstwa w razie sporów prawnych."</p>
              <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                 <span className="text-[10px] font-black text-slate-300 uppercase">Chronionych assetów: 42</span>
                 <ExternalLink size={14} className="text-slate-300" />
              </div>
           </div>

           <div className="bg-[#0a0f10] p-8 rounded-[3rem] text-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/20 flex items-center justify-center text-[#FFD700]"><Lock size={20} /></div>
              <div>
                 <p className="text-xs font-black italic">Wsparcie Prawne Pro</p>
                 <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Konsultacje z prawnikiem online.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LegalCenterPage;
