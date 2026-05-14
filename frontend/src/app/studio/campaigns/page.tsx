"use client";

import React from 'react';
import { 
  Building2, 
  Handshake, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  TrendingUp,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

const CampaignsPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Kampanie & Sponsorzy</h1>
          <p className="text-teal-50 font-medium mt-1">Zarządzaj swoimi współpracami z markami w jednym miejscu.</p>
        </div>
        <button className="px-8 py-3.5 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 font-heading">
          Uzupełnij Ofertę
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-teal-800 p-10 rounded-lg border border-teal-700 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-all ease-standard"><Building2 size={150} /></div>
          <div className="relative z-10 space-y-8">
             <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-md bg-teal-700 flex items-center justify-center text-gold-400 shadow-xl">
                      <Handshake size={32} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold font-heading text-teal-25 italic">Logitech G-Series 2025</h3>
                      <p className="text-teal-100 font-bold text-xs uppercase tracking-widest mt-1">Status: W Realizacji (Milestone 2/4)</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-xs font-black text-teal-100 uppercase tracking-widest">Budżet</p>
                   <p className="text-3xl font-bold font-heading text-teal-500 italic">5,000 USDC</p>
                </div>
             </div>

             <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Unbox', status: 'Done', date: '12.08' },
                  { label: 'Livestream', status: 'Active', date: '25.08' },
                  { label: 'Social Post', status: 'Pending', date: '01.09' },
                  { label: 'Raport', status: 'Pending', date: '15.09' },
                ].map((m, i) => (
                  <div key={i} className={`p-4 rounded-md border text-center space-y-1 ${
                    m.status === 'Done' ? 'bg-success-dark border-success-base/30 text-success-base' :
                    m.status === 'Active' ? 'bg-teal-700 border-teal-600 text-gold-400' :
                    'bg-teal-700 border-teal-600 text-teal-100'
                  }`}>
                     <p className="text-[10px] font-black uppercase tracking-widest">{m.label}</p>
                     <p className="text-xs font-black">{m.date}</p>
                  </div>
                ))}
             </div>

             <div className="pt-6 border-t border-teal-700 flex gap-4">
                <button className="flex-1 py-4 bg-teal-850 text-teal-25 font-bold rounded-md text-xs uppercase tracking-widest font-heading">Prześlij Dowód Realizacji</button>
                <button className="px-6 py-4 bg-teal-700 text-teal-100 rounded-md hover:bg-teal-600 transition-all ease-standard border border-teal-600"><MessageSquare size={20} /></button>
             </div>
          </div>
        </div>

        <div className="bg-teal-800 p-8 rounded-lg text-teal-25 shadow-2xl space-y-8 flex flex-col">
           <div className="flex justify-between items-center">
              <h3 className="font-bold font-heading text-lg italic">Nowe Zapytania (3)</h3>
              <div className="w-8 h-8 rounded-full bg-success-base flex items-center justify-center text-xs font-black">AI</div>
           </div>
           <div className="space-y-4 flex-1">
              {[
                { brand: 'VPN Secure', amount: 400, type: 'Shoutout' },
                { brand: 'Raid: Legends', amount: 1200, type: 'Integrated' },
              ].map((req, i) => (
                <div key={i} className="p-5 bg-teal-25/5 border border-teal-25/10 rounded-lg group hover:bg-teal-25/10 transition-all ease-standard cursor-pointer">
                   <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-sm">{req.brand}</p>
                        <p className="text-[10px] text-teal-100 font-bold uppercase mt-1">{req.type}</p>
                      </div>
                      <span className="text-xs font-black text-gold-400">{req.amount} USDC</span>
                   </div>
                   <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all ease-standard">
                      <span className="text-[10px] font-black uppercase tracking-widest text-success-base">Prawdopodobieństwo: 85%</span>
                      <ChevronRight size={14} />
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full py-4 bg-gold-400 text-teal-900 font-bold rounded-md text-xs uppercase tracking-widest font-heading">Ustaw Autoodpowiedzi AI</button>
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;
