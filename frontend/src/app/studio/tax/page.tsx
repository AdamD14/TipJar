"use client";


import React from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  ShieldCheck, 
  ArrowUpRight, 
  PieChart, 
  Info,
  History,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const TaxCenterPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">Podatki & Raporty</h1>
          <p className="text-teal-50 font-medium mt-1">Automatyzacja rozliczeń kryptowalutowych i raporty VAT.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-teal-800 border border-teal-700 rounded-md font-bold text-xs text-teal-50 flex items-center gap-2 hover:bg-teal-700 transition-all font-heading">
              <History size={18} /> Historia Deklaracji
           </button>
           <button className="px-8 py-3.5 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 flex items-center gap-2 font-heading">
              <Download size={18} /> Generuj Raport 2025
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* TAX SUB-ACCOUNT */}
        <div className="lg:col-span-4 bg-gradient-to-br from-teal-850 to-teal-800 p-8 rounded-lg text-teal-25 shadow-2xl space-y-8 relative overflow-hidden">
           <ShieldCheck size={120} className="absolute -bottom-6 -right-6 opacity-5" />
           <div>
              <p className="text-[10px] font-bold text-success-400 uppercase tracking-widest mb-1">REZERWA PODATKOWA (Systemowa)</p>
              <h3 className="text-4xl font-bold italic tracking-tighter font-heading">452.12 <span className="text-lg opacity-50">USDC</span></h3>
              <p className="text-xs text-teal-100 font-medium mt-4 leading-relaxed">System automatycznie odkłada 19% od każdego przychodu na Twój sub-portfel podatkowy.</p>
           </div>
           
           <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                 <span className="text-teal-50">Przewidywany podatek (Q3)</span>
                 <span className="text-teal-25">~1,200 USDC</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-success-base rounded-full w-[35%]" />
              </div>
           </div>

           <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all font-heading">Zmień Stawkę Rezerwy</button>
        </div>

        {/* TAX SETTINGS */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-8">
              <div className="flex items-center gap-3 text-teal-25"><Info size={22} className="text-teal-500" /><h3 className="font-bold text-lg italic font-heading">Ustawienia Rezydencji Podatkowej</h3></div>
              
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">Kraj Rezydencji</label>
                    <div className="p-4 bg-teal-700 rounded-md border border-teal-700 font-bold text-sm">Polska (PL)</div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">Typ Działalności</label>
                    <div className="p-4 bg-teal-700 rounded-md border border-teal-700 font-bold text-sm">Indywidualna (B2B)</div>
                 </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-success-50 border border-success-100 rounded-lg">
                 <div className="flex gap-4">
                    <CheckCircle2 size={24} className="text-success-500 shrink-0" />
                    <div>
                       <p className="text-sm font-bold text-success-900">Tax Engine Active</p>
                       <p className="text-xs text-success-700 font-medium mt-1">Wszystkie faktury są generowane z uwzględnieniem Twojej rezydencji.</p>
                    </div>
                 </div>
                 <button className="text-[10px] font-bold uppercase tracking-widest text-success-600 hover:underline font-heading">Zmień</button>
              </div>
           </div>

           <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 flex items-start gap-4">
              <AlertCircle size={24} className="text-amber-500 shrink-0" />
              <p className="text-xs text-amber-800 font-medium leading-relaxed italic">
                 "Pamiętaj: TipJar+ ułatwia kalkulację podatków, ale nie zastępuje profesjonalnego doradcy podatkowego. Skonsultuj swój raport przed wysłaniem deklaracji do urzędu."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCenterPage;
