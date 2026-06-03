# QuickSlider Widget

### Zachowanie

1. **Początkowo widoczny tylko okrągły przycisk 💸**
2. **Po najechaniu**:
    - Rozsuwa się poziomy suwak `0 – 20` USDC
    - Bez cyfr – tylko cienki pasek z kropką
3. **Po kliknięciu suwaka**:
    - Pojawia się mini-karta (`popup modal`)
    - Pokazuje kwotę, awatar, `Tip Now`

---

### 🔧 Architektura

- Komponent `HoverSliderWidget.tsx`
- Komunikacja z modalkiem przez Zustand lub `postMessage`
- Karta wyświetlana inline – bez `alert` ani `window.open`

---

### 🎯 Etapy

1. `HoverSliderWidget.tsx`
2. Callback: klik = `setTipAmount(x)` → `openModal()`
3. Mini modal z `amount`, `avatar`, `@handle`
4. Podgląd w `/widget/preview?handle=...&style=slider`

// app/dashboard/studio/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import OverlayEditor from '@/components/OverlayEditor';
import WidgetPreview from '@/components/WidgetPreview';
import { useState } from 'react';

const CreatorStudioPage = () => {
const { data: session } = useSession();
const handle = session?.user?.username || session?.user?.id || 'me';
const [style, setStyle] = useState<'button' | 'slider'>('button');

return (
<main className="max-w-6xl mx-auto px-4 py-10 space-y-16">
<h1 className="text-3xl font-bold mb-6">🎨 Centrum Kreacji</h1>

```
  <section className="grid md:grid-cols-2 gap-8 items-start">
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">📺 Nakładka Live Feed (OBS)</h2>
      <OverlayEditor />
    </div>
    <iframe
      src={`/overlay?creatorId=${handle}&test=true`}
      className="w-full h-80 rounded border shadow"
      title="Podgląd nakładki"
    />
  </section>

  <section className="grid md:grid-cols-2 gap-8 items-start">
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">💸 Widget Napiwków + QR</h2>
      <div className="flex gap-3 items-center text-sm">
        <label className="font-semibold">Styl:</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as 'button' | 'slider')}
          className="border px-2 py-1 rounded"
        >
          <option value="button">🟨 Przycisk</option>
          <option value="slider">🎚️ Suwak</option>
        </select>
      </div>
      <WidgetPreview handle={handle} />
    </div>
    <iframe
      src={`/widget/preview?handle=${handle}&style=${style}`}
      className="w-full h-72 rounded border shadow"
      title="Podgląd widgetu"
    />
  </section>
</main>

```

);
};

export default CreatorStudioPage;