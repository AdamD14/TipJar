"use client";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: "gold" | "outline";
};

export function Button({ variant = "gold", className, ...props }: ButtonProps) {
  const base = "rounded-xl px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    gold: "bg-[#FFD700] text-black hover:bg-[#e6c200]",
    outline: "border border-white/20 text-white hover:bg-white/10",
  };
  return <button className={clsx(base, variants[variant], className)} {...props} />;
}
