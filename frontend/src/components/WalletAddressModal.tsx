'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { X, Copy } from 'lucide-react';

const QRCode = React.lazy(() => import('react-qrcode-logo').then(m => ({ default: m.QRCode })));

export interface WalletAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

export const WalletAddressModal: React.FC<WalletAddressModalProps> = ({ isOpen, onClose, address }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#003737cc] backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-brand-gold bg-brand-dark p-6 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-gold">Adres do wpłaty</h2>
          <button onClick={onClose} aria-label="Zamknij" className="text-brand-gold">
            <X />
          </button>
        </div>
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <Suspense fallback={<div className='h-40' />}>
              <QRCode value={address} size={160} bgColor="#0d2f3f" fgColor="#ffd700"/>
            </Suspense>
          </div>
          <p className="break-words text-sm text-brand-light-text">{address}</p>
          <button onClick={handleCopy} className="mt-2 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-brand-gold text-brand-dark font-semibold hover:bg-yellow-400">
            <Copy className="w-4 h-4" /> {copied ? 'Skopiowano' : 'Kopiuj'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletAddressModal;
