
import React, { useState } from 'react';
import { 
  Share2, 
  Code, 
  Copy, 
  Check, 
  Globe, 
  Smartphone, 
  Monitor, 
  ExternalLink,
  Layers,
  Sparkles,
  Link as LinkIcon,
  Twitter,
  MessageSquare,
  Eye
} from 'lucide-react';

const DistributionHubPage: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const handle = "alex_streamer";
  const profileUrl = `https://tipjar.plus/@${handle}`;
  const embedCode = `<iframe src="${profileUrl}/embed" width="340" height="600" frameborder="0"></iframe>`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Distribution Hub</h1>
          <p className="text-slate-500 font-medium mt-1">Zarządzaj tym, jak i gdzie Twój profil jest udostępniany.</p>
        </div>
        <button 
          onClick={() => handleCopy(profileUrl, 'bio')}
          className={`px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
            copied === 'bio' ? 'bg-emerald-500 text-white' : 'bg-[#006D6D] text-white shadow-xl shadow-[#006D6D]/20'
          }`}
        >
           {copied === 'bio' ? <Check size={18} /> : <LinkIcon size={18} />} 
           {copied === 'bio' ? 'Skopiowano Bio' : 'Mój Link w Bio'}
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* UNIVERSAL LINK & SOCIAL CARDS */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
              <div>
                 <h3 className="text-xl font-black text-slate-800 italic mb-4">Główny Link Profilu</h3>
                 <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-3xl p-2 pl-6 group">
                    <span className="text-slate-500 font-mono text-sm truncate flex-1">{profileUrl}</span>
                    <button 
                      onClick={() => handleCopy(profileUrl, 'link')}
                      className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${copied === 'link' ? 'bg-emerald-500 text-white' : 'bg-[#003737] text-white'}`}
                    >
                      {copied === 'link' ? <Check size={18} /> : 'Kopiuj Link'}
                    </button>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black text-slate-800 italic">Podgląd Social Card</h3>
                    <div className="flex gap-2">
                       <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-600" title="Twitter"><Twitter size={18} /></button>
                       <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-600" title="Discord (Standard Icon)"><MessageSquare size={18} /></button>
                    </div>
                 </div>
                 
                 <div className="bg-[#0a0f10] rounded-[2.5rem] overflow-hidden border border-white/5 group hover:border-[#006D6D]/30 transition-all shadow-2xl">
                    <div className="aspect-[1.91/1] bg-gradient-to-br from-[#003737] to-black relative flex items-center justify-center p-12 text-center overflow-hidden">
                       <Sparkles size={160} className="absolute -right-10 -top-10 text-white/5" />
                       <div className="relative z-10 space-y-4">
                          <div className="w-20 h-20 rounded-[2rem] bg-white/10 mx-auto border border-white/20 p-1">
                             <img src="https://picsum.photos/100/100" className="w-full h-full object-cover rounded-[1.8rem]" alt="" />
                          </div>
                          <h2 className="text-3xl font-black italic text-white tracking-tighter">Support @alex_streamer</h2>
                          <p className="text-slate-400 text-sm font-medium">"Wspieraj rozwój mojego kanału i odbieraj unikalne nagrody w USDC!"</p>
                       </div>
                       <div className="absolute bottom-4 right-6 text-[10px] font-black uppercase text-white/20 tracking-[0.4em]">TipJar.Plus</div>
                    </div>
                    <div className="p-6 bg-white border-t border-slate-100">
                       <p className="text-[10px] font-black text-[#006D6D] uppercase tracking-widest mb-1 italic">TipJar+ Public Profile</p>
                       <h4 className="text-lg font-black text-slate-900">Wesprzyj moją twórczość na platformie TipJar+</h4>
                       <p className="text-xs text-slate-400 font-medium mt-1">Szybkie, bezpieczne napiwki i subskrypcje oparte o technologię Web3.</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* EMBED SECTION */}
           <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Code size={24} /></div>
                 <h3 className="text-xl font-black text-slate-800 italic">Smart Embed (iFrame)</h3>
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                 Chcesz umieścić widget wpłat bezpośrednio na swojej stronie WWW lub blogu? Skopiuj poniższy kod. Widget automatycznie dopasuje się do szerokości kontenera.
              </p>
              <div className="bg-slate-900 rounded-[2rem] p-6 relative group border border-white/5 shadow-inner">
                 <pre className="text-[#FFD700] font-mono text-[11px] overflow-x-auto no-scrollbar whitespace-pre-wrap leading-relaxed">
                   {embedCode}
                 </pre>
                 <button 
                   onClick={() => handleCopy(embedCode, 'embed')}
                   className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                 >
                    {copied === 'embed' ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                 </button>
              </div>
           </div>
        </div>

        {/* SIDEBAR TOOLS */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#003737] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <Layers size={100} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform" />
              <div className="relative z-10 space-y-6">
                 <h3 className="text-xl font-black italic text-[#FFD700]">Platform Presets</h3>
                 <p className="text-slate-300 text-xs font-medium leading-relaxed">Gotowe instrukcje i wtyczki dla najpopularniejszych systemów CMS.</p>
                 <div className="space-y-3">
                    {['WordPress Plugin', 'Wix / Squarespace', 'Custom React Hook', 'Unity SDK'].map(p => (
                      <button key={p} className="w-full flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-xs font-bold text-slate-200">
                         {p} <ExternalLink size={14} className="opacity-40" />
                      </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2"><Eye size={18} className="text-[#006D6D]" /> Statystyki Linku</h3>
              <div className="space-y-4">
                 {[
                   { label: 'X (Twitter)', val: '1,240', color: 'bg-slate-900' },
                   { label: 'YouTube Bio', val: '850', color: 'bg-rose-50' },
                   { label: 'Linktree', val: '420', color: 'bg-emerald-500' },
                 ].map((stat, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                         <span>{stat.label}</span>
                         <span>{stat.val} kliknięć</span>
                      </div>
                      <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                         <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${(Number(stat.val)/1500)*100}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-[#FFD700] p-8 rounded-[3rem] text-[#003737] shadow-xl space-y-4">
              <h4 className="font-black italic text-lg">Wskazówka AI</h4>
              <p className="text-xs font-bold leading-relaxed">"Dodanie linku do Bio na Instagramie zwiększa Twoje szanse na spontaniczne napiwki o 22% podczas Twoich postów w weekendy."</p>
              <button className="w-full py-4 bg-[#003737] text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg">Konfiguruj Instagram</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionHubPage;
