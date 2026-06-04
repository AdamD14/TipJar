"use client";

import { useState, useEffect } from "react";
import { CircleDollarSign, Heart, Star } from "lucide-react";
import Button from "@/components/ui/buttons/Button";

interface Supporter {
  id: string;
  name: string;
  initial: string;
  amount: number;
  message?: string;
  tier?: "bronze" | "silver" | "gold";
  timestamp: string;
}

const mockSupporters: Supporter[] = [
  {
    id: "1",
    name: "Marcin_K",
    initial: "M",
    amount: 50,
    message: "You deserve it!",
    tier: "gold",
    timestamp: "5m ago",
  },
  {
    id: "2",
    name: "Alice.eth",
    initial: "A",
    amount: 25,
    tier: "silver",
    timestamp: "1h ago",
  },
  {
    id: "3",
    name: "StreamFan99",
    initial: "S",
    amount: 10,
    message: "Keep it up!",
    timestamp: "3h ago",
  },
  {
    id: "4",
    name: "BigDonor",
    initial: "B",
    amount: 100,
    tier: "gold",
    timestamp: "1d ago",
  },
];

const tierBadge: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  gold: { icon: Star, label: "Gold", color: "text-gold-400 bg-gold-400/10" },
  silver: { icon: Star, label: "Silver", color: "text-purple-300 bg-purple-300/10" },
  bronze: { icon: Heart, label: "Bronze", color: "text-teal-400 bg-teal-400/10" },
};

export function RecentSupport() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSupporters(mockSupporters);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="card-surface !p-6">
        <div className="skeleton-shimmer h-4 w-28 rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="skeleton-shimmer w-9 h-9 rounded-full" />
              <div className="flex-1">
                <div className="skeleton-shimmer h-3 w-24 rounded mb-1" />
                <div className="skeleton-shimmer h-3 w-16 rounded" />
              </div>
              <div className="skeleton-shimmer h-4 w-12 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-surface !p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-text-tertiary">
          Recent Support
        </h3>
        {supporters.length > 0 && (
          <Button variant="ghost" size="sm" className="text-xs text-gold-400 hover:text-gold-300">
            View all
          </Button>
        )}
      </div>

      {supporters.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
          <CircleDollarSign className="w-10 h-10 text-gold-400" />
          <p className="font-body text-sm text-text-secondary">
            No supporters yet. Share your profile to start receiving tips.
          </p>
          <Button variant="primary" size="sm">
            Share profile
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {supporters.slice(0, 4).map((s, idx) => {
            const badge = s.tier ? tierBadge[s.tier] : null;
            const BadgeIcon = badge?.icon;

            return (
              <div
                key={s.id}
                className="flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="w-9 h-9 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                  <span className="font-heading font-semibold text-sm text-gold-400">
                    {s.initial}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-body font-semibold text-sm text-text-primary truncate">
                      {s.name}
                    </span>
                    {badge && BadgeIcon && (
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-heading font-semibold ${badge.color}`}
                      >
                        <BadgeIcon className="w-2.5 h-2.5" />
                        {badge.label}
                      </span>
                    )}
                  </div>
                  {s.message && (
                    <p className="font-body text-xs text-text-tertiary truncate">
                      &ldquo;{s.message}&rdquo;
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="font-heading font-semibold text-sm text-gold-400 tnum block">
                    +${s.amount}
                  </span>
                  <span className="font-body text-[10px] text-text-quaternary">
                    {s.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}