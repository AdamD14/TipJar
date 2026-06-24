"use client";
import React, { useState, useEffect } from "react";

// Interfejs opisujący strukturę danych dla uproszczonego Creator Pulse
interface SimplePulseData {
  earnings: string;
  currency: string;
  supportersCount: number;
  followersCount: number;
  profileVisitsCount: number;
  newNotificationsCount: number;
  latestNotification: string;
}

const mockData: SimplePulseData = {
  earnings: "+10.00",
  currency: "USDC",
  supportersCount: 2,
  followersCount: 2,
  profileVisitsCount: 10,
  newNotificationsCount: 3,
  latestNotification: "Tip from @crypto_buddha (3.00 USDC)"
};

export default function App() {
  const [data, setData] = useState<SimplePulseData | null>(null);
  const [loading, setLoading] = useState(true);

  // Symulacja asynchronicznego ładowania danych z blockchaina
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#002F2F] rounded-[24px] p-6 max-w-md w-full border border-[#CCF7F4]/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
        <div className="h-4 w-16 bg-[#001F1F] rounded animate-pulse mb-4" />
        <div className="h-10 w-full bg-[#001F1F] rounded animate-pulse mb-6" />
        <div className="h-4 w-36 bg-[#001F1F] rounded animate-pulse mb-6" />
        <div className="border-t border-[#CCF7F4]/10 my-4" />
        <div className="h-8 w-full bg-[#001F1F] rounded animate-pulse" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <>
      <style>{`
        .pulse-tabular {
          font-variant-numeric: tabular-nums;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>

      <div className="bg-[#002F2F] rounded-[24px] p-6 max-w-md w-full border border-[#CCF7F4]/15 shadow-[0_16px_40px_rgba(0,0,0,0.5)] text-[#E0F2F2] relative overflow-hidden isolate">
        
        {/* Asymetryczna, cicha sieć topologiczna w tle nadająca techniczny charakter */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,25 L50,70 L110,45 M50,70 L80,120 M10,25 L80,120 L110,45" fill="none" stroke="#CCF7F4" strokeWidth="1" />
            <circle cx="10" cy="25" r="1.5" fill="#CCF7F4" />
            <circle cx="50" cy="70" r="2" fill="#9D4EDD" />
            <circle cx="110" cy="45" r="1.5" fill="#00FFCC" />
            <circle cx="80" cy="120" r="1.5" fill="#CCF7F4" />
          </svg>
        </div>

        {/* NAGŁÓWEK: Pojedyncza, czysta etykieta czasowa "Today" */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-mono font-bold text-[#CCF7F4]/50 uppercase tracking-[0.2em]">
            Today
          </span>
          <span className="text-[8px] font-mono text-[#00FFCC]/80 bg-[#001F1F] px-2 py-0.5 rounded border border-[#00FFCC]/15 font-bold uppercase tracking-wider">
            Live Pulse
          </span>
        </div>

        {/* GŁÓWNY UKŁAD: Saldo z Logo USDC, Wspierający oraz Sparkline w jednej linii */}
        <div className="flex items-center justify-between gap-3 mb-2">
          
          {/* Przyrost finansowy (czysta biel) wraz z Logo USDC */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-3xl font-extrabold font-['Mukta_Malar'] text-white pulse-tabular tracking-tight leading-none">
              {data.earnings}
            </span>
            
            {/* Wektorowe, minimalistyczne Logo USDC */}
            <div className="w-5 h-5 rounded-full bg-[#2775CA] flex items-center justify-center flex-shrink-0 shadow-[0_0_8px_rgba(39,117,202,0.4)]">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#2775CA" />
                <path d="M12 4V20M8 8H14C15.5 8 16.5 9 16.5 10.5C16.5 12 15.5 13 14 13H10C8.5 13 7.5 14 7.5 15.5C7.5 17 8.5 18 10 18H16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Informacja o supporterach */}
          <div className="text-xs text-[#CCF7F4]/80 truncate">
            from <span className="text-white font-bold font-mono">+{data.supportersCount}</span> supporter{data.supportersCount > 1 ? "s" : ""}
          </div>

          {/* Cienki, zielony Sparkline trendu */}
          <div className="w-16 h-6 flex-shrink-0">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <polyline
                points="0,85 20,65 40,90 60,30 80,45 100,10"
                fill="none"
                stroke="#00FFCC"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        {/* CIENIUTKA LINIA ROZDZIELAJĄCA 1 */}
        <div className="border-t border-[#CCF7F4]/10 my-3.5" />

        {/* SEKCJA ŚRODKOWA: Obserwujący oraz Odwiedziny Profilu w jednej linii */}
        <div className="flex items-center justify-between gap-4 text-xs text-[#CCF7F4]/80">
          
          {/* Liczba nowych followersów */}
          <div className="flex items-center gap-1.5 min-w-0">
            <svg className="w-4 h-4 text-[#00FFCC]/80 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span className="truncate">
              <strong className="text-white">+{data.followersCount}</strong> new followers
            </span>
          </div>

          {/* Liczba odwiedzin profilu w tym samym wierszu */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <svg className="w-4 h-4 text-[#00FFCC]/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>
              <strong className="text-white">+{data.profileVisitsCount}</strong> visits
            </span>
          </div>

        </div>

        {/* CIENIUTKA LINIA ROZDZIELAJĄCA 2 */}
        <div className="border-t border-[#CCF7F4]/10 my-3.5" />

        {/* DOLNA SEKCJA: Uproszczony, skondensowany log najnowszego powiadomienia */}
        <div className="bg-[#001F1F]/40 border border-[#CCF7F4]/5 rounded-lg p-2.5 flex items-center justify-between gap-4 text-[11px] font-mono text-[#CCF7F4]/80">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC] flex-shrink-0" />
            <span className="truncate">
              Latest: {data.latestNotification}
            </span>
          </div>
          <div className="text-[10px] font-bold text-[#00FFCC] bg-[#00FFCC]/10 border border-[#00FFCC]/20 px-1.5 py-0.5 rounded flex-shrink-0">
            +{data.newNotificationsCount} new
          </div>
        </div>

      </div>
    </>
  );
}