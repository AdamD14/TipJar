"use client";

import { useState, useEffect } from "react";
import { CircleDollarSign, Heart, MessageCircle, Flag, Diamond, WifiOff } from "lucide-react";

type ActivityType = "tip" | "follow" | "comment" | "goal_reached" | "subscription";

interface ActivityItem {
  id: string;
  type: ActivityType;
  user: string;
  userInitial: string;
  amount?: number;
  message?: string;
  timestamp: string;
}

const mockItems: ActivityItem[] = [
  { id: "1", type: "tip", user: "Marcin_K", userInitial: "M", amount: 25, message: "Great stream!", timestamp: "just now" },
  { id: "2", type: "follow", user: "CryptoPanda", userInitial: "C", timestamp: "2m ago" },
  { id: "3", type: "comment", user: "Fan_88", userInitial: "F", message: "When next stream?", timestamp: "15m ago" },
  { id: "4", type: "tip", user: "Alice.eth", userInitial: "A", amount: 100, timestamp: "1h ago" },
  { id: "5", type: "subscription", user: "BigDonor", userInitial: "B", message: "Gold Tier", timestamp: "2h ago" },
];

const typeConfig: Record<ActivityType, { icon: React.ElementType; color: string; bg: string }> = {
  tip: { icon: CircleDollarSign, color: "text-gold-400", bg: "bg-gold-400/10" },
  follow: { icon: Heart, color: "text-purple-300", bg: "bg-purple-300/10" },
  comment: { icon: MessageCircle, color: "text-teal-400", bg: "bg-teal-400/10" },
  goal_reached: { icon: Flag, color: "text-success-base", bg: "bg-success-base/10" },
  subscription: { icon: Diamond, color: "text-info-base", bg: "bg-info-base/10" },
};

export function LiveActivity() {
  const [items, setItems] = useState<ActivityItem[]>(mockItems);
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const newId = String(Date.now());
      const types: ActivityType[] = ["tip", "follow", "comment", "subscription"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const names = ["NewFan", "Whale_01", "SuperFan", "TipJarFan"];
      const newItem: ActivityItem = {
        id: newId,
        type: randomType,
        user: names[Math.floor(Math.random() * names.length)],
        userInitial: names[Math.floor(Math.random() * names.length)][0],
        amount: randomType === "tip" ? Math.floor(Math.random() * 200) + 5 : undefined,
        message: randomType === "comment" ? "🔥 Keep it up!" : undefined,
        timestamp: "just now",
      };
      setItems((prev) => [newItem, ...prev].slice(0, 6));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!connected) {
    return (
      <div className="card-surface !p-6">
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-text-tertiary mb-4">
          Live Activity
        </h3>
        <div className="flex flex-col items-center justify-center py-8 gap-3 text-text-tertiary">
          <WifiOff className="w-6 h-6 text-error-base" />
          <p className="font-body text-sm">Connection temporarily unavailable. Your support is safe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-surface !p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-text-tertiary">
          Live Activity
        </h3>
        <span className="flex items-center gap-1.5 text-xs font-heading font-semibold text-success-base">
          <span className="w-2 h-2 rounded-full bg-success-base animate-pulse" />
          Live
        </span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-text-tertiary">
          <p className="font-body text-sm">Waiting for your first activity.</p>
          <p className="font-body text-xs mt-1">
            When someone supports or follows you, it will appear here instantly.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm text-text-primary truncate">
                    <span className="font-semibold">{item.user}</span>
                    {item.type === "tip" && ` tipped $${item.amount}`}
                    {item.type === "follow" && " started following you"}
                    {item.type === "comment" && " commented"}
                    {item.type === "subscription" && ` subscribed to ${item.message}`}
                    {item.type === "goal_reached" && " — goal reached!"}
                  </p>
                  {item.message && item.type !== "subscription" && (
                    <p className="font-body text-xs text-text-tertiary truncate">"{item.message}"</p>
                  )}
                </div>

                <span className="font-body text-xs text-text-quaternary shrink-0">
                  {item.timestamp}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}