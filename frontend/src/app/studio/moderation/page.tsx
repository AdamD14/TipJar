"use client";


import React, { useState } from 'react';
import { 
  ShieldAlert, 
  UserMinus, 
  MessageSquareOff, 
  Brain, 
  Settings2, 
  Save,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Search
} from 'lucide-react';

const ModerationPage: React.FC = () => {
  const [aiModeration, setAiModeration] = useState(true);
  const [bannedWords, setBannedWords] = useState("spam, scam, crypto-doubler, buy-follows");

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Moderacja & Bezpieczeństwo</h1>
          <p className="text-slate-500 font-medium mt-1">Chroń swój stream przed toksycznymi treściami i oszustwami.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20">
           <Save size={18} /> Zapisz Reguły
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* AI MODERATION CONFIG (PDF str. 45) */}
        <div className="lg:col-span-7 bg-[#0a0f10] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
           <Brain size={180} className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
           <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-[#FFD700] flex items-center justify-center text-[#003737]"><Brain size={24} /></div>
                 <div>
                    <h3 className="text-2xl font-black italic">Gemini AI Moderation</h3>
                    <p className="text-slate-400 text-sm font-medium">Automatyczne skanowanie wiadomości w czasie rzeczywistym.</p>
                 </div>
              </div>
              
              <div className="space-y-6">
                 <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10">
                    <div>
                       <p className="text-sm font-black italic">Wykrywanie Mowy Nienawiści</p>
                       <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Blokuje agresywne i obraźliwe treści.</p>
                    </div>
                    <button onClick={() => setAiModeration(!aiModeration)} className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${aiModeration ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'}`}><div className="w-6 h-6 bg-white rounded-full shadow-md" /></button>
                 </div>
                 
                 <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10">
                    <div>
                       <p className="text-sm font-black italic">Wykrywanie Spamu / Linków</p>
                       <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Blokuje boty i linki do phishingu.</p>
                    </div>
                    <button className="w-14 h-8 bg-emerald-500 rounded-full flex items-center justify-end px-1 transition-all"><div className="w-6 h-6 bg-white rounded-full shadow-md" /></button>
                 </div>
              </div>

              <div className="p-6 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-3xl">
                 <p className="text-xs text-[#FFD700] font-bold leading-relaxed">
                   <AlertTriangle size={14} className="inline mr-2 mb-1" />
                   AI automatycznie ukrywa wiadomości o wysokim stopniu toksyczności. Możesz je przejrzeć w logach moderacji.
                 </p>
              </div>
           </div>
        </div>

        {/* BLACKLISTS (PDF str. 44) */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-slate-900"><MessageSquareOff size={22} className="text-rose-500" /><h3 className="font-black text-lg italic">Zakazane Słowa</h3></div>
              <textarea 
                value={bannedWords}
                onChange={(e) => setBannedWords(e.target.value)}
                className="w-full h-32 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-bold text-slate-600 focus:outline-none focus:border-rose-500 transition-all resize-none"
                placeholder="Wpisz słowa oddzielone przecinkami..."
              />
              <p className="text-[10px] text-slate-400 font-bold">Wiadomości zawierające te słowa nie pojawią się na Twoim OBS Overlay.</p>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-slate-900"><UserMinus size={22} className="text-slate-400" /><h3 className="font-black text-lg italic">Zablokowane Portfele</h3></div>
              <div className="relative">
                 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                 <input type="text" placeholder="Dodaj adres portfela (0x...)" className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 text-xs font-bold focus:outline-none focus:border-[#006D6D]" />
              </div>
              <div className="space-y-2">
                 {['0x82...a2b1', '0x12...f9e4'].map((addr, i) => (
                   <div key={i} className="flex justify-between items-center p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                      <code className="text-[10px] font-mono font-black text-slate-500">{addr}</code>
                      <button className="text-rose-500 text-[10px] font-black uppercase tracking-widest">Odblokuj</button>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ModerationPage;
