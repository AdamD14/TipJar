import React from "react";

interface GoalBarProps {
  current: number;
  target: number;
  label: string;
  accent?: string;
}

export default function GoalBar({ current, target, label, accent = "#FFD700" }: GoalBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-white/60 mb-1 font-medium font-mono uppercase tracking-widest">
        <span>{label}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-4 bg-white/10 rounded-full overflow-hidden relative">
        <div 
          className="h-full transition-all duration-500 ease-out relative"
          style={{ width: `${percentage}%`, backgroundColor: accent }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
        <span>$0</span>
        <span>${target}</span>
      </div>
    </div>
  );
}
