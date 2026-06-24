import React from 'react';

export interface ConflictResolutionCardProps {
  title?: string;
  description?: string;
  onDiscard?: () => void;
  onMerge?: () => void;
}

export const ConflictResolutionCard: React.FC<ConflictResolutionCardProps> = ({
  title = 'ConflictResolutionCard',
  description = 'Locally saved buffer detected.',
  onDiscard,
  onMerge
}) => {
  return (
    <article className="bg-teal-900 border border-gold-400 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_0_4px_rgba(255,215,0,0.1)]">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="flex-shrink-0">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="#FFD700" fill="none" strokeWidth="2" className="animate-[spin_4s_linear_infinite]" style={{ animationDirection: 'reverse' }}>
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </div>
        <div className="min-w-0">
          <h4 className="text-[clamp(1rem,0.5vw+0.875rem,1.125rem)] font-bold text-text-primary font-body truncate">{title}</h4>
          <p className="text-xs text-teal-50/80 font-mono truncate">{description}</p>
        </div>
      </div>
      <div className="flex gap-2 w-full sm:w-auto justify-end">
        <button 
          onClick={onDiscard}
          className="text-xs bg-transparent text-text-primary border border-teal-700 py-2 px-4 rounded font-semibold font-heading cursor-pointer"
        >
          Discard
        </button>
        <button 
          onClick={onMerge}
          className="text-xs font-bold py-2 px-4 bg-gold-400 text-teal-900 rounded hover:bg-gold-500 cursor-pointer"
        >
          Merge State
        </button>
      </div>
    </article>
  );
};

export default ConflictResolutionCard;
