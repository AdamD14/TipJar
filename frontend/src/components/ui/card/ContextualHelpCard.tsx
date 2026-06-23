"use client";
import React, { useState } from 'react';

export interface ContextualHelpCardProps {
  title?: string;
  tooltipText?: string;
}

/**
 * KARTA VII: Toggletip & Asysta Edukacyjna (Contextual Help Card)
 * LOKALIZACJA W DRZEWIE: creator-desktop/share/campaigns/
 */
export const ContextualHelpCard: React.FC<ContextualHelpCardProps> = ({
  title = 'ContextualHelpCard',
  tooltipText = 'System pokrywa za Ciebie opłaty sieciowe Polygon z użyciem relacji ERC-4337.'
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <style>{`
        .card-info-module { 
          background: var(--teal-800, #003737); 
          border-radius: 12px; 
          padding: 24px;
        }
        .header-with-help {
          display: flex; align-items: center; gap: 8px;
        }
        .toggletip-trigger {
          background: none; border: none; cursor: pointer; position: relative;
        }
        .toggletip-trigger:focus-visible {
          outline: 2px solid var(--purple-300, #4D194D); outline-offset: 2px;
          border-radius: 50%;
        }
        .toggletip-content {
          position: absolute; bottom: 120%; left: 50%; transform: translateX(-50%);
          width: max-content; max-width: 250px;
          background: var(--teal-700, #004C4C);
          padding: 12px 16px; border-radius: 8px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
          z-index: 500;
          opacity: 0; visibility: hidden;
          transition: opacity 0.2s ease-in, visibility 0.2s;
        }
        .toggletip-content.is-active {
          opacity: 1; visibility: visible;
        }
      `}</style>

      <article className="card-info-module">
        <div className="header-with-help">
          <h3 className="font-mukta text-[#CCF7F4] text-md font-bold">{title}</h3>
          <button 
            className="toggletip-trigger" 
            aria-label="Więcej informacji"
            onClick={handleToggle}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-300, #4D194D)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4M12 8h.01"></path>
            </svg>
            <span className={`toggletip-content font-plex-sans text-white text-xs ${isActive ? 'is-active' : ''}`} role="status">
              {tooltipText}
            </span>
          </button>
        </div>
      </article>
    </>
  );
};

export default ContextualHelpCard;
