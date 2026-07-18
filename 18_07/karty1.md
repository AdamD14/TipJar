```react
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
    name: '0xMaestro',
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

```


```react
import React from 'react';

export interface CreatorPulseCardProps {
  name?: string;
  handle?: string;
  avatarUrl?: string;
  isSynced?: boolean;
  onSupportClick?: () => void;
}

export const CreatorPulseCard: React.FC<CreatorPulseCardProps> = ({
  name = '0xMaestro',
  handle = '@synth_architect',
  avatarUrl,
  isSynced = true,
  onSupportClick
}) => {
  return (
    <div className="relative p-[1px] group rounded-2xl w-full h-full drop-shadow-[0_8px_16px_rgba(0,31,31,0.6)] isolate transform-gpu">
      {/* Kapsuła wewnętrzna i tło z proceduralnym mikrowzorem 1px */}
      <div className="relative w-full h-full bg-[#003737] rounded-2xl overflow-hidden flex flex-col p-6 z-10 transition-transform duration-[400ms] ease-out group-hover:-translate-y-1">
        {/* Minimalistyczna siatka 1px w tle dla technicznego charakteru */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(171,225,225,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(171,225,225,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none mix-blend-overlay"></div>
        
        <div className="flex items-center gap-4 relative z-20">
          {/* Avatar w kontrze (Pixel Art estetyka Y2K) */}
          <div className="w-16 h-16 bg-[#001F1F] rounded-md border border-[#007373] p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center flex-shrink-0">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover rounded-sm" />
            ) : (
              <svg className="w-10 h-10" style={{ imageRendering: 'pixelated' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" shapeRendering="crispEdges">
                <rect width="8" height="8" fill="#001F1F"/>
                <rect x="2" y="2" width="4" height="4" fill="#3FB5B5"/>
                <rect x="3" y="1" width="2" height="1" fill="#FFD700"/>
                <rect x="2" y="3" width="1" height="1" fill="#4D194D"/>
                <rect x="5" y="3" width="1" height="1" fill="#4D194D"/>
                <rect x="3" y="5" width="2" height="1" fill="#FFD700"/>
              </svg>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-['Mukta_Malar'] text-[#E0F2F2] text-xl tracking-[0.05em] leading-[1.1] font-bold truncate">{name}</h3>
            <span className="font-mono text-[#CCF7F4] text-sm font-medium truncate">{handle}</span>
          </div>
        </div>

        <div className="mt-auto pt-6 flex justify-between items-center relative z-20">
          {/* Web3 Active Indicator */}
          <span className="text-[#00FFCC] font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2 select-none">
            <span className={`w-2 h-2 rounded-full bg-[#00FFCC] shadow-[0_0_8px_#00FFCC] ${isSynced ? 'animate-pulse' : 'opacity-40'}`}></span>
            {isSynced ? 'Node Synced' : 'Offline'}
          </span>
          {/* Przycisk CTA: Monopol Luksusowego Złota */}
          <button 
            onClick={onSupportClick}
            className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#001F1F] px-4 py-2 rounded-lg font-sans font-bold text-sm shadow-[0_4px_12px_rgba(255,215,0,0.15)] transition-all duration-[250ms] active:scale-95 hover:shadow-[0_8px_20px_rgba(255,215,0,0.3)] cursor-pointer"
          >
            SUPPORT
          </button>
        </div>
      </div>
      {/* Hardware Accelerated Shadow Layer (The Maestro Hack) */}
      <div className="absolute inset-0 rounded-2xl shadow-[0_20px_25px_rgba(0,31,31,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity -z-10"></div>
    </div>
  );
};

```

```react
import React from 'react';

export interface TotalVolumeCardProps {
  title?: string;
  value?: string;
  currency?: string;
  changeText?: string;
  statusText?: string;
}

