"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import GoalBadge from './GoalBadge';

interface GoalMiniModalProps {
  title: string;
  current: number;
  target: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function GoalMiniModal({ title, current, target, isOpen, onClose }: GoalMiniModalProps) {
  const percent = Math.round((current / target) * 100);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-24 right-6 w-72 bg-teal-800/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl z-[90] ring-1 ring-white/20 overflow-hidden"
    >
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gold-400 flex items-center justify-center text-teal-900">
              <Zap size={14} fill="currentColor" />
            </div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Aktualny Cel</h4>
          </div>
          <GoalBadge percent={percent} amount={current} goal={target} currency="USDC" />
        </div>

        <div>
          <p className="text-sm font-black text-white italic line-clamp-1">{title}</p>
        </div>

        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gold-400 rounded-full transition-all duration-[1500ms]"
            style={{ width: `${percent}%` }}
          />
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase text-white/40 tracking-widest transition-all"
        >
          Zamknij podgląd
        </button>
      </div>
    </motion.div>
  );
}
