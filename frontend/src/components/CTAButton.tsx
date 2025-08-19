"use client";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { glow?: boolean };

export default function CTAButton({ className, glow = true, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        "font-ui inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold tracking-wide bg-brand-gold text-black transition-transform duration-150",
        glow && "shadow-[0_0_0_0_rgba(255,215,0,0.7)] hover:shadow-[0_0_24px_0_rgba(255,215,0,0.85)] hover:scale-[1.02]",
        className
      )}
    />
  );
}