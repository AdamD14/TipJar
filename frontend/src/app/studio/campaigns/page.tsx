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
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Kampanie & Sponsorzy</h1>
          <p className="text-slate-500 font-medium mt-1">Zarządzaj swoimi współpracami z markami w jednym miejscu.</p>
        </div>
        <button className="px-8 py-3.5 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20">
          Uzupełnij Ofertę
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ACTIVE CAMPAIGN */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform"><Building2 size={150} /></div>
          <div className="relative z-10 space-y-8">
             <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-2xl bg-[#003737] flex items-center justify-center text-[#FFD700] shadow-xl">
                      <Handshake size={32} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-slate-900 italic">Logitech G-Series 2025</h3>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Status: W Realizacji (Milestone 2/4)</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Budżet</p>
                   <p className="text-3xl font-black text-[#006D6D] italic">5,000 USDC</p>
                </div>
             </div>

             <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Unbox', status: 'Done', date: '12.08' },
                  { label: 'Livestream', status: 'Active', date: '25.08' },
                  { label: 'Social Post', status: 'Pending', date: '01.09' },
                  { label: 'Raport', status: 'Pending', date: '15.09' },
                ].map((m, i) => (
                  <div key={i} className={`p-4 rounded-2xl border text-center space-y-1 ${m.status === 'Done' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : m.status === 'Active' ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                     <p className="text-[10px] font-black uppercase tracking-widest">{m.label}</p>
                     <p className="text-xs font-black">{m.date}</p>
                  </div>
                ))}
             </div>

             <div className="pt-6 border-t border-slate-50 flex gap-4">
                <button className="flex-1 py-4 bg-[#0a0f10] text-white font-black rounded-2xl text-xs uppercase tracking-widest">Prześlij Dowód Realizacji</button>
                <button className="px-6 py-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"><MessageSquare size={20} /></button>
             </div>
          </div>
        </div>

        {/* INCOMING REQUESTS */}
        <div className="bg-[#003737] p-8 rounded-[3rem] text-white shadow-2xl space-y-8 flex flex-col">
           <div className="flex justify-between items-center">
              <h3 className="font-black text-lg italic">Nowe Zapytania (3)</h3>
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-black">AI</div>
           </div>
           <div className="space-y-4 flex-1">
              {[
                { brand: 'VPN Secure', amount: 400, type: 'Shoutout' },
                { brand: 'Raid: Legends', amount: 1200, type: 'Integrated' },
              ].map((req, i) => (
                <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all cursor-pointer">
                   <div className="flex justify-between items-start">
                      <div>
                        <p className="font-black text-sm">{req.brand}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{req.type}</p>
                      </div>
                      <span className="text-xs font-black text-[#FFD700]">{req.amount} USDC</span>
                   </div>
                   <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Prawdopodobieństwo: 85%</span>
                      <ChevronRight size={14} />
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full py-4 bg-[#FFD700] text-[#003737] font-black rounded-2xl text-xs uppercase tracking-widest">Ustaw Autoodpowiedzi AI</button>
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;
