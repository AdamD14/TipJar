"use client";

import Card from "@/components/ui/forms/Card";
import {
  Bell,
  Sparkles,
  ShieldAlert,
  MessageSquare,
  CheckCircle,
  Clock,
  Trash2,
} from "lucide-react";
import { useNotificationStore } from "@/lib/store/notificationStore";

function iconForType(type: string) {
  switch (type) {
    case "success":
      return { icon: <Sparkles size={18} />, cls: "bg-pink-500/10 text-pink-400 border border-pink-500/20" };
    case "warning":
    case "error":
      return { icon: <ShieldAlert size={18} />, cls: "bg-blue-500/10 text-blue-400 border border-blue-500/20" };
    default:
      return { icon: <MessageSquare size={18} />, cls: "bg-teal-500/10 text-teal-400 border border-teal-500/20" };
  }
}

export default function FanNotificationsPage() {
  const notifications = useNotificationStore((s) => s.notifications);
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div className="min-h-screen bg-gradient-main text-white selection:bg-teal-600/30 px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">

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

          {hasUnread && (
            <button
              onClick={markAllRead}
              className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/20 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
            >
              Mark all read
            </button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.map((n) => {
            const { icon, cls } = iconForType(n.type);
            return (
              <Card
                key={n.id}
                className={`border transition-all duration-300 rounded-3xl p-5 relative overflow-hidden flex justify-between items-center gap-4 ${
                  !n.read
                    ? "border-teal-500/20 bg-[#002424]/60"
                    : "border-teal-500/5 bg-[#002424]/20 opacity-80"
                }`}
              >
                {!n.read && (
                  <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-teal-400 to-emerald-400" />
                )}

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cls}`}>
                    {icon}
                  </div>

                  <div className="space-y-1">
                    {n.title && (
                      <p className={`text-xs font-black ${!n.read ? "text-teal-300" : "text-teal-400/60"}`}>
                        {n.title}
                      </p>
                    )}
                    <p className={`text-xs ${!n.read ? "text-white font-black" : "text-teal-400/80 font-medium"}`}>
                      {n.message}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-teal-400/40">
                      <Clock size={10} />
                      <span>{n.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="p-2 bg-teal-500/5 hover:bg-teal-500/20 text-teal-400 hover:text-white rounded-xl transition-all"
                      title="Mark as read"
                    >
                      <CheckCircle size={14} />
                    </button>
                  )}
                </div>
              </Card>
            );
          })}

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
