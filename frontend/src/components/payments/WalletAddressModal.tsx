"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/notifications/Toast";
import Button from "@/components/ui/buttons/Button";

export default function WalletAddressModal({ address }: { address: string }) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="ghost" className="border border-white/15">
        Deposit address
      </Button>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-4 text-white" role="dialog" aria-modal="true">
            <h3 className="font-heading text-lg font-semibold mb-2">Wallet address</h3>
            <code className="block bg-black/40 p-3 rounded break-all">{address}</code>
            <div className="mt-3 flex gap-2">
              <Button
                onClick={async () => {
                  await navigator.clipboard.writeText(address);
                  toast.push({ type: "success", text: "Address copied." });
                }}
                variant="primary"
                fullWidth
              >
                Copy
              </Button>
              <Button onClick={() => setOpen(false)} variant="ghost" fullWidth className="border border-white/20">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
