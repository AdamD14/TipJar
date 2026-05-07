"use client";


import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  MessageSquare, 
  Zap, 
  UserCircle, 
  ShieldCheck, 
  RefreshCcw,
  Check,
  Brain,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AITrainingPage: React.FC = () => {
  const [personality, setPersonality] = useState('Hype & Energetic');
  const [testPrompt, setTestPrompt] = useState('Dostałem właśnie 50 USDC od CryptoPandy!');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testAIPersonality = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Zachowuj się jak AI asystent streamera o osobowości: ${personality}. Odpowiedz na taką sytuację: "${testPrompt}". Odpowiedź musi być krótka (max 15 słów) i dopasowana do stylu.`,
      });
      setAiResponse(response.text || "Błąd generowania.");
    } catch {
      setAiResponse("Błąd połączenia z Gemini. Sprawdź klucz API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Gemini Brain AI</h1>
          <p className="text-slate-500 font-medium mt-1">Trenuj swoją sztuczną inteligencję, by brzmiała dokładnie tak jak Ty.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20">
           Zapisz Model AI
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* PERSONALITY CONFIG (PDF str. 53) */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
              <h3 className="font-black text-slate-800 italic flex items-center gap-2"><UserCircle size={20} className="text-[#006D6D]" /> Profil Osobowości</h3>
              
              <div className="grid grid-cols-2 gap-3">
                 {['Professional', 'Sarcastic', 'Hype & Energetic', 'Toxic-Safe', 'Mysterious', 'Financial Expert'].map(p => (
                   <button 
                     key={p} 
                     onClick={() => setPersonality(p)}
                     className={`px-4 py-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${personality === p ? 'border-[#006D6D] bg-[#006D6D]/5 text-[#006D6D]' : 'border-slate-50 text-slate-400 hover:border-slate-200'}`}
                   >
                     {p}
                   </button>
                 ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-50">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Własne Instrukcje (System Prompt)</label>
                 <textarea 
                   rows={4}
                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-medium focus:outline-none focus:border-[#006D6D] transition-all"
                   placeholder="np. Zawsze używaj emoji rakiety, zwracaj się do widzów per 'Wataha'..."
                 />
              </div>
           </div>

           <div className="bg-[#0a0f10] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <ShieldCheck size={100} className="absolute -bottom-6 -right-6 opacity-5 group-hover:scale-110 transition-transform" />
              <h4 className="font-black text-lg text-[#FFD700] italic mb-4">Bezpieczeństwo Gemini</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">Twój wytrenowany model jest prywatny. Nigdy nie udostępniamy Twoich danych treningowych innym twórcom ani nie używamy ich do globalnego treningu modeli Gemini.</p>
           </div>
        </div>

        {/* INTERACTIVE PLAYGROUND (PDF str. 54) */}
        <div className="lg:col-span-7 space-y-6">
           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col min-h-[500px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Brain size={120} /></div>
              
              <div className="relative z-10 space-y-8 flex-1 flex flex-col">
                 <h3 className="text-xl font-black text-slate-800 italic">Piaskownica AI (Test Modelu)</h3>
                 
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zasymuluj sytuację na streamie</label>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         value={testPrompt}
                         onChange={(e) => setTestPrompt(e.target.value)}
                         className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-[#006D6D]"
                       />
                       <button 
                         onClick={testAIPersonality}
                         disabled={loading}
                         className="px-6 bg-[#006D6D] text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center min-w-[60px]"
                       >
                         {loading ? <RefreshCcw size={20} className="animate-spin" /> : <Zap size={20} />}
                       </button>
                    </div>
                 </div>

                 <div className="flex-1 bg-[#f8fafc] border border-slate-100 rounded-[2rem] p-8 relative flex flex-col justify-center min-h-[200px]">
                    <div className="absolute top-4 left-4 flex gap-1">
                       <div className="w-2 h-2 rounded-full bg-rose-400" />
                       <div className="w-2 h-2 rounded-full bg-amber-400" />
                       <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[10px] font-black text-slate-300 absolute top-4 right-8 uppercase tracking-widest">Model: Gemini 3 Flash</p>
                    
                    <div className="mt-6">
                       {aiResponse ? (
                         <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                            <p className="text-lg font-black text-slate-800 italic text-center">"{aiResponse}"</p>
                            <div className="flex justify-center gap-4 pt-4">
                               <button className="text-[9px] font-black text-[#006D6D] uppercase tracking-widest flex items-center gap-1 hover:underline"><ThumbsUp size={12} /> Dobre</button>
                               <button className="text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1 hover:underline"><ThumbsDown size={12} /> Do poprawy</button>
                            </div>
                         </div>
                       ) : (
                         <div className="text-center space-y-2 opacity-30">
                           <BrainCircuit size={48} className="mx-auto text-slate-300" />
                           <p className="text-xs font-bold text-slate-400">Wyślij prompt, aby przetestować osobowość AI.</p>
                         </div>
                       )}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AITrainingPage;
