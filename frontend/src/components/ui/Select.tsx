import React from "react";
import clsx from "clsx";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export default function Select({ className, invalid, ...rest }: Props) {
  return (
    <div className="relative">
      <select
        className={clsx(
          "w-full h-12 rounded-xl bg-white/5 text-white appearance-none cursor-pointer",
          "px-4 pr-10 border border-white/10 focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 focus:bg-white/10",
          "outline-none transition-all duration-200 font-ui",
          invalid && "border-red-500/50",
          className
        )}
        {...rest}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  );
}