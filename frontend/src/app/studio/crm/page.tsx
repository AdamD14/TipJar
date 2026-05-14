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
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">Business CRM</h1>
          <p className="text-teal-50 font-medium mt-1">Zarządzaj relacjami z markami i agencjami w profesjonalny sposób.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-teal-800 border border-teal-700 rounded-md font-bold text-xs text-teal-50 flex items-center gap-2 hover:bg-teal-700 transition-all font-heading">
              <Filter size={18} /> Filtruj
           </button>
           <button className="px-8 py-3.5 bg-teal-800 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-800/20 flex items-center gap-2 font-heading">
              <Plus size={18} /> Dodaj Kontakt
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* SUMMARY STATS */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-teal-25"><Briefcase size={20} className="text-teal-500" /><h3 className="font-bold text-sm uppercase tracking-widest font-heading">Lejek Sprzedaży</h3></div>
              <div className="space-y-4">
                 {[
                   { label: 'Leady', val: 12, color: 'bg-teal-700' },
                   { label: 'Negocjacje', val: 5, color: 'bg-amber-100' },
                   { label: 'Aktywne', val: 3, color: 'bg-success-100' },
                 ].map((s, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-teal-700 rounded-md border border-teal-700">
                      <span className="text-xs font-bold text-teal-50">{s.label}</span>
                      <span className="text-sm font-bold text-teal-25">{s.val}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-[#FFD700] p-8 rounded-lg text-teal-900 shadow-xl space-y-4">
              <h4 className="font-bold italic text-lg font-heading">Next Step AI</h4>
              <p className="text-xs font-bold leading-relaxed">"Jan Kowalski (Logitech) nie odpowiedział od 48h. Gemini sugeruje wysłanie followup'u z nowymi statystykami Twojego Media Kit."</p>
              <button className="w-full py-3 bg-teal-800 text-teal-25 rounded-md text-[10px] font-bold uppercase tracking-widest font-heading">Napisz Follow-up</button>
           </div>
        </div>

        {/* CONTACTS LIST */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-teal-800 rounded-lg border border-teal-700 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
              <div className="p-8 border-b border-teal-700 flex justify-between items-center">
                 <div className="relative w-64">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-100" />
                    <input type="text" placeholder="Szukaj kontaktu..." className="w-full bg-teal-700 border border-teal-700 rounded-md pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none" />
                 </div>
              </div>
              <div className="overflow-x-auto flex-1">
                 <table className="w-full">
                    <thead><tr className="bg-teal-700"><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Partner</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Rola / Firma</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Status</th><th className="px-8 py-5 text-right text-[10px] font-bold text-teal-100 uppercase tracking-widest">Ostatni Kontakt</th></tr></thead>
                    <tbody className="divide-y divide-teal-700">
                       {CONTACTS.map(contact => (
                         <tr key={contact.id} className="hover:bg-teal-700 transition-colors group cursor-pointer">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-md bg-teal-700 flex items-center justify-center font-bold text-teal-100 group-hover:bg-teal-800 group-hover:text-teal-25 transition-all">{contact.name[0]}</div>
                                 <div>
                                    <p className="text-sm font-bold text-teal-25">{contact.name}</p>
                                    <div className="flex items-center gap-0.5 mt-1">{[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < contact.rating ? 'text-amber-400 fill-amber-400' : 'text-teal-100'} />)}</div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <p className="text-xs font-bold text-teal-50">{contact.company}</p>
                              <p className="text-[10px] text-teal-100 font-bold uppercase tracking-widest mt-1">{contact.role}</p>
                           </td>
                           <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                                contact.status === 'W Negocjacjach' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                contact.status === 'Aktywny Partner' ? 'bg-success-50 text-success-600 border border-success-100' :
                                'bg-teal-700 text-teal-50 border border-teal-700'
                              }`}>{contact.status}</span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-4">
                                 <span className="text-xs font-bold text-teal-100">{contact.lastContact}</span>
                                 <button className="p-2 hover:bg-teal-600 rounded-lg text-teal-100 transition-all"><MessageSquare size={16} /></button>
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
