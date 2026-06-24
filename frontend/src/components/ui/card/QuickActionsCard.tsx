"use client";
import React from "react";

export default function QuickActions() {
  // Przykładowe, bezpieczne akcje typu mock (nie przeładowują strony, bez straszenia technologią)
  const handleAction = (actionName: string) => {
    console.log(`Uruchomiono akcję: ${actionName}`);
    // Tutaj w przyszłości wepniesz np. router.push("/fanwall") lub navigator.clipboard.writeText
  };

  return (
    <div className="bg-[#002F2F] rounded-[24px] p-6 max-w-md w-full border border-[#CCF7F4]/15 shadow-[0_16px_40px_rgba(0,0,0,0.5)] text-[#E0F2F2] relative overflow-hidden isolate select-none">
      
      {/* Tytuł sekcji w tym samym minimalistycznym tonie mono */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-mono font-bold text-[#CCF7F4]/50 uppercase tracking-[0.2em]">
          Quick Actions
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC]/40" />
      </div>

      {/* Siatka 2x2 z centralnymi, cienkimi liniami podziału */}
      <div className="grid grid-cols-2 relative">
        
        {/* PIONOWA LINIA DZIELĄCA */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#CCF7F4]/10 -translate-x-1/2 pointer-events-none" />
        
        {/* POZIOMA LINIA DZIELĄCA */}
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#CCF7F4]/10 -translate-y-1/2 pointer-events-none" />

        {/* STREFA 1: VIEW PROFILE (Lewa góra) */}
        <button
          onClick={() => handleAction("View Profile")}
          className="flex flex-col items-start justify-center p-4 h-[90px] text-left transition-all active:scale-[0.98] active:bg-[#001F1F]/40 rounded-tl-xl"
        >
          <svg className="w-5 h-5 text-[#00FFCC] mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-xs font-bold text-white tracking-wide">View Profile</span>
          <span className="text-[10px] text-[#CCF7F4]/50 font-mono mt-0.5">As a visitor</span>
        </button>

        {/* STREFA 2: CREATE (Prawa góra) */}
        <button
          onClick={() => handleAction("Create")}
          className="flex flex-col items-start justify-center p-4 h-[90px] text-left transition-all active:scale-[0.98] active:bg-[#001F1F]/40 rounded-tr-xl pl-6"
        >
          <svg className="w-5 h-5 text-[#00FFCC] mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-xs font-bold text-white tracking-wide">Create</span>
          <span className="text-[10px] text-[#CCF7F4]/50 font-mono mt-0.5">New goal or post</span>
        </button>

        {/* STREFA 3: COPY LINK (Lewy dół) */}
        <button
          onClick={() => handleAction("Copy Link")}
          className="flex flex-col items-start justify-center p-4 h-[90px] text-left transition-all active:scale-[0.98] active:bg-[#001F1F]/40 rounded-bl-xl pt-6"
        >
          <svg className="w-4 h-4 text-[#00FFCC] mb-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          <span className="text-xs font-bold text-white tracking-wide">Copy Link</span>
          <span className="text-[10px] text-[#CCF7F4]/50 font-mono mt-0.5">tipjar.plus/@url</span>
        </button>

        {/* STREFA 4: FANWALL (Prawy dół) */}
        <button
          onClick={() => handleAction("Fanwall")}
          className="flex flex-col items-start justify-center p-4 h-[90px] text-left transition-all active:scale-[0.98] active:bg-[#001F1F]/40 rounded-br-xl pl-6 pt-6"
        >
          <svg className="w-5 h-5 text-[#00FFCC] mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-xs font-bold text-white tracking-wide">Fanwall</span>
          <span className="text-[10px] text-[#CCF7F4]/50 font-mono mt-0.5">Manage community</span>
        </button>

      </div>
    </div>
  );
}