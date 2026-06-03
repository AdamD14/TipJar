
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
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">TTS Studio</h1>
          <p className="text-slate-500 font-medium mt-1">Konfiguracja głosów Gemini dla alertów i interakcji na streamie.</p>
        </div>
        <button className="px-8 py-3.5 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20 flex items-center gap-2">
           <Save size={18} /> Zastosuj Ustawienia
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* VOICE SELECTOR */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2"><Mic2 size={18} className="text-[#006D6D]" /> Wybierz Głos</h3>
              <div className="space-y-3">
                 {VOICES.map(voice => (
                   <button 
                     key={voice.id} 
                     onClick={() => setSelectedVoice(voice.id)}
                     className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${selectedVoice === voice.id ? 'border-[#006D6D] bg-[#006D6D]/5' : 'border-slate-50 hover:border-slate-200'}`}
                   >
                      <div className="text-left">
                         <p className={`text-sm font-black italic ${selectedVoice === voice.id ? 'text-[#006D6D]' : 'text-slate-800'}`}>{voice.name}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{voice.tone} • {voice.lang}</p>
                      </div>
                      <Volume2 size={18} className={selectedVoice === voice.id ? 'text-[#006D6D]' : 'text-slate-300'} />
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-[#0a0f10] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <Sparkles size={80} className="absolute -bottom-6 -right-6 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
              <h4 className="text-lg font-black text-[#FFD700] italic">AI Voice Cloning (Beta)</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium mt-4">Jako użytkownik Pro, niedługo będziesz mógł wytrenować głos Gemini na własnych nagraniach, by system czytał alerty Twoim własnym głosem.</p>
              <button className="w-full mt-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Zapisz się do Bety</button>
           </div>
        </div>

        {/* PLAYGROUND & CONFIG */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-black text-slate-800 italic">Tester i Konfiguracja</h3>
                 <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Preview</div>
              </div>

              <div className="space-y-6">
                 <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                       <input 
                         type="text" 
                         value={testText}
                         onChange={(e) => setTestText(e.target.value)}
                         className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-[#006D6D] shadow-sm"
                       />
                       <button className="w-16 h-16 bg-[#0a0f10] text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all">
                          <Play size={28} fill="currentColor" />
                       </button>
                    </div>
                    {/* AUDIO WAVE VISUALIZATION (STATIC) */}
                    <div className="h-12 flex items-center gap-1.5 px-4">
                       {[0.2, 0.5, 0.8, 0.4, 0.9, 0.6, 0.3, 0.7, 0.5, 0.8, 0.2, 0.5, 0.9, 0.4, 0.6, 0.3].map((h, i) => (
                         <div key={i} className="flex-1 bg-[#006D6D]/20 rounded-full overflow-hidden relative h-full">
                            <div className="absolute bottom-0 inset-x-0 bg-[#006D6D] transition-all duration-500" style={{ height: `${h * 100}%` }} />
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between"><span>Pitch / Tonacja</span><span>{pitch.toFixed(1)}x</span></label>
                       <input 
                         type="range" min="0.5" max="1.5" step="0.1" 
                         value={pitch} onChange={(e) => setPitch(Number(e.target.value))}
                         className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#006D6D]" 
                       />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Szybkość czytania</label>
                       <input 
                         type="range" min="0.5" max="2.0" step="0.1" defaultValue="1.0"
                         className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#006D6D]" 
                       />
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-slate-50">
                 <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-6">Automatyzacja TTS</h4>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                       <div className="flex items-center gap-3"><MessageSquare size={18} className="text-slate-400" /><p className="text-xs font-bold text-slate-600">Czytaj każdą wiadomość z tipem</p></div>
                       <div className="w-10 h-6 bg-emerald-500/20 rounded-full flex items-center justify-end px-1 border border-emerald-500/30"><div className="w-4 h-4 bg-emerald-500 rounded-full" /></div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                       <div className="flex items-center gap-3"><Zap size={18} className="text-slate-400" /><p className="text-xs font-bold text-slate-600">Dynamiczna zmiana głosu na podstawie sentymentu</p></div>
                       <div className="w-10 h-6 bg-slate-200 rounded-full flex items-center justify-start px-1 border border-slate-300"><div className="w-4 h-4 bg-slate-400 rounded-full" /></div>
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
