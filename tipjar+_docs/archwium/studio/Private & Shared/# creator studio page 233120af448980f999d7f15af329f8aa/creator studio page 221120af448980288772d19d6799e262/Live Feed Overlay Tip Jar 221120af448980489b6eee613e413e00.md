# Live Feed Overlay Tip Jar

// app/overlay/[creatorId]/page.tsx
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

export default function LiveTipOverlay({ searchParams }: { searchParams: { creatorId: string, test?: string } }) {
const [queue, setQueue] = useState<TipEntry[]>([]);
const [current, setCurrent] = useState<TipEntry | null>(null);
const socket = useRef<Socket | null>(null);
const { creatorId, test } = searchParams;

// Polling fallback in case WebSocket fails
useEffect(() => {
let pollInterval: NodeJS.Timeout;

```
if (!test && !socket.current && creatorId) {
  pollInterval = setInterval(async () => {
    try {
      const res = await fetch(`/api/tips/stream/${creatorId}`);
      if (res.ok) {
        const tip: TipEntry = await res.json();
        if (tip) {
          setQueue((prev) => [...prev, tip]);
        }
      }
    } catch (e) {
      console.error('Polling error:', e);
    }
  }, 7000);
}
return () => clearInterval(pollInterval);

```

}, [creatorId, test]);

useEffect(() => {
if (test === 'true') {
const interval = setInterval(() => {
const fakeTip: TipEntry = {
id: Date.now().toString(),
nickname: 'TestFan',
amount: Math.floor(Math.random() * 100),
message: 'This is a test tip!',
};
setQueue((prev) => [...prev, fakeTip]);
}, 5000);
return () => clearInterval(interval);
}

```
socket.current = io('wss://tipjar.plus', {
  query: { creatorId },
  transports: ['websocket'],
});

socket.current.on('tip', (tip: TipEntry) => {
  setQueue((prev) => [...prev, tip]);
});

return () => {
  socket.current?.disconnect();
};

```

}, [creatorId, test]);

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
<div className="fixed bottom-4 left-4 w-[320px] bg-[#006D6Dcc] backdrop-blur-md text-white p-4 rounded-lg overflow-hidden font-sans z-50">
<AnimatePresence>
{current && (
<motion.div
key={[current.id](http://current.id/)}
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.4 }}
className="flex items-start gap-3"
>
{current.avatarUrl && (
<img
src={current.avatarUrl}
alt={current.nickname}
className="w-12 h-12 rounded-full border-2 border-[#FFD700]"
/>
)}
<div>
<h4 className="font-display font-semibold text-[#FFD700] text-lg">
{current.nickname}
</h4>
<div className="text-[#FFD700] text-2xl font-bold font-display flex items-center gap-1">
<img
src="[https://cryptologos.cc/logos/usd-coin-usdc-logo.png](https://cryptologos.cc/logos/usd-coin-usdc-logo.png)"
alt="USDC"
className="w-5 h-5"
/>
+{current.amount.toFixed(2)} USDC
</div>
{current.message && (
<p className="text-sm text-[#ccf] mt-1 font-sans">{current.message}</p>
)}
</div>

```
        {current.amount >= 50 && (
          <motion.div
            className="absolute -top-10 -left-10 w-[400px] h-[400px] pointer-events-none z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full h-full animate-ping-slow rounded-full bg-[#FFD700]/30" />
          </motion.div>
        )}

      </motion.div>
    )}
  </AnimatePresence>
</div>

```

);
}

[live-feed.gateway.ts](Live%20Feed%20Overlay%20Tip%20Jar%20221120af448980489b6eee613e413e00/live-feed%20gateway%20ts%20221120af44898040a31ed95ddb8ee140.md)

[live-feed.module.ts](Live%20Feed%20Overlay%20Tip%20Jar%20221120af448980489b6eee613e413e00/live-feed%20module%20ts%20221120af4489802da8dfddf8b376c6f4.md)

[
 Emitowanie napiwku (np. w `TipsService`)

](Live%20Feed%20Overlay%20Tip%20Jar%20221120af448980489b6eee613e413e00/Emitowanie%20napiwku%20(np%20w%20TipsService)%20221120af4489804aab18faf825399564.md)

[Frontend klient WS (dopasuj do `creatorId` z route)](Live%20Feed%20Overlay%20Tip%20Jar%20221120af448980489b6eee613e413e00/Frontend%20klient%20WS%20(dopasuj%20do%20creatorId%20z%20route)%20221120af44898041a362d4877395094f.md)

[overlay settings](Live%20Feed%20Overlay%20Tip%20Jar%20221120af448980489b6eee613e413e00/overlay%20settings%20221120af448980e4b5b5cf7c39cba74f.md)