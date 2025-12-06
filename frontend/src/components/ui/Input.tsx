import React, { forwardRef } from "react";
import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, invalid, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      className={clsx(
        "w-full h-12 rounded-xl bg-white/5 text-white placeholder-white/30",
        "px-4 border border-white/10 focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 focus:bg-white/10",
        "outline-none transition-all duration-200 font-ui",
        invalid && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
        className
      )}
      {...rest}
    />
  );
});

export default Input;