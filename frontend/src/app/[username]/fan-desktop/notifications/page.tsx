"use client";

import { useState } from "react";
import Card from "@/components/ui/forms/Card";
import { 
  Bell, 
  Sparkles, 
  ShieldAlert, 
  MessageSquare, 
  CheckCircle,
  Clock,
  Trash2
} from "lucide-react";

const INITIAL_NOTIFS = [
  { id: 1, kind: "tip", text: "@kate_premium thanked you for your premium subscription support! 💖", time: "1h ago", unread: true },
  { id: 2, kind: "post", text: "@coach_max added a new full-body fitness plan post in Studio. 💪", time: "3h ago", unread: true },
  { id: 3, kind: "system", text: "Security alert: You successfully authorized your Circle Smart Account.", time: "1d ago", unread: false },
];

export default function FanNotificationsPage({
  params,
}: {
  params: { username: string };
}) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markSingleRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-main text-white selection:bg-teal-600/30 px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-teal-500/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-header tracking-tight flex items-center gap-2 bg-gradient-to-r from-teal-100 to-white bg-clip-text text-transparent">
              <Bell className="text-teal-400" />
              Notifications
            </h1>
            <p className="text-sm text-[#ABE1E1]/70 leading-relaxed">
              Stay updated with content alerts, creator replies, and wallet transaction success messages.
            </p>
          </div>

          {notifications.some(n => n.unread) && (
            <button
              onClick={markAllRead}
              className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/20 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* List of Notifications */}
        <div className="space-y-4">
          {notifications.map((n) => (
            <Card
              key={n.id}
              className={`border transition-all duration-300 rounded-3xl p-5 relative overflow-hidden flex justify-between items-center gap-4 ${
                n.unread 
                  ? "border-teal-500/20 bg-[#002424]/60" 
                  : "border-teal-500/5 bg-[#002424]/20 opacity-80"
              }`}
            >
              {/* Unread indicator bar */}
              {n.unread && (
                <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-teal-400 to-emerald-400" />
              )}

              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  n.kind === "tip" 
                    ? "bg-pink-500/10 text-pink-400 border border-pink-500/20" 
                    : n.kind === "post" 
                    ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" 
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                }`}>
                  {n.kind === "tip" ? <Sparkles size={18} /> : n.kind === "post" ? <MessageSquare size={18} /> : <ShieldAlert size={18} />}
                </div>
                
                <div className="space-y-1">
                  <p className={`text-xs ${n.unread ? "text-white font-black" : "text-teal-400/80 font-medium"}`}>
                    {n.text}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-teal-400/40">
                    <Clock size={10} />
                    <span>{n.time}</span>
                  </div>
                </div>
              </div>

              {/* Action items */}
              <div className="flex items-center gap-2">
                {n.unread && (
                  <button
                    onClick={() => markSingleRead(n.id)}
                    className="p-2 bg-teal-500/5 hover:bg-teal-500/20 text-teal-400 hover:text-white rounded-xl transition-all"
                    title="Mark as read"
                  >
                    <CheckCircle size={14} />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(n.id)}
                  className="p-2 bg-red-500/5 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </Card>
          ))}

          {notifications.length === 0 && (
            <div className="py-16 text-center bg-[#002424]/20 border border-dashed border-teal-500/15 rounded-3xl">
              <span className="text-4xl">🔔</span>
              <h3 className="text-sm font-black text-white uppercase tracking-widest mt-4">All caught up!</h3>
              <p className="text-xs text-teal-400/50 mt-1">You have no new notifications.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
