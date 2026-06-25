"use client";
import React from "react";

export default function QuickActions() {
  const handleAction = (actionName: string) => {
    console.log(`Uruchomiono akcję: ${actionName}`);
  };

  return (
    <div
      className="glass-liquid gpu-layer relative w-full max-w-md rounded-2xl p-6 overflow-hidden select-none"
      style={{
        border: '1px solid color-mix(in oklch, var(--teal-100) 15%, transparent)',
        transition: 'filter 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.06)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
    >
      <div className="flex justify-between items-center mb-4">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: 'color-mix(in oklch, var(--color-text-tertiary) 50%, transparent)' }}
        >
          Quick Actions
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: 'color-mix(in oklch, var(--gold-400) 40%, transparent)' }}
        />
      </div>

      <div className="grid grid-cols-2 relative">
        <div
          className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 pointer-events-none"
          style={{ backgroundColor: 'color-mix(in oklch, var(--teal-100) 10%, transparent)' }}
        />
        <div
          className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2 pointer-events-none"
          style={{ backgroundColor: 'color-mix(in oklch, var(--teal-100) 10%, transparent)' }}
        />

        <button
          onClick={() => handleAction("View Profile")}
          className="grid-light-btn flex flex-col items-start justify-center p-4 h-[90px] text-left rounded-tl-xl"
          style={{ transition: 'filter 0.2s ease, background-color 0.1s ease' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--teal-900) 40%, transparent)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.backgroundColor = ''; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.backgroundColor = ''; }}
        >
          <svg className="w-5 h-5 mb-2" fill="none" stroke="var(--gold-400)" strokeWidth="2" viewBox="0 0 24 24" style={{ transition: 'filter 0.2s ease' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-xs font-bold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>View Profile</span>
          <span className="text-[10px] mt-0.5" style={{ color: 'color-mix(in oklch, var(--color-text-tertiary) 50%, transparent)' }}>As a visitor</span>
        </button>

        <button
          onClick={() => handleAction("Create")}
          className="flex flex-col items-start justify-center p-4 h-[90px] text-left rounded-tr-xl pl-6"
          style={{ transition: 'filter 0.2s ease, background-color 0.1s ease, transform 0.1s ease' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--teal-900) 40%, transparent)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.backgroundColor = ''; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.backgroundColor = ''; }}
        >
          <svg className="w-5 h-5 mb-2" fill="none" stroke="var(--gold-400)" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-xs font-bold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>Create</span>
          <span className="text-[10px] mt-0.5" style={{ color: 'color-mix(in oklch, var(--color-text-tertiary) 50%, transparent)' }}>New goal or post</span>
        </button>

        <button
          onClick={() => handleAction("Copy Link")}
          className="flex flex-col items-start justify-center p-4 h-[90px] text-left rounded-bl-xl pt-6"
          style={{ transition: 'filter 0.2s ease, background-color 0.1s ease, transform 0.1s ease' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--teal-900) 40%, transparent)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.backgroundColor = ''; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.backgroundColor = ''; }}
        >
          <svg className="w-4 h-4 mb-2.5" fill="none" stroke="var(--gold-400)" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          <span className="text-xs font-bold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>Copy Link</span>
          <span className="text-[10px] mt-0.5" style={{ color: 'color-mix(in oklch, var(--color-text-tertiary) 50%, transparent)' }}>tipjar.plus/@url</span>
        </button>

        <button
          onClick={() => handleAction("Fanwall")}
          className="flex flex-col items-start justify-center p-4 h-[90px] text-left rounded-br-xl pl-6 pt-6"
          style={{ transition: 'filter 0.2s ease, background-color 0.1s ease, transform 0.1s ease' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--teal-900) 40%, transparent)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.backgroundColor = ''; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.backgroundColor = ''; }}
        >
          <svg className="w-5 h-5 mb-2" fill="none" stroke="var(--gold-400)" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-xs font-bold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>Fanwall</span>
          <span className="text-[10px] mt-0.5" style={{ color: 'color-mix(in oklch, var(--color-text-tertiary) 50%, transparent)' }}>Manage community</span>
        </button>
      </div>
    </div>
  );
}
