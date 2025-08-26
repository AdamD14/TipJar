"use client";
import { useEffect, useState } from "react";

export function Toast({ msg, onClose }: { msg: string; onClose?: () => void }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => {
      setOpen(false);
      onClose?.();
    }, 4000);
    return () => clearTimeout(id);
  }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-[9999] -translate-x-1/2 rounded-xl bg-black/80 px-4 py-3 text-sm text-white shadow-xl ring-1 ring-white/20">
      {msg}
    </div>
  );
}
