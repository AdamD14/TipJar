"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Crosshair, PencilLine, Eye, CheckCircle2 } from "lucide-react";

interface Goal {
  title: string;
  target: number;
  current: number;
  deadline: string;
}

interface TargetBarProps {
  onPublish?: (goal: Goal) => void;
  initialGoal?: Partial<Goal>;
}

/**
 * UnifiedLivePreview – Premium goal visualization with teal glassmorphism.
 */
function UnifiedLivePreview({ goal }: { goal: Goal }) {
  const percentage = Math.min((goal.current / (goal.target || 1)) * 100, 100);
  const radius = 18;

  // Format date to dd-mm-yyyy
  const formatDeadline = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-gradient-to-br from-[#1a2e2e]/80 to-[#0A0A0B]/95 border border-teal-500/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden group backdrop-blur-md">
      {/* Main Info Row */}
      <div className="flex justify-between items-center mb-6 gap-4">
        {/* Left: Goal */}
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold text-teal-500/40 uppercase tracking-widest mb-1">
            Goal
          </div>
          <h3 className="text-xl font-black text-white tracking-tight leading-tight line-clamp-2">
            {(goal.title || "Goal Title").slice(0, 40)}
          </h3>
        </div>

        {/* Right: Progress Circle + Target */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-teal-500/40 uppercase tracking-widest mb-1">
              Progress
            </span>
            <div className="relative w-14 h-14 bg-teal-500/5 rounded-full flex items-center justify-center border border-teal-500/10 shadow-inner">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke="rgba(20, 184, 166, 0.05)"
                  strokeWidth="3"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * radius}
                  strokeDashoffset={
                    2 * Math.PI * radius * (1 - percentage / 100)
                  }
                  className="text-teal-400 transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-black text-white">
                  {Math.round(percentage)}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col border-l border-teal-500/20 pl-4">
            <span className="text-[10px] font-bold text-teal-500/40 uppercase tracking-widest">
              Target Amount
            </span>
            <span className="text-xl font-black text-teal-400 tracking-tight">
              ${goal.target.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Deadline (if exists) - above progress bar */}
      {goal.deadline && (
        <div className="flex justify-end mb-2">
          <span className="text-[10px] font-bold text-teal-500/40 uppercase tracking-widest">
            Deadline: {formatDeadline(goal.deadline)}
          </span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative mb-4">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-teal-600 to-teal-400 transition-all duration-700 ease-in-out relative"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
        <div className="flex justify-between text-[10px] font-bold text-teal-500/40 uppercase tracking-widest mt-2">
          <span>Funds raised</span>
          <span className="text-lg text-white font-bold">
            ${goal.current.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Tip Button */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          className="w-full bg-teal-500 text-black py-3 rounded-2xl text-lg font-black uppercase tracking-[0.2em] shadow-lg shadow-teal-500/20 hover:bg-teal-400 transition-all flex items-center justify-center gap-2"
        >
          <Image src="/logo.png" alt="" width={40} height={40} />
          TIP IT
        </button>
      </div>
    </div>
  );
}

/**
 * TargetBar – Full configuration + preview component for onboarding step-4.
 */
export default function TargetBar({ onPublish, initialGoal }: TargetBarProps) {
  const [goal, setGoal] = useState<Goal>({
    title: initialGoal?.title || "microphone",
    target: initialGoal?.target || 500,
    current: initialGoal?.current || 0,
    deadline: initialGoal?.deadline || "",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleUpdate = (field: keyof Goal, value: string | number) => {
    setGoal((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const publishGoal = () => {
    setIsSaved(true);
    if (onPublish) {
      onPublish(goal);
    }
  };

  return (
    <div className="w-full mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
        {/* LEFT: Configuration */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
            <PencilLine size={16} className="text-teal-400" />
            <h2 className="text-sm font-medium text-teal-400">Configuration</h2>
          </div>

          <div className="bg-[#0A0A0B]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl relative">
            {/* Goal */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Goal (max 40 characters)
              </label>
              <input
                type="text"
                value={goal.title}
                maxLength={40}
                onChange={(e) => handleUpdate("title", e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-teal-500 transition-all text-base font-medium"
              />
            </div>

            {/* Target + Deadline */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                  Target (USDC)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={goal.target}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    handleUpdate("target", val ? Number(val) : 0);
                  }}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-teal-500 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                  Deadline
                </label>
                <input
                  type="date"
                  value={goal.deadline}
                  onChange={(e) => handleUpdate("deadline", e.target.value)}
                  placeholder="Optional"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-teal-500 font-medium"
                />
              </div>
            </div>

            {/* Publish Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={publishGoal}
                className="group relative w-full overflow-hidden rounded-xl bg-teal-500 px-6 py-4 text-black font-bold uppercase tracking-widest shadow-xl transition-all hover:bg-teal-400"
              >
                <div className="relative flex items-center justify-center gap-2">
                  {isSaved ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Crosshair size={20} />
                  )}
                  {isSaved ? "Mission Accomplished" : "Set target"}
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* RIGHT: Synthesized Preview */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
            <Eye size={16} className="text-teal-400" />
            <h2 className="text-sm font-medium text-teal-400">
              Synthesized Preview
            </h2>
          </div>
          <UnifiedLivePreview goal={goal} />
        </section>
      </div>
    </div>
  );
}
