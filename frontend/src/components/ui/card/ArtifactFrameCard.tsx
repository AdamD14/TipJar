import React from 'react';

export interface ArtifactFrameCardProps {
  title?: string;
  imageUrl?: string;
  rarity?: string;
  highestBid?: string;
  onClick?: () => void;
}

export const ArtifactFrameCard: React.FC<ArtifactFrameCardProps> = ({
  title = 'ArtifactFrameCard',
  imageUrl,
  rarity = 'LEGENDARY',
  highestBid = '2.5 ETH',
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-teal-800 rounded-xl overflow-hidden group cursor-pointer border border-teal-600 relative transform-gpu transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
    >
      <div className="relative w-full aspect-square bg-teal-900 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover mix-blend-luminosity opacity-85 group-hover:opacity-100 transition-opacity duration-500" />
        ) : (
          <svg className="absolute inset-0 w-full h-full opacity-60 mix-blend-luminosity group-hover:opacity-90 transition-opacity duration-500" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="nftGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4D194D" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#001F1F" stopOpacity="1"/>
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill="url(#nftGlow)" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#FFD700" strokeWidth="0.5" strokeDasharray="2 2" />
            <polygon points="50,25 70,60 30,60" fill="none" stroke="#4D194D" strokeWidth="1" />
            <polygon points="50,75 70,40 30,40" fill="none" stroke="#3FB5B5" strokeWidth="0.5" />
          </svg>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-teal-800 via-transparent to-transparent opacity-90"></div>
        <div className="absolute top-3 right-3 bg-purple-300/90 border border-purple-300 text-teal-25 font-mono text-[10px] px-2 py-0.5 rounded-full shadow-[0_0_12px_rgba(77,25,77,0.8)]">
          {rarity}
        </div>
      </div>
      <div className="p-4 absolute bottom-0 w-full z-10">
        <h3 className="font-heading text-teal-25 text-lg font-medium">{title}</h3>
        <div className="flex justify-between items-end mt-1">
          <span className="font-mono text-teal-50 text-xs">Highest Bid</span>
          <span className="font-mono text-gold-400 text-sm font-bold drop-shadow-[0_0_4px_rgba(255,215,0,0.6)]">{highestBid}</span>
        </div>
      </div>
    </div>
  );
};
