
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
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Brand Connect</h1>
          <p className="text-slate-500 font-medium mt-1">Publiczna wizytówka B2B Twojego kanału. Pozwól markom Cię znaleźć.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-xs text-slate-600 hover:bg-slate-50 shadow-sm flex items-center gap-2">
              <Copy size={18} /> Kopiuj Link B2B
           </button>
           <button className="px-8 py-3.5 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20">
              Podgląd Publiczny
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* BRAND-FACING PROFILE PREVIEW */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
           <div className="flex flex-col md:flex-row gap-10">
              <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-xl overflow-hidden shrink-0">
                 <img src="https://picsum.photos/seed/brand/300/300" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-black text-slate-900 italic">Alex Studio B2B</h2>
                    <ShieldCheck className="text-[#006D6D]" />
                 </div>
                 <p className="text-slate-500 font-medium max-w-lg leading-relaxed italic">"Profesjonalne podejście do kampanii gamingowych i tech. Dostarczam szczegółowe raporty ROI z każdej współpracy."</p>
                 <div className="flex gap-3">
                    <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase text-slate-400">Verified Stats</span>
                    <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase text-slate-400">Fast Response: &lt; 2h</span>
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
                <div key={i} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-xl font-black text-slate-900 mt-1 italic">{stat.val}</p>
                </div>
              ))}
           </div>

           <div className="space-y-6 pt-6 border-t border-slate-50">
              <h3 className="font-black text-slate-800 text-lg italic">Dostępne Formy Współpracy</h3>
              <div className="grid md:grid-cols-2 gap-4">
                 {[
                   { name: 'Integracja wideo (Full)', price: '2,500 USDC', time: '10-15 min' },
                   { name: 'Shoutout (Story)', price: '450 USDC', time: '24h' },
                   { name: 'Sponsoring Streamu (3h)', price: '1,200 USDC', time: 'Live' },
                   { name: 'Ambasador (3 msc)', price: 'Negocjacje', time: 'Long-term' },
                 ].map((pkg, i) => (
                   <div key={i} className="p-6 border border-slate-100 rounded-3xl group hover:border-[#006D6D] transition-all cursor-pointer">
                      <div className="flex justify-between items-start">
                         <div>
                            <h4 className="font-black text-slate-800 group-hover:text-[#006D6D] transition-colors">{pkg.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{pkg.time}</p>
                         </div>
                         <p className="text-sm font-black text-[#006D6D]">{pkg.price}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* INBOX & SETTINGS */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#0a0f10] p-8 rounded-[3rem] text-white shadow-2xl space-y-8 relative overflow-hidden group">
              <Mail size={120} className="absolute -bottom-10 -right-10 opacity-5" />
              <div className="relative z-10">
                 <h3 className="text-xl font-black italic text-[#FFD700]">Skrzynka B2B</h3>
                 <p className="text-slate-400 text-sm font-medium mt-4">Wszystkie zapytania od marek trafiają tutaj. Gemini AI automatycznie weryfikuje wiarygodność agencji.</p>
                 <div className="mt-8 space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-white/10">
                       <div>
                          <p className="text-xs font-black">NordVPN Partnership</p>
                          <p className="text-[10px] text-slate-500">Otrzymano wczoraj</p>
                       </div>
                       <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
                    </div>
                 </div>
                 <button className="w-full mt-6 py-4 bg-[#FFD700] text-[#003737] font-black rounded-2xl text-[10px] uppercase tracking-widest">Otwórz Brand Inbox</button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Globalna Widoczność</h3>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                 <span className="text-xs font-bold text-slate-600">TipJar+ Marketplace</span>
                 <div className="w-10 h-6 bg-emerald-500/20 rounded-full flex items-center justify-end px-1 border border-emerald-500/30"><div className="w-4 h-4 bg-emerald-500 rounded-full" /></div>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">Po włączeniu, Twój profil B2B będzie wyświetlany w wyszukiwarce dla zweryfikowanych marek.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BrandConnectPage;
