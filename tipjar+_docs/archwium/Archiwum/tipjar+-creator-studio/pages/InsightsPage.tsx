
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
  { name: 'Direct Link', value: 30, color: '#006D6D' },
  { name: 'X / Twitter', value: 15, color: '#000000' },
  { name: 'Inne', value: 10, color: '#f1f5f9' },
];

const InsightsPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Analityka Studio</h1>
          <p className="text-slate-500 font-medium mt-1">Dostarczamy dane, Ty podejmujesz decyzje.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-xs text-slate-600 hover:bg-slate-50 transition-all">
           <Calendar size={18} /> Ostatnie 30 dni
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-slate-800 text-lg italic">Napiwki vs Subskrypcje (USDC)</h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-[#006D6D]" /> Subskrypcje</div>
                 <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-[#FFD700]" /> Napiwki</div>
              </div>
           </div>
           <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#006D6D" stopOpacity={0.1}/><stop offset="95%" stopColor="#006D6D" stopOpacity={0}/></linearGradient>
                    <linearGradient id="colorTips" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#FFD700" stopOpacity={0.1}/><stop offset="95%" stopColor="#FFD700" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="subs" stroke="#006D6D" strokeWidth={3} fillOpacity={1} fill="url(#colorSubs)" />
                  <Area type="monotone" dataKey="tips" stroke="#FFD700" strokeWidth={3} fillOpacity={1} fill="url(#colorTips)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* SOURCE ATTRIBUTION (PDF str. 31) */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col">
           <div className="flex items-center gap-3 mb-8 text-[#006D6D]"><Share2 size={24} /><h3 className="font-black text-lg italic uppercase">Źródła Wpłat</h3></div>
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
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '15px', border: 'none'}} />
                </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-6 space-y-3">
              {sourceData.map((entry, i) => (
                <div key={i} className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                   <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{backgroundColor: entry.color}} /> {entry.name}</div>
                   <span className="text-slate-800">{entry.value}%</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600"><Users size={32} /></div>
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Średnia Retencja</p><h4 className="text-2xl font-black italic">4.2 msc</h4><p className="text-xs text-emerald-500 font-bold">+0.5 msc</p></div>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#0a0f10] flex items-center justify-center text-[#FFD700]"><Clock size={32} /></div>
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Najlepszy Dzień</p><h4 className="text-2xl font-black italic">Sobota</h4><p className="text-xs text-slate-500 font-bold">18:00 - 22:00</p></div>
         </div>
         <div className="bg-[#003737] p-8 rounded-[2.5rem] text-white flex items-center justify-between group cursor-pointer hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-6"><div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[#FFD700]"><TrendingUp size={32} /></div><div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Strategii</p><h4 className="text-xl font-black italic">Profit Maximizer ON</h4></div></div>
            <ArrowRight size={24} className="text-[#FFD700] group-hover:translate-x-2 transition-transform" />
         </div>
      </div>
    </div>
  );
};

export default InsightsPage;
