import React from 'react';

export interface LiveToastMomentumProps {
  username?: string;
  amount?: string;
}

/**
 * KARTA III: Powiadomienie o Aktywności (Live Toast Momentum)
 * LOKALIZACJA W DRZEWIE: creator-desktop/desktop/notifications-preview/
 */
export const LiveToastMomentum: React.FC<LiveToastMomentumProps> = ({
  username = '@LiveToastMomentum',
  amount = '5.00 USDC'
}) => {
  return (
    <>
      <style>{`
        .card-toast {
          position: fixed;
          bottom: 32px; right: 32px;
          z-index: 300;
          background: var(--teal-700, #004C4C);
          border: 1px solid rgba(77, 25, 77, 0.3);
          border-radius: 12px;
          padding: 16px 24px;
          display: flex; gap: 16px; align-items: center;
          animation: glideInUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .fan-identity-orb {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-400, #FFD700), var(--purple-300, #4D194D));
          flex-shrink: 0;
        }
        @keyframes glideInUp {
          0% { transform: translateY(50px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>

      <div className="card-toast" role="status" aria-live="polite">
        <div className="fan-identity-orb"></div>
        <div className="toast-message">
          <p className="font-plex-sans text-[#CCF7F4]/80 text-sm">
            Momentum: Wsparcie od <strong className="text-white font-bold">{username}</strong> ({amount})
          </p>
        </div>
      </div>
    </>
  );
};

export default LiveToastMomentum;
