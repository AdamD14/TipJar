"use client";
type Props = { value?: string; onChange: (url: string) => void };
export default function AvatarUploader({ value, onChange }: Props) {
  const upload = async (file: File) => {
    // TODO: Presigned URL flow (S3/R2). Patrz QrDownloadPanel komentarze.
    // Tymczasowo tylko podgląd lokalny (niezapisany):
    const url = URL.createObjectURL(file);
    onChange(url);
  };
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="text-sm mb-2">Avatar (1:1, min 400×400)</div>
      <div className="w-40 h-40 rounded-full overflow-hidden bg-white/10">
        {value ? (
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-white/40">No avatar</div>
        )}
      </div>
      <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} className="mt-3 text-sm" />
    </div>
  );
}

