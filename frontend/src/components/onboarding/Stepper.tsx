import React from "react";
import clsx from "clsx";

export default function Stepper({ active }: { active: 1 | 2 | 3 | 4 | 5 }) {
  const steps = [
    { id: 1, label: "Identity" },
    { id: 2, label: "Avatar" },
    { id: 3, label: "Bio & Social" },
    { id: 4, label: "Goal" },
    { id: 5, label: "Ready" },
  ] as const;

  const progressPercentage = ((active - 1) / (steps.length - 1)) * 100;

  return (
    <div className="relative w-full px-2">
      {/* Progress track */}
      <div className="absolute top-4.5 md:top-6 left-0 w-full h-0.5 bg-teal-700/30 rounded-full overflow-hidden transition-all duration-300">
        <div
          className="h-full bg-gold-400 shadow-[0_0_10px_rgba(255,215,0,0.3)] transition-all duration-700 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between w-full">
        {steps.map((s) => {
          const isActive = s.id === active;
          const isDone = s.id < active;

          return (
            <div key={s.id} className="flex flex-col items-center group relative">
              {/* Circle */}
              <div
                className={clsx(
                  "w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-500 z-10",
                  "text-xs md:text-sm",
                  isActive
                    ? "bg-gold-400 border-gold-400 text-teal-900 scale-125 shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                    : isDone
                      ? "bg-teal-800 border-gold-400 text-gold-400"
                      : "bg-teal-900 border-teal-700 text-teal-600"
                )}
              >
                {isDone ? "✓" : s.id}
              </div>

              {/* Label */}
              <span
                className={clsx(
                  "absolute top-10 md:top-14 w-32 text-center font-medium tracking-widest uppercase transition-all duration-500",
                  "text-[10px] md:text-sm",
                  isActive
                    ? "text-white opacity-100 translate-y-0"
                    : isDone
                      ? "text-gold-400/60 opacity-70"
                      : "text-teal-600 opacity-0 md:opacity-100"
                )}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}