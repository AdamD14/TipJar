# WidgetPreview.tsx

✅ Gotowy `WidgetPreview.tsx` – umożliwia:

- Generację linku `tipjar.plus/@ja`
- Pobranie QR jako PNG + A4 PDF z linkiem
- Edycję kolorów QR
- Podgląd widgetu z aktualnymi ustawieniami
- Skrypt do wklejenia na stronę

Następny krok: komponent `WidgetPreview.tsx` z opcją: 

- podglądu,
- kopiowania kodu `<script>`,
- generowania QR z kolorem tła/frontu,
- eksportem wersji PDF na A4 z linkiem i kodem

// components/WidgetPreview.tsx
'use client';

import { useWidgetStore } from '@/lib/stores/widgetStore';
import QRCode from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function WidgetPreview({ handle }: { handle: string }) {
const { config } = useWidgetStore();
const containerRef = useRef<HTMLDivElement>(null);
const [bg, setBg] = useState('#ffffff');
const [fg, setFg] = useState('#000000');
const profileUrl = `https://tipjar.plus/@${handle}`;

const scriptTag = `<script src='<https://tipjar.plus/widget.js>' data-creator='${handle}'></script>`;

const downloadQR = () => {
const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const url = canvas.toDataURL();
const a = document.createElement('a');
a.href = url;
a.download = `${handle}_qr.png`;
a.click();
};

const downloadPDF = async () => {
if (!containerRef.current) return;
const canvas = await html2canvas(containerRef.current);
const imgData = canvas.toDataURL('image/png');
const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
pdf.text(profileUrl, 40, 40);
pdf.addImage(imgData, 'PNG', 40, 60, 300, 300);
pdf.save(`${handle}_qr_promo.pdf`);
};

return (
<div className="space-y-4">
<div className="text-lg font-semibold">🔗 Link profilu: <code>{profileUrl}</code></div>
<div className="bg-gray-100 rounded p-2 text-sm">
<span className="font-bold">Kod osadzenia:</span>
<pre className="overflow-x-auto mt-1">{scriptTag}</pre>
</div>

```
  <div className="flex flex-col md:flex-row gap-6 items-start">
    <div className="text-center space-y-2">
      <QRCode value={profileUrl} size={192} fgColor={fg} bgColor={bg} />
      <div className="flex gap-2 items-center justify-center">
        <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} title="Tło" />
        <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} title="Kolor kodu" />
      </div>
      <button
        onClick={downloadQR}
        className="bg-blue-100 hover:bg-blue-200 px-4 py-1 rounded"
      >
        📥 Pobierz PNG QR
      </button>
      <button
        onClick={downloadPDF}
        className="bg-green-100 hover:bg-green-200 px-4 py-1 rounded"
      >
        🖨️ PDF do druku (A4)
      </button>
    </div>

    <div className="p-4 border rounded-md" style={{ backgroundColor: config.bgColor, color: config.textColor }}>
      <div
        style={{
          borderRadius:
            config.shape === 'circle'
              ? '9999px'
              : config.shape === 'rounded'
              ? '12px'
              : '0px',
          padding: config.size === 'small' ? 8 : config.size === 'large' ? 20 : 12,
          fontSize: config.size === 'small' ? 12 : config.size === 'large' ? 20 : 16,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
        }}
      >
        {config.iconType === 'emoji' ? config.iconValue : <img src={config.iconValue} alt="icon" width={24} height={24} />}
        <span>{config.label}</span>
      </div>
    </div>
  </div>
</div>

```

);
}