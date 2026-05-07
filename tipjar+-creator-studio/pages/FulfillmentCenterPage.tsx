
import React from 'react';
import { 
  PackageCheck, 
  Search, 
  Filter, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Download, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const SHIPMENTS = [
  { id: 'ORD-8291', user: 'CryptoPanda', reward: 'Limitowana Bluza T+ (Rozmiar L)', status: 'Wysłane', date: 'Wczoraj', address: 'Warszawa, PL' },
  { id: 'ORD-8290', user: 'Alice_ETH', reward: 'Podpisany Plakat Streamu', status: 'Do spakowania', date: 'Dzisiaj', address: 'London, UK' },
  { id: 'ORD-8289', user: 'Marcin_K', reward: 'Ekskluzywny Zestaw Naklejek', status: 'Oczekuje na dane', date: '2 dni temu', address: '—' },
];

const FulfillmentCenterPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Realizacja Nagród</h1>
          <p className="text-slate-500 font-medium mt-1">Zarządzaj wysyłką fizycznych gadżetów i dostępem do nagród cyfrowych.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-xs text-slate-600 hover:bg-slate-50 shadow-sm flex items-center gap-2">
              <Download size={18} /> Eksportuj etykiety
           </button>
           <button className="px-8 py-3.5 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20">
              Ustawienia Sklepu
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* STATS */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-[#003737] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <PackageCheck size={100} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">OCZEKUJĄCE WYSYŁKI</p>
                 <h3 className="text-4xl font-black italic tracking-tighter">12</h3>
                 <p className="text-xs text-slate-400 font-medium mt-4">Większość z Twoich ostatnich "Mystery Box" dropów.</p>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <h4 className="font-black text-sm uppercase tracking-widest text-slate-800">Typy Nagród</h4>
              <div className="space-y-3">
                 {[
                   { label: 'Fizyczne (Merch)', val: 8, color: 'bg-emerald-500' },
                   { label: 'Cyfrowe (Kody)', val: 42, color: 'bg-[#006D6D]' },
                   { label: 'Personalne (Call)', val: 3, color: 'bg-amber-400' },
                 ].map((t, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">{t.label}</span>
                      <span className="text-xs font-black text-slate-900">{t.val}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-emerald-50 p-6 rounded-[2.5rem] border border-emerald-100 flex items-start gap-4">
              <ShieldCheck size={24} className="text-emerald-500 shrink-0" />
              <p className="text-[10px] text-emerald-800 font-bold leading-relaxed uppercase tracking-wider">
                 Privacy Mode: Adresy widzów są widoczne tylko przez 14 dni od wygenerowania etykiety.
              </p>
           </div>
        </div>

        {/* SHIPMENT LIST */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
              <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input type="text" placeholder="Szukaj zamówienia..." className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#006D6D]" />
                 </div>
                 <button className="p-2 text-slate-400 hover:text-slate-600"><Filter size={20} /></button>
              </div>

              <div className="overflow-x-auto flex-1">
                 <table className="w-full">
                    <thead><tr className="bg-slate-50/50"><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Zamówienie</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Odbiorca</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Nagroda</th><th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th></tr></thead>
                    <tbody className="divide-y divide-slate-50">
                       {SHIPMENTS.map(ship => (
                         <tr key={ship.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#006D6D] transition-all">
                                    <Truck size={20} />
                                 </div>
                                 <span className="text-xs font-black text-slate-800 font-mono italic">{ship.id}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <p className="text-sm font-black text-slate-800">{ship.user}</p>
                              <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-1"><MapPin size={10} /> {ship.address}</p>
                           </td>
                           <td className="px-8 py-6">
                              <p className="text-xs font-bold text-slate-600">{ship.reward}</p>
                              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{ship.date}</p>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                ship.status === 'Wysłane' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                ship.status === 'Do spakowania' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                'bg-slate-50 text-slate-400 border border-slate-100'
                              }`}>{ship.status}</span>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex justify-center">
                 <button className="text-[10px] font-black uppercase tracking-[0.2em] text-[#006D6D] hover:underline">Zobacz wszystkie zamówienia</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FulfillmentCenterPage;
