"use client";

import React from 'react';

export type CreatorCardVariant = 'default' | 'hero' | 'pulse';

export interface CreatorCardProps {
  variant?: CreatorCardVariant;
  name?: string;
  subtitle?: string;
  isSynced?: boolean;
  onSupportClick?: () => void;
  onCardClick?: () => void;
}

const SQUIRICLE_PATH =
  'M 0,0.5 C 0,0.0575 0.0575,0 0.50 0 0.9425,0 1,0.0575 1,0.5 1,0.9425 0.9425,1 0.5,1 0.0575,1 0,0.9425 0,0.5';

function SquircleClip() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
      <defs>
        <clipPath id="squircle-clip" clipPathUnits="objectBoundingBox">
          <path d={SQUIRICLE_PATH} />
        </clipPath>
      </defs>
    </svg>
  );
}

function HoverGradientOverlay({ accent }: { accent: 'teal' | 'purple' }) {
  const midStop = accent === 'purple'
    ? 'color-mix(in oklch, var(--purple-300) 10%, transparent)'
    : 'color-mix(in oklch, var(--teal-400) 12%, transparent)';
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-opacity"
      style={{
        backgroundImage: `linear-gradient(135deg, color-mix(in oklch, var(--gold-400) 8%, transparent) 0%, ${midStop} 50%, color-mix(in oklch, var(--gold-400) 6%, transparent) 100%)`,
        backgroundSize: '200% 200%',
        backgroundPosition: '0% 0%',
      }}
      aria-hidden="true"
    />
  );
}

