// frontend/src/components/ui/AuthButtons.tsx
import React from 'react';

export default function AuthButtons({
  onSignup,
  onLogin,
}: {
  onSignup: () => void;
  onLogin: () => void;
}) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onSignup}
        className="px-8 py-5 rounded-full bg-[#FFD700] text-[#004D4D] font-bold font-logo hover:bg-[#FFE55C] transition-all whitespace-pre text-center inline-block"
      >
        Begin as a creator
      </button>
      <button
        onClick={onLogin}
        className="px-8 py-5 rounded-full bg-[#006D6D] text-[#FFD700] font-bold font-logo hover:bg-[#008080] transition-all whitespace-pre text-center inline-block border-2 border-[#FFD700]"
      >
        Login
      </button>
    </div>
  );
}
