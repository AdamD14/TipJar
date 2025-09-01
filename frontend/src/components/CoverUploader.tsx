"use client";
type Props = { value?: string; onChange: (url: string) => void };
export default function CoverUploader({ value, onChange }: Props) {
  const upload = async (_file: File) => {
    // TODO: Presigned URL flow, analogicznie jak w AvatarUploader
  };
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="text-sm mb-2">Cover (3:1)</div>
      <div className="aspect-[3/1] rounded-xl overflow-hidden bg-white/10">
        {value ? (
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-white/40">No cover</div>
        )}
      </div>
      <input type="file" accept="image/*" className="mt-3 text-sm" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
    </div>
  );
}

