"use client";

import { useState } from 'react';
import TipModal from '@/components/TipModal';

export default function SupportButton({ username }: { username: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-3 rounded-lg bg-teal-500 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-teal-300"
      >
        Wesprzyj
      </button>
      <TipModal username={username} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

