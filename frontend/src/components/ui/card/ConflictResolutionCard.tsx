import React from 'react';

export interface ConflictResolutionCardProps {
  title?: string;
  description?: string;
  onDiscard?: () => void;
  onMerge?: () => void;
}

/**
 * LOKALIZACJA W DRZEWIE: creator-desktop/studio/page/layout/
 * Prompt-Based Recovery chroniący przed gubieniem pakietów i przerwaniem sesji.
 */
export const ConflictResolutionCard: React.FC<ConflictResolutionCardProps> = ({
  title = 'ConflictResolutionCard',
  description = 'Locally saved buffer detected.',
  onDiscard,
  onMerge
}) => {
  return (
    <article className="resolution-card bg-[#001F1F] border border-[#FFD700] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_0_4px_rgba(255,215,0,0.1)]">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="resolution-icon flex-shrink-0">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="#FFD700" fill="none" strokeWidth="2" className="animate-[spin_4s_linear_infinite]" style={{ animationDirection: 'reverse' }}>
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </div>
        <div className="resolution-content min-w-0">
          <h4 className="text-[clamp(1rem,0.5vw+0.875rem,1.125rem)] font-bold text-white font-['IBM_Plex_Sans'] truncate">{title}</h4>
          <p className="text-xs text-[#CCF7F4]/80 font-mono truncate">{description}</p>
        </div>
      </div>
      <div className="resolution-actions flex gap-2 w-full sm:w-auto justify-end">
        <button 
          onClick={onDiscard}
          className="btn-ghost text-xs bg-transparent text-white border border-[#004C4C] py-2 px-4 rounded font-semibold font-['Mukta_Malar'] cursor-pointer"
        >
          Discard
        </button>
        <button 
          onClick={onMerge}
          className="btn-premium action-cta text-xs font-bold py-2 px-4 bg-[#FFD700] text-[#001F1F] rounded hover:bg-[#FFC107] cursor-pointer"
        >
          Merge State
        </button>
      </div>
    </article>
  );
};

export default ConflictResolutionCard;