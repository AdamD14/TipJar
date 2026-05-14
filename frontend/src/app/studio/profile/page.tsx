"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Check, 
  Link as LinkIcon, 
  Sparkles,
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
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Twój Profil</h1>
          <p className="text-teal-50 font-medium mt-1">Zarządzaj informacjami widocznymi dla Twoich fanów.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`px-8 py-3.5 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all ease-standard min-w-[200px] justify-center shadow-xl font-heading ${
            success ? 'bg-success-dark text-success-base shadow-success-dark/20' : 'bg-teal-600 text-teal-25 hover:bg-teal-500 shadow-teal-600/20'
          }`}
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-teal-25/30 border-t-teal-25 rounded-full animate-spin"></div>
          ) : success ? (
            <><Check size={18} /> Zapisano!</>
          ) : (
            'Zapisz Zmiany'
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
           <div className="bg-teal-800 p-8 md:p-10 rounded-lg border border-teal-700 shadow-sm space-y-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                 <div className="relative group shrink-0">
                    <div className="w-32 h-32 rounded-lg bg-teal-700 border-4 border-teal-800 shadow-xl overflow-hidden relative">
                       <img src="https://picsum.photos/200/200" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-3 bg-teal-600 text-teal-25 rounded-md shadow-lg hover:scale-110 transition-all ease-standard border-4 border-teal-800">
                       <Camera size={18} />
                    </button>
                 </div>
                 <div className="space-y-4 flex-1">
                    <label className="text-[10px] font-black text-teal-100 uppercase tracking-widest">Nazwa Wyświetlana</label>
                    <input 
                      type="text" 
                      value={formData.displayName}
                      onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                      className="w-full bg-teal-700 border border-teal-600 rounded-md px-6 py-4 text-sm font-bold focus:outline-none focus:border-gold-400 transition-all text-teal-25 placeholder:text-teal-100"
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black text-teal-100 uppercase tracking-widest">Bio / Opis Profilu</label>
                 <textarea 
                   rows={4}
                   value={formData.bio}
                   onChange={(e) => setFormData({...formData, bio: e.target.value})}
                   className="w-full bg-teal-700 border border-teal-600 rounded-md p-6 text-sm font-medium focus:outline-none focus:border-gold-400 transition-all resize-none text-teal-25 placeholder:text-teal-100"
                   placeholder="Napisz coś o sobie..."
                 />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-teal-100 uppercase tracking-widest flex items-center gap-2"><MapPin size={14} /> Lokalizacja</label>
                    <input 
                       type="text" 
                       value={formData.location}
                       onChange={(e) => setFormData({...formData, location: e.target.value})}
                       className="w-full bg-teal-700 border border-teal-600 rounded-md px-6 py-3 text-xs font-bold focus:outline-none focus:border-gold-400 text-teal-25 placeholder:text-teal-100" 
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-teal-100 uppercase tracking-widest flex items-center gap-2"><Globe size={14} /> Strona WWW</label>
                    <input 
                       type="text" 
                       value={formData.website}
                       onChange={(e) => setFormData({...formData, website: e.target.value})}
                       className="w-full bg-teal-700 border border-teal-600 rounded-md px-6 py-3 text-xs font-bold focus:outline-none focus:border-gold-400 text-teal-25 placeholder:text-teal-100" 
                    />
                 </div>
              </div>
           </div>

           <div className="bg-teal-800 p-8 md:p-10 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <h3 className="font-bold text-teal-25 text-sm uppercase tracking-widest flex items-center gap-2"><LinkIcon size={16} /> Social Media</h3>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { icon: <span className="font-bold text-xs">X</span>, label: 'Twitter / X' },
                   { icon: <span className="font-bold text-xs">IG</span>, label: 'Instagram' },
                   { icon: <span className="font-bold text-xs">TW</span>, label: 'Twitch' },
                   { icon: <span className="font-bold text-xs">YT</span>, label: 'YouTube' },
                 ].map((social, i) => (
                   <button key={i} className="flex items-center gap-3 p-4 bg-teal-700 rounded-lg border border-teal-600 transition-all ease-standard text-teal-100 font-bold text-xs hover:bg-teal-600 hover:text-teal-25">
                      {social.icon}
                      {social.label}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-5 relative">
           <div className="sticky top-28 space-y-6">
              <p className="text-[10px] font-black text-teal-100 uppercase tracking-widest px-6">Podgląd Profilu (Dla Fana)</p>
              
              <motion.div 
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="relative group"
              >
                 <div className="absolute inset-10 bg-gold-400/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-gold-400/20 transition-all ease-standard" />
                 
                 <div className="relative bg-teal-800/60 backdrop-blur-xl border border-teal-600 rounded-lg shadow-modal overflow-hidden min-h-[500px] flex flex-col p-10 text-teal-25">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                       <Sparkles size={160} className="text-gold-400" />
                    </div>
                    
                    <div className="flex flex-col items-center text-center space-y-6 relative z-10 flex-1">
                       <div className="w-28 h-28 rounded-lg bg-teal-700 border-4 border-teal-800 shadow-2xl overflow-hidden ring-4 ring-teal-600">
                          <img src="https://picsum.photos/200/200" alt="Avatar" className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <h2 className="text-3xl font-bold font-heading italic tracking-tighter text-teal-25">{formData.displayName}</h2>
                          <div className="flex items-center justify-center gap-2 mt-2">
                             <span className="px-3 py-1 bg-gold-400/10 text-gold-400 rounded-md text-[9px] font-bold uppercase tracking-widest">PRO CREATOR</span>
                             <span className="px-3 py-1 bg-teal-700 border border-teal-600 rounded-md text-[9px] font-bold uppercase tracking-widest text-teal-100">@alex_streamer</span>
                          </div>
                       </div>
                       
                       <p className="text-sm font-medium text-teal-50 leading-relaxed italic max-w-xs">
                         "{formData.bio}"
                       </p>

                       <div className="w-full h-px bg-teal-700 my-2" />

                       <div className="grid grid-cols-2 w-full gap-4">
                          <div className="bg-teal-700 p-4 rounded-lg border border-teal-600 text-center">
                             <p className="text-[8px] font-black text-teal-100 uppercase tracking-widest">Wspierający</p>
                             <p className="text-xl font-bold font-heading italic text-teal-25">1.2k</p>
                          </div>
                          <div className="bg-teal-700 p-4 rounded-lg border border-teal-600 text-center">
                             <p className="text-[8px] font-black text-teal-100 uppercase tracking-widest">Sentyment</p>
                             <p className="text-xl font-bold font-heading italic text-gold-400">88%</p>
                          </div>
                       </div>
                    </div>

                    <div className="mt-10 space-y-3 relative z-10">
                       <button className="w-full py-4 bg-gold-400 text-teal-900 font-bold rounded-md shadow-xl shadow-gold-400/20 flex items-center justify-center gap-2 font-heading hover:scale-[1.02] transition-all ease-standard">
                          Wesprzyj Mnie <Sparkles size={16} />
                       </button>
                       <button className="w-full py-4 bg-teal-700 text-teal-100 font-bold rounded-md border border-teal-600 hover:bg-teal-600 hover:text-teal-25 transition-all ease-standard text-xs uppercase tracking-widest">
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
