"use client";

export interface TipFeedbackProps {
  success?: boolean;
  message: string;
  onClose: () => void;
}

export const TipFeedback = ({ success, message, onClose }: TipFeedbackProps) => (
  <div className={`mt-4 rounded-md p-3 text-center ${success ? "bg-emerald-600" : "bg-red-600"}`}
  >
    <p>{message}</p>
    <button type="button" onClick={onClose} className="mt-2 text-sm text-brand-gold underline">
      Zamknij
    </button>
  </div>
);