export const TotalVolumeCard: React.FC<TotalVolumeCardProps> = ({
  title = 'Total Volume',
  value = '14,500.50',
  currency = 'USDC',
  changeText = '+12.4% (30d)',
  statusText = 'Healthy velocity'
}) => {
  return (
    <div className="relative bg-[#002121] rounded-2xl p-6 border border-[#004545] shadow-[inset_1px_1px_0_rgba(224,242,242,0.05),0_8px_16px_rgba(0,31,31,0.5)] flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-4">
        <h4 class="font-['Mukta_Malar'] text-[#CCF7F4] text-sm uppercase tracking-wider font-semibold">{title}</h4>
        <svg className="w-5 h-5 text-[#3FB5B5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <div>
        {/* IBM Plex Mono z holograficznym, wielowarstwowym podświetleniem tekstu chroniącym przed halacją */}
        <div className="font-mono text-4xl text-[#E0F2F2] tracking-tight relative inline-block">
          <span className="relative z-10 font-bold" style={{ textShadow: "-1px 1px 0 #001111, 1px 1px 0 #001111, 0px 0px 10px rgba(255,215,0,0.5)" }}>
            {value}
          </span>
          <span className="text-xl text-[#CCF7F4] ml-2 font-normal">{currency}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="bg-[#003737] text-[#E0F2F2] font-mono text-xs px-2 py-1 rounded border border-[#005959] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            {changeText}
          </span>
          <span className="font-mono text-[#76CBCB] text-xs">{statusText}</span>
        </div>
      </div>
    </div>
  );
};

```

```react
import React from 'react';

export interface ArtifactFrameCardProps {
  title?: string;
  imageUrl?: string;
  rarity?: string;
  highestBid?: string;
  onClick?: () => void;
}

export const ArtifactFrameCard: React.FC<ArtifactFrameCardProps> = ({
  title = 'Cybernetic Core #04',
  imageUrl,
  rarity = 'LEGENDARY',
  highestBid = '2.5 ETH',
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className="bg-[#003737] rounded-xl overflow-hidden group cursor-pointer border border-[#005959] relative transform-gpu transition-all duration-[400ms] hover:shadow-[0_15px_30px_rgba(0,31,31,0.7)] hover:-translate-y-1"
    >
      <div className="relative w-full aspect-square bg-[#001F1F] flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover mix-blend-luminosity opacity-85 group-hover:opacity-100 transition-opacity duration-500" />
        ) : (
          <svg className="absolute inset-0 w-full h-full opacity-60 mix-blend-luminosity group-hover:opacity-90 transition-opacity duration-500" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="nftGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4D194D" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#001F1F" stopOpacity="1"/>
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill="url(#nftGlow)" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#FFD700" strokeWidth="0.5" strokeDasharray="2 2" />
            <polygon points="50,25 70,60 30,60" fill="none" stroke="#4D194D" strokeWidth="1" />
            <polygon points="50,75 70,40 30,40" fill="none" stroke="#3FB5B5" strokeWidth="0.5" />
          </svg>
        )}
        {/* Płynne wtopienie obrazka w bazowy Teal */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#003737] via-transparent to-transparent opacity-90"></div>
        {/* Rarity Pill Badge z Emissive Neon Glow */}
        <div className="absolute top-3 right-3 bg-[#4D194D]/90 border border-[#9932CC] text-[#E0F2F2] font-mono text-[10px] px-2 py-0.5 rounded-full shadow-[0_0_12px_rgba(77,25,77,0.8)]">
          {rarity}
        </div>
      </div>
      <div className="p-4 absolute bottom-0 w-full z-10">
        <h3 className="font-['Mukta_Malar'] text-[#E0F2F2] text-lg font-medium">{title}</h3>
        <div className="flex justify-between items-end mt-1">
          <span className="font-mono text-[#CCF7F4] text-xs">Highest Bid</span>
          <span className="font-mono text-[#FFD700] text-sm font-bold drop-shadow-[0_0_4px_rgba(255,215,0,0.6)]">{highestBid}</span>
        </div>
      </div>
    </div>
  );
};

```
```react
import React from 'react';

export interface ArtifactFrameCardProps {
  title?: string;
  imageUrl?: string;
  rarity?: string;
  highestBid?: string;
  onClick?: () => void;
}

