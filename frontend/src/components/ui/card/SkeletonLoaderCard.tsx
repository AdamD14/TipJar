"use client";
import React from 'react';

export type SkeletonVariant = 'compact' | 'expanded' | 'detail';

export interface SkeletonLoaderCardProps {
  variant?: SkeletonVariant;
}

const SHIMMER_STYLES = `
  .skel-card {
    position: relative;
    overflow: hidden;
  }
  .skel-card:hover {
    filter: brightness(1.03);
  }
  .skel-card:hover .skel-node::after {
    animation-duration: 0.75s;
  }
  .skel-card:hover .skel-glow-track {
    animation-duration: 1s;
  }
  .skel-card:hover .skel-orb-gold::after {
    background: linear-gradient(110deg, transparent 0%, color-mix(in oklch, var(--gold-400) 30%, transparent) 40%, color-mix(in oklch, var(--gold-400) 30%, transparent) 60%, transparent 100%);
  }
  .skel-node {
    background-color: var(--teal-900);
    position: relative;
    overflow: hidden;
    transform: translateZ(0);
  }
  .skel-node::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(110deg, transparent 0%, var(--teal-700) 40%, var(--teal-700) 60%, transparent 100%);
    animation: gpu-shimmer 2s infinite linear;
  }
  .skel-glow-track {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(0,69,69,0.5) 50%, transparent 100%);
    transform: translateX(-100%);
    animation: gpu-shimmer 1.8s infinite linear;
    z-index: 10;
    pointer-events: none;
  }
  .skel-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .skel-orb {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .skel-orb-gold {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .skel-line {
    height: 16px;
    border-radius: 4px;
  }
  .skel-line.full { width: 100%; margin-bottom: 8px; }
  .skel-line.partial { width: 65%; }
  .skel-bar {
    height: 12px;
    border-radius: 4px;
    background-color: var(--teal-700);
  }
  .skel-bar.title { width: 60%; height: 16px; }
  .skel-bar.subtitle { width: 35%; }
  .skel-bar.full { width: 100%; margin-bottom: 12px; }
  .skel-bar.mid { width: 75%; }
  .skel-bar.short { width: 45%; }
  .skel-card-placeholder {
    height: 48px;
    border-radius: 8px;
    background-color: var(--teal-900);
    position: relative;
    overflow: hidden;
    transform: translateZ(0);
  }
  .skel-card-placeholder::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(110deg, transparent 0%, var(--teal-700) 40%, var(--teal-700) 60%, transparent 100%);
    animation: gpu-shimmer 2s infinite linear;
  }
  @keyframes gpu-shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .skel-node::after, .skel-glow-track, .skel-card-placeholder::after {
      animation: none;
      transform: none;
      background: var(--teal-700);
    }
    .skel-glow-track { opacity: 0.3; }
  }
`;

function CompactSkeleton() {
  return (
    <article className="skel-card glass-liquid gpu-layer rounded-xl p-6 flex gap-4 items-center w-full" aria-hidden="true">
      <div className="skel-node skel-circle" />
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="skel-node skel-line full" />
        <div className="skel-node skel-line partial" />
      </div>
    </article>
  );
}

function ExpandedSkeleton() {
  return (
    <article className="skel-card glass-liquid gpu-layer rounded-2xl p-8 w-full" aria-busy="true" aria-label="Loading content">
      <div className="skel-glow-track" />
      <div className="relative z-20">
        <div className="flex gap-4 mb-6">
          <div className="skel-orb skel-node" />
          <div className="flex-1 flex flex-col justify-center gap-2">
            <div className="skel-bar title" />
            <div className="skel-bar subtitle" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="skel-bar full" />
          <div className="skel-bar mid" />
        </div>
      </div>
    </article>
  );
}

function DetailSkeleton() {
  return (
    <article className="skel-card glass-liquid gpu-layer rounded-2xl p-8 w-full" aria-busy="true" aria-label="Loading detailed content">
      <div className="skel-glow-track" />
      <div className="relative z-20">
        <div className="flex gap-4 mb-6">
          <div className="skel-orb-gold skel-node" />
          <div className="flex-1 flex flex-col justify-center gap-2">
            <div className="skel-bar title" />
            <div className="skel-bar subtitle" />
            <div className="skel-bar short" />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <div className="skel-bar full" />
          <div className="skel-bar mid" />
          <div className="skel-bar short" />
        </div>
        <div className="skel-card-placeholder" />
      </div>
    </article>
  );
}

const VARIANT_MAP: Record<SkeletonVariant, React.FC> = {
  compact: CompactSkeleton,
  expanded: ExpandedSkeleton,
  detail: DetailSkeleton,
};

export const SkeletonLoaderCard: React.FC<SkeletonLoaderCardProps> = ({
  variant = 'compact',
}) => {
  const Component = VARIANT_MAP[variant];
  return (
    <>
      <style>{SHIMMER_STYLES}</style>
      <Component />
    </>
  );
};

export default SkeletonLoaderCard;
