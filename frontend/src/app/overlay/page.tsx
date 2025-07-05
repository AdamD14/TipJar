'use client';

import { useSearchParams } from 'next/navigation';

export default function OverlayPage() {
  const searchParams = useSearchParams();
  const creatorId = searchParams.get('creatorId') || 'me';
  const showQR = searchParams.get('qr') === 'true';

  return (
    <div className="relative w-full h-screen bg-transparent">
      {/* Example tip alert */}
      <div className="absolute top-10 left-10 text-white text-2xl bg-black/50 px-4 py-2 rounded-lg">
        Nowy tip od @fan123: 5 USDC 💸
      </div>
      {showQR && (
        <img
          src={`/api/qr?handle=${creatorId}`}
          alt="QR Tip Link"
          className="absolute bottom-4 right-4 w-24 h-24 bg-white p-1 rounded shadow-xl"
        />
      )}
    </div>
  );
}
