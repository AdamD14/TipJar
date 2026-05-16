"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCheck, Sparkles, Zap, Trash2 } from 'lucide-react';
import Button from '@/components/ui/buttons/Button';
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
            className="fixed inset-0 bg-teal-900/80 backdrop-blur-sm z-modal"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full max-w-md bg-teal-800 shadow-modal z-tooltip flex flex-col"
          >
            <div className="p-8 border-b border-teal-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-teal-700 flex items-center justify-center text-teal-50">
                  <Bell size={20} />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl text-teal-25 italic">Notifications</h2>
                  <p className="text-[10px] font-heading font-black text-teal-100 uppercase tracking-widest">Studio Activity Log</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(false)} className="p-2 text-teal-100">
                <X size={24} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="bg-teal-700 p-6 rounded-lg text-teal-25 relative overflow-hidden group mb-4">
                <Sparkles size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-all ease-standard" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 text-gold-400">
                    <Zap size={14} fill="currentColor" />
                    <span className="text-[10px] font-heading font-black uppercase tracking-widest">Morning Briefing (AI)</span>
                  </div>
                  <p className="text-sm font-heading font-bold leading-relaxed italic text-teal-25">
                    &quot;Today is a great day to launch the &apos;Weekend Boost&apos; goal. Your fans are 15% more active on Friday mornings!&quot;
                  </p>
                </div>
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-20 opacity-30">
                  <Bell size={48} className="mx-auto mb-4 text-teal-100" />
                  <p className="font-heading font-bold italic text-teal-100">No new notifications</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`p-5 rounded-lg border transition-all cursor-pointer group relative ${
                      n.read ? 'bg-teal-800 border-teal-700 opacity-60' : 'bg-teal-700 border-teal-500/20 shadow-sm'
                    }`}
                  >
                    {!n.read && <div className="absolute top-5 right-5 w-2 h-2 bg-gold-400 rounded-full" />}
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${
                        n.type === 'success' ? 'bg-success-dark text-success-base' :
                        n.type === 'warning' ? 'bg-error-dark text-error-base' :
                        'bg-teal-700 text-info-base'
                      }`}>
                        {n.type === 'success' ? <CheckCheck size={18} /> : <Zap size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-heading font-bold text-teal-25">{n.title}</p>
                        <p className="text-xs text-teal-50 font-body font-medium mt-1 leading-relaxed">{n.message}</p>
                        <p className="text-[10px] font-heading font-black text-teal-100 uppercase mt-3 tracking-widest">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-teal-700">
              <Button variant="secondary" fullWidth className="py-4 text-xs uppercase tracking-widest">
                <Trash2 size={16} /> Clear All
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsDrawer;
