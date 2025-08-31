"use client";
import { useEffect, useState } from "react";
let pushGlobal: ((m: { type: "success" | "error"; text: string }) => void) | null = null;

export function useToast() {
  return { push: (m: { type: "success" | "error"; text: string }) => pushGlobal?.(m) };
}
export default function ToastHost() {
  const [q, setQ] = useState<{ id: number; type: "success" | "error"; text: string }[]>([]);
  useEffect(() => {
    pushGlobal = (m) => setQ((s) => [...s, { id: Date.now(), ...m }]);
    return () => {
      pushGlobal = null;
    };
  }, []);
  return (
    <div className="fixed bottom-4 right-4 z-[1000] space-y-2">
      {q.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`px-4 py-2 rounded-lg border ${t.type === "success" ? "bg-green-600/15 border-green-400/40 text-green-200" : "bg-red-600/15 border-red-400/40 text-red-200"}`}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
