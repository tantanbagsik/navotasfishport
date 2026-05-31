import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resellers = await sql`SELECT * FROM resellers WHERE slug = ${slug} LIMIT 1`
  if (!resellers.length) return NextResponse.json({ error: 'Reseller not found' }, { status: 404 })
  return NextResponse.json(resellers[0])
}
