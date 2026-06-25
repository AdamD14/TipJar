"use client";
import React from 'react';

export default function InteractiveActionCard({ label, subtitle }: { label: string; subtitle: string }) {
  return (
    <button
      className="glass-liquid gpu-layer relative w-full p-6 rounded-2xl outline-none cursor-pointer text-left"
      style={{
        transition: 'filter 0.2s ease, transform 0.1s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.08)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = ''; e.currentTarget.style.transform = ''; }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = ''; }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: '0 0 10px color-mix(in oklch, var(--gold-400) 10%, transparent)',
        }}
      />

      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          backgroundColor: 'var(--teal-700)',
          boxShadow: 'inset 0 4px 12px color-mix(in oklch, var(--teal-900) 90%, #000), inset 0 1px 2px color-mix(in oklch, var(--teal-900) 100%, #000)',
          opacity: 0,
          transition: 'opacity 0.1s ease',
        }}
        onMouseDown={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = '1'; }}
        onMouseUp={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = '0'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = '0'; }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <span
            className="block text-lg font-bold"
            style={{ color: 'var(--color-text-tertiary)', transition: 'color 0.2s ease' }}
          >
            {label}
          </span>
          <span
            className="block text-xs font-medium mt-1"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {subtitle}
          </span>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: 'var(--teal-800)',
            border: '1px solid color-mix(in oklch, var(--teal-100) 10%, transparent)',
            transition: 'transform 0.1s ease',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            style={{ stroke: 'var(--gold-400)' }}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
