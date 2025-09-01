"use client";
export default function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm text-white/80">{label}</span>
      <input {...props} className={`mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-[#FFD700] ${props.className||''}`} />
    </label>
  );
}

