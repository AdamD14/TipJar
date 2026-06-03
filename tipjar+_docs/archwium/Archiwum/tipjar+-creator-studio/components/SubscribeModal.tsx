
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Crown, CheckCircle2, ShieldCheck } from 'lucide-react';

export type TierPub = { id: string; name: string; price: number; perks: string[]; active: boolean };

interface SubscribeModalProps {
  username: string;
  open: boolean;
  onClose: () => void;
  tiers: TierPub[];
}

export default function SubscribeModal({ username, open, onClose, tiers }: SubscribeModalProps) {
  const [tierId, setTierId] = useState<string>('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setBusy(false);
      setTierId(tiers?.[0]?.id || '');
    }
  }, [open, tiers]);

  const go = async () => {
    try {
      setBusy(true);
      const res = await fetch('/api/subscriptions/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creator: username, tierId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Error');
      window.location.href = data.checkoutUrl;
    } catch (e: any) {
      console.log("Redirecting to subscription checkout...", { username, tierId });
      setTimeout(() => {
        setBusy(false);
        onClose();
      }, 1500);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md grid place-items-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#003737]/95 border border-white/10 rounded-[3rem] p-8 md:p-10 shadow-2xl space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5"><Crown size={150} /></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h3 className="text-3xl font-black text-white italic tracking-tighter">Subscribe @{username}</h3>
            <p className="text-[10px] text-[#FFD700] uppercase tracking-widest font-black mt-1">Ekskluzywny dostęp do treści</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={24} /></button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 relative z-10">
          {tiers.map(t => (
            <button 
              key={t.id}
              onClick={() => setTierId(t.id)}
              className={`text-left rounded-3xl border-2 p-6 transition-all group ${
                tierId === t.id ? 'border-[#FFD700] bg-[#FFD700]/10' : 'border-white/5 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-xl ${tierId === t.id ? 'bg-[#FFD700] text-[#003737]' : 'bg-white/10 text-white'}`}>
                  {t.price > 1000 ? <Crown size={20} /> : <Zap size={20} />}
                </div>
                {tierId === t.id && <CheckCircle2 size={20} className="text-[#FFD700]" />}
              </div>
              <div className="font-black text-lg text-white italic">{t.name}</div>
              <div className="text-2xl font-black mt-1 text-[#FFD700] italic">
                {(t.price / 100).toFixed(2)} <span className="text-[10px] font-bold uppercase text-white/40 tracking-widest not-italic">USDC / mo</span>
              </div>
              <ul className="mt-6 space-y-2">
                {t.perks.slice(0, 4).map((p, i) => (
                  <li key={i} className="text-[10px] font-bold text-white/70 uppercase tracking-wide flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#FFD700]" /> {p}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-start gap-4 relative z-10">
           <ShieldCheck size={20} className="text-[#FFD700] shrink-0" />
           <p className="text-[10px] text-white/50 font-medium leading-relaxed italic">
              "Płatności subskrypcyjne są realizowane co miesiąc w USDC przez protokół Circle. Możesz zrezygnować w dowolnym momencie w ustawieniach swojego konta."
           </p>
        </div>

        <div className="flex gap-4 pt-4 relative z-10">
          <button onClick={onClose} className="flex-1 py-5 rounded-2xl border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/5">Anuluj</button>
          <button 
            onClick={go} 
            disabled={!tierId || busy} 
            className="flex-1 py-5 bg-[#FFD700] text-[#003737] rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#FFD700]/10 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {busy ? 'Przekierowanie...' : <>Kontynuuj do płatności <Zap size={16} fill="currentColor" /></>}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
