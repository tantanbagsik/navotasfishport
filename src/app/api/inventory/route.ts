import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET() {
  const products = await sql`
    SELECT id, name, sku, category, stock, is_on_sale, is_best_seller, is_new, price
    FROM products ORDER BY name ASC
  `
  return NextResponse.json(products)
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, stock } = body
    if (!id || stock === undefined) {
      return NextResponse.json({ error: 'Product id and stock are required' }, { status: 400 })
    }
    await sql`UPDATE products SET stock = ${stock} WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
