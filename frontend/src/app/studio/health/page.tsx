"use client";

import React from 'react';
import { 
  HeartPulse, 
  TrendingDown, 
  TrendingUp, 
  Users, 
  Target, 
  Info,
  ArrowRight,
  Sparkles,
  PieChart as PieChartIcon,
  ShieldCheck
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const CHURN_DATA = [
  { name: 'Retained', value: 88, color: '#006D6D' },
  { name: 'Churned', value: 12, color: '#115e59' },
];

const RevenueHealthPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Zdrowie Biznesu</h1>
          <p className="text-teal-50 font-medium mt-1">Analityka retencji, LTV i stabilności Twoich przychodów.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-8 py-3.5 bg-teal-800 text-teal-25 rounded-md font-bold font-heading text-xs uppercase tracking-widest shadow-xl shadow-teal-800/20 flex items-center gap-2">
              <Sparkles size={18} /> Optymalizuj Ceny (AI)
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* KPI GRID */}
        <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <div className="flex justify-between items-start">
                 <div>
                    <p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">LTV (Lifetime Value)</p>
                    <h3 className="text-4xl font-bold font-heading italic mt-2">142.50 <span className="text-sm opacity-30">USDC</span></h3>
                 </div>
                 <div className="p-3 bg-success-50 rounded-md text-success-600"><TrendingUp size={24} /></div>
              </div>
              <p className="text-xs text-teal-50 font-medium leading-relaxed">Przeciętny fan wpłaca do Twojego studio łącznie 142.50 USDC w trakcie całej swojej subskrypcji.</p>
           </div>

           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <div className="flex justify-between items-start">
                 <div>
                    <p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">Wskaźnik Churn</p>
                    <h3 className="text-4xl font-bold font-heading italic mt-2 text-error-500">4.2%</h3>
                 </div>
                 <div className="p-3 bg-error-50 rounded-md text-error-500"><TrendingDown size={24} /></div>
              </div>
              <p className="text-xs text-teal-50 font-medium leading-relaxed">Procent subskrybentów, którzy rezygnują w skali miesiąca. Twój wynik jest o 2% lepszy niż średnia platformy.</p>
           </div>

           <div className="md:col-span-2 bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm flex flex-col md:flex-row items-center gap-10">
              <div className="w-full md:w-48 h-48">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie data={CHURN_DATA} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                          {CHURN_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                       </Pie>
                       <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-4">
                 <h4 className="font-bold font-heading text-teal-25 text-lg italic">Analiza Lojalności</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-teal-700 rounded-md">
                       <p className="text-[10px] font-bold text-teal-100 uppercase">Fani Powracający</p>
                       <p className="text-xl font-bold text-teal-25">88%</p>
                    </div>
                    <div className="p-4 bg-teal-700 rounded-md">
                       <p className="text-[10px] font-bold text-teal-100 uppercase">Nowi (Q3)</p>
                       <p className="text-xl font-bold text-teal-500">+124</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* HEALTH RECOMMENDATIONS */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
              <ShieldCheck size={100} className="absolute -bottom-6 -right-6 opacity-10" />
              <h3 className="text-xl font-bold font-heading italic text-gold-400 mb-4">Raport Kondycji Biznesu</h3>
              <p className="text-xs text-teal-100 leading-relaxed font-medium">Twój biznes jest sklasyfikowany jako "Highly Stable". Posiadasz zdywersyfikowane źródła przychodu (Napiwki 30%, Subskrypcje 70%).</p>
              <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span>Stabilność</span>
                    <span className="text-success-400">Bardzo Wysoka</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span>Ryzyko Churn</span>
                    <span className="text-success-400">Niskie</span>
                 </div>
              </div>
           </div>

           <button className="w-full p-8 bg-teal-800 rounded-lg border border-teal-700 shadow-sm flex items-center justify-between group hover:border-teal-500 transition-all">
              <div className="text-left">
                 <p className="text-xs font-bold text-teal-100 uppercase tracking-widest">Insight AI</p>
                 <h4 className="font-bold font-heading text-teal-25 mt-1">Utrata subskrybentów Bronze...</h4>
              </div>
              <ArrowRight className="text-teal-100 group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default RevenueHealthPage;
