"use client";

import React from 'react';
import { 
  PackageCheck, 
  Search, 
  Filter, 
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
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Realizacja Nagród</h1>
          <p className="text-teal-50 font-medium mt-1">Zarządzaj wysyłką fizycznych gadżetów i dostępem do nagród cyfrowych.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-teal-800 border border-teal-700 rounded-md font-bold text-xs text-teal-50 hover:bg-teal-700 shadow-sm flex items-center gap-2 font-heading">
              <Download size={18} /> Eksportuj etykiety
           </button>
           <button className="px-8 py-3.5 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 font-heading">
              Ustawienia Sklepu
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
              <PackageCheck size={100} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-all ease-standard" />
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-success-base uppercase tracking-widest mb-1">OCZEKUJĄCE WYSYŁKI</p>
                 <h3 className="text-4xl font-bold font-heading italic tracking-tighter">12</h3>
                 <p className="text-xs text-teal-100 font-medium mt-4">Większość z Twoich ostatnich "Mystery Box" dropów.</p>
              </div>
           </div>

           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <h4 className="font-bold text-sm uppercase tracking-widest text-teal-25 font-heading">Typy Nagród</h4>
              <div className="space-y-3">
                 {[
                   { label: 'Fizyczne (Merch)', val: 8, color: 'bg-success-base' },
                   { label: 'Cyfrowe (Kody)', val: 42, color: 'bg-teal-600' },
                   { label: 'Personalne (Call)', val: 3, color: 'bg-gold-400' },
                 ].map((t, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-50">{t.label}</span>
                      <span className="text-xs font-bold text-teal-25">{t.val}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-success-dark p-6 rounded-lg border border-success-base/20 flex items-start gap-4">
              <ShieldCheck size={24} className="text-success-base shrink-0" />
              <p className="text-[10px] text-success-base font-bold leading-relaxed uppercase tracking-wider">
                 Privacy Mode: Adresy widzów są widoczne tylko przez 14 dni od wygenerowania etykiety.
              </p>
           </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
           <div className="bg-teal-800 rounded-lg border border-teal-700 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
              <div className="p-8 border-b border-teal-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-100" />
                    <input type="text" placeholder="Szukaj zamówienia..." className="w-full bg-teal-700 border border-teal-600 rounded-md pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-teal-500 text-teal-25 placeholder:text-teal-100" />
                 </div>
                 <button className="p-2 text-teal-100 hover:text-teal-50"><Filter size={20} /></button>
              </div>

              <div className="overflow-x-auto flex-1">
                 <table className="w-full">
                    <thead><tr className="bg-teal-700/50"><th className="px-8 py-5 text-left text-[10px] font-black text-teal-100 uppercase tracking-widest">Zamówienie</th><th className="px-8 py-5 text-left text-[10px] font-black text-teal-100 uppercase tracking-widest">Odbiorca</th><th className="px-8 py-5 text-left text-[10px] font-black text-teal-100 uppercase tracking-widest">Nagroda</th><th className="px-8 py-5 text-right text-[10px] font-black text-teal-100 uppercase tracking-widest">Status</th></tr></thead>
                    <tbody className="divide-y divide-teal-700">
                       {SHIPMENTS.map(ship => (
                         <tr key={ship.id} className="hover:bg-teal-700/30 transition-colors group cursor-pointer">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-md bg-teal-700 flex items-center justify-center text-teal-100 group-hover:text-teal-500 transition-all">
                                    <Truck size={20} />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-teal-25">{ship.id}</p>
                                    <p className="text-[10px] text-teal-100 font-bold uppercase">{ship.address}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <p className="text-sm font-bold text-teal-50">{ship.user}</p>
                              <p className="text-[10px] text-teal-100 font-bold uppercase">{ship.date}</p>
                           </td>
                           <td className="px-8 py-6">
                              <p className="text-sm text-teal-50 max-w-[200px] truncate">{ship.reward}</p>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <span className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                                ship.status === 'Wysłane' ? 'bg-success-dark text-success-base' :
                                ship.status === 'Do spakowania' ? 'bg-teal-700 text-teal-25' :
                                'bg-teal-700 text-teal-100'
                              }`}>{ship.status}</span>
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

export default FulfillmentCenterPage;
