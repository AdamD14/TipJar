"use client";
import React from 'react';

export default function HighTicketGoalCard({ title, percentage }: { title: string; percentage: number }) {
  return (
    <div
      className="relative w-full p-[1px] rounded-2xl"
      style={{
        transition: 'filter 0.3s ease',
        filter: 'drop-shadow(0 12px 20px color-mix(in oklch, var(--teal-800) 70%, #000))',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'hue-rotate(4deg) saturate(1.1) drop-shadow(0 12px 20px color-mix(in oklch, var(--teal-800) 70%, #000))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'drop-shadow(0 12px 20px color-mix(in oklch, var(--teal-800) 70%, #000))';
      }}
    >
      <div
        className="glass-liquid gpu-layer relative w-full overflow-hidden"
        style={{ clipPath: "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" } as React.CSSProperties}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 1px 1px 0 color-mix(in oklch, var(--teal-100) 15%, transparent), inset -1px -1px 0 color-mix(in oklch, #000 80%, transparent)',
          }}
        />
        <div className="p-8 relative z-10">
          <div className="flex justify-between items-end mb-6">
            <h4
              className="font-heading font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-text-tertiary)', fontSize: '1.25rem' }}
            >
              {title}
            </h4>
            <span
              className="text-2xl font-black font-heading"
              style={{
                color: 'var(--color-text-tertiary)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {percentage}%
            </span>
          </div>
          <div
            className="relative w-full h-[6px]"
            style={{
              backgroundColor: 'var(--teal-900)',
              boxShadow: 'inset 0 2px 4px color-mix(in oklch, var(--teal-900) 80%, #000)',
            }}
          >
            <div
              className="absolute top-0 left-0 h-full"
              style={{
                width: `${percentage}%`,
                backgroundColor: 'var(--purple-300)',
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-6"
              style={{
                left: `calc(${percentage}% - 6px)`,
                backgroundColor: 'var(--gold-400)',
                boxShadow: '0 0 10px 2px color-mix(in oklch, var(--gold-400) 60%, transparent)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
