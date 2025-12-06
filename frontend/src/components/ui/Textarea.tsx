import React, { forwardRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all ${
          error ? "border-red-400 focus:ring-red-400" : ""
        } ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
