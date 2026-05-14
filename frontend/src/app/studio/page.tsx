"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ArrowRight, 
  Sparkles,
  MessageSquare,
  Trophy,
  Zap,
  DollarSign,
  Rocket,
  Plus,
  Calendar,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Pn', amount: 120 }, { name: 'Wt', amount: 300 }, { name: 'Śr', amount: 200 },
  { name: 'Cz', amount: 450 }, { name: 'Pt', amount: 600 }, { name: 'So', amount: 850 }, { name: 'Nd', amount: 720 },
];

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>("");
  const [loadingInsight, setLoadingInsight] = useState(false);

  const fetchAIInsight = async () => {
    setLoadingInsight(true);
    await new Promise(r => setTimeout(r, 1200));
    setInsight("Sobotnie streamy przyciągają najwięcej nowych widzów. Startuj o 1h wcześniej!");
    setLoadingInsight(false);
  };

  useEffect(() => { fetchAIInsight(); }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Morning Briefing <span className="text-gold-400">Alex</span></h1>
          <p className="text-teal-50 font-medium mt-1">Status konta na dziś: 24 sierpnia 2025.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-2.5 bg-teal-800 border border-teal-700 rounded-md shadow-sm flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-success-base animate-pulse" />
             <span className="text-[10px] font-black text-teal-100 uppercase tracking-widest">Live Schedule: 18:00</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-purple-300 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
          <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-all ease-standard">
            <ShieldCheck size={120} />
          </div>
          <p className="text-[10px] font-black text-teal-50 uppercase tracking-widest mb-1 italic">SALDO ON-CHAIN (Polygon)</p>
          <h3 className="text-4xl font-bold font-heading italic tracking-tighter">2,990.00 <span className="text-lg opacity-50">USDC</span></h3>
          <p className="text-xs text-teal-50 font-bold mt-4 flex items-center gap-1"><TrendingUp size={14} /> Portfel Zabezpieczony</p>
        </div>

        <div className="bg-teal-800 p-8 rounded-lg text-teal-25 shadow-xl relative overflow-hidden group">
          <Rocket size={80} className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 transition-all ease-standard" />
          <p className="text-[10px] font-black text-teal-100 uppercase tracking-widest mb-1 italic">AUDIENCE GROWTH</p>
          <h3 className="text-4xl font-bold font-heading text-teal-25 italic tracking-tighter">88% <span className="text-lg text-gold-400">Positive</span></h3>
          <p className="text-xs text-teal-50 font-medium mt-4 flex items-center gap-2"><Heart size={14} className="text-error-base" /> Widzowie uwielbiają Twój vibe!</p>
        </div>

        <Link href="/studio/monetization" className="bg-gold-400 p-8 rounded-lg text-teal-900 shadow-xl hover:scale-[1.02] transition-all ease-standard flex flex-col justify-between group">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest mb-1">STRATEGIA (AI)</p>
            <h4 className="text-xl font-bold font-heading italic leading-tight">Zwiększ subskrypcje Silver o 30% jednym kliknięciem!</h4>
          </div>
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest mt-6 underline decoration-2 underline-offset-4">Skaluj teraz <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform ease-standard" /></div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-teal-800 p-8 md:p-10 rounded-lg border border-teal-700 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div><h3 className="text-xl font-bold font-heading text-teal-25 italic tracking-tight">Financial Health</h3><p className="text-xs text-teal-100 uppercase font-black tracking-widest mt-1">Przychod netto w USDC (Blockchain Settlement)</p></div>
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-teal-700 rounded-md text-[10px] font-black uppercase text-gold-400">7 Dni</button>
                 <button className="px-4 py-2 hover:bg-teal-700 rounded-md text-[10px] font-black uppercase text-teal-100 transition-all ease-standard">30 Dni</button>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#004545" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#ABE1E1', fontSize: 11, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#ABE1E1', fontSize: 11, fontWeight: 700}} />
                  <Tooltip cursor={{fill: '#004545'}} contentStyle={{borderRadius: '12px', border: '1px solid #004545', background: '#003737', color: '#E0F2F2', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)'}} />
                  <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={40}>
                    {data.map((_, idx) => <Cell key={idx} fill={idx === 5 ? '#4D194D' : '#007373'} className="hover:opacity-80 transition-opacity cursor-pointer" />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-teal-800 p-8 md:p-10 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-md bg-gold-400 flex items-center justify-center text-teal-900 shadow-lg shadow-gold-400/20">
                  <Sparkles size={20} fill="currentColor" />
                </div>
                <h3 className="font-bold font-heading text-xl italic tracking-tighter">Insight Strategiczny</h3>
              </div>
              <div className="bg-teal-700/50 backdrop-blur-md border border-teal-700 rounded-lg p-6 min-h-[160px] flex flex-col justify-center">
                {loadingInsight ? <div className="space-y-3"><div className="h-3 bg-teal-700 rounded w-full animate-pulse" /><div className="h-3 bg-teal-700 rounded w-4/5 animate-pulse" /></div> : <p className="text-sm font-bold leading-relaxed text-gold-400 italic">"{insight}"</p>}
              </div>
              <button onClick={fetchAIInsight} className="w-full mt-6 py-4 bg-gold-400 text-teal-900 font-bold rounded-md text-xs uppercase tracking-widest hover:scale-[1.02] transition-all ease-standard">Generuj Plan Wzrostu</button>
            </div>
          </div>
          
          <div className="bg-teal-800 p-8 md:p-10 rounded-lg border border-teal-700 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-bold font-heading text-teal-25 italic flex items-center gap-2 tracking-tight"><MessageSquare size={18} className="text-purple-300" /> Web3 Activity</h3>
               <Link href="/studio/wallet" className="text-[10px] font-black text-teal-100 uppercase tracking-widest hover:text-purple-300 transition-colors">Wallet</Link>
            </div>
            <div className="space-y-6">
              {[{ user: 'Marcin_K', amount: 25, time: '2m temu' }, { user: 'CryptoPanda', amount: 100, time: '15m temu' }, { user: 'Fan_88', amount: 50, time: '3h temu' }].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-teal-700 border border-teal-600 flex items-center justify-center font-black text-purple-300 text-xs group-hover:bg-purple-300 group-hover:text-teal-900 transition-all ease-standard italic">{item.user[0]}</div>
                    <div>
                      <p className="text-sm font-bold text-teal-25">{item.user}</p>
                      <p className="text-[10px] text-teal-100 font-bold uppercase tracking-widest">{item.time}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-purple-300 italic">+{item.amount} USDC</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
