import React from 'react';

export interface DigitalAssetNftCardProps {
  title?: string;
  imageUrl?: string;
  tokenId?: string;
  onBidClick?: (e: React.MouseEvent) => void;
}

/**
 * KARTA IV: Zasób Krypto (Digital Asset NFT / Katalizator Magnetyczny)
 * LOKALIZACJA W DRZEWIE: creator-desktop/studio/page/badges/
 */
export const DigitalAssetNftCard: React.FC<DigitalAssetNftCardProps> = ({
  title = 'DigitalAssetNftCard',
  imageUrl,
  tokenId = '11',
  onBidClick
}) => {
  return (
    <>
      <style>{`
        .card-nft {
          background: var(--teal-800, #003737);
          border-radius: 12px;
          position: relative;
          padding: 16px;
          box-shadow: inset -4px 4px 12px -2px rgba(255, 215, 0, 0.05);
        }
        .magnetic-badge {
          position: absolute;
          top: -10px; right: -10px;
          width: 20px; height: 20px;
          z-index: 20;
          animation: levitate-node 4s ease-in-out infinite;
        }
        .badge-core {
          width: 100%; height: 100%;
          border-radius: 50%;
          background: var(--gold-400, #FFD700);
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
        }
        .badge-shell {
          position: absolute; inset: -4px;
          border-radius: 50%;
          border: 1px solid var(--purple-300, #4D194D);
          filter: blur(0.5px);
        }
        .global-card-link::after { 
          content: ""; 
          position: absolute; 
          inset: 0; 
          z-index: 1; 
        }
        .btn-bid {
          position: relative; 
          z-index: 2;
          background: var(--teal-600, #005959); 
          color: var(--gold-400, #FFD700);
          border: none; 
          border-radius: 6px; 
          padding: 8px 16px;
          cursor: pointer;
        }
        .btn-bid:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px var(--teal-800, #003737), 0 0 0 5px var(--purple-300, #4D194D);
        }
        @keyframes levitate-node {
          0%, 100% { transform: translateY(0) scale(0.98); }
          50% { transform: translateY(-3px) scale(1.02); }
        }
        .asset-media {
          width: 100%;
          aspect-ratio: 1/1;
          background: var(--teal-900, #001F1F);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 12px;
        }
        .asset-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>

      <article className="card-nft">
        <div className="magnetic-badge">
          <div className="badge-core"></div>
          <div className="badge-shell"></div>
        </div>
        <figure className="asset-media">
          {imageUrl ? (
            <img src={imageUrl} alt={title} />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[#CCF7F4]/30">NFT ART</div>
          )}
        </figure>
        <div className="asset-data">
          <h4 className="font-mukta text-[#CCF7F4] font-bold text-lg mb-3">
            {title}
          </h4>
          <div className="action-layer">
            <button onClick={onBidClick} className="btn-bid font-plex-sans font-bold text-sm w-full text-center">
              Place Bid
            </button>
          </div>
        </div>
        <a href={`/asset/${tokenId}`} className="global-card-link" tabIndex={-1} aria-hidden="true"></a>
      </article>
    </>
  );
};

export default DigitalAssetNftCard;