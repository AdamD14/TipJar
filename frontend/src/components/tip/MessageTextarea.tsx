"use client";

export interface MessageTextareaProps {
  value: string;
  maxLength?: number;
  onChange: (value: string) => void;
}

export const MessageTextarea = ({ value, maxLength = 140, onChange }: MessageTextareaProps) => (
  <div className="mb-4">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
      maxLength={maxLength}
      placeholder="Dodaj wiadomość (opcjonalnie)"
      className="h-24 w-full resize-none rounded-md border border-brand-gold bg-transparent p-2 text-sm text-white placeholder-brand-light-text focus:outline-none"
    />
    <div className="mt-1 text-right text-xs text-brand-light-text">
      {value.length}/{maxLength}
    </div>
  </div>
);
