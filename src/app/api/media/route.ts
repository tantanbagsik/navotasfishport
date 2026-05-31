import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET() {
  const media = await sql`SELECT * FROM media ORDER BY created_at DESC`
  return NextResponse.json(media)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = `m${Date.now()}`
    await sql`
      INSERT INTO media (id, filename, url, type, alt, size)
      VALUES (${id}, ${body.filename || 'untitled'}, ${body.url}, ${body.type || 'image'}, ${body.alt || ''}, ${body.size || 0})
    `
    const item = await sql`SELECT * FROM media WHERE id = ${id}`
    return NextResponse.json(item[0], { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await sql`DELETE FROM media WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
