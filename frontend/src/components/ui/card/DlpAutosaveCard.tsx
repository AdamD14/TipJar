"use client";
import React, { useState, useEffect } from 'react';

export interface DlpAutosaveCardProps {
  title?: string;
  defaultHex?: string;
  onBufferChange?: (isDirty: boolean) => void;
}

export const DlpAutosaveCard: React.FC<DlpAutosaveCardProps> = ({
  title = 'DlpAutosaveCard',
  defaultHex = '#001F1F',
  onBufferChange
}) => {
  const [hexValue, setHexValue] = useState(defaultHex);
  const [isDirty, setIsDirty] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHexValue(val);
    const altered = val !== defaultHex;
    setIsDirty(altered);
    if (onBufferChange) onBufferChange(altered);
  };

  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    if (isDirty) {
      const payload = {
        data: { accentColor: hexValue },
        timestamp: Date.now(),
        ttl: 86400000
      };
      sessionStorage.setItem('config_draft_v1', JSON.stringify(payload));
    }
  }, [hexValue, isDirty]);

  return (
    <article
      className="glass-liquid gpu-layer rounded-xl p-6 group"
      style={{
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      {/* Hover: border-glow on focus-within */}
      <style>{`
        .dlp-autosave:focus-within {
          border-color: color-mix(in oklch, var(--gold-400) 40%, transparent) !important;
          box-shadow: 0 0 0 1px color-mix(in oklch, var(--gold-400) 25%, transparent),
                      inset 0 0 20px color-mix(in oklch, var(--gold-400) 5%, transparent);
        }
      `}</style>

      <div className="dlp-autosave rounded-xl p-6 -m-6">
        <header className="flex justify-between items-center mb-4">
          <h4
            className="font-heading font-bold"
            style={{
              fontSize: 'clamp(1.2rem, 1.5vw + 0.875rem, 1.5rem)',
              color: 'var(--text-primary)',
            }}
          >
            {title}
          </h4>
          <span
            className="text-xs flex items-center gap-2"
            style={{
              color: isDirty
                ? 'var(--gold-400)'
                : 'color-mix(in oklch, var(--teal-100) 50%, transparent)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: isDirty ? 'var(--gold-400)' : 'var(--teal-100)',
                animation: isDirty ? 'pulse-breath 2s ease-in-out infinite' : 'none',
                opacity: isDirty ? 1 : 0.5,
              }}
            />
            {isDirty ? 'Changes Buffered' : 'Synced'}
          </span>
        </header>

        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="focus-ring-wrapper">
            <label
              htmlFor="accent-color"
              className="text-xs uppercase tracking-wider block mb-1"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Primary Hex
            </label>
            <input
              type="text"
              id="accent-color"
              value={hexValue}
              onChange={handleInputChange}
              className="w-full rounded-md p-3 outline-none transition-colors duration-200"
              style={{
                backgroundColor: 'var(--teal-900)',
                border: '1px solid color-mix(in oklch, var(--teal-100) 15%, transparent)',
                color: 'var(--text-primary)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--gold-400) 60%, transparent)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'color-mix(in oklch, var(--teal-100) 15%, transparent)';
              }}
            />
          </div>
        </form>
      </div>
    </article>
  );
};

export default DlpAutosaveCard;
