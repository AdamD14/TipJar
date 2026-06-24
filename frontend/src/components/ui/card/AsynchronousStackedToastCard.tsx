import React from 'react';

export interface AsynchronousStackedToastCardProps {
  title?: string;
  description?: string;
  stackIndex?: number;
  toastDepth?: string;
  isDegraded?: boolean;
}

export const AsynchronousStackedToastCard: React.FC<AsynchronousStackedToastCardProps> = ({
  title = 'AsynchronousStackedToastCard',
  description = '100.00 USDC verified on-chain.',
  stackIndex = 0,
  toastDepth = '0px',
  isDegraded = false
}) => {
  return (
    <div
      className="relative transition-all duration-300"
      style={{
        transform: `translateY(${toastDepth}) scale(${1 - 0.05 * stackIndex})`,
        zIndex: 9999 - stackIndex,
        filter: `brightness(${1 - 0.15 * stackIndex})`
      }}
    >
      <article className={`rounded-xl p-4 flex gap-4 ${isDegraded ? 'bg-teal-900' : 'bg-teal-700 backdrop-blur-md shadow-card-rest'}`}>
        {!isDegraded && (
          <div className="w-4 h-4 bg-gold-400 rounded-full self-center animate-pulse flex-shrink-0" />
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-[clamp(1rem,0.5vw+0.875rem,1.125rem)] font-bold text-text-primary font-body truncate">
            {title}
          </span>
          <span className="text-xs text-teal-50/80 font-mono mt-0.5 truncate">
            {description}
          </span>
        </div>
      </article>
    </div>
  );
};

export default AsynchronousStackedToastCard;
