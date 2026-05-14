"use client";


import React, { useState } from 'react';
import { 
  FileBadge, 
  ShieldCheck, 
  Globe, 
  UserCheck, 
  FileText, 
  Lock, 
  Info, 
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const CompliancePage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">Zgodność & KYC</h1>
          <p className="text-teal-50 font-medium mt-1">Zweryfikuj swoją tożsamość, aby odblokować nieograniczone wypłaty.</p>
        </div>
        <div className="px-6 py-2.5 bg-success-50 text-success-600 rounded-full border border-success-100 flex items-center gap-2">
           <ShieldCheck size={18} />
           <span className="text-[10px] font-bold uppercase tracking-widest">Status: Poziom 1 (Ograniczony)</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* COMPLIANCE STEPS */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-teal-800 p-10 rounded-lg border border-teal-700 shadow-sm space-y-10">
              <div className="space-y-8">
                 {[
                   { id: 1, title: 'Typ Konta', desc: 'Indywidualny Twórca / Jednoosobowa działalność', status: 'Completed' },
                   { id: 2, title: 'Weryfikacja Tożsamości', desc: 'Skan dokumentu (Dowód/Paszport) i weryfikacja biometryczna', status: 'Pending' },
                   { id: 3, title: 'Informacje Podatkowe', desc: 'Formularz W-8BEN lub NIP-UE dla rezydentów Polski', status: 'Locked' },
                 ].map((s, i) => (
                   <div key={i} className={`flex items-start gap-6 p-8 rounded-lg border-2 transition-all ${
                     s.status === 'Completed' ? 'bg-success-50/30 border-success-100' : 
                     s.status === 'Pending' ? 'bg-teal-800 border-teal-500 shadow-lg' : 
                     'bg-teal-700 border-teal-700 opacity-50'
                   }`}>
                      <div className={`w-12 h-12 rounded-md flex items-center justify-center shrink-0 font-bold text-lg ${
                        s.status === 'Completed' ? 'bg-success-base text-teal-25' : 
                        s.status === 'Pending' ? 'bg-teal-600 text-teal-25 animate-pulse' : 
                        'bg-teal-600 text-teal-100'
                      }`}>
                         {s.status === 'Completed' ? <CheckCircle2 size={24} /> : s.id}
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start">
                            <h4 className={`text-lg font-bold italic font-heading ${s.status === 'Locked' ? 'text-teal-100' : 'text-teal-25'}`}>{s.title}</h4>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-teal-100">{s.status}</span>
                         </div>
                         <p className="text-sm text-teal-100 font-medium mt-1">{s.desc}</p>
                         {s.status === 'Pending' && (
                           <button className="mt-6 px-8 py-3 bg-teal-600 text-teal-25 rounded-md font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-teal-600/20 hover:scale-105 transition-all flex items-center gap-2 font-heading">
                             Dokończ Weryfikację <ChevronRight size={14} />
                           </button>
                         )}
                      </div>
                   </div>
                 ))}
              </div>

              <div className="p-6 bg-teal-700 rounded-lg border border-teal-700 flex items-start gap-4">
                 <Info size={24} className="text-teal-500 shrink-0" />
                 <p className="text-xs text-teal-50 leading-relaxed italic">
                   "Weryfikacja KYC (Know Your Customer) jest wymogiem regulacyjnym dla transakcji powyżej 1000 USDC miesięcznie. Korzystamy z bezpiecznego protokołu Stripe Identity."
                 </p>
              </div>
           </div>
        </div>

        {/* SECURITY SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg text-teal-25 shadow-2xl space-y-8 relative overflow-hidden group">
              <Lock size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                 <h3 className="text-xl font-bold italic text-gold-400 font-heading">Bezpieczeństwo Danych</h3>
                 <p className="text-teal-100 text-xs font-medium leading-relaxed mt-4">
                    Twoje dane są szyfrowane kluczem AES-256 i przechowywane zgodnie ze standardami PCI-DSS. Nigdy nie udostępniamy Twoich dokumentów osobom trzecim bez Twojej wyraźnej zgody.
                 </p>
                 <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-3">
                    <Globe size={16} className="text-success-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-success-400">GDPR / RODO Compliant</span>
                 </div>
              </div>
           </div>

           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <h4 className="font-bold text-sm uppercase tracking-widest text-teal-25 flex items-center gap-2 font-heading"><Clock size={18} className="text-gold-400" /> Czas Oczekiwania</h4>
              <p className="text-xs text-teal-100 font-medium leading-relaxed">Aktualnie weryfikacja trwa średnio **24-48h roboczych** z powodu dużej liczby zgłoszeń.</p>
              <div className="h-1.5 bg-teal-700 rounded-full overflow-hidden">
                 <div className="h-full bg-success-base w-[65%]" />
              </div>
              <p className="text-[10px] font-bold text-teal-100 text-center uppercase tracking-widest">Weryfikatorzy online: 12</p>
           </div>
           
           <button className="w-full p-6 bg-teal-850 text-teal-25 rounded-lg font-bold text-[10px] uppercase tracking-widest flex items-center justify-between group hover:bg-black transition-all font-heading">
              <span>Wsparcie Prawne</span>
              <ExternalLink size={14} className="opacity-40 group-hover:opacity-100" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;
