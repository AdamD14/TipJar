"use client";
import { ReactNode, useState } from "react";
import Button from "@/components/ui/buttons/Button";
import { Menu } from "lucide-react";

export default function FanShell({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-teal-950 text-text-ds-primary">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-teal-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Button variant="ghost" size="sm" aria-label="Open sidebar" onClick={() => setOpen(true)} className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-heading font-semibold">{title}</h1>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gold-400/20" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl">
        <main className="min-h-[calc(100vh-56px)] p-4 md:p-6">{children}</main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[80%] max-w-xs border-r border-white/10 bg-teal-950 shadow-2xl p-4">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
