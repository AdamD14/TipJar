"use client";

export interface AmountSliderProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export const AmountSlider = ({ value, min = 1, max = 100, onChange }: AmountSliderProps) => (
  <div className="mb-4">
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-brand-gold"
    />
  </div>
);
