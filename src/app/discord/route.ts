import { NextResponse } from 'next/server'
import { VICINAE_DISCORD_URL } from '@/lib/constants'

export async function GET() {
  return NextResponse.redirect(VICINAE_DISCORD_URL, 308)
}
