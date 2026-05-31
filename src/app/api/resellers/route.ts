import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET() {
  const resellers = await sql`SELECT * FROM resellers WHERE status = 'active' ORDER BY rating DESC`
  return NextResponse.json(resellers)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = `rsl-${Date.now().toString(36)}`
    const slug = body.storeName?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Math.random().toString(36).slice(2, 6)

    await sql`
      INSERT INTO resellers (id, store_name, slug, owner_name, email, phone, description, city, specialties, website)
      VALUES (${id}, ${body.storeName}, ${slug}, ${body.ownerName}, ${body.email}, ${body.phone || ''}, ${body.description || ''}, ${body.city || ''}, ${body.specialties || []}, ${body.website || ''})
    `

    const reseller = await sql`SELECT * FROM resellers WHERE id = ${id}`
    return NextResponse.json(reseller[0], { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create reseller' }, { status: 500 })
  }
}
