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
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Podatki & Raporty</h1>
          <p className="text-slate-500 font-medium mt-1">Automatyzacja rozliczeń kryptowalutowych i raporty VAT.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-xs text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all">
              <History size={18} /> Historia Deklaracji
           </button>
           <button className="px-8 py-3.5 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20 flex items-center gap-2">
              <Download size={18} /> Generuj Raport 2025
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* TAX SUB-ACCOUNT */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#0a0f10] to-[#003737] p-8 rounded-[3rem] text-white shadow-2xl space-y-8 relative overflow-hidden">
           <ShieldCheck size={120} className="absolute -bottom-6 -right-6 opacity-5" />
           <div>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">REZERWA PODATKOWA (Systemowa)</p>
              <h3 className="text-4xl font-black italic tracking-tighter">452.12 <span className="text-lg opacity-50">USDC</span></h3>
              <p className="text-xs text-slate-400 font-medium mt-4 leading-relaxed">System automatycznie odkłada 19% od każdego przychodu na Twój sub-portfel podatkowy.</p>
           </div>
           
           <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                 <span className="text-slate-500">Przewidywany podatek (Q3)</span>
                 <span className="text-white">~1,200 USDC</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 rounded-full w-[35%]" />
              </div>
           </div>

           <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Zmień Stawkę Rezerwy</button>
        </div>

        {/* TAX SETTINGS */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center gap-3 text-slate-800"><Info size={22} className="text-[#006D6D]" /><h3 className="font-black text-lg italic">Ustawienia Rezydencji Podatkowej</h3></div>
              
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kraj Rezydencji</label>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-sm">Polska (PL)</div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Typ Działalności</label>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-sm">Indywidualna (B2B)</div>
                 </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-emerald-50 border border-emerald-100 rounded-[2.5rem]">
                 <div className="flex gap-4">
                    <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
                    <div>
                       <p className="text-sm font-black text-emerald-900">Tax Engine Active</p>
                       <p className="text-xs text-emerald-700 font-medium mt-1">Wszystkie faktury są generowane z uwzględnieniem Twojej rezydencji.</p>
                    </div>
                 </div>
                 <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:underline">Zmień</button>
              </div>
           </div>

           <div className="bg-amber-50 p-6 rounded-[2.5rem] border border-amber-100 flex items-start gap-4">
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
