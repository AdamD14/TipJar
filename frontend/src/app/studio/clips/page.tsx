"use client";


import React from 'react';
import { 
  Video, 
  Sparkles, 
  Download, 
  Share2, 
  Play, 
  Scissors, 
  TrendingUp, 
  Zap,
  MoreVertical,
  Clock
} from 'lucide-react';

const CLIPS = [
  { id: 1, title: 'Epic Triple Kill in Valorant', duration: '0:45', viralPotential: 'Wysoki', views: '2.4k', date: 'Dzisiaj' },
  { id: 2, title: 'Funny Donation Reaction', duration: '0:20', viralPotential: 'Medium', views: '850', date: 'Wczoraj' },
  { id: 3, title: 'Tech Talk: Why Solana?', duration: '1:15', viralPotential: 'Wysoki', views: '1.2k', date: '2 dni temu' },
];

const AIClipStudioPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">AI Clip Studio</h1>
          <p className="text-slate-500 font-medium mt-1">Gemini Vision automatycznie wycina najlepsze momenty z Twoich streamów.</p>
        </div>
        <button className="px-8 py-3.5 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20 flex items-center gap-2">
           <Zap size={18} /> Przetwarzaj Ostatni Live
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* VIDEO PLAYER PREVIEW */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-black rounded-[3rem] aspect-video relative overflow-hidden shadow-2xl border-4 border-slate-900 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                 <button className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform">
                    <Play size={40} fill="currentColor" />
                 </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                 <div>
                    <h3 className="text-white font-black text-xl italic">Epic Triple Kill in Valorant</h3>
                    <p className="text-slate-400 text-sm font-bold flex items-center gap-2 mt-1"><Clock size={14} /> 0:45 • Wygenerowano przez AI</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-4 bg-white/10 rounded-2xl text-white hover:bg-white/20 transition-all border border-white/10"><Download size={20} /></button>
                    <button className="p-4 bg-[#FFD700] rounded-2xl text-[#003737] hover:scale-105 transition-all"><Share2 size={20} /></button>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400"><Scissors size={28} /></div>
                 <div>
                    <h4 className="font-black text-slate-800 italic text-lg">Edytor Smart-Crop</h4>
                    <p className="text-sm text-slate-400 font-medium">Automatyczne śledzenie twarzy i kluczowych akcji dla formatu 9:16 (TikTok/Shorts).</p>
                 </div>
              </div>
              <button className="px-6 py-3 border-2 border-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:border-[#006D6D] hover:text-[#006D6D] transition-all">Dostosuj Crop</button>
           </div>
        </div>

        {/* SUGGESTED CLIPS LIST */}
        <div className="lg:col-span-4 space-y-6">
           <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest px-4">Ostatnie Sugestie AI</h3>
           <div className="space-y-4">
              {CLIPS.map(clip => (
                <div key={clip.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:ring-2 hover:ring-[#006D6D]/10 transition-all cursor-pointer">
                   <div className="flex gap-4">
                      <div className="w-24 h-16 bg-slate-100 rounded-xl overflow-hidden relative">
                         <img src={`https://picsum.photos/seed/${clip.id}/200/150`} alt="" className="w-full h-full object-cover" />
                         <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-black px-1 rounded">{clip.duration}</span>
                      </div>
                      <div className="flex-1">
                         <h4 className="text-sm font-black text-slate-800 line-clamp-1 italic">{clip.title}</h4>
                         <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                               <TrendingUp size={10} /> {clip.viralPotential}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold">{clip.views} views</span>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="bg-[#0a0f10] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <Sparkles size={80} className="absolute -bottom-6 -right-6 opacity-10" />
              <h4 className="font-black text-lg text-[#FFD700] italic">Viral Engine Pro</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium mt-4">Automatyczne napisy, dopasowanie podkładu muzycznego i eksport bezpośrednio na Twoje profile społecznościowe.</p>
              <button className="w-full mt-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Konfiguruj Auto-Post</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIClipStudioPage;
