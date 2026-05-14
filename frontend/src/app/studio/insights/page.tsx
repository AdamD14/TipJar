"use client";

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  AreaChart, Area, PieChart, Pie
} from 'recharts';
import { TrendingUp, Clock, Users, Target, Info, Calendar, ArrowRight, Share2 } from 'lucide-react';

const revenueData = [
  { month: 'Sty', tips: 400, subs: 1200 },
  { month: 'Lut', tips: 600, subs: 1300 },
  { month: 'Mar', tips: 800, subs: 1800 },
  { month: 'Kwi', tips: 700, subs: 2400 },
  { month: 'Maj', tips: 1200, subs: 3200 },
];

const peakTimeData = [
  { hour: '18:00', amount: 120 }, { hour: '19:00', amount: 250 },
  { hour: '20:00', amount: 800 }, { hour: '21:00', amount: 650 },
  { hour: '22:00', amount: 400 }, { hour: '23:00', amount: 150 },
];

const sourceData = [
  { name: 'Twitch OBS', value: 45, color: '#9146FF' },
  { name: 'Direct Link', value: 30, color: '#007373' },
  { name: 'X / Twitter', value: 15, color: '#000000' },
  { name: 'Inne', value: 10, color: '#004545' },
];

const InsightsPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">Analityka Studio</h1>
          <p className="text-teal-50 font-medium mt-1">Dostarczamy dane, Ty podejmujesz decyzje.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-teal-800 border border-teal-700 rounded-md font-bold text-xs text-teal-50 hover:bg-teal-700 transition-all font-heading">
           <Calendar size={18} /> Ostatnie 30 dni
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-teal-25 text-lg italic font-heading">Napiwki vs Subskrypcje (USDC)</h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-xs font-bold text-teal-100"><div className="w-2 h-2 rounded-full bg-teal-500" /> Subskrypcje</div>
                 <div className="flex items-center gap-2 text-xs font-bold text-teal-100"><div className="w-2 h-2 rounded-full bg-gold-400" /> Napiwki</div>
              </div>
           </div>
           <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#007373" stopOpacity={0.1}/><stop offset="95%" stopColor="#007373" stopOpacity={0}/></linearGradient>
                    <linearGradient id="colorTips" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#FFD700" stopOpacity={0.1}/><stop offset="95%" stopColor="#FFD700" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#004545" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="subs" stroke="#007373" strokeWidth={3} fillOpacity={1} fill="url(#colorSubs)" />
                  <Area type="monotone" dataKey="tips" stroke="#FFD700" strokeWidth={3} fillOpacity={1} fill="url(#colorTips)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* SOURCE ATTRIBUTION (PDF str. 31) */}
        <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm flex flex-col">
           <div className="flex items-center gap-3 mb-8 text-teal-500"><Share2 size={24} /><h3 className="font-bold text-lg italic uppercase font-heading">Źródła Wpłat</h3></div>
           <div className="h-64 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {sourceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={sourceData[index].color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none'}} />
                </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-6 space-y-3">
              {sourceData.map((entry, i) => (
                <div key={i} className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-teal-100 font-heading">
                   <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{backgroundColor: entry.color}} /> {entry.name}</div>
                   <span className="text-teal-25">{entry.value}%</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
         <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 rounded-md bg-success-dark flex items-center justify-center text-success-base"><Users size={32} /></div>
            <div><p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest font-heading">Średnia Retencja</p><h4 className="text-2xl font-bold italic font-heading">4.2 msc</h4><p className="text-xs text-success-base font-bold">+0.5 msc</p></div>
         </div>
         <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 rounded-md bg-teal-850 flex items-center justify-center text-gold-400"><Clock size={32} /></div>
            <div><p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest font-heading">Najlepszy Dzień</p><h4 className="text-2xl font-bold italic font-heading">Sobota</h4><p className="text-xs text-teal-50 font-bold">18:00 - 22:00</p></div>
         </div>
         <div className="bg-teal-800 p-8 rounded-lg text-teal-25 flex items-center justify-between group cursor-pointer hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-6"><div className="w-16 h-16 rounded-md bg-white/10 flex items-center justify-center text-gold-400"><TrendingUp size={32} /></div><div><p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest font-heading">Status Strategii</p><h4 className="text-xl font-bold italic font-heading">Profit Maximizer ON</h4></div></div>
            <ArrowRight size={24} className="text-gold-400 group-hover:translate-x-2 transition-transform" />
         </div>
      </div>
    </div>
  );
};

export default InsightsPage;
