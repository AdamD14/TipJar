"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/notifications/Toast";

export default function WalletAddressModal({ address }: { address: string }) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  return (
    <>
      <button onClick={() => setOpen(true)} className="px-5 py-3 rounded-lg border border-white/15 text-white">
        Adres do wpłaty
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-4 text-white" role="dialog" aria-modal="true">
            <h3 className="text-lg font-semibold mb-2">Adres portfela</h3>
            <code className="block bg-black/40 p-3 rounded break-all">{address}</code>
            <div className="mt-3 flex gap-2">
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(address);
                  toast.push({ type: "success", text: "Skopiowano adres." });
                }}
                className="flex-1 rounded-lg bg-teal-500 text-black py-2"
              >
                Kopiuj
              </button>
              <button onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-white/20 py-2">
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
