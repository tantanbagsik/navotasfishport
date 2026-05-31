import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const result = await sql`
      UPDATE returns SET status = ${body.status} WHERE id = ${id} RETURNING *
    `
    if (result.length === 0) return NextResponse.json({ error: 'Return not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
