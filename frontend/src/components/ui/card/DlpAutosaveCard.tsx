"use client";
import React, { useState, useEffect } from 'react';

export interface DlpAutosaveCardProps {
  title?: string;
  defaultHex?: string;
  onBufferChange?: (isDirty: boolean) => void;
}

/**
 * LOKALIZACJA W DRZEWIE: creator-desktop/studio/page/appearance/ (alternatywnie: studio/page/themes/)
 * Przechwytywanie stanu konfiguracyjnego w pamięci i ochrona sesji użytkownika.
 */
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
    <article className="config-draft-card bg-[#003737] rounded-xl p-6">
      <header className="draft-header flex justify-between items-center mb-4">
        <h4 className="text-[clamp(1.2rem,1.5vw+0.875rem,1.5rem)] font-bold text-white font-['Mukta_Malar']">
          {title}
        </h4>
        <span className={`draft-status font-mono text-xs flex items-center gap-2 ${isDirty ? 'text-[#FFD700]' : 'text-teal-200 opacity-50'}`}>
          <span className={`w-2 h-2 rounded-full ${isDirty ? 'bg-[#FFD700] animate-pulse' : 'bg-teal-200'}`} />
          {isDirty ? 'Changes Buffered' : 'Synced'}
        </span>
      </header>
      <form className="draft-form" onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="form-group focus-ring-wrapper">
          <label htmlFor="accent-color" className="text-xs font-mono text-[#CCF7F4] uppercase tracking-wider block mb-1">
            Primary Hex
          </label>
          <input
            type="text"
            id="accent-color"
            value={hexValue}
            onChange={handleInputChange}
            className="input-premium w-full bg-[#001F1F] border border-[#004C4C] rounded-md p-3 text-white focus:outline-none focus:border-[#FFD700]"
          />
        </div>
      </form>
    </article>
  );
};

export default DlpAutosaveCard;