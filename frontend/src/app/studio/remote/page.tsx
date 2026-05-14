"use client";


import React, { useState, useEffect } from 'react';
import { 
  SmartphoneNfc, 
  Zap, 
  ShieldAlert, 
  RotateCcw, 
  MessageSquare, 
  Tv, 
  Volume2, 
  Play,
  Settings,
  BrainCircuit,
  ArrowRight,
  Hand
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const MobileControlPage: React.FC = () => {
  const [lastTip, setLastTip] = useState({ user: 'CryptoPanda', amount: 50 });
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuickStrategy = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Użytkownik ${lastTip.user} właśnie wpłacił ${lastTip.amount} USDC. Podaj jedną, błyskotliwą, 5-wyrazową reakcję dla streamera, aby zachęcić innych do wpłat.`,
      });
      setAiSuggestion(response.text || "Dzięki Panda! Kto przebije 50?");
    } catch {
      setAiSuggestion("Gigantyczny tip! Lecimy dalej!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuickStrategy(); }, []);

  return (
    <div className="max-w-md mx-auto space-y-8 animate-in fade-in zoom-in duration-500 pb-24 md:pb-10">
      {/* PHONE FRAME SIMULATION */}
      <div className="bg-teal-850 rounded-lg border-[10px] border-[#1a1f20] shadow-2xl p-6 min-h-[700px] flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1f20] rounded-b-3xl z-20" />
        
        <header className="pt-8 pb-6 flex justify-between items-center relative z-10">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-teal-25"><SmartphoneNfc size={18} /></div>
              <h2 className="font-bold font-heading text-teal-25 italic">Remote+</h2>
           </div>
           <Settings size={20} className="text-teal-50" />
        </header>

        <div className="flex-1 space-y-6 relative z-10">
          {/* PANIC BUTTON (PDF str. 52) */}
          <button className="w-full bg-rose-600 active:bg-rose-700 p-8 rounded-lg flex flex-col items-center justify-center gap-2 shadow-xl shadow-rose-900/20 group transition-all active:scale-95 font-heading">
             <ShieldAlert size={48} className="text-teal-25 group-active:animate-ping" />
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-100">Panic Button</span>
             <p className="text-[10px] text-rose-300 font-bold">Czyści wszystkie alerty</p>
          </button>

          <div className="grid grid-cols-2 gap-4">
             <button className="bg-teal-800/50 border border-white/5 p-6 rounded-lg flex flex-col items-center gap-3 active:scale-95 transition-all font-heading">
                <RotateCcw size={24} className="text-gold-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-100">Replay Alert</span>
             </button>
             <button className="bg-teal-800/50 border border-white/5 p-6 rounded-lg flex flex-col items-center gap-3 active:scale-95 transition-all font-heading">
                <Volume2 size={24} className="text-teal-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-100">Mute Audio</span>
             </button>
          </div>

          {/* AI QUICK RESPONSE (PDF str. 51) */}
          <div className="bg-teal-800 p-6 rounded-lg border border-white/5 space-y-4">
             <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold text-success-400 uppercase tracking-widest flex items-center gap-2"><BrainCircuit size={12} /> Gemini Quick-Reply</p>
                <button onClick={fetchQuickStrategy} className="text-teal-50 hover:text-teal-25 transition-colors"><RotateCcw size={12} /></button>
             </div>
             <div className="min-h-[60px] flex flex-col justify-center">
                {loading ? (
                   <div className="h-4 bg-white/5 rounded w-full animate-pulse" />
                ) : (
                   <p className="text-sm font-bold text-teal-25 italic leading-relaxed">"{aiSuggestion}"</p>
                )}
             </div>
             <button className="w-full py-3 bg-white/10 rounded-md text-[9px] font-bold uppercase tracking-widest text-teal-25 flex items-center justify-center gap-2 hover:bg-white/20 transition-all font-heading">
                Kopiuj do schowka <ArrowRight size={12} />
             </button>
          </div>

          {/* MANUAL TRIGGER */}
          <div className="space-y-4">
             <p className="text-[10px] font-bold text-teal-50 uppercase tracking-widest px-2">Ręczne Wyzwalanie</p>
             <div className="space-y-2">
                {['Sub Alert', 'Goal Update', 'Special Drop'].map(label => (
                  <button key={label} className="w-full bg-white/5 p-4 rounded-md flex items-center justify-between border border-white/5 active:bg-white/10 transition-all font-heading">
                     <span className="text-xs font-bold text-teal-100">{label}</span>
                     <Play size={14} className="text-success-500" />
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 flex justify-center items-center gap-8 relative z-10">
           <div className="flex flex-col items-center gap-1 opacity-50"><Tv size={20} className="text-teal-100" /><span className="text-[8px] font-bold uppercase">Studio</span></div>
           <div className="flex flex-col items-center gap-1"><Zap size={24} className="text-gold-400" /><span className="text-[8px] font-bold uppercase text-gold-400">Live</span></div>
           <div className="flex flex-col items-center gap-1 opacity-50"><MessageSquare size={20} className="text-teal-100" /><span className="text-[8px] font-bold uppercase">Chat</span></div>
        </div>

        {/* GLOW DECOR */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-600/20 rounded-full blur-[80px] pointer-events-none" />
      </div>

      <div className="text-center space-y-2 px-6">
         <p className="text-xs font-bold text-teal-100">To jest symulacja panelu Remote Control.</p>
         <p className="text-[10px] text-teal-100 italic">Pobierz aplikację mobilną TipJar+ ze sklepu, aby sterować streamem z dowolnego miejsca.</p>
      </div>
    </div>
  );
};

export default MobileControlPage;
