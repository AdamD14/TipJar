"use client";

export interface SubmitTipButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onSubmit: () => void;
}

export const SubmitTipButton = ({ disabled, loading, onSubmit }: SubmitTipButtonProps) => (
  <button
    type="button"
    onClick={onSubmit}
    disabled={disabled || loading}
    className="w-full rounded-lg bg-brand-gold py-2 font-bold text-brand-dark hover:brightness-110 disabled:opacity-50"
  >
    {loading ? "Wysyłanie..." : "Wyślij napiwek"}
  </button>
);
