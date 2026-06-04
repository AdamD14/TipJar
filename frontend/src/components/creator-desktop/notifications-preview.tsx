"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff, CircleDollarSign, Users, ShieldCheck, Info } from "lucide-react";
import Button from "@/components/ui/buttons/Button";

type NotifKind = "tip" | "follow" | "system" | "milestone";

interface Notification {
  id: string;
  kind: NotifKind;
  message: string;
  read: boolean;
  timestamp: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    kind: "tip",
    message: "BigDonor tipped you $100.00 — &quot;Amazing content, keep it up!&quot;",
    read: false,
    timestamp: "5m ago",
  },
  {
    id: "2",
    kind: "follow",
    message: "CryptoPanda started following you",
    read: false,
    timestamp: "1h ago",
  },
  {
    id: "3",
    kind: "milestone",
    message: "You reached 50 followers! New badge unlocked.",
    read: true,
    timestamp: "3h ago",
  },
  {
    id: "4",
    kind: "system",
    message: "Your wallet has been verified. Payouts are now available.",
    read: true,
    timestamp: "1d ago",
  },
];

const kindConfig: Record<NotifKind, { icon: React.ElementType; color: string; bg: string }> = {
  tip: { icon: CircleDollarSign, color: "text-gold-400", bg: "bg-gold-400/10" },
  follow: { icon: Users, color: "text-purple-300", bg: "bg-purple-300/10" },
  milestone: { icon: ShieldCheck, color: "text-success-base", bg: "bg-success-base/10" },
  system: { icon: Info, color: "text-teal-400", bg: "bg-teal-400/10" },
};

export function NotificationsPreview() {
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifs(mockNotifications);
      setHasUnread(mockNotifications.some((n) => !n.read));
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
    setHasUnread((prev) =>
      prev && notifs.filter((n) => n.id !== id).every((n) => n.read),
    );
  };

  if (loading) {
    return (
      <div className="card-surface !p-6">
        <div className="skeleton-shimmer h-4 w-28 rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="skeleton-shimmer w-10 h-10 rounded-lg shrink-0" />
              <div className="flex-1">
                <div className="skeleton-shimmer h-3 w-full rounded mb-1" />
                <div className="skeleton-shimmer h-3 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="card-surface !p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-text-tertiary">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-gold-400 flex items-center justify-center text-[10px] font-heading font-bold text-teal-900">
              {unreadCount}
            </span>
          )}
        </div>
        {notifs.length > 0 && (
          <Button variant="ghost" size="sm" className="text-xs text-gold-400 hover:text-gold-300">
            See all
          </Button>
        )}
      </div>

      {notifs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
          <BellOff className="w-10 h-10 text-text-quaternary" />
          <p className="font-body text-sm text-text-secondary">
            All caught up! No new notifications.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifs.slice(0, 4).map((notif, idx) => {
            const cfg = kindConfig[notif.kind];
            const Icon = cfg.icon;

            return (
              <div
                key={notif.id}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors duration-200 animate-fade-in ${
                  notif.read ? "opacity-60" : "bg-teal-800"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`w-10 h-10 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${cfg.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="font-body text-sm text-text-primary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: notif.message }}
                  />
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="font-body text-xs text-text-quaternary">
                      {notif.timestamp}
                    </span>
                    {!notif.read && (
                      <button
                        onClick={() => dismiss(notif.id)}
                        className="font-body text-xs text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        Dismiss
                      </button>
                    )}
                  </div>
                </div>

                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0 mt-1.5" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}