import React from 'react';

export interface CreatorIdentityCard2Props {
  name?: string;
  role?: string;
  avatarUrl?: string;
}

export const CreatorIdentityCard2: React.FC<CreatorIdentityCard2Props> = ({
  name = '@CreatorIdentityCard2',
  role = 'Decentralized System Architect',
  avatarUrl = 'logo.png'
}) => {
  return (
    <>
      <article
        className="relative overflow-clip bg-surface-base rounded-lg p-6
                    transition-transform duration-400 ease-spring hover:-translate-y-1.5 hover:bg-teal-600"
      >
        <div
          className="absolute top-0 left-0 right-0 h-[35%] pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.1), transparent)' }}
        />
        <figure className="w-20 h-20 rounded-md overflow-hidden bg-teal-900 border border-teal-700 mb-4 relative z-20">
          <img src={avatarUrl} alt="Creator Identity" loading="lazy" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />
        </figure>
        <div className="relative z-20">
          <h2 className="font-heading text-text-primary text-xl font-light tracking-wide">
            {name}
          </h2>
          <p className="font-body text-teal-50/70 text-sm">
            {role}
          </p>
        </div>
        <div>
          <a href="/profile" className="absolute inset-0 z-10" aria-hidden="true"></a>
        </div>
      </article>

      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="liquid-refraction" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="smooth-base" />
            <feImage href="displacement-lens.svg" result="lens-map" />
            <feDisplacementMap
              in="smooth-base"
              in2="lens-map"
              scale="25"
              xChannelSelector="R"
              yChannelSelector="G"
              result="bent-light"
            />
            <feColorMatrix
              in="bent-light"
              type="matrix"
              values="1.1 0 0 0 0 0 1 0 0 0 0 0 1.2 0 0 0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default CreatorIdentityCard2;
