"use client";

import { useState } from "react";
import clsx from "clsx";
import Button from "@/components/ui/buttons/Button";

interface CopyButtonProps {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

export default function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      
      // Haptic feedback na mobile
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(10); // 10ms wibracja
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      variant="glass"
      size="sm"
      onClick={onCopy}
      className={clsx(
        "relative overflow-hidden",
        "transition-all duration-300 [transition-timing-function:var(--ease-spring)]",
        copied && "[&>span]:scale-110 [&>span]:text-gold-400",
        className
      )}
      aria-live="polite"
      aria-label={copied ? copiedLabel : label}
    >
      {/* Sheen animation on copy */}
      {copied && (
        <span
          className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,215,0,0.3),transparent)] -translate-x-[140%] animate-sheen"
          aria-hidden="true"
        />
      )}
      
      {/* Icon + text */}
      <span className="relative inline-flex items-center gap-1.5">
        {copied ? (
          <>
            <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gold-400">{copiedLabel}</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{label}</span>
          </>
        )}
      </span>
    </Button>
  );
}