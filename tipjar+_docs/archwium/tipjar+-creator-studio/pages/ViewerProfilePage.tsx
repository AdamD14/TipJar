
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Twitter, 
  Instagram, 
  Twitch, 
  Youtube, 
  Globe,
  Wallet,
  Zap,
  MessageSquare,
  Gift,
  Star,
  CheckCircle2
} from 'lucide-react';

const ViewerProfilePage: React.FC = () => {
  const { handle } = useParams();
  const [amount, setAmount] = useState(5);
  const [message, setMessage] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  return (
    <div className="min-h-screen bg-[#020a0b] text-[#DDE0DA] selection:bg-[#006D6D] relative overflow-x-hidden">
      {/* BACKGROUND EFFECTS */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[#006D6D]/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#FFD700]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-6 py-12 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-20">
          
          {/* LEFT COL: BIO & LINKS */}
          <div className="lg:col-span-5 space-y-10 order-2 lg:order-1">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-6"
             >
                <div className="w-32 h-32 rounded-[3rem] bg-white/10 p-1 border border-white/20 shadow-2xl relative">
                   <img src={`https://picsum.photos/seed/${handle}/300/300`} className="w-full h-full object-cover rounded-[2.8rem]" alt="" />
                   <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-[#020a0b] flex items-center justify-center text-white">
                      <CheckCircle2 size={20} />
                   </div>
                </div>
                <div>
                   <h1 className="text-5xl font-black tracking-tighter text-white italic">@{handle}</h1>
                   <p className="text-slate-400 font-medium text-lg mt-4 leading-relaxed italic">
                      "Tworzę treści o technologii Web3 i gamingu. Każdy tip wspiera mój cel – Nowy Setup 2025! 🐺🚀"
                   </p>
                </div>
             </motion.div>

             <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Znajdziesz mnie na</p>
                <div className="flex flex-wrap gap-3">
                   {[Twitter, Twitch, Instagram, Globe].map((Icon, i) => (
                     <button key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:-translate-y-1">
                        <Icon size={20} />
                     </button>
                   ))}
                </div>
             </div>

             <div className="p-8 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl space-y-6">
                <div className="flex justify-between items-center">
                   <h3 className="font-black text-white italic text-lg flex items-center gap-2"><Zap size={20} className="text-[#FFD700]" /> Aktywny Cel</h3>
                   <span className="text-[10px] font-black text-[#FFD700] bg-[#FFD700]/10 px-2 py-1 rounded-full uppercase tracking-widest italic">42%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
                   <div className="h-full bg-gradient-to-r from-[#006D6D] to-[#00b0b0] rounded-full w-[42%] shadow-[0_0_20px_rgba(0,109,109,0.5)]" />
                </div>
                <p className="text-sm font-bold text-slate-400 text-center">Zbieramy na RTX 5090 (4,250 / 10,000 USDC)</p>
             </div>
          </div>

          {/* RIGHT COL: TIP WIDGET */}
          <div className="lg:col-span-7 order-1 lg:order-2">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white/10 border border-white/20 rounded-[4rem] p-8 md:p-12 backdrop-blur-[40px] shadow-[0_50px_100px_-20px_rgba(0,109,109,0.2)] space-y-10 relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Sparkles size={200} /></div>
                
                <div className="text-center space-y-2">
                   <h2 className="text-3xl font-black text-white italic">Wesprzyj Twórcę ☕</h2>
                   <p className="text-slate-400 text-sm font-medium">Szybki napiwek USDC przez sieć Polygon (No Gas Fee).</p>
                </div>

                <div className="space-y-8 relative z-10">
                   <div className="bg-black/20 border border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-inner">
                      <div className="flex justify-center items-baseline gap-2">
                         <span className="text-6xl font-black italic tracking-tighter text-white">{amount}</span>
                         <span className="text-xl font-black text-[#006D6D] italic">USDC</span>
                      </div>
                      <input 
                        type="range" min="1" max="100" step="1" 
                        value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#006D6D]" 
                      />
                      <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                         <span>Drobne</span>
                         <span>Legenda</span>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center bg-white/5 border border-white/10 rounded-3xl p-4 gap-4 focus-within:border-[#FFD700] transition-all">
                         <MessageSquare size={20} className="text-slate-500" />
                         <input 
                           type="text" placeholder="Twoja wiadomość (opcjonalnie)" 
                           className="bg-transparent border-none focus:outline-none w-full font-bold text-sm"
                           value={message} onChange={(e) => setMessage(e.target.value)}
                         />
                      </div>
                   </div>

                   <button className="w-full py-6 bg-[#006D6D] text-white font-black rounded-3xl text-xl italic tracking-tighter shadow-[0_20px_40px_-10px_rgba(0,109,109,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group">
                      Wyślij {amount} USDC <Zap size={22} className="group-hover:text-[#FFD700] transition-colors" />
                   </button>

                   <div className="flex items-center justify-center gap-6 pt-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><Wallet size={14} /> Obsługujemy</p>
                      <div className="flex gap-4 opacity-40 grayscale hover:grayscale-0 transition-all cursor-help">
                         <div className="w-6 h-6 rounded bg-white/20" title="Polygon" />
                         <div className="w-6 h-6 rounded bg-white/20" title="Solana" />
                         <div className="w-6 h-6 rounded bg-white/20" title="Base" />
                      </div>
                   </div>
                </div>
             </motion.div>
             
             {/* SUB OPTIONS */}
             <div className="mt-8 grid grid-cols-2 gap-4">
                <button className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center gap-2 hover:bg-white/10 transition-all group">
                   <Star size={24} className="text-slate-500 group-hover:text-[#FFD700]" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Subskrybuj (5 USDC)</span>
                </button>
                <button className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center gap-2 hover:bg-white/10 transition-all group">
                   <Gift size={24} className="text-slate-500 group-hover:text-rose-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Loot Boxes</span>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerProfilePage;
