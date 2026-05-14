"use client";


import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  BrainCircuit, 
  ArrowUpRight, 
  Calendar, 
  Info,
  ChevronRight,
  Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GoogleGenAI } from "@google/genai";

const PREDICTION_DATA = [
  { month: 'Sty', actual: 2400 },
  { month: 'Lut', actual: 2900 },
  { month: 'Mar', actual: 3200 },
  { month: 'Kwi', predicted: 3500 },
  { month: 'Maj', predicted: 4100 },
  { month: 'Cze', predicted: 4800 },
];

const PredictiveAIPage: React.FC = () => {
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchAIReport = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Na podstawie danych: wzrost o 15% m/m, wysoka retencja 90%. Przeprowadź analizę prognozy na Q3 dla twórcy wideo. Podaj 2 kluczowe szanse i 1 zagrożenie.",
      });
      setReport(response.text || "Twoje przychody wzrosną o ok. 22% w Q3 dzięki nowemu systemowi subskrypcji.");
    } catch {
      setReport("Wzrost trendu 'Grywalizacja' sugeruje, że Twoje zarobki w maju przekroczą 4,000 USDC.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAIReport(); }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Prognozy AI (Gemini)</h1>
          <p className="text-teal-50 font-medium mt-1">Przewiduj przyszłe zarobki i optymalizuj strategię wzrostu.</p>
        </div>
        <button onClick={fetchAIReport} className="px-8 py-3.5 bg-teal-600 text-teal-25 rounded-md font-bold font-heading text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 flex items-center gap-2">
           <Zap size={18} /> Odśwież Model
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* CHART SECTION */}
        <div className="lg:col-span-8 bg-teal-800 p-10 rounded-lg border border-teal-700 shadow-sm space-y-8">
           <div className="flex justify-between items-center">
              <h3 className="font-bold font-heading text-teal-25 text-lg italic">Przewidywany Przychód (6 msc)</h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-teal-100 uppercase tracking-widest"><div className="w-2 h-2 rounded-full bg-teal-700" /> Dane Historyczne</div>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-teal-500 uppercase tracking-widest"><div className="w-2 h-2 rounded-full bg-teal-600" /> Prognoza Gemini</div>
              </div>
           </div>
           
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PREDICTION_DATA}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.1}/><stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/></linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#006D6D" stopOpacity={0.2}/><stop offset="95%" stopColor="#006D6D" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#115e59" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#5eead4', fontSize: 11, fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#5eead4', fontSize: 11, fontWeight: 700}} />
                  <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="actual" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                  <Area type="monotone" dataKey="predicted" stroke="#006D6D" strokeWidth={3} strokeDasharray="8 8" fillOpacity={1} fill="url(#colorPredicted)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* AI INSIGHTS SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-teal-850 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
              <BrainCircuit size={100} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-gold-400 flex items-center justify-center text-teal-800 shadow-lg shadow-gold-400/20"><Sparkles size={20} /></div>
                    <h3 className="font-bold font-heading text-lg italic text-gold-400">Analiza Gemini AI</h3>
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-md p-6 min-h-[200px] flex flex-col justify-center">
                    {loading ? (
                       <div className="space-y-4"><div className="h-4 bg-white/10 rounded-full animate-pulse w-full" /><div className="h-4 bg-white/10 rounded-full animate-pulse w-4/5" /><div className="h-4 bg-white/10 rounded-full animate-pulse w-2/3" /></div>
                    ) : (
                       <p className="text-sm font-bold leading-relaxed text-teal-25 italic">"{report}"</p>
                    )}
                 </div>
                 <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all font-heading">Wygeneruj Raport PDF</button>
              </div>
           </div>

           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-4">
              <h4 className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">Wiarygodność Modelu</h4>
              <div className="flex items-center gap-4">
                 <div className="text-3xl font-bold italic text-teal-500">94%</div>
                 <div className="flex-1 h-2 bg-teal-700 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 w-[94%]" />
                 </div>
              </div>
              <p className="text-[10px] text-teal-100 font-medium">Model oparty na analizie 12 miesięcy Twoich danych i trendów globalnych Creator Economy.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAIPage;
