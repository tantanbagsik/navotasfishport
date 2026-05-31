import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function POST(request: Request) {
  const { email, role } = await request.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  await sql`UPDATE users SET role = ${role || 'admin'} WHERE email = ${email}`
  return NextResponse.json({ message: `User ${email} upgraded to ${role || 'admin'}` })
}
