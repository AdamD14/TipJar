"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCheck, Sparkles, Zap, Trash2 } from 'lucide-react';
import { useNotificationStore } from '@/lib/store/notificationStore';

const NotificationsDrawer: React.FC = () => {
  const { isDrawerOpen, setDrawerOpen, notifications, markAsRead } = useNotificationStore();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#006D6D]">
                  <Bell size={20} />
                </div>
                <div>
                  <h2 className="font-black text-xl text-slate-800 italic">Powiadomienia</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Studio Activity Log</p>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="bg-[#003737] p-6 rounded-[2.5rem] text-white relative overflow-hidden group mb-4">
                <Sparkles size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 text-[#FFD700]">
                    <Zap size={14} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Morning Briefing (AI)</span>
                  </div>
                  <p className="text-sm font-bold leading-relaxed italic text-emerald-50">
                    &quot;Dziś jest świetny dzień na uruchomienie celu &apos;Weekend Boost&apos;. Twoi fani są o 15% bardziej aktywni w piątki rano!&quot;
                  </p>
                </div>
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-20 opacity-30">
                  <Bell size={48} className="mx-auto mb-4" />
                  <p className="font-black italic">Brak nowych powiadomień</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer group relative ${
                      n.read ? 'bg-white border-slate-100 opacity-60' : 'bg-slate-50 border-[#006D6D]/20 shadow-sm'
                    }`}
                  >
                    {!n.read && <div className="absolute top-5 right-5 w-2 h-2 bg-[#006D6D] rounded-full" />}
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        n.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                        n.type === 'warning' ? 'bg-rose-50 text-rose-500' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {n.type === 'success' ? <CheckCheck size={18} /> : <Zap size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-slate-800">{n.title}</p>
                        <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{n.message}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase mt-3 tracking-widest">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-slate-100">
              <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 transition-all flex items-center justify-center gap-2">
                <Trash2 size={16} /> Wyczyść Wszystko
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsDrawer;
