"use client";

import React from "react";
import clsx from "clsx";
import Button from "@/components/ui/buttons/Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "ghost";
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center py-16 px-6 bg-black/40 border border-white/10 rounded-2xl",
        className
      )}
      role="status"
      aria-live="polite"
    >
      {icon && (
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/30">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-heading font-semibold text-text-ds-primary mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-text-ds-secondary mb-6 max-w-xs">{description}</p>
      )}
      {action && (
        <Button
          variant={action.variant ?? "primary"}
          size="sm"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}