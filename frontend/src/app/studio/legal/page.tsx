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
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">Centrum Prawne</h1>
          <p className="text-teal-50 font-medium mt-1">Automatyczne kontrakty, zarządzanie IP i ochrona prawna Twojej marki.</p>
        </div>
        <button className="px-8 py-3.5 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 flex items-center gap-2 font-heading">
           <Plus size={18} /> Nowy Kontrakt (AI)
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* CONTRACTS OVERVIEW */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-teal-800 rounded-lg border border-teal-700 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
              <div className="p-8 border-b border-teal-700 flex justify-between items-center">
                 <h3 className="font-bold text-xl italic text-teal-25 font-heading">Moje Kontrakty</h3>
                 <div className="flex gap-2">
                    <button className="px-4 py-2 bg-teal-700 rounded-md text-[10px] font-bold uppercase text-teal-100 font-heading">Wszystkie</button>
                    <button className="px-4 py-2 bg-teal-700 rounded-md text-[10px] font-bold uppercase text-teal-100 font-heading">Podpisane</button>
                 </div>
              </div>
              
              <div className="overflow-x-auto flex-1">
                 <table className="w-full">
                    <thead><tr className="bg-teal-700"><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Nazwa Umowy</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Typ</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Status</th><th className="px-8 py-5 text-right text-[10px] font-bold text-teal-100 uppercase tracking-widest">Data</th></tr></thead>
                    <tbody className="divide-y divide-teal-700">
                       {CONTRACTS.map(contract => (
                         <tr key={contract.id} className="hover:bg-teal-700 transition-colors group cursor-pointer">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-md bg-teal-700 flex items-center justify-center text-teal-100 group-hover:text-teal-500 transition-all">
                                    <FileText size={20} />
                                 </div>
                                 <span className="text-sm font-bold text-teal-25 italic">{contract.name}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <span className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">{contract.type}</span>
                           </td>
                           <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                                contract.status === 'Signed' ? 'bg-success-50 text-success-600 border border-success-100' :
                                contract.status === 'Active' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                'bg-teal-700 text-teal-100 border border-teal-700'
                              }`}>{contract.status}</span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-4">
                                 <span className="text-xs font-bold text-teal-100">{contract.date}</span>
                                 <button className="p-2 hover:bg-teal-600 rounded-lg text-teal-100 transition-all"><Download size={16} /></button>
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
           <div className="bg-teal-800 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
              <Zap size={100} className="absolute -bottom-6 -right-6 opacity-10" />
              <h3 className="text-xl font-bold italic text-gold-400 mb-4 font-heading">Contract Generator (Gemini)</h3>
              <p className="text-xs text-teal-100 leading-relaxed font-medium">Stwórz prawnie wiążącą umowę w 30 sekund. Wybierz szablon, podaj dane marki, a Gemini zajmie się resztą.</p>
              <div className="mt-8 space-y-3">
                 <button className="w-full py-4 bg-white/10 border border-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest text-teal-25 hover:bg-white/20 font-heading">Generator NDA</button>
                 <button className="w-full py-4 bg-white/10 border border-white/10 rounded-md text-[10px] font-bold uppercase text-teal-25 hover:bg-white/20 font-heading">Umowa Sponsorship</button>
              </div>
           </div>

           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                 <ShieldCheck className="text-teal-500" size={24} />
                 <h3 className="font-bold text-teal-25 italic uppercase text-sm tracking-widest font-heading">Ochrona Twojego IP</h3>
              </div>
              <p className="text-xs text-teal-100 font-medium leading-relaxed italic">"TipJar+ automatycznie timestampuje Twoje assety na blockchainie, tworząc niezbijalny dowód Twojego autorstwa w razie sporów prawnych."</p>
              <div className="pt-4 flex items-center justify-between border-t border-teal-700">
                 <span className="text-[10px] font-bold text-teal-100 uppercase">Chronionych assetów: 42</span>
                 <ExternalLink size={14} className="text-teal-100" />
              </div>
           </div>

           <div className="bg-teal-850 p-8 rounded-lg text-teal-25 flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-[#FFD700]/20 flex items-center justify-center text-gold-400"><Lock size={20} /></div>
              <div>
                 <p className="text-xs font-bold italic">Wsparcie Prawne Pro</p>
                 <p className="text-[10px] text-teal-50 font-bold uppercase mt-1">Konsultacje z prawnikiem online.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LegalCenterPage;
