"use client";

import { useState } from 'react';
import TipModal from '@/components/payments/TipModal';
import { track } from '@/lib/analytics/track';

export default function SupportButton({ creatorAlias }: { creatorAlias: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          track('tap_tip', { alias: creatorAlias });
        }}
        className="px-5 py-3 rounded-lg bg-teal-500 text-black font-semibold"
      >
        Wesprzyj
      </button>
      <TipModal
        open={open}
        onClose={() => setOpen(false)}
        creatorId={creatorAlias}
        onSuccess={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

