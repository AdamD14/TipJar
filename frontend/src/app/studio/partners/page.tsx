"use client";

import React, { useState } from 'react';
import { 
  Handshake, 
  Copy, 
  Check, 
  TrendingUp, 
  Users, 
  Gift, 
  ExternalLink,
  ArrowRight,
  Info
} from 'lucide-react';

const PartnerPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "tipjar.plus/join?ref=alex_streamer";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Program Partnerski</h1>
          <p className="text-teal-50 font-medium mt-1">Zarabiaj 1% od każdego tipa twórców, których polecisz.</p>
        </div>
        <div className="bg-gold-400 px-6 py-3 rounded-md shadow-xl shadow-gold-400/10 flex items-center gap-3">
           <Gift size={20} className="text-teal-900" />
           <span className="text-xs font-bold font-heading text-teal-900 uppercase tracking-widest">Bonus: 50 USDC za 5 poleconych</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* MAIN LINK CARD */}
        <div className="lg:col-span-7 bg-teal-800 p-10 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
           <Handshake size={200} className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700" />
           <div className="relative z-10 space-y-8">
              <h3 className="text-2xl font-bold font-heading italic">Twój unikalny link polecający</h3>
              <p className="text-teal-100 font-medium leading-relaxed max-w-md">Udostępnij ten link innym twórcom. Gdy zarejestrują się i zaczną zarabiać, Ty otrzymasz prowizję od każdej ich transakcji – na zawsze.</p>
              
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-md p-2 pl-6">
                 <span className="text-teal-100 font-mono text-sm truncate">{referralLink}</span>
                 <button 
                   onClick={handleCopy}
                   className={`ml-auto px-8 py-4 rounded-md font-bold font-heading text-xs uppercase tracking-widest transition-all ${copied ? 'bg-success-base text-teal-25' : 'bg-gold-400 text-teal-900'}`}
                 >
                   {copied ? <Check size={18} /> : 'Kopiuj'}
                 </button>
              </div>
              
              <div className="pt-8 border-t border-white/5 flex gap-10">
                 <div><p className="text-[10px] font-bold text-teal-50 uppercase tracking-widest">Kliknięcia</p><p className="text-2xl font-bold font-heading italic">1,420</p></div>
                 <div><p className="text-[10px] font-bold text-teal-50 uppercase tracking-widest">Konwersja</p><p className="text-2xl font-bold font-heading italic">3.2%</p></div>
                 <div><p className="text-[10px] font-bold text-teal-50 uppercase tracking-widest">Poleceni</p><p className="text-2xl font-bold font-heading italic">12</p></div>
              </div>
           </div>
        </div>

        {/* REVENUE STATS */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-teal-500"><TrendingUp size={24} /><h3 className="font-bold font-heading text-lg">Zarobki z poleceń</h3></div>
              <div className="space-y-2">
                 <p className="text-4xl font-bold font-heading text-teal-25 italic tracking-tighter">452.20 <span className="text-sm opacity-30">USDC</span></p>
                 <p className="text-xs text-success-500 font-bold">+24.50 USDC w tym miesiącu</p>
              </div>
              <button className="w-full mt-8 py-4 bg-teal-700 text-teal-50 font-bold font-heading rounded-md text-[10px] uppercase tracking-widest border border-teal-700 hover:bg-teal-600 transition-all">Szczegóły Rozliczeń</button>
           </div>

           <div className="bg-teal-700 p-8 rounded-lg border border-teal-700 space-y-4">
              <div className="flex items-center gap-2 text-teal-100"><Info size={16} /><span className="text-[10px] font-bold uppercase tracking-widest">Jak to działa? (PDF str. 29)</span></div>
              <p className="text-xs text-teal-50 font-medium leading-relaxed">System automatycznie rozdziela prowizję w protokole blockchain. Twoje środki trafiają bezpośrednio do portfela USDC natychmiast po transakcji poleconego twórcy.</p>
           </div>
        </div>
      </div>

      {/* REFERRALS LIST */}
      <div className="bg-teal-800 rounded-lg border border-teal-700 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-teal-700"><h3 className="font-bold font-heading text-xl italic text-teal-25">Twoi Partnerzy</h3></div>
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead><tr className="bg-teal-700"><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Twórca</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Data Dołączenia</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Obrót (30 dni)</th><th className="px-8 py-5 text-right text-[10px] font-bold text-teal-100 uppercase tracking-widest">Twój Zysk</th></tr></thead>
               <tbody className="divide-y divide-teal-700">
                  {[
                    { name: 'KryptoWariat', date: '12.06.2024', volume: '12,500', profit: '125.00' },
                    { name: 'GamingCenter', date: '15.06.2024', volume: '8,200', profit: '82.00' },
                    { name: 'ArtByMia', date: '20.06.2024', volume: '3,100', profit: '31.00' },
                  ].map((partner, i) => (
                    <tr key={i} className="group hover:bg-teal-700/50 transition-colors">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-md bg-teal-700 border border-teal-700 overflow-hidden shadow-sm"><img src={`https://picsum.photos/seed/${partner.name}/100/100`} alt="" /></div>
                             <span className="text-sm font-bold text-teal-25">{partner.name}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-xs text-teal-100 font-bold">{partner.date}</td>
                       <td className="px-8 py-6 text-sm font-bold text-teal-50">{partner.volume} USDC</td>
                       <td className="px-8 py-6 text-right"><span className="text-sm font-bold text-success-600">+{partner.profit} USDC</span></td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default PartnerPage;
