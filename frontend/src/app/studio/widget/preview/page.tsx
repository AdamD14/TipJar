"use client";


import React, { useState } from 'react';
import { useParams, useRouter, usePathname, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, Copy, Check, Smartphone, Monitor, Code2, 
  Settings2, Eye, PanelLeft, Minimize2, Maximize2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';
import TipModal from '@/components/payments/TipModal';

export default function WidgetPreview() {
  const [searchParams] = useSearchParams();
  
  // Config from URL
  const handle = searchParams.get('handle') || 'alex_streamer';
  const style = (searchParams.get('style') as 'button' | 'slider') || 'button';
  const label = searchParams.get('label') || 'Wesprzyj mnie';
  const shape = searchParams.get('shape') || 'rounded';

  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getRadius = () => {
    if (shape === 'circle') return '9999px';
    if (shape === 'square') return '0px';
    return '1.5rem';
  };

  const toggleModal = (state?: boolean) => {
    const newState = state ?? !isModalOpen;
    setIsModalOpen(newState);
    window.parent.postMessage({ type: 'TIPJAR_RESIZE', isOpen: newState }, '*');
  };

  return (
    <div className="h-full w-full flex items-end justify-end p-6 overflow-visible bg-transparent font-sans">
      {/* LAUNCHER: SLIDER MODE */}
      {style === 'slider' && !isModalOpen && (
        <div 
          className="relative flex items-center z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            initial={{ width: 0, opacity: 0, x: 20 }}
            animate={{ 
              width: isHovered ? 120 : 0, 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 20
            }}
            className="h-14 bg-[#003737]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-l-full flex items-center pr-10 pl-6 overflow-hidden"
          >
             <span className="text-[#FFD700] text-xs font-black italic uppercase tracking-widest">Tip Me</span>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleModal(true)}
            className="w-16 h-16 text-[#FFD700] shadow-[0_15px_40px_rgba(0,0,0,0.4)] border border-white/10 flex items-center justify-center text-3xl relative z-20"
            style={{ backgroundColor: '#003737', borderRadius: getRadius() }}
          >
            <Zap fill="currentColor" size={28} />
          </motion.button>
        </div>
      )}

      {/* LAUNCHER: BUTTON MODE */}
      {style === 'button' && !isModalOpen && (
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleModal(true)}
          className="px-8 py-4 text-[#FFD700] font-black shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 flex items-center gap-3 z-10 text-xs uppercase tracking-[0.2em] whitespace-nowrap backdrop-blur-md"
          style={{ backgroundColor: '#003737', borderRadius: getRadius() }}
        >
          <Sparkles size={18} /> {label}
        </motion.button>
      )}

      {/* THE TIP MODAL */}
      <TipModal username={handle} open={isModalOpen} onClose={() => toggleModal(false)} />
    </div>
  );
}
