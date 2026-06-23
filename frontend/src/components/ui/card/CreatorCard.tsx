"use client";
import React, { useState } from 'react';

// ==========================================
// INTERFEJSY I TYPY (TypeScript)
// ==========================================

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
  isSynced: boolean;
  statusText?: string;
}

export interface CreatorCardProps {
  creator: Creator;
  /** Callback wywoływany po kliknięciu przycisku wsparcia - idealny do integracji z koszykiem lub modalem płatności */
  onSupport: (creatorId: string) => void;
}

// Przykładowy retro-pixel fallback w formacie SVG inline dla awatarów
const PIXEL_AVATAR_FALLBACK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 8 8" shape-rendering="crispEdges"><rect width="8" height="8" fill="%23001F1F"/><rect x="2" y="2" width="4" height="4" fill="%233FB5B5"/><rect x="3" y="1" width="2" height="1" fill="%23FFD700"/><rect x="2" y="3" width="1" height="1" fill="%234D194D"/><rect x="5" y="3" width="1" height="1" fill="%234D194D"/><rect x="3" y="5" width="2" height="1" fill="%23FFD700"/></svg>`;

// ==========================================
// REUSABLE CREATOR CARD COMPONENT
// ==========================================

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator, onSupport }) => {
  const [imageError, setImageError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSupportClick = async () => {
    setIsSubmitting(true);
    try {
      // Wywołanie callbacku (można tu podpiąć bezpośrednie zapytanie do NestJS)
      await onSupport(creator.id);
    } catch (error) {
      console.error('Błąd podczas inicjalizacji płatności:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative p-[1px] group rounded-2xl w-full h-full drop-shadow-[0_8px_16px_rgba(0,31,31,0.6)] isolate transform-gpu">
      
      {/* Kapsuła wewnętrzna i tło z proceduralnym mikrowzorem 1px */}
      <div className="relative w-full h-full bg-[#003737] rounded-2xl overflow-hidden flex flex-col p-6 z-10 transition-transform duration-[400ms] ease-[var(--ease-liquid)] group-hover:-translate-y-1">
        
        {/* Minimalistyczna siatka 1px w tle dla technicznego charakteru */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(171,225,225,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(171,225,225,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none mix-blend-overlay"></div>
        
        <div className="flex items-center gap-4 relative z-20">
          {/* Avatar w kontrze (Pixel Art estetyka Y2K) */}
          <div className="w-16 h-16 bg-[#001F1F] rounded-md border border-[#007373] p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex-shrink-0">
            <img 
              src={imageError || !creator.avatarUrl ? PIXEL_AVATAR_FALLBACK : creator.avatarUrl} 
              alt={`Avatar użytkownika ${creator.name}`} 
              className="w-full h-full object-cover rendering-pixelated" 
              onError={() => setImageError(true)}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-['Mukta_Malar'] text-[#E0F2F2] text-xl tracking-[0.05em] leading-[1.1] font-bold truncate">
              {creator.name}
            </h3>
            <span className="text-[#CCF7F4] text-sm font-medium truncate">
              {creator.handle}
            </span>
          </div>
        </div>
        
        <div className="mt-auto pt-6 flex justify-between items-center relative z-20 gap-2">
          {/* Web3 Active Indicator */}
          <span className="text-[#ABE1E1] font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2 select-none">
            <span className={`w-2 h-2 rounded-full ${creator.isSynced ? 'bg-[#00E676] animate-[pulse_2s_cubic-bezier(0.25,0.1,0.25,1.0)_infinite] shadow-[0_0_8px_rgba(0,230,118,0.8)]' : 'bg-[#FF5252]'}`}></span>
            {creator.statusText || (creator.isSynced ? 'Node Synced' : 'Offline')}
          </span>
          
          {/* Przycisk CTA: Monopol Luksusowego Złota */}
          <button 
            onClick={handleSupportClick}
            disabled={isSubmitting}
            className="bg-[#FFD700] text-[#001F1F] px-4 py-2 rounded-lg font-['Mukta_Malar'] font-bold text-sm shadow-[0_4px_12px_rgba(255,215,0,0.15)] transition-all duration-[250ms] ease-[var(--ease-magnetic)] active:scale-95 hover:shadow-[0_8px_20px_rgba(255,215,0,0.3)] hover:bg-[#FFE100] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[90px]"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-[#001F1F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'SUPPORT'
            )}
          </button>
        </div>
      </div>
      
      {/* Hardware Accelerated Shadow Layer (The Maestro Hack) minimalizująca drenaż baterii */}
      <div className="absolute inset-0 rounded-2xl shadow-[0_20px_25px_rgba(0,31,31,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity -z-10"></div> 
    </div>
  );
};

// ==========================================
// PODGLĄD APLIKACJI (DEMO PLAYGROUND)
// ==========================================

export default function App() {
  // Przykładowe dane pobrane z hipotetycznego kontrolera NestJS
  const mockCreator: Creator = {
    id: 'creator_9a8f23b1',
    name: 'CreatorCard',
    handle: '@synth_architect',
    avatarUrl: '', // Pusta wartość uruchomi retro fallback
    isSynced: true,
    statusText: 'Node Synced'
  };

  const handleSupport = async (id: string) => {
    console.log(`[Next.js -> NestJS API Post] Inicjalizacja płatności dla twórcy o ID: ${id}`);
    
    // Przykład zapytania do NestJS:
    // const response = await fetch(`https://api.tipjar.plus/creators/${id}/support`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ amount: 10 })
    // });
    // const session = await response.json();
    
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-[#001F1F] flex flex-col items-center justify-center p-6 text-[#E0F2F2]">
      {/* Integracja globalnych zmiennych CSS systemu designu */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Mukta+Malar:wght@500;600;700&display=swap');
        
        :root {
          --ease-liquid: cubic-bezier(0.4, 0.0, 0.2, 1);
          --ease-magnetic: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        body {
          font-family: 'IBM Plex Sans', sans-serif;
        }

        .rendering-pixelated {
          image-rendering: pixelated;
        }
      `}</style>

      <div className="w-full max-w-sm h-80">
        <h2 className="text-[#ABE1E1] text-xs font-mono mb-4 tracking-widest text-center uppercase">
          Podgląd Komponentu CreatorCard (TSX)
        </h2>
        
        <CreatorCard 
          creator={mockCreator} 
          onSupport={handleSupport} 
        />
        
        <p className="text-center text-xs text-[#76CBCB] mt-6 font-mono">
          Wygenerowano dla stosu: Next.js + NestJS + TailwindCSS
        </p>
      </div>
    </div>
  );
}