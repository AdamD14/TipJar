import { ImageResponse } from 'next/og';

export const runtime = 'edge';

async function getFont() {
  try {
    const url = new URL('../../../../public/fonts/Montserrat-SemiBold.ttf', import.meta.url);
    const res = await fetch(url);
    return await res.arrayBuffer();
  } catch {
    return undefined;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const u = (searchParams.get('u') || '').replace(/^@/, '');
  const name = searchParams.get('n') || `@${u}`;
  const bio = searchParams.get('b') || 'Support creativity, get paid instantly';
  const avatar = searchParams.get('a') || '';
  const cover = searchParams.get('c') || '';

  const font = await getFont();

  return new ImageResponse(
    (
      <div style={{
          width: 1200,
          height: 630,
          display: 'flex',
          position: 'relative',
          background: '#003737',
          color: 'white',
          fontFamily: 'Montserrat, Arial',
        }}
      >
        {cover ? (
          // @ts-ignore
          <img src={cover} style={{ position: 'absolute', inset: 0, objectFit: 'cover', opacity: 0.25 }} />
        ) : null}

        <div style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(60% 60% at 20% 20%, rgba(131,80,159,0.35) 0%, rgba(0,0,0,0) 60%)',
          }}
        />

        <div style={{ display: 'flex', gap: 28, padding: 60, alignItems: 'center' }}>
          <div style={{
              width: 160,
              height: 160,
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.06)',
              border: '6px solid rgba(255,215,0,0.6)',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {avatar ? (
              // @ts-ignore
              <img src={avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                  width: '100%', height: '100%', display: 'grid', placeItems: 'center',
                  fontSize: 48, color: 'rgba(255,255,255,0.7)'
                }}
              >
                {u ? u.slice(0, 2).toUpperCase() : 'T+'}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>
              {name} <span style={{ color: '#FFD700' }}>— TipJar+</span>
            </div>
            <div style={{ fontSize: 32, opacity: 0.9 }}>{`@${u}`}</div>
            <div style={{ fontSize: 26, opacity: 0.85, maxWidth: 900 }}>{bio}</div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 40, left: 60, fontSize: 24, color: '#cfe7e7' }}>
          tipjar.plus/@{u}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: font ? [{ name: 'Montserrat', data: font, weight: 700, style: 'normal' as const }] : [],
      headers: { 'Cache-Control': 'public, max-age=3600' },
    }
  );
}

