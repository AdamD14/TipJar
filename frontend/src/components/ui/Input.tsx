"use client";
import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
};

export function Input({ label, error, className, ...rest }: InputProps) {
  const id = React.useId();
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-sm text-[#DDE0DA]">{label}</span>
      )}
      <input
        id={id}
        {...rest}
        className={[
          "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]",
          className || "",
        ].join(" ")}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error && (
        <span id={`${id}-err`} className="mt-1 block text-xs text-red-300">
          {error}
        </span>
      )}
    </label>
  );
}

