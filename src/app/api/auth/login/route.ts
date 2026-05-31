import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
  }

  const users = await sql`SELECT * FROM users WHERE email = ${email}`
  if (users.length === 0) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const user = users[0]
  if (user.password !== password) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  return NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    token: Buffer.from(`${user.id}:${user.role}`).toString('base64'),
  })
}
