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
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Moderacja & Bezpieczeństwo</h1>
          <p className="text-teal-50 font-medium mt-1">Chroń swój stream przed toksycznymi treściami i oszustwami.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-teal-600 text-teal-25 rounded-md font-bold font-heading text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20">
           <Save size={18} /> Zapisz Reguły
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* AI MODERATION CONFIG (PDF str. 45) */}
        <div className="lg:col-span-7 bg-teal-850 p-10 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
           <Brain size={180} className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
           <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-md bg-gold-400 flex items-center justify-center text-teal-900"><Brain size={24} /></div>
                 <div>
                    <h3 className="text-2xl font-bold font-heading italic">Gemini AI Moderation</h3>
                    <p className="text-teal-100 text-sm font-medium">Automatyczne skanowanie wiadomości w czasie rzeczywistym.</p>
                 </div>
              </div>
              
              <div className="space-y-6">
                 <div className="flex items-center justify-between p-6 bg-white/5 rounded-md border border-white/10">
                    <div>
                       <p className="text-sm font-bold font-heading italic">Wykrywanie Mowy Nienawiści</p>
                       <p className="text-[10px] text-teal-50 font-bold uppercase mt-1">Blokuje agresywne i obraźliwe treści.</p>
                    </div>
                    <button onClick={() => setAiModeration(!aiModeration)} className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${aiModeration ? 'bg-success-base justify-end' : 'bg-teal-700 justify-start'}`}><div className="w-6 h-6 bg-white rounded-full shadow-md" /></button>
                 </div>
                 
                 <div className="flex items-center justify-between p-6 bg-white/5 rounded-md border border-white/10">
                    <div>
                       <p className="text-sm font-bold font-heading italic">Wykrywanie Spamu / Linków</p>
                       <p className="text-[10px] text-teal-50 font-bold uppercase mt-1">Blokuje boty i linki do phishingu.</p>
                    </div>
                    <button className="w-14 h-8 bg-success-base rounded-full flex items-center justify-end px-1 transition-all"><div className="w-6 h-6 bg-white rounded-full shadow-md" /></button>
                 </div>
              </div>

              <div className="p-6 bg-gold-400/10 border border-gold-400/20 rounded-md">
                 <p className="text-xs text-gold-400 font-bold leading-relaxed">
                   <AlertTriangle size={14} className="inline mr-2 mb-1" />
                   AI automatycznie ukrywa wiadomości o wysokim stopniu toksyczności. Możesz je przejrzeć w logach moderacji.
                 </p>
              </div>
           </div>
        </div>

        {/* BLACKLISTS (PDF str. 44) */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-teal-25"><MessageSquareOff size={22} className="text-error-500" /><h3 className="font-bold font-heading text-lg italic">Zakazane Słowa</h3></div>
              <textarea 
                value={bannedWords}
                onChange={(e) => setBannedWords(e.target.value)}
                className="w-full h-32 bg-teal-700 border border-teal-700 rounded-md p-4 text-xs font-bold text-teal-50 focus:outline-none focus:border-error-500 transition-all resize-none"
                placeholder="Wpisz słowa oddzielone przecinkami..."
              />
              <p className="text-[10px] text-teal-100 font-bold">Wiadomości zawierające te słowa nie pojawią się na Twoim OBS Overlay.</p>
           </div>

           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-teal-25"><UserMinus size={22} className="text-teal-100" /><h3 className="font-bold font-heading text-lg italic">Zablokowane Portfele</h3></div>
              <div className="relative">
                 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-100" />
                 <input type="text" placeholder="Dodaj adres portfela (0x...)" className="w-full bg-teal-700 border border-teal-700 rounded-md pl-12 pr-4 py-3 text-xs font-bold focus:outline-none focus:border-teal-500" />
              </div>
              <div className="space-y-2">
                 {['0x82...a2b1', '0x12...f9e4'].map((addr, i) => (
                   <div key={i} className="flex justify-between items-center p-3 bg-teal-700/50 rounded-md border border-teal-700">
                      <code className="text-[10px] font-mono font-bold text-teal-50">{addr}</code>
                      <button className="text-error-500 text-[10px] font-bold uppercase tracking-widest">Odblokuj</button>
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
