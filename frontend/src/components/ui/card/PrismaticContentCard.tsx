"use client";
import React from 'react';

export interface PrismaticContentCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onCtaClick?: () => void;
}

export const PrismaticContentCard: React.FC<PrismaticContentCardProps> = ({
  title = 'PrismaticContentCard',
  description = 'Zdominuj arkusze danych on-chain.',
  buttonText = 'Uzyskaj Dostęp',
  onCtaClick
}) => {
  return (
    <article
      className="relative p-[1px] rounded-xl overflow-hidden w-full"
      style={{ transition: 'filter 0.3s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'hue-rotate(8deg) brightness(1.04)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, var(--gold-400) 0%, var(--teal-700) 40%, var(--purple-300) 100%)',
        }}
      />
      <div className="glass-liquid gpu-layer relative p-6 rounded-xl">
        <h3
          className="text-lg font-bold font-heading"
          style={{ color: 'var(--gold-400)' }}
        >
          {title}
        </h3>
        <p
          className="text-sm mt-1"
          style={{ color: 'color-mix(in oklch, var(--color-text-tertiary) 80%, transparent)', fontFamily: 'var(--font-body)' }}
        >
          {description}
        </p>
        <button
          onClick={onCtaClick}
          className="w-full py-3 px-6 mt-4 rounded-md font-semibold cursor-pointer"
          style={{
            backgroundColor: 'var(--gold-400)',
            color: 'var(--teal-900)',
            fontFamily: 'var(--font-body)',
            transition: 'filter 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
        >
          {buttonText}
        </button>
      </div>
    </article>
  );
};

export default PrismaticContentCard;
