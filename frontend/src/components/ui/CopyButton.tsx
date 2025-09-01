"use client";
import { useState } from 'react';

export default function CopyButton({ value, label = 'Copy', copiedLabel = 'Copied', className = '' }: { value: string; label?: string; copiedLabel?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  return (
    <button onClick={onCopy} className={`px-3 py-2 rounded-lg border border-white/15 text-sm ${className}`}
            aria-live="polite" aria-label={copied ? copiedLabel : label}>
      {copied ? copiedLabel : label}
    </button>
  );
}

