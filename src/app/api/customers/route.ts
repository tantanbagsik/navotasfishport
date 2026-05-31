import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET() {
  const result = await sql`SELECT * FROM customers ORDER BY join_date DESC`
  return NextResponse.json(result)
}
