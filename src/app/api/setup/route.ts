import { NextResponse } from 'next/server'
import { createTables, seedData } from '@/lib/db/schema'

export async function POST() {
  try {
    await createTables()
    await seedData()
    return NextResponse.json({ message: 'Database initialized successfully' })
  } catch (error) {
    console.error('Database initialization failed:', error)
    return NextResponse.json({ error: 'Database initialization failed' }, { status: 500 })
  }
}
