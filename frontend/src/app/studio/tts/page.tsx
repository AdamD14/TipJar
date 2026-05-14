"use client";


import React, { useState } from 'react';
import { 
  Mic2, 
  Sparkles, 
  Volume2, 
  Play, 
  Settings2, 
  Sliders, 
  Zap, 
  Save,
  MessageSquare,
  Repeat
} from 'lucide-react';

const VOICES = [
  { id: 'zephyr', name: 'Zephyr', gender: 'Neutralny', tone: 'Przyjazny', lang: 'PL/EN' },
  { id: 'puck', name: 'Puck', gender: 'Męski', tone: 'Energetyczny', lang: 'PL/EN' },
  { id: 'charon', name: 'Charon', gender: 'Męski', tone: 'Głęboki', lang: 'EN' },
  { id: 'kore', name: 'Kore', gender: 'Żeński', tone: 'Kojący', lang: 'PL/EN' },
];

const TTSStudioPage: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState('zephyr');
  const [testText, setTestText] = useState("Dzięki za 100 USDC! Jesteś legendą!");
  const [pitch, setPitch] = useState(1);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">TTS Studio</h1>
          <p className="text-teal-50 font-medium mt-1">Konfiguracja głosów Gemini dla alertów i interakcji na streamie.</p>
        </div>
        <button className="px-8 py-3.5 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 flex items-center gap-2 font-heading">
           <Save size={18} /> Zastosuj Ustawienia
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* VOICE SELECTOR */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <h3 className="font-bold text-teal-25 text-sm uppercase tracking-widest flex items-center gap-2 font-heading"><Mic2 size={18} className="text-teal-500" /> Wybierz Głos</h3>
              <div className="space-y-3">
                 {VOICES.map(voice => (
                   <button 
                     key={voice.id} 
                     onClick={() => setSelectedVoice(voice.id)}
                     className={`w-full p-4 rounded-md border-2 transition-all flex items-center justify-between group ${selectedVoice === voice.id ? 'border-teal-500 bg-teal-500/5' : 'border-teal-700 hover:border-teal-700'}`}
                   >
                      <div className="text-left">
                         <p className={`text-sm font-bold italic ${selectedVoice === voice.id ? 'text-teal-500' : 'text-teal-25'}`}>{voice.name}</p>
                         <p className="text-[10px] text-teal-100 font-bold uppercase tracking-widest mt-1">{voice.tone} • {voice.lang}</p>
                      </div>
                      <Volume2 size={18} className={selectedVoice === voice.id ? 'text-teal-500' : 'text-teal-100'} />
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-teal-850 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
              <Sparkles size={80} className="absolute -bottom-6 -right-6 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
              <h4 className="text-lg font-bold text-gold-400 italic font-heading">AI Voice Cloning (Beta)</h4>
              <p className="text-xs text-teal-100 leading-relaxed font-medium mt-4">Jako użytkownik Pro, niedługo będziesz mógł wytrenować głos Gemini na własnych nagraniach, by system czytał alerty Twoim własnym głosem.</p>
              <button className="w-full mt-6 py-4 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all font-heading">Zapisz się do Bety</button>
           </div>
        </div>

        {/* PLAYGROUND & CONFIG */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-teal-800 p-10 rounded-lg border border-teal-700 shadow-sm space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-bold text-teal-25 italic font-heading">Tester i Konfiguracja</h3>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-success-500 uppercase tracking-widest bg-success-50 px-3 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-success-base animate-pulse" /> Live Preview</div>
              </div>

              <div className="space-y-6">
                 <div className="bg-teal-700 p-8 rounded-lg border border-teal-700 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                       <input 
                         type="text" 
                         value={testText}
                         onChange={(e) => setTestText(e.target.value)}
                         className="flex-1 bg-teal-800 border border-teal-700 rounded-md px-6 py-4 text-sm font-bold focus:outline-none focus:border-teal-500 shadow-sm"
                       />
                       <button className="w-16 h-16 bg-teal-850 text-teal-25 rounded-md flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all font-heading">
                          <Play size={28} fill="currentColor" />
                       </button>
                    </div>
                    {/* AUDIO WAVE VISUALIZATION (STATIC) */}
                    <div className="h-12 flex items-center gap-1.5 px-4">
                       {[0.2, 0.5, 0.8, 0.4, 0.9, 0.6, 0.3, 0.7, 0.5, 0.8, 0.2, 0.5, 0.9, 0.4, 0.6, 0.3].map((h, i) => (
                         <div key={i} className="flex-1 bg-teal-500/20 rounded-full overflow-hidden relative h-full">
                            <div className="absolute bottom-0 inset-x-0 bg-teal-500 transition-all duration-500" style={{ height: `${h * 100}%` }} />
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="text-[10px] font-bold text-teal-100 uppercase tracking-widest flex justify-between"><span>Pitch / Tonacja</span><span>{pitch.toFixed(1)}x</span></label>
                       <input 
                         type="range" min="0.5" max="1.5" step="0.1" 
                         value={pitch} onChange={(e) => setPitch(Number(e.target.value))}
                         className="w-full h-1.5 bg-teal-700 rounded-full appearance-none cursor-pointer accent-[#006D6D]" 
                       />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">Szybkość czytania</label>
                       <input 
                         type="range" min="0.5" max="2.0" step="0.1" defaultValue="1.0"
                         className="w-full h-1.5 bg-teal-700 rounded-full appearance-none cursor-pointer accent-[#006D6D]" 
                       />
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-teal-700">
                 <h4 className="text-xs font-bold text-teal-25 uppercase tracking-widest mb-6 font-heading">Automatyzacja TTS</h4>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-teal-700 rounded-md border border-teal-700">
                       <div className="flex items-center gap-3"><MessageSquare size={18} className="text-teal-100" /><p className="text-xs font-bold text-teal-50">Czytaj każdą wiadomość z tipem</p></div>
                       <div className="w-10 h-6 bg-success-base/20 rounded-full flex items-center justify-end px-1 border border-success-500/30"><div className="w-4 h-4 bg-success-base rounded-full" /></div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-teal-700 rounded-md border border-teal-700">
                       <div className="flex items-center gap-3"><Zap size={18} className="text-teal-100" /><p className="text-xs font-bold text-teal-50">Dynamiczna zmiana głosu na podstawie sentymentu</p></div>
                       <div className="w-10 h-6 bg-teal-700 rounded-full flex items-center justify-start px-1 border border-teal-700"><div className="w-4 h-4 bg-teal-100 rounded-full" /></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TTSStudioPage;
