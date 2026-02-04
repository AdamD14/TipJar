"use client";

import React from "react";
import Image from "next/image";

export interface Goal {
  title: string;
  target: number;
  current: number;
  deadline: string;
}

/**
 * GoalBar – Premium goal visualization with teal glassmorphism.
 */
export function GoalBar({ goal }: { goal: Goal }) {
  const percentage = Math.min((goal.current / (goal.target || 1)) * 100, 100);
  const radius = 18;

  // Format date to dd-mm-yyyy
  const formatDeadline = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="linear-gradient(135deg, #001919 0%, #093439 100%) border border-teal-500/20 rounded-xl p-2 shadow-2xl relative overflow-hidden group backdrop-blur-md">
      {/* Main Info Row */}
      <div className="flex justify-between items-center mb-2 gap-2">
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
        <div className="flex items-center gap-2 shrink-0">
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

          <div className="flex flex-col border-l border-teal-500/20 pl-2">
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
      <div className="relative mb-1">
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
          className="w-full bg-teal-500 text-black py-3 rounded-l text-lg font-black uppercase tracking-[0.2em] shadow-lg shadow-teal-500/20 hover:bg-teal-400 transition-all flex items-center justify-center gap-2"
        >
          <Image src="/logo.png" alt="" width={40} height={40} />
          TIP IT
        </button>
      </div>
    </div>
  );
// Re-export UnifiedLivePreview logic if it was intended to be shared,
// or implementation of a similar visual style for the dashboard.
// For now, we'll implement a visual match for the dashboard/preview context.

export function UnifiedLivePreview({ goal }: { goal: Goal }) {
  const percentage = Math.min((goal.current / (goal.target || 1)) * 100, 100);
  const radius = 18;

  const formatDeadline = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-gradient-to-br from-[#1a2e2e]/80 to-[#0A0A0B]/95 border border-teal-500/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden group backdrop-blur-md">
       {/* Recycle the premium design from TargetBar here for consistency */}
       <div className="flex justify-between items-center mb-6 gap-4">
        {/* Left: Goal */}
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold text-teal-500/40 uppercase tracking-widest mb-1">
            Goal
          </div>
          <h3 className="text-xl font-black text-white tracking-tight leading-tight line-clamp-2 font-sans">
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
               <span className="text-sm font-black text-white">
                  {Math.round(percentage)}%
                </span>
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                 <circle cx="28" cy="28" r={radius} stroke="rgba(20, 184, 166, 0.1)" strokeWidth="3" fill="transparent" />
                 <circle cx="28" cy="28" r={radius} stroke="currentColor" strokeWidth="3" fill="transparent"
                   strokeDasharray={2 * Math.PI * radius}
                   strokeDashoffset={2 * Math.PI * radius * (1 - percentage / 100)}
                   className="text-teal-400 transition-all duration-1000 ease-out" strokeLinecap="round" />
               </svg>
            </div>
          </div>
          
           <div className="flex flex-col border-l border-teal-500/20 pl-4">
            <span className="text-[10px] font-bold text-teal-500/40 uppercase tracking-widest">
              Target Amount
            </span>
            <span className="text-xl font-black text-teal-400 tracking-tight font-mono">
              ${goal.target.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
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
          <span className="text-lg text-white font-bold font-mono">
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
          <Image src="/logo.png" alt="" width={40} height={40} className="w-10 h-10 object-contain" />
          TIP IT
        </button>
      </div>

    </div>
  );
}
