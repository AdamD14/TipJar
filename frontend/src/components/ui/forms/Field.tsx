import React from "react";

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export default function Field({ label, htmlFor, hint, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label 
        htmlFor={htmlFor} 
        className="text-sm font-body [font-weight:var(--font-weight-medium)] text-text-ds-secondary"
      >
        {label}
      </label>
      {children}
      {hint && (
        <p 
          className="text-xs text-text-ds-tertiary transition-all duration-300 [transition-timing-function:var(--ease-enter)]"
        >
          {hint}
        </p>
      )}
      {error && (
        <p 
          className="text-xs text-error-light [text-shadow:0_0_8px_rgba(255,82,82,0.3)] transition-all duration-300 [transition-timing-function:var(--ease-spring)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
