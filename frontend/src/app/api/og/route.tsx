import { ImageResponse } from '@vercel/og';
import React from 'react';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const handle = searchParams.get('handle') ?? 'creator';
  const goal   = searchParams.get('goal')   ?? 'Support me on TipJar+';

  const avatarSVG = `<svg width="160" height="160" viewBox="0 0 160 160" fill="none"
  xmlns="http://www.w3.org/2000/svg"><circle cx="80" cy="80" r="75"
  stroke="#FFD700" stroke-width="10" fill="none"/></svg>`;
  const avatar = `data:image/svg+xml;utf8,${encodeURIComponent(avatarSVG)}`;

  return new ImageResponse(
    (
      <div style={{
        width: 1200,
        height: 630,
        display: 'flex',
        alignItems: 'center',
        background: '#0d2f3f',
        color: '#FFD700',
        padding: 40,
        fontSize: 32,
        fontFamily: 'Inter, sans-serif',
      }}>
        <img
          src={avatar}
          alt="Avatar"
          width={160}
          height={160}
          style={{ borderRadius: '50%', marginRight: 40 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
          <b>{`Support @${handle} on TipJar+`}</b>
          {goal}
          <span style={{ fontSize: 24 }}>
            Send tips in USDC – no login required.
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