function DotPattern({ opacity, mask, mixBlend }: { opacity: number; mask?: boolean; mixBlend?: boolean }) {
  const color = mask ? 'var(--teal-300)' : mixBlend ? 'var(--teal-100)' : 'var(--teal-300)';
  return (
    <div
      className={`absolute inset-0 pointer-events-none opacity-[${opacity}]${mixBlend ? ' mix-blend-overlay' : ''}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        ...(mask
          ? {
              maskImage: 'radial-gradient(circle at top right, black 10%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(circle at top right, black 10%, transparent 85%)',
            }
          : {}),
      }}
      aria-hidden="true"
    />
  );
}

function AvatarSquare({ size = 80 }: { size?: number }) {
  return (
    <div
      className="bg-teal-900 border border-teal-700 mb-4 relative z-20 overflow-hidden"
      style={{ width: size, height: size, borderRadius: 6 }}
    >
      <div className="skeleton-shimmer w-full h-full" aria-hidden="true" />
    </div>
  );
}

function AvatarCircleRing({ size = 72 }: { size?: number }) {
  return (
    <div className="relative">
      <div
        className="absolute -inset-1 rounded-full z-[1] opacity-80"
        style={{ background: 'linear-gradient(135deg, var(--gold-400), var(--purple-300))' }}
      />
      <div
        className="relative z-[2] overflow-hidden"
        style={{ width: size, height: size, borderRadius: '50%' }}
        aria-hidden="true"
      >
        <div className="skeleton-shimmer w-full h-full" />
      </div>
    </div>
  );
}

function AvatarSquareInline() {
  return (
    <div className="w-16 h-16 bg-teal-900 rounded-md border border-teal-700 p-1 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
      <div className="skeleton-shimmer w-full h-full" aria-hidden="true" />
    </div>
  );
}

function SyncStatus({ isSynced }: { isSynced: boolean }) {
  return (
    <span className="text-info-base font-body text-xs font-bold tracking-widest uppercase flex items-center gap-2 select-none">
      <span
        className={`w-2 h-2 rounded-full bg-success-base ${isSynced ? 'animate-pulse' : 'opacity-40'}`}
      />
      {isSynced ? 'Node Synced' : 'Offline'}
    </span>
  );
}

function DefaultVariant({ name, subtitle: role }: { name: string; subtitle: string }) {
  return (
    <article
      className="glass-liquid gpu-layer shadow-maestro elevation-z-2 squishy-3d
                  relative overflow-hidden rounded-lg p-6 group"
      style={{ '--elevation-z': 'var(--elevation-z-2)' } as React.CSSProperties}
      aria-label={`Profil Twórcy: ${name}`}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[35%] pointer-events-none"
        style={{ background: 'linear-gradient(180deg, color-mix(in oklch, var(--gold-400) 10%, transparent), transparent)' }}
        aria-hidden="true"
      />
      <HoverGradientOverlay accent="teal" />
      <DotPattern opacity={0.03} />
      <AvatarSquare size={80} />
      <div className="relative z-20">
        <h2 className="font-heading text-text-primary text-xl font-light tracking-wide">
          {name}
        </h2>
        <p className="font-body text-text-tertiary text-sm">
          {role}
        </p>
      </div>
      <a href="/profile" className="absolute inset-0 z-10" aria-hidden="true" />
    </article>
  );
}

function HeroVariant({ name, subtitle: username, onCardClick }: { name: string; subtitle: string; onCardClick?: () => void }) {
  return (
    <>
      <SquircleClip />
      <article
        className="glass-liquid gpu-layer shadow-maestro elevation-z-3 squishy-3d
                    relative overflow-hidden isolate cursor-pointer outline-none
                    flex flex-col p-8 group"
        style={{
          '--elevation-z': 'var(--elevation-z-3)',
          clipPath: 'url(#squircle-clip)',
          background: 'var(--bg-surface-base)',
        } as React.CSSProperties}
        tabIndex={0}
        aria-label={`Profil Twórcy: ${name}`}
        onClick={onCardClick}
      >
        <HoverGradientOverlay accent="purple" />
        <DotPattern opacity={0.04} mask />
        <div className="flex items-center gap-6 relative z-10">
          <AvatarCircleRing size={72} />
          <div>
            <h1 className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold text-text-primary leading-none m-0 mb-1">
              {name}
            </h1>
            <p className="font-body text-text-quaternary text-[clamp(0.875rem,1.5vw,1rem)] m-0">
              {username}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

function PulseVariant({ name, subtitle: handle, isSynced, onSupportClick }: { name: string; subtitle: string; isSynced: boolean; onSupportClick?: () => void }) {
  return (
    <article
      className="glass-liquid gpu-layer shadow-maestro elevation-z-2 squishy-3d border-gold-subtle
                  relative w-full rounded-2xl overflow-hidden flex flex-col p-6 group"
      style={{
        '--elevation-z': 'var(--elevation-z-2)',
        background: 'var(--bg-surface-base)',
      } as React.CSSProperties}
      aria-label={`Profil Twórcy: ${name}`}
    >
      <HoverGradientOverlay accent="teal" />
      <DotPattern opacity={0.04} mixBlend />
      <div className="flex items-center gap-4 relative z-20">
        <AvatarSquareInline />
        <div className="flex flex-col min-w-0">
          <h3 className="font-heading text-text-secondary text-xl tracking-[0.05em] leading-[1.1] font-bold truncate">
            {name}
          </h3>
          <span className="font-body text-text-quaternary text-sm font-medium truncate">
            {handle}
          </span>
        </div>
      </div>
      <div className="mt-auto pt-6 flex justify-between items-center relative z-20">
        <SyncStatus isSynced={isSynced} />
        <button
          onClick={onSupportClick}
          className="cta-gold cta-gold-02 squishy-3d cta-btn-text px-4 py-2 rounded-lg text-sm cursor-pointer"
        >
          SUPPORT
        </button>
      </div>
    </article>
  );
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
  variant = 'default',
  name = 'CreatorCard',
  subtitle,
  isSynced = true,
  onSupportClick,
  onCardClick,
}) => {
  const resolvedSubtitle = subtitle ?? (variant === 'hero' ? '@component_label' : variant === 'pulse' ? '@component_label' : 'Decentralized System Architect');

  switch (variant) {
    case 'hero':
      return <HeroVariant name={name} subtitle={resolvedSubtitle} onCardClick={onCardClick} />;
    case 'pulse':
      return <PulseVariant name={name} subtitle={resolvedSubtitle} isSynced={isSynced} onSupportClick={onSupportClick} />;
    default:
      return <DefaultVariant name={name} subtitle={resolvedSubtitle} />;
  }
};

export default CreatorCard;
