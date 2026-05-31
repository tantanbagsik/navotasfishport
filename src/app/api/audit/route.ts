import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  let result
  if (action) {
    result = await sql`SELECT * FROM audit_log WHERE action = ${action} ORDER BY created_at DESC LIMIT 100`
  } else {
    result = await sql`SELECT * FROM audit_log ORDER BY created_at DESC LIMIT 100`
  }
  return NextResponse.json(result)
}
