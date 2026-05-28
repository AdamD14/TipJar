"use client";

import { useState } from "react";
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
      className={className}
      aria-live="polite"
      aria-label={copied ? copiedLabel : label}
    >
      {copied ? copiedLabel : label}
    </Button>
  );
}