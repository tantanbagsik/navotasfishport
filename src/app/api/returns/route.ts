import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET() {
  const result = await sql`SELECT * FROM returns ORDER BY created_at DESC`
  return NextResponse.json(result)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = body.id || `ret-${Date.now()}`
    const result = await sql`
      INSERT INTO returns (id, order_id, customer_name, customer_email, product_name, reason, status, refund_amount)
      VALUES (${id}, ${body.order_id}, ${body.customer_name}, ${body.customer_email}, ${body.product_name || ''}, ${body.reason || ''}, ${body.status || 'pending'}, ${body.refund_amount || 0})
      RETURNING *
    `
    return NextResponse.json(result[0], { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
