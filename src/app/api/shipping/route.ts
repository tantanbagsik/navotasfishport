import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET() {
  const result = await sql`SELECT * FROM shipping_rules ORDER BY min_order ASC`
  return NextResponse.json(result)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = body.id || `ship-${Date.now()}`
    const result = await sql`
      INSERT INTO shipping_rules (id, name, min_order, cost, estimated_days, is_active)
      VALUES (${id}, ${body.name}, ${body.min_order || 0}, ${body.cost || 0}, ${body.estimated_days || '3-5'}, ${body.is_active !== false})
      RETURNING *
    `
    return NextResponse.json(result[0], { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const result = await sql`
      UPDATE shipping_rules SET is_active = ${body.is_active} WHERE id = ${body.id} RETURNING *
    `
    if (result.length === 0) return NextResponse.json({ error: 'Shipping rule not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
