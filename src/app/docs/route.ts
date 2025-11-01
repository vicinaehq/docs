import { NextResponse } from 'next/server'
import { VICINAE_DOCS_URL } from '@/lib/constants'

export async function GET() {
  return NextResponse.redirect(VICINAE_DOCS_URL, 308)
}
