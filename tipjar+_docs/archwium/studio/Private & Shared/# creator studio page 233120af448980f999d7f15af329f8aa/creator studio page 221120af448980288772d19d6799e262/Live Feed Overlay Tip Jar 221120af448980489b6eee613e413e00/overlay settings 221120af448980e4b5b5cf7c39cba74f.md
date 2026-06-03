# overlay settings

✅ API backendowe `/overlay/settings/:creatorId` gotowe:

- `GET` — pobiera ustawienia nakładki
- `POST` — zapisuje zmiany (autoryzacja JWT)

---

Kolejny krok: `OverlaySettingsService.ts` + model Prisma (jeśli nie istnieje). Gotowy? → `NEXT`.

### Powiedziałeś(-aś):

Next

### ChatGPT powiedział:

Edytowano Overlay-settings

✅ `OverlaySettingsService` gotowy – obsługuje:

- `get()` z Prisma `findUnique`
- `save()` z `upsert` (update lub create)

---

Ostatni krok backendu: dodanie modelu Prisma `overlaySettings` + migracja.

// app/overlay/page.tsx (transparent-ready)
'use client';

import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import io from 'socket.io-client';

interface TipEntry {
id: string;
nickname: string;
avatarUrl?: string;
amount: number;
message?: string;
}

export default function OverlayPage({ searchParams }: { searchParams: { creatorId: string; test?: string } }) {
const [queue, setQueue] = useState<TipEntry[]>([]);
const [current, setCurrent] = useState<TipEntry | null>(null);
const { creatorId, test } = searchParams;
const socket = useRef<any>(null);

useEffect(() => {
if (!creatorId) return;

```
if (test === 'true') {
  const interval = setInterval(() => {
    setQueue((q) => [
      ...q,
      {
        id: Date.now().toString(),
        nickname: 'TestFan',
        amount: Math.floor(Math.random() * 200),
        message: 'This is a demo tip! 💸',
      },
    ]);
  }, 5000);
  return () => clearInterval(interval);
}

socket.current = io('wss://tipjar.plus', {
  query: { creatorId },
});

socket.current.on('tip', (data: TipEntry) => {
  setQueue((q) => [...q, data]);
});

return () => socket.current?.disconnect();

```

}, [creatorId, test]);

useEffect(() => {
if (!current && queue.length > 0) {
const [first, ...rest] = queue;
setCurrent(first);
setQueue(rest);
const timeout = setTimeout(() => setCurrent(null), 8000);
return () => clearTimeout(timeout);
}
}, [current, queue]);

return (
<div
className="fixed inset-0 z-50 flex items-end justify-start p-4 pointer-events-none"
style={{ backgroundColor: 'rgba(0,0,0,0)' }} // transparent for OBS
>
<AnimatePresence>
{current && (
<motion.div
key={[current.id](http://current.id/)}
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.5 }}
className="bg-[#0f0f0fcc] backdrop-blur text-white rounded-lg p-4 max-w-sm shadow-lg"
>
<div className="font-semibold text-[#FFD700] text-lg">{current.nickname}</div>
<div className="text-xl font-bold text-[#FFD700]">+{current.amount.toFixed(2)} USDC</div>
{current.message && <div className="text-sm mt-1 text-[#ccc]">{current.message}</div>}
</motion.div>
)}
</AnimatePresence>
</div>
);
}

Oto model Prisma do tabeli `overlaySettings`:

---

### 📁 `prisma/schema.prisma`

```
prisma
KopiujEdytuj
model OverlaySettings {
  creatorId             String   @id @unique
  position              String
  opacity               Float
  bgColor               String
  textColor             String
  durationSec           Int
  fontFamily            String
  entryAnimation        String
  specialEffectThreshold Int
  specialEffectType     String
  soundEffectUrl        String?

  creator               User     @relation(fields: [creatorId], references: [id])
}

```