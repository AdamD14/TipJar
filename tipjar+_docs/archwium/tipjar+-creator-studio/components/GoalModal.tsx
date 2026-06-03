
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Target, Zap } from 'lucide-react';

interface GoalModalProps {
  onClose: () => void;
  onSaved: (goal: any) => void;
}

export default function GoalModal({ onClose, onSaved }: GoalModalProps) {
  const [f, setF] = useState({ title: '', targetAmount: '', description: '' });
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    try {
      setBusy(true);
      // Logic adjusted to match user's backend expectations (cents conversion)
      const payload = {
        title: f.title,
        targetAmount: Math.round(Number(f.targetAmount) * 100),
        description: f.description || undefined
      };
      
      console.log("Saving goal to /api/v1/goal...", payload);
      
      // Simulation of API call
      setTimeout(() => {
        onSaved({ ...payload, raised: 0, active: true, id: Date.now() });
        setBusy(false);
        onClose();
      }, 1000);
    } catch (e) {
      alert("Błąd zapisu celu");
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md grid place-items-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#003737] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-white italic flex items-center gap-2">
            <Target className="text-[#FFD700]" size={24} /> Nowy Cel
          </h3>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X size={24} /></button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Tytuł Celu</label>
            <input 
              value={f.title} 
              onChange={(e) => setF({ ...f, title: e.target.value })} 
              placeholder="np. Nowa kamera 4K"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-[#FFD700] transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Kwota Docelowa (USDC)</label>
            <input 
              type="number" 
              value={f.targetAmount} 
              onChange={(e) => setF({ ...f, targetAmount: e.target.value })} 
              placeholder="100.00"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-[#FFD700] transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Opis (opcjonalnie)</label>
            <textarea 
              value={f.description} 
              onChange={(e) => setF({ ...f, description: e.target.value })} 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white/80 focus:outline-none focus:border-[#FFD700] transition-all h-24 resize-none" 
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button onClick={onClose} className="flex-1 py-4 rounded-2xl border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">Anuluj</button>
          <button 
            onClick={submit} 
            disabled={busy || !f.title || !f.targetAmount}
            className="flex-1 py-4 bg-[#FFD700] text-[#003737] rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#FFD700]/10 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {busy ? 'Tworzenie...' : 'Utwórz Cel'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
