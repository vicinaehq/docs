import { NextResponse } from 'next/server'
import { VICINAE_INSTALL_SCRIPT_URL } from '@/lib/constants'

export async function GET() {
  try {
    const res = await fetch(
      VICINAE_INSTALL_SCRIPT_URL,
      {
        headers: {
          'User-Agent': 'Vicinae-Docs-Proxy/1.0',
        },
      },
    )

    if (!res.ok) {
      console.error(
        `Failed to fetch install script: ${res.status} ${res.statusText}`,
      )
      return new NextResponse('Install script not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    }

    const text = await res.text()

    return new NextResponse(text, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
      },
    })
  } catch (error) {
    console.error('Error fetching install script:', error)
    return new NextResponse('Internal server error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }
}
