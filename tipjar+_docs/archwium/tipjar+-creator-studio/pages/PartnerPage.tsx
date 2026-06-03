
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
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Program Partnerski</h1>
          <p className="text-slate-500 font-medium mt-1">Zarabiaj 1% od każdego tipa twórców, których polecisz.</p>
        </div>
        <div className="bg-[#FFD700] px-6 py-3 rounded-2xl shadow-xl shadow-[#FFD700]/10 flex items-center gap-3">
           <Gift size={20} className="text-[#003737]" />
           <span className="text-xs font-black text-[#003737] uppercase tracking-widest">Bonus: 50 USDC za 5 poleconych</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* MAIN LINK CARD */}
        <div className="lg:col-span-7 bg-[#003737] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
           <Handshake size={200} className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700" />
           <div className="relative z-10 space-y-8">
              <h3 className="text-2xl font-black italic">Twój unikalny link polecający</h3>
              <p className="text-slate-400 font-medium leading-relaxed max-w-md">Udostępnij ten link innym twórcom. Gdy zarejestrują się i zaczną zarabiać, Ty otrzymasz prowizję od każdej ich transakcji – na zawsze.</p>
              
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-3xl p-2 pl-6">
                 <span className="text-slate-300 font-mono text-sm truncate">{referralLink}</span>
                 <button 
                   onClick={handleCopy}
                   className={`ml-auto px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-[#FFD700] text-[#003737]'}`}
                 >
                   {copied ? <Check size={18} /> : 'Kopiuj'}
                 </button>
              </div>
              
              <div className="pt-8 border-t border-white/5 flex gap-10">
                 <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Kliknięcia</p><p className="text-2xl font-black italic">1,420</p></div>
                 <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Konwersja</p><p className="text-2xl font-black italic">3.2%</p></div>
                 <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Poleceni</p><p className="text-2xl font-black italic">12</p></div>
              </div>
           </div>
        </div>

        {/* REVENUE STATS */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-[#006D6D]"><TrendingUp size={24} /><h3 className="font-black text-lg">Zarobki z poleceń</h3></div>
              <div className="space-y-2">
                 <p className="text-4xl font-black text-slate-900 italic tracking-tighter">452.20 <span className="text-sm opacity-30">USDC</span></p>
                 <p className="text-xs text-emerald-500 font-bold">+24.50 USDC w tym miesiącu</p>
              </div>
              <button className="w-full mt-8 py-4 bg-slate-50 text-slate-500 font-black rounded-2xl text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all">Szczegóły Rozliczeń</button>
           </div>

           <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-slate-400"><Info size={16} /><span className="text-[10px] font-black uppercase tracking-widest">Jak to działa? (PDF str. 29)</span></div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">System automatycznie rozdziela prowizję w protokole blockchain. Twoje środki trafiają bezpośrednio do portfela USDC natychmiast po transakcji poleconego twórcy.</p>
           </div>
        </div>
      </div>

      {/* REFERRALS LIST */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50"><h3 className="font-black text-xl italic text-slate-800">Twoi Partnerzy</h3></div>
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead><tr className="bg-slate-50/50"><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Twórca</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Dołączenia</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Obrót (30 dni)</th><th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Twój Zysk</th></tr></thead>
               <tbody className="divide-y divide-slate-50">
                  {[
                    { name: 'KryptoWariat', date: '12.06.2024', volume: '12,500', profit: '125.00' },
                    { name: 'GamingCenter', date: '15.06.2024', volume: '8,200', profit: '82.00' },
                    { name: 'ArtByMia', date: '20.06.2024', volume: '3,100', profit: '31.00' },
                  ].map((partner, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm"><img src={`https://picsum.photos/seed/${partner.name}/100/100`} alt="" /></div>
                             <span className="text-sm font-black text-slate-800">{partner.name}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-xs text-slate-400 font-bold">{partner.date}</td>
                       <td className="px-8 py-6 text-sm font-bold text-slate-600">{partner.volume} USDC</td>
                       <td className="px-8 py-6 text-right"><span className="text-sm font-black text-emerald-600">+{partner.profit} USDC</span></td>
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
