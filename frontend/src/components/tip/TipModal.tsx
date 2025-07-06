"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export interface TipModalProps {
  creator: { name: string; avatar?: string };
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const TipModal = ({ creator, isOpen, onClose, children }: TipModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#003737cc] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-brand-gold bg-brand-dark p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-gold">Wyślij napiwek</h2>
          <button onClick={onClose} aria-label="Zamknij" className="text-brand-gold">
            <X />
          </button>
        </div>
        <div className="mb-6 flex items-center gap-3">
          {creator.avatar && (
            <img src={creator.avatar} alt={creator.name} className="h-8 w-8 rounded-full" />
          )}
          <p className="text-sm text-brand-light-text">dla {creator.name}</p>
        </div>
        {children}
      </div>
    </div>
  );
};
