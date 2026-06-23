"use client";
import React, { useRef, useEffect } from 'react';

export interface TopLayerWebAuthnModalOverlayProps {
  isOpen?: boolean;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * WARIANT 10: Transcendentalna Karta Modalna (Top Layer WebAuthn Modal Overlay)
 * LOKALIZACJA W DRZEWIE: creator-desktop/wallet/settings/
 * Opis: Ucieczka z pułapek z-index i overflow za pomocą natywnego API Warstwy Najwyższej (<dialog>).
 */
export const TopLayerWebAuthnModalOverlay: React.FC<TopLayerWebAuthnModalOverlayProps> = ({
  isOpen = false,
  title = 'TopLayerWebAuthnModalOverlay',
  description = 'Użyj klucza sprzętowego urządzenia (Passkey) aby autoryzować przekaz USDC bez opłat sieciowych.',
  onConfirm,
  onCancel
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Bezpieczna synchronizacja stanu otwarcia z natywnym API przeglądarki
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <>
      <style>{`
        .base-card {
          position: relative;
          clip-path: url(#squircle-clip);
          background-color: var(--teal-800, #002F2F);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          contain: layout paint style;
          isolation: isolate;
        }
        .card-transcendent-modal {
          padding: 0;
          margin: auto;
          border: 1px solid var(--teal-700, #004545);
          background: var(--teal-800, #002F2F);
          border-radius: 16px;
          width: 90vw;
          max-width: 420px;
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          opacity: 0;
          transform: translateY(16px) scale(0.98);
          transition: opacity 300ms var(--ease-enter, cubic-bezier(0.16, 1, 0.3, 1)), 
                      transform 300ms var(--ease-enter, cubic-bezier(0.16, 1, 0.3, 1));
        }
        .card-transcendent-modal[open] {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .card-transcendent-modal::backdrop {
          background-color: rgba(0, 31, 31, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: backdrop-filter 300ms var(--ease-enter, cubic-bezier(0.16, 1, 0.3, 1));
        }
        .btn-cancel {
          background: transparent;
          border: none;
          color: #D6EBEB; 
          font-weight: 600;
          font-family: var(--font-primary, 'Mukta Malar', sans-serif);
          padding: 12px 24px;
          cursor: pointer;
        }
        .btn-cancel:hover { color: #FFFFFF; }
        .btn-authorize {
          background: var(--gold-400, #FFD700);
          color: var(--teal-900, #001F1F);
          border: none;
          font-family: var(--font-primary, 'Mukta Malar', sans-serif);
          font-weight: 700;
          padding: 12px 32px;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 150ms, background 150ms;
        }
        .btn-authorize:hover {
          background: var(--gold-500, #FFC312);
        }
        .btn-authorize:active {
          transform: scale(0.96);
        }
      `}</style>

      {/* Współdzielona struktura maskowania */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="squircle-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0.0575 0.0575,0 0.50 0 0.9425,0 1,0.0575 1,0.5 1,0.9425 0.9425,1 0.5,1 0.0575,1 0,0.9425 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      <dialog 
        ref={dialogRef} 
        id="webauthn-modal" 
        className="base-card card-transcendent-modal"
        onClose={handleClose}
      >
        <form method="dialog" className="p-0 m-0">
          <div className="p-8 pb-4 text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[rgba(255,215,0,0.1)] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.2)]">
              <svg width="24" height="24" fill="none" stroke="var(--gold-400, #FFD700)" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold font-['Mukta_Malar'] m-0">
              {title}
            </h2>
          </div>
          <div className="px-8 text-center text-sm leading-relaxed text-[#CCF7F4]/70">
            <p className="m-0">{description}</p>
          </div>
          <div className="p-8 flex justify-end gap-4">
            <button 
              type="button" 
              onClick={handleClose} 
              className="btn-cancel"
            >
              Odrzuć
            </button>
            <button 
              type="button" 
              onClick={handleConfirm} 
              className="btn-authorize"
            >
              Autoryzuj
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default TopLayerWebAuthnModalOverlay;
