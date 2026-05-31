import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const result = await sql`
      UPDATE promotions SET
        name = COALESCE(${body.name}, name),
        description = COALESCE(${body.description}, description),
        discount_type = COALESCE(${body.discount_type}, discount_type),
        discount_value = COALESCE(${body.discount_value}, discount_value),
        min_purchase = COALESCE(${body.min_purchase}, min_purchase),
        start_date = COALESCE(${body.start_date}::timestamp, start_date),
        end_date = ${body.end_date ? sql`${body.end_date}::timestamp` : sql`end_date`},
        is_active = COALESCE(${body.is_active}, is_active)
      WHERE id = ${id} RETURNING *
    `
    if (result.length === 0) return NextResponse.json({ error: 'Promotion not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await sql`DELETE FROM promotions WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
