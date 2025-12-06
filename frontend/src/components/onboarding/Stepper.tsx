import React from "react";
import clsx from "clsx";

export default function Stepper({ active }: { active: 1 | 2 | 3 }) {
  const steps = [
    { id: 1, label: "Identity" },
    { id: 2, label: "Bio & Goal" },
    { id: 3, label: "Ready" },
  ] as const;

  return (
    <div className="relative">
      {/* Linia tła */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 rounded-full" />
      
      <div className="relative flex justify-between">
        {steps.map((s) => {
          const isActive = s.id === active;
          const isDone = s.id < active;
          
          return (
            <div key={s.id} className="flex flex-col items-center gap-3 group">
              <div 
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 z-10",
                  isActive ? "bg-brand-gold border-brand-gold text-brand-dark scale-110 shadow-[0_0_15px_rgba(255,215,0,0.4)]" :
                  isDone ? "bg-brand-primary border-brand-gold text-brand-gold" :
                  "bg-brand-dark border-white/20 text-white/40"
                )}
              >
                {isDone ? "✓" : s.id}
              </div>
              <span className={clsx(
                "text-xs font-medium tracking-wide uppercase transition-colors absolute top-10",
                isActive ? "text-white" : "text-white/40"
              )}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}