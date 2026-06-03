# widget previev

// app/widget/preview/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function WidgetPreviewPage() {
const searchParams = useSearchParams();
const handle = searchParams.get('handle') || 'me';
const [open, setOpen] = useState(false);

const click = () => setOpen((o) => !o);

useEffect(() => {
window.addEventListener('message', (e) => {
if (e.data === 'toggleModal') click();
});
}, []);

return (
<div className="flex items-center justify-center h-full p-2">
<button
onClick={click}
className="px-4 py-2 rounded text-white"
style={{ backgroundColor: '#006D6D' }}
>
💸 Wesprzyj {handle}
</button>

```
  {open && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
        <button
          onClick={click}
          className="absolute top-2 right-3 text-gray-600 hover:text-black"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-2">🎁 Wesprzyj twórcę @{handle}</h2>
        <input
          type="number"
          placeholder="Kwota (USDC)"
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <textarea
          placeholder="Wiadomość (opcjonalna)"
          className="w-full border px-3 py-2 rounded mb-4"
          rows={2}
        />
        <button className="bg-[#FFD700] text-black px-4 py-2 rounded w-full font-semibold">
          Tip It 💛
        </button>
      </div>
    </div>
  )}
</div>

```

);
}