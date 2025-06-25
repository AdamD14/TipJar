"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Uproszczona wersja bez shadcn/ui (Tailwind only)

// Typ ref‑a wystawiany przez react‑qrcode‑logo
type QRCodeHandle = {
  download: (type?: "png" | "svg", fileName?: string) => void;
};

// Lazy‑load komponent, aby ominąć SSR
const QRCode = dynamic(() => import("react-qrcode-logo").then(m => m.QRCode), {
  ssr: false,
});

export default function QRGenerator() {
  const [profileUrl, setProfileUrl] = useState("");
  const [qrValue, setQrValue] = useState<string>();
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [isTransparent, setIsTransparent] = useState(true);

  let qrInstance: QRCodeHandle | null = null;

  const handleGenerate = () => {
    if (!profileUrl.trim()) return;
    setQrValue(profileUrl.trim());
  };

  const handleDownload = () => {
    qrInstance?.download("png", "tipjar-qr");
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 w-full max-w-sm mx-auto">
      <input
        className="w-full rounded-md bg-slate-800 text-white px-3 py-2"
        value={profileUrl}
        placeholder="Profile link"
        onChange={e => setProfileUrl(e.target.value)}
      />

      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          checked={isTransparent}
          onChange={e => setIsTransparent(e.target.checked)}
        />
        Transparent background
      </label>

      {!isTransparent && (
        <div className="flex flex-col gap-1 w-full text-white">
          <span>Background color</span>
          <input
            type="color"
            value={bgColor}
            onChange={e => setBgColor(e.target.value)}
            className="h-10 w-20 rounded-md"
          />
        </div>
      )}

      <div className="flex flex-col gap-1 w-full text-white">
        <span>QR color</span>
        <input
          type="color"
          value={fgColor}
          onChange={e => setFgColor(e.target.value)}
          className="h-10 w-20 rounded-md"
        />
      </div>

      <button
        onClick={handleGenerate}
        className="w-full px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
      >
        Generate
      </button>

      {qrValue && (
        <>
          <QRCode
            // @ts-expect-error QRCode ref typing is not compatible
            ref={(instance: QRCodeHandle | null) => {
              qrInstance = instance;
            }}
            value={qrValue}
            size={220}
            bgColor={bgColor}
            fgColor={fgColor}
            logoImage="/assets/icon_tipjar1.png"
            logoWidth={100}
            logoHeight={100}
            removeQrCodeBehindLogo
            logoPadding={4}
            logoPaddingStyle="circle"
            ecLevel="H" // Highest error correction
            enableCORS
          />

          <button
            onClick={handleDownload}
            className="w-full mt-4 px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition"
          >
            Download QR as PNG
          </button>
        </>
      )}
    </div>
  );
}
