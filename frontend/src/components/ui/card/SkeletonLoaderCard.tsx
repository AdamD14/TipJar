import React from 'react';

export const SkeletonLoaderCard: React.FC = () => {
  return (
    <>
      <style>{`
        .card-skeleton-loader {
          background: var(--teal-800, #003737);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          gap: 16px;
          align-items: center;
          transition: filter 0.3s ease;
        }
        .card-skeleton-loader:hover {
          filter: brightness(1.04);
        }
        .card-skeleton-loader:hover .skel-node::after {
          animation-duration: 0.75s;
        }
        .skel-node {
          background-color: var(--teal-900, #001F1F);
          position: relative;
          overflow: hidden;
          transform: translateZ(0);
        }
        .skel-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .skel-line {
          height: 16px;
          border-radius: 4px;
        }
        .skel-line.full {
          width: 100%;
          margin-bottom: 8px;
        }
        .skel-line.partial {
          width: 65%;
        }
        .skel-node::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(110deg, transparent 0%, var(--teal-700, #004C4C) 40%, var(--teal-700, #004C4C) 60%, transparent 100%);
          animation: gpu-shimmer 2s infinite linear;
        }
        @keyframes gpu-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .skel-node::after {
            animation: none;
            transform: none;
            background: var(--teal-700, #004C4C);
          }
        }
      `}</style>

      <article className="card-skeleton-loader glass-liquid gpu-layer w-full" aria-hidden="true">
        <div className="skel-node skel-circle"></div>
        <div className="skel-layout flex-1 min-w-0">
          <div className="skel-node skel-line full"></div>
          <div className="skel-node skel-line partial"></div>
        </div>
      </article>
    </>
  );
};

export default SkeletonLoaderCard;
