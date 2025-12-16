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

  // Obliczamy postęp w %
  const progressPercentage = ((active - 1) / (steps.length - 1)) * 100;

  return (
    <div className="relative w-full px-2">
      {/* Kontener paska (Linia tła)
         Mobile: top-4.5 (18px - środek h-9)
         Desktop: md:top-6 (24px - środek h-12)
      */}
      <div className="absolute top-4.5 md:top-6 left-0 w-full h-0.5 bg-white/5 rounded-full overflow-hidden transition-all duration-300">
        {/* Wypełniony pasek (złoty) */}
        <div 
          className="h-full bg-brand-gold shadow-[0_0_10px_#CFB56B] transition-all duration-700 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Kroki */}
      <div className="relative flex justify-between w-full">
        {steps.map((s) => {
          const isActive = s.id === active;
          const isDone = s.id < active;
          
          return (
            <div key={s.id} className="flex flex-col items-center group relative">
              
              {/* Kółko */}
              <div 
                className={clsx(
                  // Mobile: w-9 h-9 (36px), Desktop: w-12 h-12 (48px)
                  "w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-500 z-10",
                  // Mobile: text-xs, Desktop: text-sm (większa czcionka numeru)
                  "text-xs md:text-sm",
                  isActive 
                    ? "bg-brand-gold border-brand-gold text-brand-dark scale-125 shadow-[0_0_20px_rgba(207,181,107,0.5)]" 
                    : isDone 
                      ? "bg-brand-primary border-brand-gold text-brand-gold" 
                      : "bg-brand-dark border-white/10 text-white/20"
                )}
              >
                {isDone ? "✓" : s.id}
              </div>

              {/* Etykieta (Label) */}
              <span className={clsx(
                // Pozycja: Mobile top-10, Desktop top-14 (bo kółko jest większe)
                "absolute top-10 md:top-14 w-32 text-center font-medium tracking-widest uppercase transition-all duration-500",
                // Mobile: text-[10px], Desktop: text-sm (większy tekst)
                "text-[10px] md:text-sm",
                isActive 
                  ? "text-white opacity-100 translate-y-0" 
                  : isDone
                    ? "text-brand-gold/60 opacity-70"
                    : "text-white/20 opacity-0 md:opacity-100"
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