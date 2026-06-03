# Kompletna Dokumentacja Wdrożeniowa: Onboarding Studio (TipJar Ecosystem)

## 📂 Struktura Projektu 
* `lib/stores/widgetStore.ts`
* `app/widget/preview/page.tsx`
* `components/WidgetGenerator.tsx`
* `app/api/og/route.tsx`
* `app/overlay/[creatorId]/page.tsx`
* `app/dashboard/studio/page.tsx`
* `public/widget.js`

---

## Krok 1: Mózg Systemu (Stan i Konfiguracja)
**Plik:** `lib/stores/widgetStore.ts`
**Cel:** Przechowuje ustawienia wyglądu widgetu.

```typescript
import { create } from 'zustand';

export interface TipWidgetConfig {
  handle: string;
  style: 'button' | 'slider';
  shape: 'circle' | 'rounded' | 'square';
  size: 'small' | 'medium' | 'large';
  themeColor: string;
  textColor: string;
  label: string;
  iconType: 'emoji' | 'custom';
  iconValue: string;
}

interface TipWidgetStore {
  config: TipWidgetConfig;
  setConfig: (conf: Partial<TipWidgetConfig>) => void;
}

export const useWidgetStore = create<TipWidgetStore>((set) => ({
  config: {
    handle: 'me',
    style: 'button',
    shape: 'rounded',
    size: 'medium',
    themeColor: '#006D6D',
    textColor: '#FFFFFF',
    label: 'Wesprzyj mnie',
    iconType: 'emoji',
    iconValue: '💸',
  },
  setConfig: (conf) =>
    set((state) => ({
      config: { ...state.config, ...conf },
    })),
}));
```

---

## Krok 2: Publiczny Widget (To, co widzi fan)
**Plik:** `app/widget/preview/page.tsx`
**Cel:** Widok ładowany wewnątrz ramki (iframe). Obsługuje suwak (Hover Slider) i modal płatności.

```tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WidgetPreviewPage() {
  const searchParams = useSearchParams();
  
  const handle = searchParams.get('handle') || 'me';
  const style = searchParams.get('style') || 'button';
  const shape = searchParams.get('shape') || 'rounded';
  const color = searchParams.get('color') || '#006D6D';
  const label = searchParams.get('label') || 'Wesprzyj';
  const icon = searchParams.get('icon') || '💸';

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [amount, setAmount] = useState(5);

  const toggleModal = (state?: boolean) => {
    const newState = state ?? !isOpen;
    setIsOpen(newState);
    window.parent.postMessage({ type: 'TIPJAR_RESIZE', isOpen: newState }, '*');
  };

  const getRadius = () => {
    if (shape === 'circle') return '9999px';
    if (shape === 'square') return '0px';
    return '12px';
  };

  return (
    <div className="flex flex-col-reverse items-end justify-end w-full h-full p-4 font-sans select-none overflow-hidden">
      
      {style === 'slider' && !isOpen && (
        <div 
          className="relative z-10 flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            initial={{ width: 0, opacity: 0, x: 20 }}
            animate={{ width: isHovered ? 160 : 0, opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            className="h-12 bg-white shadow-lg rounded-l-full flex items-center pr-6 pl-4 overflow-hidden"
          >
            <input
              type="range" min="1" max="20" step="1" value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006D6D]"
            />
            <span className="ml-2 font-bold text-[#006D6D] text-sm">${amount}</span>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => toggleModal(true)}
            className="w-14 h-14 text-white shadow-xl flex items-center justify-center text-2xl z-20"
            style={{ backgroundColor: color, borderRadius: getRadius() }}
          >
            {icon}
          </motion.button>
        </div>
      )}

      {style === 'button' && !isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => toggleModal(true)}
          className="px-6 py-3 text-white font-bold shadow-lg flex items-center gap-2 z-10"
          style={{ backgroundColor: color, borderRadius: getRadius() }}
        >
          <span>{icon}</span> {label}
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-4 right-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50"
          >
            <button onClick={() => toggleModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-black">✕</button>
            <div className="text-center mb-4">
              <h3 className="font-bold text-gray-800 text-lg">@{handle}</h3>
              <p className="text-xs text-gray-500">Wyślij szybki napiwek</p>
            </div>
            <button className="w-full bg-[#FFD700] hover:bg-[#ffea61] text-black font-bold py-3 rounded-xl transition-colors">
               Tip ${amount} Now 💛
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## Krok 3: Generator Narzędzi Promocyjnych
**Plik:** `components/WidgetGenerator.tsx`
**Cel:** Generuje kod QR oraz plik PDF do druku.

```tsx
'use client';

