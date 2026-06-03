
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  MessageSquare,
  Smartphone
} from 'lucide-react';

interface TipModalProps {
  username: string;
  open: boolean;
  onClose: () => void;
}

export default function TipModal({ username, open, onClose }: TipModalProps) {
  const [amount, setAmount] = useState(500); // cents (5.00 USDC)
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setAmount(500);
      setNote('');
      setBusy(false);
    }
  }, [open]);

  const presets = useMemo(() => [100, 200, 500, 1000, 2000], []); // $1, $2, $5, $10, $20

  const handleGo = async () => {
    try {
      setBusy(true);
      // Actual payload to /api/pay/create
      const payload = { creator: username, amountCents: amount, note };
      console.log("Initiating payment...", payload);
      
      const res = await fetch('/api/pay/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Error');
      window.location.href = data.checkoutUrl;
    } catch (e: any) {
      // Demo fallback
      setTimeout(() => {
        setBusy(false);
        onClose();
      }, 1500);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="relative w-full max-w-md bg-[#003737] border border-white/10 rounded-[3.5rem] p-8 md:p-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/20"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="text-center mb-10">
           <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 mx-auto mb-4 overflow-hidden shadow-2xl ring-4 ring-[#FFD700]/10">
              <img src={`https://picsum.photos/seed/${username}/300/300`} className="w-full h-full object-cover" alt="" />
           </div>
           <h3 className="text-2xl font-black text-white italic tracking-tighter">Support @{username}</h3>
           <p className="text-[10px] text-[#FFD700] uppercase tracking-widest font-black italic mt-1">Verified Web3 Studio</p>
        </div>

        <div className="space-y-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {presets.map(cents => (
              <button 
                key={cents}
                onClick={() => setAmount(cents)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all border ${
                  amount === cents ? 'bg-[#FFD700] text-[#003737] border-[#FFD700] shadow-lg' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                }`}
              >
                ${(cents / 100).toFixed(0)}
              </button>
            ))}
          </div>

          <div className="bg-[#4D194D]/60 border border-white/10 rounded-[2.5rem] p-8 shadow-inner space-y-6">
             <div className="flex justify-between items-center">
                <div className="flex items-baseline gap-1">
                   <span className="text-[#FFD700] font-black text-xl italic">$</span>
                   <span className="text-5xl font-black text-white italic">{(amount / 100).toFixed(2)}</span>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-purple-200 font-black uppercase tracking-widest italic">USDC</p>
                   <p className="text-[8px] text-white/30 uppercase font-bold">Polygon Network</p>
                </div>
             </div>
             <input 
                type="range" min={100} max={20000} step={100}
                value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#FFD700]"
             />
          </div>

          <div className="space-y-4">
             <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex gap-4 focus-within:border-[#FFD700]/50 transition-all">
                <MessageSquare size={20} className="text-white/20 mt-1" />
                <textarea 
                  maxLength={140}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Dodaj notatkę (opcjonalnie)..."
                  className="bg-transparent border-none focus:outline-none w-full text-sm font-medium text-white placeholder:text-white/20 resize-none h-20"
                />
             </div>
          </div>

          <div className="space-y-6">
            <button 
              onClick={handleGo}
              disabled={busy}
              className="w-full py-6 bg-[#FFD700] text-[#003737] font-black rounded-[2rem] transition-all shadow-2xl shadow-[#FFD700]/10 active:scale-95 text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {busy ? 'Przekierowanie...' : <>Wesprzyj Twórcę <Zap size={18} fill="currentColor" /></>}
            </button>

            <div className="flex flex-col items-center gap-4">
               <div className="flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-help">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Google_Pay_%28GPay%29_Logo_%282020%29.svg" className="h-4" alt="GPay" />
                  <div className="w-7 h-7 rounded-full bg-white/20 border border-white/10 flex items-center justify-center" title="MetaMask">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Mirror.svg" className="w-4 h-4" alt="MetaMask" />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/10 flex items-center justify-center font-black text-[10px] text-white" title="Revolut">R</div>
                  <CreditCard size={22} className="text-white" />
               </div>
               <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.6em]">Secure Protocol TipJar+</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