export const ArtifactFrameCard: React.FC<ArtifactFrameCardProps> = ({
  title = 'Cybernetic Core #04',
  imageUrl,
  rarity = 'LEGENDARY',
  highestBid = '2.5 ETH',
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className="bg-[#003737] rounded-xl overflow-hidden group cursor-pointer border border-[#005959] relative transform-gpu transition-all duration-[400ms] hover:shadow-[0_15px_30px_rgba(0,31,31,0.7)] hover:-translate-y-1"
    >
      <div className="relative w-full aspect-square bg-[#001F1F] flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover mix-blend-luminosity opacity-85 group-hover:opacity-100 transition-opacity duration-500" />
        ) : (
          <svg className="absolute inset-0 w-full h-full opacity-60 mix-blend-luminosity group-hover:opacity-90 transition-opacity duration-500" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="nftGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4D194D" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#001F1F" stopOpacity="1"/>
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill="url(#nftGlow)" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#FFD700" strokeWidth="0.5" strokeDasharray="2 2" />
            <polygon points="50,25 70,60 30,60" fill="none" stroke="#4D194D" strokeWidth="1" />
            <polygon points="50,75 70,40 30,40" fill="none" stroke="#3FB5B5" strokeWidth="0.5" />
          </svg>
        )}
        {/* Płynne wtopienie obrazka w bazowy Teal */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#003737] via-transparent to-transparent opacity-90"></div>
        {/* Rarity Pill Badge z Emissive Neon Glow */}
        <div className="absolute top-3 right-3 bg-[#4D194D]/90 border border-[#9932CC] text-[#E0F2F2] font-mono text-[10px] px-2 py-0.5 rounded-full shadow-[0_0_12px_rgba(77,25,77,0.8)]">
          {rarity}
        </div>
      </div>
      <div className="p-4 absolute bottom-0 w-full z-10">
        <h3 className="font-['Mukta_Malar'] text-[#E0F2F2] text-lg font-medium">{title}</h3>
        <div className="flex justify-between items-end mt-1">
          <span className="font-mono text-[#CCF7F4] text-xs">Highest Bid</span>
          <span className="font-mono text-[#FFD700] text-sm font-bold drop-shadow-[0_0_4px_rgba(255,215,0,0.6)]">{highestBid}</span>
        </div>
      </div>
    </div>
  );
};

```
```react
import React from 'react';

export interface HolographicNodeCardProps {
  nodeName?: string;
  latency?: string;
  peersCount?: number;
}

export const HolographicNodeCard: React.FC<HolographicNodeCardProps> = ({
  nodeName = 'NODE CONNECTED',
  latency = '12ms',
  peersCount = 144
}) => {
  return (
    <div className="relative w-full min-h-[220px] bg-[#001717] rounded-2xl border border-[#4D194D]/40 overflow-hidden shadow-[inset_0_0_50px_rgba(77,25,77,0.15)] flex flex-col items-center justify-center group">
      {/* Proceduralnie zakodowany Seamless SVG Isometric Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen transition-transform duration-[3s] group-hover:scale-105"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='M50 0L100 25L50 50L0 25z' fill='none' stroke='%234D194D' stroke-width='1'/%3E%3Cpath d='M0 25V75L50 100V50z' fill='none' stroke='%234D194D' stroke-width='1'/%3E%3Cpath d='M100 25V75L50 100V50z' fill='none' stroke='%234D194D' stroke-width='1'/%3E%3C/svg%3E")`, 
          backgroundSize: '100px 100px' 
        }}
      >
      </div>
      <div className="relative z-10 w-16 h-16 rounded-full border-2 border-[#9932CC] flex items-center justify-center shadow-[0_0_20px_rgba(77,25,77,0.6),inset_0_0_15px_rgba(77,25,77,0.6)] bg-[#001111]">
        {/* Jądro emisyjne pulsacyjne */}
        <div className="w-5 h-5 bg-[#9932CC] rounded-full shadow-[0_0_10px_#9932CC] animate-pulse"></div>
      </div>
      <div className="relative z-10 mt-5 text-center">
        <h3 className="font-mono text-[#E0F2F2] text-sm tracking-widest" style={{ textShadow: '0 0 8px rgba(224,242,242,0.4)' }}>
          {nodeName}
        </h3>
        <p className="font-mono text-[#CCF7F4]/70 text-[10px] mt-1">Latency: {latency} / Peers: {peersCount}</p>
      </div>
    </div>
  );
};

```

```react
import React, { useRef } from 'react';

export interface AuthorizeContractCardProps {
  title?: string;
  defaultAddress?: string;
  onSign?: (address: string) => void;
}