import { useWidgetStore } from '@/lib/stores/widgetStore';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function WidgetGenerator() {
  const { config } = useWidgetStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const scriptTag = `<script src="https://tipjar.plus/widget.js" data-creator="${config.handle}" data-style="${config.style}"></script>`;
  const profileUrl = `https://tipjar.plus/@${config.handle}`;

  const downloadPDF = async () => {
    if (!containerRef.current) return;
    const canvas = await html2canvas(containerRef.current);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    pdf.setFontSize(22);
    pdf.text(`Wspieraj @${config.handle}`, 20, 20);
    pdf.addImage(imgData, 'PNG', 20, 30, 100, 100);
    pdf.setFontSize(12);
    pdf.text(profileUrl, 20, 140);
    
    pdf.save(`${config.handle}_tipjar.pdf`);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
      <h3 className="font-bold text-lg">📦 Narzędzia Promocyjne</h3>

      <div ref={containerRef} className="p-8 border-2 border-dashed border-gray-200 rounded flex flex-col items-center gap-4 bg-white">
         <QRCodeSVG value={profileUrl} size={150} level="H" includeMargin />
         <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{profileUrl}</div>
      </div>

      <div className="flex gap-4">
        <button onClick={downloadPDF} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium">
           📥 Pobierz PDF (A4)
        </button>
        <button onClick={() => navigator.clipboard.writeText(scriptTag)} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-2 rounded font-medium">
           📋 Kopiuj Skrypt
        </button>
      </div>

      <div className="bg-slate-50 p-3 rounded border text-xs font-mono break-all text-gray-600">
        {scriptTag}
      </div>
    </div>
  );
}
```

---

## Krok 4: Karta Social Media (Open Graph)
**Plik:** `app/api/og/route.tsx`
**Cel:** Generuje podgląd obrazka podczas udostępniania linku profilu w mediach społecznościowych.

```tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle') || 'tworca';
  const goal = searchParams.get('goal');

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex', height: '100%', width: '100%',
          backgroundColor: '#1a1a1a', color: 'white',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 70, fontWeight: 'bold', color: '#FFD700', marginBottom: 20 }}>
          TipJar+
        </div>
        <div style={{ fontSize: 40, marginBottom: 40 }}>
          Wspieraj twórcę <span style={{ color: '#006D6D', marginLeft: 10 }}>@{handle}</span>
        </div>
        {goal && (
          <div style={{ backgroundColor: '#006D6D', padding: '15px 40px', borderRadius: 30, fontSize: 30 }}>
            Cel: {goal}
          </div>
        )}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

---

## Krok 5: Nakładka dla OBS (Streamer Overlay)
**Plik:** `app/overlay/[creatorId]/page.tsx`
**Cel:** Nakładka Live z powiadomieniami o napiwkach dla programu OBS + obsługa kodu QR.

```tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import io, { Socket } from 'socket.io-client';

interface TipEntry {
  id: string;
  nickname: string;
  avatarUrl?: string;
  amount: number;
  message?: string;
}

export default function LiveTipOverlay({ params, searchParams }: { params: { creatorId: string }, searchParams: { test?: string, qr?: string } }) {
  const { creatorId } = params;
  const isTest = searchParams.test === 'true';
  const showQR = searchParams.qr === 'true';
  
  const [queue, setQueue] = useState<TipEntry[]>([]);
  const [current, setCurrent] = useState<TipEntry | null>(null);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (isTest) {
      const interval = setInterval(() => {
        setQueue(prev => [...prev, {
          id: Date.now().toString(), nickname: 'SuperFan', amount: 50, message: 'Świetny stream! 🔥'
        }]);
      }, 5000);
      return () => clearInterval(interval);
    }

    socket.current = io('http://localhost:3000', { query: { creatorId }, transports: ['websocket'] });
    socket.current.on('tip', (tip: TipEntry) => setQueue((prev) => [...prev, tip]));
    return () => { socket.current?.disconnect(); };
  }, [creatorId, isTest]);

  useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setQueue(rest);
      const timeout = setTimeout(() => setCurrent(null), 7000);
      return () => clearTimeout(timeout);
    }
  }, [current, queue]);

  return (
    <div className="fixed inset-0 overflow-hidden flex flex-col justify-end p-6 pointer-events-none">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="mb-4 bg-[#006D6D]/90 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl flex items-center gap-4 max-w-md border-2 border-[#FFD700]"
          >
             <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center text-2xl overflow-hidden shrink-0">
                {current.avatarUrl ? <img src={current.avatarUrl} alt="" className="w-full h-full object-cover"/> : '😎'}
             </div>
             <div>
               <h4 className="font-bold text-[#FFD700] text-lg">{current.nickname}</h4>
               <div className="text-2xl font-black font-mono">+{current.amount} USDC</div>
               {current.message && <p className="text-sm opacity-90 italic">"{current.message}"</p>}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showQR && (
        <div className="absolute bottom-6 right-6 bg-white p-2 rounded-xl shadow-2xl">
           <img 
             src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tipjar.plus/@${creatorId}`} 
             alt="QR" className="w-24 h-24"
           />
           <div className="text-center text-xs font-bold mt-1 text-gray-800">Zeskanuj napiwek</div>
        </div>
      )}
    </div>
  );
}
```

---

## Krok 6: Dashboard Twórcy (Centrum Dowodzenia)
**Plik:** `app/dashboard/studio/page.tsx`
**Cel:** Panel pozwalający na modyfikację ustawień i generowanie komponentów.

```tsx
'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useWidgetStore } from '@/lib/stores/widgetStore';
import WidgetGenerator from '@/components/WidgetGenerator';
import OverlayEditor from '@/components/OverlayEditor'; // Twój istniejący komponent

