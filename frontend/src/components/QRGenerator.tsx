'use client';

import React, { useState, Suspense } from 'react';

const QRCode = React.lazy(() =>
  import('react-qrcode-logo').then(m => ({ default: m.QRCode }))
);

export default function QRGenerator() {
  const [profileUrl, setProfileUrl] = useState('');
  const [qrValue, setQrValue] = useState<string>();
  const [fgColor, setFgColor] = useState('#003737');
  const [bgColor, setBgColor] = useState('#ffffff');

  const handleGenerate = () => {
    if (!profileUrl.trim()) return;
    setQrValue(profileUrl.trim());
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 w-full max-w-sm mx-auto">
      <input
        className="w-full rounded-md bg-slate-800 text-white px-3 py-2"
        value={profileUrl}
        placeholder="Profile link"
        onChange={e => setProfileUrl(e.target.value)}
      />

      <div className="flex flex-row gap-4 w-full text-white items-center">
        <div className="flex flex-col text-sm">
          <span>QR color</span>
          <input
            type="color"
            value={fgColor}
            onChange={e => setFgColor(e.target.value)}
            className="h-10 w-20 rounded-md"
          />
        </div>
        <div className="flex flex-col text-sm">
          <span>Background</span>
          <input
            type="color"
            value={bgColor}
            onChange={e => setBgColor(e.target.value)}
            className="h-10 w-20 rounded-md"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
      >
        Generate
      </button>

      {qrValue && (
        <Suspense fallback={<div>Loading QR Code...</div>}>
          <QRCode
            value={qrValue}
            size={220}
            bgColor={bgColor}
            fgColor={fgColor}
            logoImage="/assets/tipit.png"
            logoWidth={80}
            logoHeight={80}
            logoPadding={2}
            logoPaddingStyle="square"
            ecLevel="H"
            enableCORS
          />
        </Suspense>
      )}
    </div>
  );
}