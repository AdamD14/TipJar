'use client';
import { useState } from 'react';
import TipModal from './TipModal';

export default function TipLauncher({ username }:{ username:string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={()=>setOpen(true)} className="px-5 py-3 rounded-xl bg-[#FFD700] text-[#003737] font-bold">
        Tip USDC
      </button>
      <TipModal username={username} open={open} onClose={()=>setOpen(false)} />
    </>
  );
}

