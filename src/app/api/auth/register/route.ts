import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function POST(request: Request) {
  const { email, password, name, phone } = await request.json()
  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Name, email, and password required' }, { status: 400 })
  }

  const existing = await sql`SELECT id FROM users WHERE email = ${email}`
  if (existing.length > 0) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
  }

  const id = `user_${Date.now()}`
  const customerId = `cu_${Date.now()}`
  await sql`
    INSERT INTO users (id, email, password, name, role, phone)
    VALUES (${id}, ${email}, ${password}, ${name}, 'customer', ${phone || ''})
  `

  await sql`
    INSERT INTO customers (id, name, email, phone, orders_count, total_spent, join_date, status)
    VALUES (${customerId}, ${name}, ${email}, ${phone || ''}, 0, 0, CURRENT_DATE, 'active')
    ON CONFLICT (id) DO NOTHING
  `

  return NextResponse.json({
    user: { id, email, name, role: 'customer' },
    token: Buffer.from(`${id}:customer`).toString('base64'),
  }, { status: 201 })
}
