/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const handle = searchParams.get('handle') || 'anon'
  const goal = searchParams.get('goal') || ''

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          backgroundColor: '#006D6D',
          color: '#FFD700',
          padding: '40px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Montserrat',
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 20 }}>🎁 Support @{handle}</div>
        {goal && (
          <div
            style={{
              fontSize: 28,
              color: 'white',
              backgroundColor: '#008080',
              padding: '10px 20px',
              borderRadius: 12,
              maxWidth: 600,
              textAlign: 'center',
            }}
          >
            Goal: {goal}
          </div>
        )}
        <div style={{ marginTop: 32, fontSize: 24, color: '#ffffff' }}>
          tipjar.plus/@{handle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
