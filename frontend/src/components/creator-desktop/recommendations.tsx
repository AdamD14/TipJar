"use client";

import { useState, useEffect } from "react";
import { Lightbulb, TrendingUp, Users, Megaphone, Zap } from "lucide-react";
import Button from "@/components/ui/buttons/Button";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  impact: "high" | "medium" | "low";
}

const mockRecs: Recommendation[] = [
  {
    id: "1",
    title: "Share your profile on socials",
    description: "Creators who post their link on Twitter or Discord see 3x more tips in the first week.",
    icon: Megaphone,
    impact: "high",
  },
  {
    id: "2",
    title: "Set a streaming schedule",
    description: "Consistency builds loyalty. Fans who know when to tune in tip 40% more.",
    icon: Zap,
    impact: "high",
  },
  {
    id: "3",
    title: "Collaborate with another creator",
    description: "Cross-promotion expands your reach. Try a dual stream with someone in your niche.",
    icon: Users,
    impact: "medium",
  },
];

const impactStyles: Record<string, string> = {
  high: "bg-gold-400/10 text-gold-400 border-gold-400/20",
  medium: "bg-purple-300/10 text-purple-300 border-purple-300/20",
  low: "bg-teal-400/10 text-teal-400 border-teal-400/20",
};

export function Recommendations() {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecs(mockRecs);
      setLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="card-surface !p-6">
        <div className="skeleton-shimmer h-4 w-32 rounded mb-4" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i}>
              <div className="skeleton-shimmer h-3 w-40 rounded mb-2" />
              <div className="skeleton-shimmer h-3 w-full rounded" />
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
          Recommendations
        </h3>
        <span className="flex items-center gap-1.5 text-xs font-heading font-semibold text-gold-400">
          <Lightbulb className="w-3.5 h-3.5" />
          AI-powered
        </span>
      </div>

      {recs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
          <TrendingUp className="w-10 h-10 text-gold-400" />
          <p className="font-body text-sm text-text-secondary">
            We&apos;ll generate personalized tips once you start receiving support.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recs.map((rec, idx) => {
            const Icon = rec.icon;
            return (
              <div
                key={rec.id}
                className="flex gap-3 animate-fade-in"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <div className="w-9 h-9 rounded-lg bg-gold-400/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4.5 h-4.5 text-gold-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-heading font-semibold text-sm text-text-primary">
                      {rec.title}
                    </h4>
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded border text-[10px] font-heading font-semibold uppercase tracking-wider ${impactStyles[rec.impact]}`}
                    >
                      {rec.impact}
                    </span>
                  </div>
                  <p className="font-body text-xs text-text-tertiary leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            );
          })}

          <Button variant="ghost" size="sm" className="w-full text-xs text-gold-400 hover:text-gold-300 mt-1">
            View all tips
          </Button>
        </div>
      )}
    </div>
  );
}