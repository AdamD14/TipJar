"use client";

import React, { useRef } from "react";
import Image from "next/image";
import type { UploadSlot } from "@/lib/store/types";

interface AvatarPreviewSlideProps {
  slot: UploadSlot;
  onFileSelectAction: (file: File) => void;
  onRemoveAction: () => void;
  onEditAction: () => void;
  onRetryAction: () => void;
  isActive: boolean;
  maxSizeMB?: number;
}

export default function AvatarPreviewSlide({
  slot,
  onFileSelectAction,
  onRemoveAction,
  onEditAction,
  onRetryAction,
  isActive,
  maxSizeMB = 5,
}: AvatarPreviewSlideProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelectAction(file);
      e.target.value = "";
    }
  };

  const displayUrl = slot.cloudinaryUrl || slot.previewUrl;

  // --- Style bazowe dla prostokąta ---
  // Używamy aspect-[4/3] żeby uzyskać prostokąt z Twojej grafiki.
  // Możesz zmienić na aspect-video jeśli ma być szerszy.
  const containerBaseClasses =
    "relative w-full aspect-[4/3] transition-all duration-500 ease-in-out group";

  // --- Style zależne od stanu (Aktywny / Nieaktywny) ---
  const activeClasses = isActive
    ? "border-2 border-gold bg-teal-800/30 scale-100 shadow-[0_0_30px_rgba(207,181,107,0.2)]" // Aktywny: Złoty, jasny, duży
    : "border border-teal-800 bg-teal-900/80 opacity-40 scale-90 pointer-events-none"; // Nieaktywny: Ciemny, wyblakły, mały

  // --- Stan PUSTY (Add Photo) ---
  if (!slot.isFilled) {
    return (
      <div
        onClick={() =>
          isActive && !slot.isUploading && fileInputRef.current?.click()
        }
        className={`${containerBaseClasses} ${activeClasses} flex flex-col items-center justify-center ${
          isActive ? "cursor-pointer hover:bg-teal-800/50" : ""
        }`}
      >
        <div className="text-center p-6">
          {/* Ikona Plusa */}
          <div
            className={`w-12 h-12 mx-auto mb-4 border border-gold rounded-full flex items-center justify-center transition-transform duration-500 ${
              isActive ? "rotate-0" : "rotate-45 opacity-0"
            }`}
          >
            <span className="text-gold text-2xl leading-none relative top-[-1px]">
              +
            </span>
          </div>

          <h3
            className={`text-xl text-white tracking-wider font-light transition-all duration-500 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Add Photo
          </h3>

          {isActive && (
            <p className="text-gold/60 text-xs mt-2 tracking-widest uppercase">
              Max size: {maxSizeMB}MB
            </p>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {/* Ozdobne narożniki (opcjonalne, jak na grafice) */}
        {isActive && (
          <>
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold opacity-50"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold opacity-50"></div>
          </>
        )}
      </div>
    );
  }

  // --- Stan WYPEŁNIONY (Podgląd zdjęcia) ---
  return (
    <div className={`${containerBaseClasses} ${activeClasses} overflow-hidden`}>
      {displayUrl && (
        <Image
          src={displayUrl}
          alt={slot.name}
          fill
          className={`object-cover transition-opacity duration-500 ${
            slot.isUploading ? "opacity-50" : "opacity-100"
          }`}
          unoptimized
        />
      )}

      {/* Loading Overlay */}
      {slot.isUploading && (
        <div className="absolute inset-0 bg-teal-900/60 flex flex-col items-center justify-center z-10">
          <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mb-3"></div>
          <span className="text-gold text-sm tracking-wider">
            {slot.uploadProgress}%
          </span>
        </div>
      )}

      {/* Error Overlay */}
      {slot.error && !slot.isUploading && (
        <div className="absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center z-10 p-4 text-center">
          <p className="text-white mb-4">Upload Failed</p>
          <button
            onClick={onRetryAction}
            className="px-6 py-2 border border-white text-white hover:bg-white hover:text-red-900 transition uppercase text-xs tracking-wider"
          >
            Retry
          </button>
        </div>
      )}

      {/* Hover Actions (tylko dla aktywnego slajdu) */}
      {isActive && !slot.isUploading && !slot.error && (
        <div className="absolute inset-0 bg-teal-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
          <button
            onClick={onEditAction}
            className="w-12 h-12 border border-gold text-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-teal-900 transition"
          >
            ✎
          </button>
          <button
            onClick={onRemoveAction}
            className="w-12 h-12 border border-red-500 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
