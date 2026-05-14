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
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">AI Clip Studio</h1>
          <p className="text-teal-50 font-medium mt-1">Gemini Vision automatycznie wycina najlepsze momenty z Twoich streamów.</p>
        </div>
        <button className="px-8 py-3.5 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 flex items-center gap-2 font-heading">
           <Zap size={18} /> Przetwarzaj Ostatni Live
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* VIDEO PLAYER PREVIEW */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-black rounded-lg aspect-video relative overflow-hidden shadow-2xl border-4 border-teal-850 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                 <button className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-teal-25 border border-white/20 hover:scale-110 transition-transform font-heading">
                    <Play size={40} fill="currentColor" />
                 </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                 <div>
                    <h3 className="text-teal-25 font-bold text-xl italic font-heading">Epic Triple Kill in Valorant</h3>
                    <p className="text-teal-100 text-sm font-bold flex items-center gap-2 mt-1"><Clock size={14} /> 0:45 • Wygenerowano przez AI</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-4 bg-white/10 rounded-md text-teal-25 hover:bg-white/20 transition-all border border-white/10 font-heading"><Download size={20} /></button>
                    <button className="p-4 bg-gold-400 rounded-md text-teal-900 hover:scale-105 transition-all font-heading"><Share2 size={20} /></button>
                 </div>
              </div>
           </div>

           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-md bg-teal-700 flex items-center justify-center text-teal-100"><Scissors size={28} /></div>
                 <div>
                    <h4 className="font-bold text-teal-25 italic text-lg font-heading">Edytor Smart-Crop</h4>
                    <p className="text-sm text-teal-100 font-medium">Automatyczne śledzenie twarzy i kluczowych akcji dla formatu 9:16 (TikTok/Shorts).</p>
                 </div>
              </div>
              <button className="px-6 py-3 border-2 border-teal-700 rounded-md font-bold text-xs uppercase tracking-widest text-teal-50 hover:border-teal-500 hover:text-teal-500 transition-all font-heading">Dostosuj Crop</button>
           </div>
        </div>

        {/* SUGGESTED CLIPS LIST */}
        <div className="lg:col-span-4 space-y-6">
           <h3 className="font-bold text-teal-25 text-sm uppercase tracking-widest px-4 font-heading">Ostatnie Sugestie AI</h3>
           <div className="space-y-4">
              {CLIPS.map(clip => (
                <div key={clip.id} className="bg-teal-800 p-6 rounded-lg border border-teal-700 shadow-sm group hover:ring-2 hover:ring-teal-500/10 transition-all cursor-pointer">
                   <div className="flex gap-4">
                      <div className="w-24 h-16 bg-teal-700 rounded-md overflow-hidden relative">
                         <img src={`https://picsum.photos/seed/${clip.id}/200/150`} alt="" className="w-full h-full object-cover" />
                         <span className="absolute bottom-1 right-1 bg-black/60 text-teal-25 text-[8px] font-bold px-1 rounded">{clip.duration}</span>
                      </div>
                      <div className="flex-1">
                         <h4 className="text-sm font-bold text-teal-25 line-clamp-1 italic font-heading">{clip.title}</h4>
                         <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] font-bold text-success-500 uppercase tracking-widest flex items-center gap-1">
                               <TrendingUp size={10} /> {clip.viralPotential}
                            </span>
                            <span className="text-[10px] text-teal-100 font-bold">{clip.views} views</span>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="bg-teal-850 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
              <Sparkles size={80} className="absolute -bottom-6 -right-6 opacity-10" />
              <h4 className="font-bold text-lg text-gold-400 italic font-heading">Viral Engine Pro</h4>
              <p className="text-xs text-teal-100 leading-relaxed font-medium mt-4">Automatyczne napisy, dopasowanie podkładu muzycznego i eksport bezpośrednio na Twoje profile społecznościowe.</p>
              <button className="w-full mt-6 py-4 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all font-heading">Konfiguruj Auto-Post</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIClipStudioPage;
