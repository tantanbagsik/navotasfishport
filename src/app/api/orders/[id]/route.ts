import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const orderResult = await sql`SELECT * FROM orders WHERE id = ${id}`
  if (orderResult.length === 0) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  const items = await sql`SELECT * FROM order_items WHERE order_id = ${id} ORDER BY id`

  return NextResponse.json({ ...orderResult[0], items })
}