export default function CreatorStudioPage() {
  const { data: session } = useSession();
  const handle = session?.user?.username || 'me';
  const { config, setConfig } = useWidgetStore();

  useEffect(() => { if(handle) setConfig({ handle }); }, [handle, setConfig]);

  const previewUrl = `/widget/preview?handle=${handle}&style=${config.style}&shape=${config.shape}&color=${encodeURIComponent(config.themeColor)}&label=${encodeURIComponent(config.label)}&icon=${encodeURIComponent(config.iconValue)}`;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-12 text-gray-800">
      <h1 className="text-3xl font-extrabold">🎨 Centrum Kreacji</h1>

      <section className="grid lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
             <h2 className="font-bold text-xl flex items-center gap-2">💸 Wygląd Widgetu</h2>
             
             <div>
               <label className="text-xs font-bold text-gray-500 uppercase">Styl Widgetu</label>
               <div className="flex gap-2 mt-1">
                 {['button', 'slider'].map(s => (
                   <button key={s} onClick={() => setConfig({ style: s as any })} 
                     className={`flex-1 py-2 rounded border ${config.style === s ? 'bg-[#006D6D] text-white' : 'bg-gray-50'}`}>
                     {s === 'button' ? '🟨 Button' : '🎚️ Slider'}
                   </button>
                 ))}
               </div>
             </div>

             <div>
               <label className="text-xs font-bold text-gray-500 uppercase">Kształt</label>
               <div className="flex gap-2 mt-1">
                 {['circle', 'rounded', 'square'].map(s => (
                   <button key={s} onClick={() => setConfig({ shape: s as any })} 
                     className={`flex-1 py-2 rounded border ${config.shape === s ? 'bg-[#006D6D] text-white' : 'bg-gray-50'}`}>
                     {s}
                   </button>
                 ))}
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Napis</label>
                   <input type="text" value={config.label} onChange={e => setConfig({ label: e.target.value })} className="border p-2 rounded w-full" />
                </div>
                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Kolor</label>
                   <input type="color" value={config.themeColor} onChange={e => setConfig({ themeColor: e.target.value })} className="border p-1 rounded h-10 w-full" />
                </div>
             </div>
          </div>

          <WidgetGenerator />
        </div>

        <div className="lg:col-span-4 flex flex-col">
           <div className="flex-1 bg-gray-100 rounded-2xl border-4 border-gray-200 relative flex items-end justify-end p-8 min-h-[500px]">
              <span className="absolute top-2 left-2 text-[10px] font-bold text-gray-400 bg-white/80 px-2 rounded">SYMULACJA STRONY (PREVIEW)</span>
              <iframe src={previewUrl} className="w-[350px] h-[550px]" style={{border:0, background:'transparent'}} />
           </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
           <h2 className="font-bold text-xl flex items-center gap-2">📺 Overlay OBS</h2>
           <OverlayEditor />
           <div className="bg-black rounded-xl p-2 h-80 border border-gray-700 relative">
              <span className="absolute top-2 left-2 text-[10px] font-bold text-gray-400 bg-black/80 px-2 rounded z-10">PODGLĄD NAKŁADKI</span>
              <iframe src={`/overlay/${handle}?test=true&qr=true`} className="w-full h-full bg-transparent border-0" />
           </div>
        </div>

      </section>
    </main>
  );
}
```

---

## Krok 7: Skrypt do Osadzania (Widget Loader)
**Plik:** `public/widget.js`
**Cel:** Skrypt dla twórców do umieszczania na swoich własnych stronach WWW.

```javascript
(function () {
  const script = document.currentScript;
  const creator = script.getAttribute('data-creator') || 'me';
  const style = script.getAttribute('data-style') || 'button';
  
  // W PRODUKCJI ZMIEŃ NA DOMENĘ DOCELOWĄ NP. [https://tipjar.plus](https://tipjar.plus)
  const DOMAIN = 'http://localhost:3000'; 
  
  const iframe = document.createElement('iframe');
  iframe.src = `${DOMAIN}/widget/preview?handle=${creator}&style=${style}`;
  
  const baseStyles = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: style === 'slider' ? '240px' : '180px',
    height: '80px',
    border: 'none',
    zIndex: '999999',
    transition: 'height 0.3s ease, width 0.3s ease',
    background: 'transparent',
  };

  Object.assign(iframe.style, baseStyles);
  iframe.allowTransparency = "true";

  window.addEventListener('message', (event) => {
    if (event.data.type === 'TIPJAR_RESIZE') {
      if (event.data.isOpen) {
        iframe.style.width = '350px';
        iframe.style.height = '550px';
      } else {
        iframe.style.width = style === 'slider' ? '240px' : '180px';
        iframe.style.height = '80px';
      }
    }
  });

  document.body.appendChild(iframe);
})();
```
