
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

interface TipEntry {
  id: string;
  nickname: string;
  amount: number;
  message?: string;
  avatarUrl?: string;
}

export default function OverlayPage() {
  const { creatorId } = useParams();
  const [searchParams] = useSearchParams();
  const [queue, setQueue] = useState<TipEntry[]>([]);
  const [current, setCurrent] = useState<TipEntry | null>(null);

  const showQR = searchParams.get('qr') === 'true';
  const isTest = searchParams.get('test') === 'true';

  // Simulation logic for testing
  useEffect(() => {
    if (isTest) {
      const interval = setInterval(() => {
        const newTip: TipEntry = {
          id: Date.now().toString(),
          nickname: ['SuperFan', 'CryptoKing', 'Alex_Fan', 'Web3_Explorer', 'MoonWalker'][Math.floor(Math.random() * 5)],
          amount: Math.floor(Math.random() * 100) + 5,
          message: ['Dzięki za super stream! 🔥🚀', 'Lecimy na księżyc!', 'Najlepszy krypto kontent w sieci.', 'Kup sobie kawę ☕'][Math.floor(Math.random() * 4)],
        };
        setQueue(prev => [...prev, newTip]);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [isTest]);

  // FIFO Queue processing
  useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setQueue(rest);
      
      const timeout = setTimeout(() => {
        setCurrent(null);
      }, 6000); 
      
      return () => clearTimeout(timeout);
    }
  }, [current, queue]);

  const profileUrl = `${window.location.origin}/#/@${creatorId}`;

  return (
    <div className="h-screen w-screen overflow-hidden relative font-sans p-10 bg-transparent">
      {/* Alert Component */}
      <div className="fixed bottom-10 left-10">
        <AnimatePresence>
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: -50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              className="bg-[#006D6D]/95 backdrop-blur-md border-2 border-[#FFD700] p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-6 max-w-md text-white overflow-hidden relative"
            >
              {/* Special Effect for 50+ tips */}
              {current.amount >= 50 && (
                <div className="absolute inset-0 bg-[#FFD700]/10 animate-pulse pointer-events-none" />
              )}
              
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD700] to-[#A27A00] flex-shrink-0 border-4 border-white/20 shadow-inner flex items-center justify-center text-white font-black text-3xl">
                {current.nickname[0]}
              </div>

              <div>
                <h4 className="text-[#FFD700] font-black text-xl italic tracking-tight">{current.nickname}</h4>
                <div className="flex items-center gap-2">
                   <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" className="w-5 h-5" alt="USDC" />
                   <span className="text-3xl font-black italic">+{current.amount.toFixed(2)} USDC</span>
                </div>
                {current.message && (
                  <p className="mt-2 text-sm text-emerald-50 font-medium leading-relaxed italic">"{current.message}"</p>
                )}
              </div>

              {current.amount >= 50 && (
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent QR Support */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 flex flex-col items-center gap-3"
          >
             <div className="bg-white p-3 rounded-2xl shadow-2xl border-4 border-[#006D6D]">
                <QRCodeSVG value={profileUrl} size={120} />
             </div>
             <div className="bg-[#006D6D] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                Wesprzyj Profil
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
