"use client";

import { useState } from "react";
import { Clock, Target } from "lucide-react";
import Button from "@/components/ui/buttons/Button";

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  supporters: number;
  daysLeft: number | null;
}

const mockGoals: Goal[] = [
  { id: "1", title: "New Microphone Setup", current: 650, target: 1200, supporters: 18, daysLeft: 14 },
  { id: "2", title: "Studio Lighting Kit", current: 300, target: 800, supporters: 9, daysLeft: null },
];

export function ActiveGoals() {
  const [goals] = useState<Goal[]>(mockGoals);

  return (
    <div className="card-surface !p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-text-tertiary">
          Active Goals
        </h3>
        <span className="font-body text-xs text-text-quaternary">
          {goals.length} active
        </span>
      </div>

      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
          <Target className="w-10 h-10 text-purple-300" />
          <p className="font-body text-sm text-text-secondary">
            Set your first goal. Creators with goals receive 3x more support.
          </p>
          <Button variant="primary" size="sm">
            Create Goal
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {goals.map((goal) => {
            const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
            const isNearDeadline = goal.daysLeft !== null && goal.daysLeft <= 1;

            return (
              <div key={goal.id}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-heading font-semibold text-base text-text-primary">
                      {goal.title}
                    </h4>
                    <span className="font-body text-xs text-text-tertiary">
                      by {goal.supporters} supporters
                    </span>
                  </div>
                  {goal.daysLeft !== null && (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-heading font-semibold ${
                        isNearDeadline
                          ? "bg-error-dark/40 text-error-light animate-pulse"
                          : "bg-teal-700 text-text-tertiary"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      {goal.daysLeft}d left
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="relative h-2 bg-teal-700 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-spring"
                    style={{
                      width: `${pct}%`,
                      background: "linear-gradient(90deg, var(--gold-400), var(--purple-300))",
                    }}
                  />
                  {/* Milestone markers */}
                  {[25, 50, 75].map((ms) => (
                    <div
                      key={ms}
                      className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-teal-700 transition-all duration-500 ${
                        pct >= ms ? "bg-gold-400 border-gold-400" : "bg-teal-800"
                      }`}
                      style={{ left: `${ms}%`, transform: `translate(-50%, -50%)` }}
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-heading font-semibold text-sm text-gold-400 tnum">
                    ${goal.current.toLocaleString()}
                    <span className="text-text-quaternary font-normal ml-1">
                      / ${goal.target.toLocaleString()}
                    </span>
                  </span>
                  <span className="font-heading font-semibold text-xs text-text-tertiary">
                    {pct}%
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