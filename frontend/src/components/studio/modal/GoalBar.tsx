"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";

export interface Goal {
  title: string;
  target: number;
  current: number;
  deadline: string;
}

function formatDeadline(dateStr: string) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function GoalBar({ goal }: { goal: Goal }) {
  const percentage = Math.min((goal.current / (goal.target || 1)) * 100, 100);
  const displayCurrent = goal.current > 0 ? `$${goal.current.toLocaleString()}` : "—";

  return (
    <div
      className={clsx(
        "relative overflow-hidden group",
        "bg-gradient-to-br from-teal-900 to-teal-800",
        "border border-teal-500/20",
        "rounded-xl p-6",
        "shadow-2",
        "backdrop-blur-md",
      )}
    >
      {/* Main Info Row */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mb-1">
            Goal
          </p>
          <h3 className="text-xl font-heading font-bold text-text-ds-primary tracking-tight leading-tight line-clamp-2">
            {(goal.title || "Goal Title").slice(0, 40)}
          </h3>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Target */}
          <div className="flex flex-col border-l border-teal-500/20 pl-3">
            <span className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest">
              Target
            </span>
            <span className="text-xl font-heading font-bold text-gold-400 tracking-tight tnum">
              ${goal.target.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Deadline */}
      {goal.deadline && (
        <div className="flex justify-end mb-2">
          <span className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest">
            Deadline: {formatDeadline(goal.deadline)}
          </span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative mb-1">
        <div className="h-2 bg-teal-850 rounded-full overflow-hidden border border-white/[0.05]">
          <div
            className="h-full bg-gradient-to-r from-teal-600 to-gold-400 transition-all duration-700 ease-standard relative"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mt-2">
          <span>Funds raised</span>
          <span className="text-lg font-heading font-bold text-text-ds-primary tnum">
            {displayCurrent}
          </span>
        </div>
      </div>
    </div>
  );
}

export function UnifiedLivePreview({ goal }: { goal: Goal }) {
  const percentage = Math.min((goal.current / (goal.target || 1)) * 100, 100);
  const displayCurrent = goal.current > 0 ? `$${goal.current.toLocaleString()}` : "—";

  return (
    <div
      className={clsx(
        "relative overflow-hidden group",
        "bg-gradient-to-br from-teal-900/80 to-teal-900/95",
        "border border-teal-500/20",
        "rounded-2xl p-6",
        "shadow-2",
        "backdrop-blur-md",
      )}
    >
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mb-1">
            Goal
          </p>
          <h3 className="text-xl font-heading font-bold text-text-ds-primary tracking-tight leading-tight line-clamp-2">
            {(goal.title || "Goal Title").slice(0, 40)}
          </h3>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col border-l border-teal-500/20 pl-4">
            <span className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest">
              Target Amount
            </span>
            <span className="text-xl font-heading font-bold text-gold-400 tracking-tight tnum">
              ${goal.target.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-4">
        <div className="h-2 bg-teal-850 rounded-full overflow-hidden border border-white/[0.05]">
          <div
            className="h-full bg-gradient-to-r from-teal-600 to-gold-400 transition-all duration-700 ease-standard relative"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mt-2">
          <span>Funds raised</span>
          <span className="text-lg font-heading font-bold text-text-ds-primary tnum">
            {displayCurrent}
          </span>
        </div>
      </div>
    </div>
  );
}
