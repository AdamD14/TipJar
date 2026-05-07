
import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, CheckCircle2, Zap, Target } from 'lucide-react';

// Exporting Goal interface so it can be used in other components/pages.
export interface Goal {
  id: string | number;
  title: string;
  raised: number;
  targetAmount: number;
  description?: string;
  active: boolean;
}

/* Using React.FC to ensure standard React props like 'key' are handled correctly by TypeScript, 
   fixing the error: Type '{ key: any; g: any; }' is not assignable to type '{ g: Goal; }'. */
const GoalCard: React.FC<{ g: Goal }> = ({ g }) => {
  const pct = Math.min(100, Math.round((g.raised / Math.max(1, g.targetAmount)) * 100));
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm group hover:shadow-xl transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform"><Target size={60} /></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="font-black text-xl italic text-slate-800">{g.title}</div>
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${g.active ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
          {g.active ? 'Active' : 'Inactive'}
        </span>
      </div>

      {g.description && <div className="text-sm text-slate-400 font-medium italic mb-6 leading-relaxed line-clamp-2">"{g.description}"</div>}

      <div className="space-y-3">
        <div className="h-3 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            className="h-full bg-[#006D6D] rounded-full shadow-[0_0_10px_rgba(0,109,109,0.3)]" 
          />
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-lg font-black italic text-[#006D6D]">{(g.raised / 100).toFixed(2)} USDC</span>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Cel: {(g.targetAmount / 100).toFixed(2)} USDC ({pct}%)</span>
        </div>
      </div>

      <div className="mt-8 flex gap-2">
        <button className="flex-1 px-4 py-3 rounded-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
          <Edit3 size={14} /> Edytuj
        </button>
        {g.active ? (
          <button className="flex-1 px-4 py-3 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Zakończ</button>
        ) : (
          <button className="flex-1 px-4 py-3 rounded-xl bg-[#006D6D] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#005a5a] transition-all">Aktywuj</button>
        )}
      </div>
    </motion.div>
  );
};

export default GoalCard;
