
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, 
  Sparkles, 
  Zap, 
  RotateCcw, 
  ChevronRight, 
  Trophy,
  ShieldCheck,
  PlayCircle
} from 'lucide-react';

const ViewerInteractionPage: React.FC = () => {
  const { id } = useParams();
  const [opening, setOpening] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => {
       setOpening(false);
       setRevealed(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#020a0b] flex items-center justify-center p-6 relative overflow-hidden">
      {/* DYNAMIC BG */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${revealed ? 'bg-[#003737]/40' : 'bg-[#0a0f10]/80'}`} />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      
      {/* AMBIENT LIGHTS */}
      <motion.div 
        animate={{ 
          scale: opening ? [1, 1.2, 1.1] : 1,
          opacity: opening ? 0.8 : 0.3 
        }}
        className="absolute w-[600px] h-[600px] bg-[#006D6D]/40 rounded-full blur-[160px] pointer-events-none" 
      />

      <div className="max-w-lg w-full relative z-10">
        <AnimatePresence mode='wait'>
          {!revealed ? (
            <motion.div 
              key="chest"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
              className="space-y-12 text-center"
            >
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-full">
                     <Sparkles size={14} className="text-[#FFD700]" />
                     <span className="text-[10px] font-black text-[#FFD700] uppercase tracking-widest italic">Limited Edition Drop</span>
                  </div>
                  <h1 className="text-4xl font-black text-white italic tracking-tighter">Mystery Box #42</h1>
                  <p className="text-slate-400 font-medium">Otwórz skrzynię i wygraj unikalne nagrody od @Alex_Streamer!</p>
               </div>

               <div className="relative group cursor-pointer" onClick={!opening ? handleOpen : undefined}>
                  {/* CHEST VISUAL */}
                  <motion.div 
                    animate={opening ? { 
                      rotate: [0, -2, 2, -2, 2, 0],
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={{ repeat: opening ? Infinity : 0, duration: 0.2 }}
                    className="w-64 h-64 mx-auto bg-gradient-to-br from-[#003737] to-[#001a1a] rounded-[4rem] border-4 border-white/10 shadow-[0_0_80px_rgba(0,109,109,0.3)] flex items-center justify-center relative overflow-hidden group-hover:border-[#006D6D]/40 transition-all"
                  >
                     <Gift size={100} className={`text-[#006D6D] group-hover:scale-110 transition-transform ${opening ? 'animate-pulse' : ''}`} />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#006D6D]/20 to-transparent" />
                  </motion.div>
                  
                  {!opening && (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#003737] px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2">
                       Open for 10 USDC <ChevronRight size={14} />
                    </div>
                  )}
               </div>

               <div className="grid grid-cols-3 gap-4 pt-12">
                  {[
                    { label: 'Rzadkie', prob: '10%' },
                    { label: 'Epickie', prob: '2%' },
                    { label: 'Legend', prob: '0.1%' },
                  ].map((s, i) => (
                    <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-3xl">
                       <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
                       <p className="text-sm font-black text-white italic mt-1">{s.prob}</p>
                    </div>
                  ))}
               </div>
            </motion.div>
          ) : (
            <motion.div 
              key="reward"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="text-center space-y-10"
            >
               <div className="w-64 h-64 mx-auto rounded-[4rem] bg-gradient-to-br from-amber-400 to-[#FFD700] shadow-[0_0_100px_rgba(255,215,0,0.4)] flex items-center justify-center relative">
                  <Trophy size={120} className="text-[#003737]" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="absolute inset-0 border-4 border-dashed border-[#003737]/20 rounded-[4rem]" 
                  />
               </div>

               <div className="space-y-4">
                  <h2 className="text-5xl font-black text-white italic tracking-tighter">EPIC LOOT! 🏆</h2>
                  <h3 className="text-2xl font-black text-[#FFD700] italic">Złota Odznaka Mecenasa</h3>
                  <p className="text-slate-400 font-medium max-w-xs mx-auto">Ta nagroda została automatycznie przypisana do Twojego profilu na TipJar+.</p>
               </div>

               <div className="flex flex-col gap-4">
                  <button className="w-full py-5 bg-white text-[#003737] font-black rounded-[2rem] text-sm uppercase tracking-widest hover:scale-105 transition-all">Odbierz w Studio</button>
                  <button onClick={() => setRevealed(false)} className="w-full py-5 bg-white/5 border border-white/10 text-slate-400 font-black rounded-[2rem] text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                     <RotateCcw size={14} /> Spróbuj Ponownie
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER PRIVACY */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-30">
         <ShieldCheck size={16} className="text-emerald-500" />
         <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Secure Polygon Payment</span>
      </div>
    </div>
  );
};

export default ViewerInteractionPage;
