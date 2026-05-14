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
          <h1 className="font-heading text-4xl font-bold text-teal-25 tracking-tight italic">Gemini Brain AI</h1>
          <p className="text-teal-50 font-medium mt-1">Trenuj swoją sztuczną inteligencję, by brzmiała dokładnie tak jak Ty.</p>
        </div>
        <button className="font-heading flex items-center gap-2 px-8 py-3 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20">
           Zapisz Model AI
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* PERSONALITY CONFIG (PDF str. 53) */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-8">
              <h3 className="font-heading font-bold text-teal-25 italic flex items-center gap-2"><UserCircle size={20} className="text-teal-500" /> Profil Osobowości</h3>
              
              <div className="grid grid-cols-2 gap-3">
                 {['Professional', 'Sarcastic', 'Hype & Energetic', 'Toxic-Safe', 'Mysterious', 'Financial Expert'].map(p => (
                   <button 
                     key={p} 
                     onClick={() => setPersonality(p)}
                     className={`px-4 py-3 rounded-md border-2 text-[10px] font-bold uppercase tracking-widest transition-all ${personality === p ? 'border-teal-500 bg-teal-600/5 text-teal-500' : 'border-teal-700 text-teal-100 hover:border-teal-500'}`}
                   >
                     {p}
                   </button>
                 ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-teal-700">
                 <label className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">Własne Instrukcje (System Prompt)</label>
                 <textarea 
                   rows={4}
                   className="w-full bg-teal-700 border border-teal-700 rounded-md p-4 text-xs font-medium focus:outline-none focus:border-teal-500 transition-all"
                   placeholder="np. Zawsze używaj emoji rakiety, zwracaj się do widzów per 'Wataha'..."
                 />
              </div>
           </div>

           <div className="bg-teal-850 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
              <ShieldCheck size={100} className="absolute -bottom-6 -right-6 opacity-5 group-hover:scale-110 transition-transform" />
              <h4 className="font-heading font-bold text-lg text-[#FFD700] italic mb-4">Bezpieczeństwo Gemini</h4>
              <p className="text-xs text-teal-100 leading-relaxed font-medium">Twój wytrenowany model jest prywatny. Nigdy nie udostępniamy Twoich danych treningowych innym twórcom ani nie używamy ich do globalnego treningu modeli Gemini.</p>
           </div>
        </div>

        {/* INTERACTIVE PLAYGROUND (PDF str. 54) */}
        <div className="lg:col-span-7 space-y-6">
           <div className="bg-teal-800 p-10 rounded-lg border border-teal-700 shadow-sm flex flex-col min-h-[500px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Brain size={120} /></div>
              
              <div className="relative z-10 space-y-8 flex-1 flex flex-col">
                 <h3 className="font-heading text-xl font-bold text-teal-25 italic">Piaskownica AI (Test Modelu)</h3>
                 
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">Zasymuluj sytuację na streamie</label>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         value={testPrompt}
                         onChange={(e) => setTestPrompt(e.target.value)}
                         className="flex-1 bg-teal-700 border border-teal-700 rounded-md px-6 py-4 text-sm font-bold focus:outline-none focus:border-teal-500"
                       />
                       <button 
                         onClick={testAIPersonality}
                         disabled={loading}
                         className="font-heading px-6 bg-teal-600 text-teal-25 rounded-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center min-w-[60px]"
                       >
                         {loading ? <RefreshCcw size={20} className="animate-spin" /> : <Zap size={20} />}
                       </button>
                    </div>
                 </div>

                 <div className="flex-1 bg-teal-800 border border-teal-700 rounded-lg p-8 relative flex flex-col justify-center min-h-[200px]">
                    <div className="absolute top-4 left-4 flex gap-1">
                       <div className="w-2 h-2 rounded-full bg-rose-400" />
                       <div className="w-2 h-2 rounded-full bg-gold-400" />
                       <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[10px] font-bold text-teal-100 absolute top-4 right-8 uppercase tracking-widest">Model: Gemini 3 Flash</p>
                    
                    <div className="mt-6">
                       {aiResponse ? (
                         <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                            <p className="text-lg font-bold text-teal-25 italic text-center">"{aiResponse}"</p>
                            <div className="flex justify-center gap-4 pt-4">
                               <button className="text-[9px] font-bold text-teal-500 uppercase tracking-widest flex items-center gap-1 hover:underline"><ThumbsUp size={12} /> Dobre</button>
                               <button className="text-[9px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1 hover:underline"><ThumbsDown size={12} /> Do poprawy</button>
                            </div>
                         </div>
                       ) : (
                         <div className="text-center space-y-2 opacity-30">
                           <BrainCircuit size={48} className="mx-auto text-teal-100" />
                           <p className="text-xs font-bold text-teal-100">Wyślij prompt, aby przetestować osobowość AI.</p>
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
