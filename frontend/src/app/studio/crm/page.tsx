"use client";


import React from 'react';
import { 
  Contact2, 
  Search, 
  Plus, 
  MoreVertical, 
  Star, 
  MessageSquare, 
  Briefcase, 
  Mail,
  ChevronRight,
  Filter
} from 'lucide-react';

const CONTACTS = [
  { id: 1, name: 'Jan Kowalski', company: 'Logitech Polska', role: 'Marketing Lead', status: 'W Negocjacjach', lastContact: '2 dni temu', rating: 5 },
  { id: 2, name: 'Alice Smith', company: 'G-Fuel US', role: 'Affiliate Manager', status: 'Aktywny Partner', lastContact: '5 dni temu', rating: 4 },
  { id: 3, name: 'Marek Nowak', company: 'Agencja STORM', role: 'Talent Scout', status: 'Lead', lastContact: 'Wczoraj', rating: 3 },
  { id: 4, name: 'Elena Petrova', company: 'VPN Secure', role: 'Partnership Dir', status: 'Zakończone', lastContact: '1 msc temu', rating: 2 },
];

const BusinessCRMPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Business CRM</h1>
          <p className="text-slate-500 font-medium mt-1">Zarządzaj relacjami z markami i agencjami w profesjonalny sposób.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-xs text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all">
              <Filter size={18} /> Filtruj
           </button>
           <button className="px-8 py-3.5 bg-[#003737] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#003737]/20 flex items-center gap-2">
              <Plus size={18} /> Dodaj Kontakt
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* SUMMARY STATS */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-slate-800"><Briefcase size={20} className="text-[#006D6D]" /><h3 className="font-black text-sm uppercase tracking-widest">Lejek Sprzedaży</h3></div>
              <div className="space-y-4">
                 {[
                   { label: 'Leady', val: 12, color: 'bg-slate-100' },
                   { label: 'Negocjacje', val: 5, color: 'bg-amber-100' },
                   { label: 'Aktywne', val: 3, color: 'bg-emerald-100' },
                 ].map((s, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-500">{s.label}</span>
                      <span className="text-sm font-black text-slate-900">{s.val}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-[#FFD700] p-8 rounded-[2.5rem] text-[#003737] shadow-xl space-y-4">
              <h4 className="font-black italic text-lg">Next Step AI</h4>
              <p className="text-xs font-bold leading-relaxed">"Jan Kowalski (Logitech) nie odpowiedział od 48h. Gemini sugeruje wysłanie followup'u z nowymi statystykami Twojego Media Kit."</p>
              <button className="w-full py-3 bg-[#003737] text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Napisz Follow-up</button>
           </div>
        </div>

        {/* CONTACTS LIST */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                 <div className="relative w-64">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input type="text" placeholder="Szukaj kontaktu..." className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none" />
                 </div>
              </div>
              <div className="overflow-x-auto flex-1">
                 <table className="w-full">
                    <thead><tr className="bg-slate-50/50"><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Rola / Firma</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th><th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Ostatni Kontakt</th></tr></thead>
                    <tbody className="divide-y divide-slate-50">
                       {CONTACTS.map(contact => (
                         <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-[#003737] group-hover:text-white transition-all">{contact.name[0]}</div>
                                 <div>
                                    <p className="text-sm font-black text-slate-800">{contact.name}</p>
                                    <div className="flex items-center gap-0.5 mt-1">{[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < contact.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />)}</div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <p className="text-xs font-bold text-slate-600">{contact.company}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{contact.role}</p>
                           </td>
                           <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                contact.status === 'W Negocjacjach' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                contact.status === 'Aktywny Partner' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                'bg-slate-50 text-slate-500 border border-slate-100'
                              }`}>{contact.status}</span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-4">
                                 <span className="text-xs font-bold text-slate-400">{contact.lastContact}</span>
                                 <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-300 transition-all"><MessageSquare size={16} /></button>
                              </div>
                           </td>
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

export default BusinessCRMPage;
