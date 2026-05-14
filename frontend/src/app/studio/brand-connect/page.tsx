"use client";


import React from 'react';
import { 
  MessageCircle, 
  ExternalLink, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  Plus, 
  Copy,
  TrendingUp,
  FileText,
  Mail,
  Zap
} from 'lucide-react';

const BrandConnectPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">Brand Connect</h1>
          <p className="text-teal-50 font-medium mt-1">Publiczna wizytówka B2B Twojego kanału. Pozwól markom Cię znaleźć.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-teal-800 border border-teal-700 rounded-md font-bold text-xs text-teal-50 hover:bg-teal-700 shadow-sm flex items-center gap-2 font-heading">
              <Copy size={18} /> Kopiuj Link B2B
           </button>
           <button className="px-8 py-3.5 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 font-heading">
              Podgląd Publiczny
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* BRAND-FACING PROFILE PREVIEW */}
        <div className="lg:col-span-8 bg-teal-800 p-10 rounded-lg border border-teal-700 shadow-sm space-y-10">
           <div className="flex flex-col md:flex-row gap-10">
              <div className="w-32 h-32 rounded-lg bg-teal-700 border-4 border-teal-800 shadow-xl overflow-hidden shrink-0">
                 <img src="https://picsum.photos/seed/brand/300/300" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold text-teal-25 italic font-heading">Alex Studio B2B</h2>
                    <ShieldCheck className="text-teal-500" />
                 </div>
                 <p className="text-teal-50 font-medium max-w-lg leading-relaxed italic">"Profesjonalne podejście do kampanii gamingowych i tech. Dostarczam szczegółowe raporty ROI z każdej współpracy."</p>
                 <div className="flex gap-3">
                    <span className="px-3 py-1 bg-teal-700 border border-teal-700 rounded-full text-[10px] font-bold uppercase text-teal-100">Verified Stats</span>
                    <span className="px-3 py-1 bg-teal-700 border border-teal-700 rounded-full text-[10px] font-bold uppercase text-teal-100">Fast Response: &lt; 2h</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Zasięg miesięczny', val: '250k' },
                { label: 'Ukończone kampanie', val: '12' },
                { label: 'Średni CTR', val: '4.8%' },
                { label: 'Dostępność', val: 'Wrzesień' },
              ].map((stat, i) => (
                <div key={i} className="p-5 bg-teal-700 rounded-md border border-teal-700">
                   <p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-xl font-bold text-teal-25 mt-1 italic">{stat.val}</p>
                </div>
              ))}
           </div>

           <div className="space-y-6 pt-6 border-t border-teal-700">
              <h3 className="font-bold text-teal-25 text-lg italic font-heading">Dostępne Formy Współpracy</h3>
              <div className="grid md:grid-cols-2 gap-4">
                 {[
                   { name: 'Integracja wideo (Full)', price: '2,500 USDC', time: '10-15 min' },
                   { name: 'Shoutout (Story)', price: '450 USDC', time: '24h' },
                   { name: 'Sponsoring Streamu (3h)', price: '1,200 USDC', time: 'Live' },
                   { name: 'Ambasador (3 msc)', price: 'Negocjacje', time: 'Long-term' },
                 ].map((pkg, i) => (
                   <div key={i} className="p-6 border border-teal-700 rounded-md group hover:border-teal-500 transition-all cursor-pointer">
                      <div className="flex justify-between items-start">
                         <div>
                            <h4 className="font-bold text-teal-25 group-hover:text-teal-500 transition-colors font-heading">{pkg.name}</h4>
                            <p className="text-[10px] text-teal-100 font-bold uppercase mt-1">{pkg.time}</p>
                         </div>
                         <p className="text-sm font-bold text-teal-500">{pkg.price}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* INBOX & SETTINGS */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-teal-850 p-8 rounded-lg text-teal-25 shadow-2xl space-y-8 relative overflow-hidden group">
              <Mail size={120} className="absolute -bottom-10 -right-10 opacity-5" />
              <div className="relative z-10">
                 <h3 className="text-xl font-bold italic text-gold-400 font-heading">Skrzynka B2B</h3>
                 <p className="text-teal-100 text-sm font-medium mt-4">Wszystkie zapytania od marek trafiają tutaj. Gemini AI automatycznie weryfikuje wiarygodność agencji.</p>
                 <div className="mt-8 space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-md flex justify-between items-center cursor-pointer hover:bg-white/10">
                       <div>
                          <p className="text-xs font-bold">NordVPN Partnership</p>
                          <p className="text-[10px] text-teal-50">Otrzymano wczoraj</p>
                       </div>
                       <div className="w-2 h-2 rounded-full bg-gold-400" />
                    </div>
                 </div>
                 <button className="w-full mt-6 py-4 bg-gold-400 text-teal-900 font-bold rounded-md text-[10px] uppercase tracking-widest font-heading">Otwórz Brand Inbox</button>
              </div>
           </div>

           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <h3 className="font-bold text-teal-25 text-sm uppercase tracking-widest font-heading">Globalna Widoczność</h3>
              <div className="flex items-center justify-between p-4 bg-teal-700 rounded-md border border-teal-700">
                 <span className="text-xs font-bold text-teal-50">TipJar+ Marketplace</span>
                 <div className="w-10 h-6 bg-success-base/20 rounded-full flex items-center justify-end px-1 border border-success-500/30"><div className="w-4 h-4 bg-success-base rounded-full" /></div>
              </div>
              <p className="text-[10px] text-teal-100 font-medium leading-relaxed italic">Po włączeniu, Twój profil B2B będzie wyświetlany w wyszukiwarce dla zweryfikowanych marek.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BrandConnectPage;
