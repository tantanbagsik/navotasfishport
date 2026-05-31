import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET() {
  const result = await sql`SELECT * FROM promotions ORDER BY created_at DESC`
  return NextResponse.json(result)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = body.id || `promo-${Date.now()}`
    const result = await sql`
      INSERT INTO promotions (id, name, description, discount_type, discount_value, min_purchase, start_date, end_date, is_active)
      VALUES (${id}, ${body.name}, ${body.description || ''}, ${body.discount_type || 'percentage'}, ${body.discount_value || 0}, ${body.min_purchase || 0}, ${body.start_date || new Date().toISOString()}, ${body.end_date || null}, ${body.is_active !== false})
      RETURNING *
    `
    return NextResponse.json(result[0], { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
