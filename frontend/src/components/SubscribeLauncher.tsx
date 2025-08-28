'use client';
import { useState } from 'react';
import SubscribeModal, { TierPub } from './SubscribeModal';

export default function SubscribeLauncher({ username, tiers }:{ username:string; tiers:TierPub[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={()=>setOpen(true)} className="px-5 py-3 rounded-xl border border-white/15">Subscribe</button>
      <SubscribeModal username={username} tiers={tiers} open={open} onClose={()=>setOpen(false)} />
    </>
  );
}

