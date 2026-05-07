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
import { GoogleGenAI } from "@google/genai";
import { COLORS } from '@/lib/constants/studio';

const data = [
  { name: 'Pn', amount: 120 }, { name: 'Wt', amount: 300 }, { name: 'Śr', amount: 200 },
  { name: 'Cz', amount: 450 }, { name: 'Pt', amount: 600 }, { name: 'So', amount: 850 }, { name: 'Nd', amount: 720 },
];

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>("");
  const [loadingInsight, setLoadingInsight] = useState(false);

  const fetchAIInsight = async () => {
    setLoadingInsight(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Jako trener finansowy dla twórców, przeanalizuj trend: 'Sobotnie zarobki są o 40% wyższe'. Podaj 1 krótkie, konkretne działanie.",
      });
      setInsight(response.text || "Twoje sobotnie streamy zarabiają najwięcej. Dodaj specjalny cel 'Weekendowy Boost'!");
    } catch {
      setInsight("Sobotnie streamy przyciągają najwięcej nowych widzów. Startuj o 1h wcześniej!");
    } finally {
      setLoadingInsight(false);
    }
  };

  useEffect(() => { fetchAIInsight(); }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Morning Briefing <span className="text-[#003737]">Alex</span></h1>
          <p className="text-slate-500 font-medium mt-1">Status konta na dziś: 24 sierpnia 2025.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-2.5 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-[#006D6D] animate-pulse" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Schedule: 18:00</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Web3 Card - Purple */}
        <div className="bg-[#4D194D] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform">
            <ShieldCheck size={120} />
          </div>
          <p className="text-[10px] font-black text-purple-200 uppercase tracking-widest mb-1 italic">SALDO ON-CHAIN (Polygon)</p>
          <h3 className="text-4xl font-black italic tracking-tighter">2,990.00 <span className="text-lg opacity-50">USDC</span></h3>
          <p className="text-xs text-purple-200 font-bold mt-4 flex items-center gap-1"><TrendingUp size={14} /> Portfel Zabezpieczony</p>
        </div>

        {/* Regular UI Card - Teal Base */}
        <div className="bg-[#003737] p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
          <Rocket size={80} className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 transition-transform" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">AUDIENCE GROWTH</p>
          <h3 className="text-4xl font-black text-white italic tracking-tighter">88% <span className="text-lg text-[#FFD700]">Positive</span></h3>
          <p className="text-xs text-slate-300 font-medium mt-4 flex items-center gap-2"><Heart size={14} className="text-rose-500 fill-rose-500" /> Widzowie uwielbiają Twój vibe!</p>
        </div>

        {/* Action Card - Gold */}
        <Link href="/monetization" className="bg-[#FFD700] p-8 rounded-[3rem] text-[#003737] shadow-xl hover:scale-[1.02] transition-all flex flex-col justify-between group">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest mb-1">STRATEGIA (AI)</p>
            <h4 className="text-xl font-black italic leading-tight">Zwiększ subskrypcje Silver o 30% jednym kliknięciem!</h4>
          </div>
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest mt-6 underline decoration-2 underline-offset-4">Skaluj teraz <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div><h3 className="text-xl font-black text-slate-800 italic tracking-tight">Financial Health</h3><p className="text-xs text-slate-400 uppercase font-black tracking-widest mt-1">Przychod netto w USDC (Blockchain Settlement)</p></div>
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-[#003737] rounded-xl text-[10px] font-black uppercase text-[#FFD700]">7 Dni</button>
                 <button className="px-4 py-2 hover:bg-slate-50 rounded-xl text-[10px] font-black uppercase text-slate-300 transition-all">30 Dni</button>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="amount" radius={[12, 12, 12, 12]} barSize={40}>
                    {data.map((_, idx) => <Cell key={idx} fill={idx === 5 ? '#4D194D' : '#e2e8f0'} className="hover:opacity-80 transition-opacity cursor-pointer" />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* AI Strategy - Gold & Dark Teal */}
          <div className="bg-[#003737] p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FFD700] flex items-center justify-center text-[#003737] shadow-lg shadow-[#FFD700]/20">
                  <Sparkles size={20} fill="currentColor" />
                </div>
                <h3 className="font-black text-xl italic tracking-tighter">Insight Strategiczny</h3>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 min-h-[160px] flex flex-col justify-center">
                {loadingInsight ? <div className="space-y-3"><div className="h-3 bg-white/10 rounded w-full animate-pulse" /><div className="h-3 bg-white/10 rounded w-4/5 animate-pulse" /></div> : <p className="text-sm font-bold leading-relaxed text-[#FFD700] italic">"{insight}"</p>}
              </div>
              <button onClick={fetchAIInsight} className="w-full mt-6 py-4 bg-[#FFD700] text-[#003737] font-black rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] transition-all">Generuj Plan Wzrostu</button>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black text-slate-800 italic flex items-center gap-2 tracking-tight"><MessageSquare size={18} className="text-[#4D194D]" /> Web3 Activity</h3>
               <Link href="/wallet" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#4D194D]">Wallet</Link>
            </div>
            <div className="space-y-6">
              {[{ user: 'Marcin_K', amount: 25, time: '2m temu' }, { user: 'CryptoPanda', amount: 100, time: '15m temu' }, { user: 'Fan_88', amount: 50, time: '3h temu' }].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-[#4D194D] text-xs group-hover:bg-[#4D194D] group-hover:text-white transition-all italic">{item.user[0]}</div>
                    <div>
                      <p className="text-sm font-black text-slate-800">{item.user}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.time}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-[#4D194D] italic">+{item.amount} USDC</span>
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
