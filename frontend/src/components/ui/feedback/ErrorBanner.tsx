"use client";

import React from "react";
import clsx from "clsx";
import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "@/components/ui/buttons/Button";

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function ErrorBanner({
  message,
  onRetry,
  className,
  dismissible = false,
  onDismiss,
}: ErrorBannerProps) {
  return (
    <div
      className={clsx(
        "flex items-start gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded-xl",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-red-200">{message}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRetry}
          className="mt-2 text-red-300 hover:text-red-100"
          leftIcon={<RefreshCw size={14} />}
        >
          Try again
        </Button>
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-200 p-1"
          aria-label="Dismiss error"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}