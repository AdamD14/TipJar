"use client";
import Input from './Input';

export default function UploadAvatar({ value, onChange }: { value?: string; onChange: (url: string) => void }) {
  return (
    <div className="flex items-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={value || '/avatar.svg'} alt="avatar" className="h-16 w-16 rounded-full border border-white/10 object-cover" />
      <div className="flex-1">
        <Input label="Avatar URL" placeholder="https://..." value={value} onChange={(e)=>onChange(e.currentTarget.value)} />
        <p className="mt-1 text-xs text-white/60">Placeholder — w produkcji użyj presigned URL (S3/GCS).</p>
      </div>
    </div>
  );
}

