
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Check, 
  Link as LinkIcon, 
  Instagram, 
  Twitter, 
  Twitch, 
  Youtube, 
  Sparkles,
  User,
  MapPin,
  Globe
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    displayName: 'Alex Streamer',
    bio: 'Tworzę treści o krypto, gamingu i nowej technologii. Dołącz do mojej watahy! 🐺🚀',
    location: 'Warszawa, Polska',
    website: 'alex.stream'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Twój Profil</h1>
          <p className="text-slate-500 font-medium mt-1">Zarządzaj informacjami widocznymi dla Twoich fanów.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all min-w-[200px] justify-center shadow-xl ${
            success ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-[#006D6D] text-white hover:bg-[#005a5a] shadow-[#006D6D]/20'
          }`}
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : success ? (
            <><Check size={18} /> Zapisano!</>
          ) : (
            'Zapisz Zmiany'
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* EDIT FORM */}
        <div className="lg:col-span-7 space-y-8">
           <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                 <div className="relative group shrink-0">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-xl overflow-hidden relative">
                       <img src="https://picsum.photos/200/200" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-3 bg-[#006D6D] text-white rounded-2xl shadow-lg hover:scale-110 transition-all border-4 border-white">
                       <Camera size={18} />
                    </button>
                 </div>
                 <div className="space-y-4 flex-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nazwa Wyświetlana</label>
                    <input 
                      type="text" 
                      value={formData.displayName}
                      onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-[#006D6D] transition-all"
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bio / Opis Profilu</label>
                 <textarea 
                   rows={4}
                   value={formData.bio}
                   onChange={(e) => setFormData({...formData, bio: e.target.value})}
                   className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-sm font-medium focus:outline-none focus:border-[#006D6D] transition-all resize-none"
                   placeholder="Napisz coś o sobie..."
                 />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><MapPin size={14} /> Lokalizacja</label>
                    <input 
                       type="text" 
                       value={formData.location}
                       onChange={(e) => setFormData({...formData, location: e.target.value})}
                       className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3 text-xs font-bold focus:outline-none focus:border-[#006D6D]" 
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Globe size={14} /> Strona WWW</label>
                    <input 
                       type="text" 
                       value={formData.website}
                       onChange={(e) => setFormData({...formData, website: e.target.value})}
                       className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3 text-xs font-bold focus:outline-none focus:border-[#006D6D]" 
                    />
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2"><LinkIcon size={16} /> Social Media</h3>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { icon: <Twitter size={18} />, label: 'Twitter / X', color: 'hover:border-slate-900 hover:text-slate-900' },
                   { icon: <Instagram size={18} />, label: 'Instagram', color: 'hover:border-rose-500 hover:text-rose-500' },
                   { icon: <Twitch size={18} />, label: 'Twitch', color: 'hover:border-[#9146FF] hover:text-[#9146FF]' },
                   { icon: <Youtube size={18} />, label: 'YouTube', color: 'hover:border-rose-600 hover:text-rose-600' },
                 ].map((social, i) => (
                   <button key={i} className={`flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all text-slate-400 font-bold text-xs ${social.color}`}>
                      {social.icon}
                      {social.label}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* PREVIEW CARD - FREEZEGLASS EFFECT */}
        <div className="lg:col-span-5 relative">
           <div className="sticky top-28 space-y-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6">Podgląd Profilu (Dla Fana)</p>
              
              <motion.div 
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="relative group"
              >
                 {/* GHOST GLOW BEHIND */}
                 <div className="absolute inset-10 bg-[#006D6D]/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#006D6D]/30 transition-all" />
                 
                 {/* MAIN CARD: THE FREEZEGLASS */}
                 <div className="relative bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3.5rem] shadow-[0_25px_60px_-15px_rgba(0,109,109,0.1)] overflow-hidden min-h-[500px] flex flex-col p-10 text-slate-900 ring-1 ring-white/50">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                       <Sparkles size={160} className="text-[#006D6D]" />
                    </div>
                    
                    <div className="flex flex-col items-center text-center space-y-6 relative z-10 flex-1">
                       <div className="w-28 h-28 rounded-[2.5rem] bg-slate-100/50 border-4 border-white shadow-2xl overflow-hidden ring-4 ring-white/20">
                          <img src="https://picsum.photos/200/200" alt="Avatar" className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <h2 className="text-3xl font-black italic tracking-tighter text-slate-900">{formData.displayName}</h2>
                          <div className="flex items-center justify-center gap-2 mt-2">
                             <span className="px-3 py-1 bg-[#006D6D]/10 text-[#006D6D] rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md">PRO CREATOR</span>
                             <span className="px-3 py-1 bg-white/50 border border-white rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400">@alex_streamer</span>
                          </div>
                       </div>
                       
                       <p className="text-sm font-medium text-slate-600 leading-relaxed italic max-w-xs">
                         "{formData.bio}"
                       </p>

                       <div className="w-full h-px bg-white/50 my-2" />

                       <div className="grid grid-cols-2 w-full gap-4">
                          <div className="bg-white/50 p-4 rounded-3xl border border-white text-center">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Wspierający</p>
                             <p className="text-xl font-black italic text-slate-800">1.2k</p>
                          </div>
                          <div className="bg-white/50 p-4 rounded-3xl border border-white text-center">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sentyment</p>
                             <p className="text-xl font-black italic text-[#006D6D]">88%</p>
                          </div>
                       </div>
                    </div>

                    <div className="mt-10 space-y-3 relative z-10">
                       <button className="w-full py-4 bg-[#006D6D] text-white font-black rounded-3xl shadow-xl shadow-[#006D6D]/20 flex items-center justify-center gap-2 group/btn">
                          Wesprzyj Mnie <Sparkles size={16} className="group-hover/btn:animate-spin" />
                       </button>
                       <button className="w-full py-4 bg-white/80 text-slate-600 font-black rounded-3xl border border-white shadow-sm hover:bg-white transition-all text-xs uppercase tracking-widest">
                          Subskrypcja od 5 USDC
                       </button>
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
