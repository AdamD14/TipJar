"use client";
const KNOWN = [
  { k: 'twitch', label: 'Twitch' },
  { k: 'youtube', label: 'YouTube' },
  { k: 'x', label: 'X' },
  { k: 'instagram', label: 'Instagram' },
  { k: 'website', label: 'Website' },
];

export default function SocialLinksForm({ value, onChange }: { value: { [k: string]: string }; onChange: (v: any) => void }) {
  const set = (k: string, v: string) => onChange({ ...value, [k]: v });
  return (
    <div>
      <div className="text-sm mb-4">Socials</div>
      <div className="space-y-3">
        {KNOWN.map(({ k, label }) => (
          <div key={k} className="flex items-center gap-3">
            <span className="w-28 text-sm text-white/70">{label}</span>
            <input
              value={value?.[k] || ''}
              onChange={(e) => set(k, e.target.value)}
              placeholder={`https://...`}
              className="flex-1 bg-transparent border-b border-white/20 focus:border-[#FFD700] outline-none py-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