export const AuthorizeContractCard: React.FC<AuthorizeContractCardProps> = ({
  title = 'Authorize Contract',
  defaultAddress = '0x71C...9A23',
  onSign
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSignClick = () => {
    if (onSign && inputRef.current) {
      onSign(inputRef.current.value);
    }
  };

  return (
    <div className="bg-[#002121] rounded-2xl p-6 border border-[#003737] shadow-[0_4px_12px_rgba(0,31,31,0.8)]">
      <h3 className="font-['Mukta_Malar'] text-[#E0F2F2] text-xl mb-6 font-light">{title}</h3>
      <div className="relative group">
        {/* Floating Label */}
        <label className="absolute -top-2 left-3 bg-[#002121] px-2 font-mono text-[10px] text-[#76CBCB] uppercase tracking-wider z-20 transition-colors group-focus-within:text-[#FFD700]">
          Wallet Address
        </label>
        {/* Liquid Input Field */}
        <input
          ref={inputRef}
          type="text"
          defaultValue={defaultAddress}
          className="w-full bg-[#001717] text-[#E0F2F2] font-mono text-sm py-4 px-4 rounded-xl border border-transparent shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(0,115,115,0.3)] focus:outline-none focus:border-[#FFD700] focus:shadow-[inset_0_1px_3px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,215,0,0.4),0_0_20px_rgba(255,215,0,0.15)] transition-all duration-300"
        />
      </div>
      {/* Przycisk aktywacyjny */}
      <button 
        onClick={handleSignClick}
        className="w-full mt-6 bg-[#004545] border border-[#007373] text-[#E0F2F2] py-3 rounded-xl font-sans font-bold text-sm tracking-wide shadow-[0_2px_4px_rgba(0,0,0,0.4)] hover:bg-[#005959] hover:border-[#FFD700] hover:shadow-[0_0_15px_rgba(63,181,181,0.25)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
      >
        SIGN TRANSACTION
      </button>
    </div>
  );
};

```
```react
import React from 'react';

export interface PremiumSubscriptionCardProps {
  tierName?: string;
  title?: string;
  description?: string;
  onUpgrade?: () => void;
}

export const PremiumSubscriptionCard: React.FC<PremiumSubscriptionCardProps> = ({
  tierName = 'PRO TIER',
  title = 'Gala Dinner',
  description = 'Unlock gasless microtransactions, programmable wallet automations, and zero platform fees.',
  onUpgrade
}) => {
  return (
    <div className="relative p-[2px] rounded-2xl w-full isolate overflow-hidden group hover:scale-[1.02] transition-transform duration-[400ms]">
      {/* Obracający się gradient conic symulujący błysk fotonowy na krawędzi */}
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#FFD700,#001717,#FFD700)] animate-spin -z-10" style={{ animationDuration: '4s' }}></div>
      <div className="absolute inset-[2px] bg-[#001717] rounded-[14px] -z-10 shadow-[inset_0_20px_50px_-20px_rgba(255,215,0,0.15)]"></div>
      
      <div className="p-6 h-full flex flex-col relative z-10">
        <div className="w-max px-3 py-1 bg-[#4D194D]/40 border border-[#9932CC] rounded-full font-mono text-[10px] text-[#E0F2F2] tracking-widest mb-5 shadow-[0_0_10px_rgba(77,25,77,0.6)]">
          {tierName}
        </div>
        <h3 className="font-['Mukta_Malar'] text-[#FFD700] text-3xl font-light drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">{title}</h3>
        <p className="font-sans text-[#E0F2F2] text-sm mt-3 mb-8 leading-relaxed">{description}</p>
        <button 
          onClick={onUpgrade}
          className="mt-auto w-full py-3.5 rounded-xl bg-[#FFD700] text-[#001F1F] font-bold font-mono tracking-wide shadow-[0_6px_20px_rgba(255,215,0,0.3)] hover:shadow-[0_10px_30px_rgba(255,215,0,0.5)] active:scale-95 transition-all duration-300 cursor-pointer"
        >
          UPGRADE SYSTEM
        </button>
      </div>
    </div>
  );
};

```
```react
import React from 'react';

export interface FrozenGlassErrorCardProps {
  title?: string;
  description?: string;
}

export const FrozenGlassErrorCard: React.FC<FrozenGlassErrorCardProps> = ({
  title = 'Connection Severed',
  description = 'The cryptographic node failed to respond. Ice protocols engaged. Retrying in 10s.'
}) => {
  return (
    <div className="relative bg-[#001111] rounded-2xl p-8 overflow-hidden border border-[#002121] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
      {/* Proceduralna tekstura szronu - krystaliczna dyspersja (szum SVG) */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      ></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
        {/* Ikona wygaszonego ostrzeżenia */}
        <div className="w-14 h-14 rounded-full border border-[#FFB4AB]/30 flex items-center justify-center bg-[#FFB4AB]/5 shadow-[0_0_20px_rgba(255,180,171,0.15)] mb-5 backdrop-blur-sm">
          <svg className="w-6 h-6 text-[#FFB4AB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="font-['Mukta_Malar'] text-[#FFB4AB] text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{title}</h3>
        <p className="font-mono text-[#E0F2F2]/50 text-xs mt-2 max-w-[80%] leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

```

```react
import React, { useState } from 'react';

export interface MassTransferToggleCardProps {
  title?: string;
  description?: string;
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

export const MassTransferToggleCard: React.FC<MassTransferToggleCardProps> = ({
  title = 'Gasless Mode',
  description = 'Sponsor network transaction fees for your fans.',
  defaultChecked = true,
  onToggle
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const nextState = !checked;
    setChecked(nextState);
    if (onToggle) {
      onToggle(nextState);
    }
  };

  return (
    <div className="bg-[#002121] rounded-xl p-5 border border-[#003737] flex items-center justify-between shadow-[0_6px_15px_rgba(0,31,31,0.6)] group hover:border-[#004545] transition-colors duration-300">
      <div className="mr-4">
        <h4 className="font-['Mukta_Malar'] text-[#E0F2F2] text-md font-semibold">{title}</h4>
        <p className="font-mono text-[#CCF7F4]/60 text-xs mt-0.5">{description}</p>
      </div>
      {/* The Mass Transfer Toggle */}
      <button 
        onClick={handleToggle}
        className="relative w-14 h-7 rounded-full bg-[#001111] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(0,55,55,0.4)] flex items-center p-1 cursor-pointer transition-colors duration-300 outline-none focus:ring-2 focus:ring-[#9932CC] focus:ring-offset-2 focus:ring-offset-[#002121]"
      >
        {/* Masa przeciskająca się do odpowiedniego bieguna */}
        <div className={`w-5 h-5 rounded-full bg-[#9932CC] shadow-[0_0_10px_#9932CC] transform transition-transform duration-[400ms] ${checked ? 'translate-x-7' : 'translate-x-0'}`}></div>
      </button>
    </div>
  );
};

```

```react
import React from 'react';

export interface TacticalOverrideCardProps {
  systemLabel?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onExecute?: () => void;
}

export const TacticalOverrideCard: React.FC<TacticalOverrideCardProps> = ({
  systemLabel = 'System Terminal',
  title = 'Tactical Override',
  description = 'Initiate hardware bypass protocol on sector 7G.',
  buttonText = 'Execute Protocol',
  onExecute
}) => {
  return (
    <div className="relative w-full h-[280px] p-[1px] filter drop-shadow-[0_15px_25px_rgba(0,31,31,0.9)] group">
      {/* Kapsuła wewnętrzna ścinająca narożniki clip-path */}
      <div className="w-full h-full bg-gradient-to-br from-[#002121] to-[#001111] relative overflow-hidden flex flex-col" style={{ clipPath: 'polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)' }}>
        {/* Bevel */}
        <div className="absolute inset-0 border-[1.5px] border-[#005959]/50 pointer-events-none" style={{ clipPath: 'polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)' }}></div>
        {/* Celowniki w narożnikach */}
        <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#007373]"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#007373]"></div>
        
        <div className="p-8 relative z-10 h-full flex flex-col">
          <div class="flex justify-between items-start">
            <span className="font-mono text-[#007373] text-[10px] tracking-[0.2em] uppercase" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}>
              {systemLabel}
            </span>
            <svg className="w-4 h-4 text-[#007373] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <div className="mt-auto">
            <h3 className="font-['Mukta_Malar'] text-[#E0F2F2] text-2xl font-light tracking-wide">{title}</h3>
            <p className="font-mono text-[#CCF7F4]/60 text-xs mt-1 mb-5">{description}</p>
            <button 
              onClick={onExecute}
              className="w-full px-6 py-3 bg-transparent border border-[#FFD700]/80 text-[#FFD700] font-mono text-xs uppercase tracking-[0.15em] shadow-[inset_0_0_12px_rgba(255,215,0,0.1),0_0_12px_rgba(255,215,0,0.1)] hover:bg-[#FFD700]/10 hover:shadow-[inset_0_0_20px_rgba(255,215,0,0.25),0_0_20px_rgba(255,215,0,0.3)] active:scale-[0.98] transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

```
