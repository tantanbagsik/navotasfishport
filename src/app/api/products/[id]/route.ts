import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await sql`SELECT * FROM products WHERE id = ${id}`
  if (result.length === 0) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

  const product = result[0]
  const variations = await sql`SELECT * FROM product_variations WHERE product_id = ${id} ORDER BY name`
  const addOns = await sql`SELECT * FROM product_add_ons WHERE product_id = ${id} ORDER BY name`

  return NextResponse.json({ ...product, variations, addOns })
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()

  const result = await sql`
    UPDATE products SET
      name = COALESCE(${body.name}, name),
      description = COALESCE(${body.description}, description),
      price = COALESCE(${body.price}, price),
      original_price = COALESCE(${body.originalPrice}, original_price),
      category = COALESCE(${body.category}, category),
      stock = COALESCE(${body.stock}, stock),
      image = COALESCE(${body.image}, image),
      unit = COALESCE(${body.unit}, unit),
      weight = COALESCE(${body.weight}, weight),
      sku = COALESCE(${body.sku}, sku),
      is_on_sale = COALESCE(${body.isOnSale}, is_on_sale),
      is_best_seller = COALESCE(${body.isBestSeller}, is_best_seller),
      is_new = COALESCE(${body.isNew}, is_new)
    WHERE id = ${id}
    RETURNING *
  `
  if (result.length === 0) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

  if (body.variations !== undefined) {
    await sql`DELETE FROM product_variations WHERE product_id = ${id}`
    for (const v of body.variations) {
      await sql`
        INSERT INTO product_variations (id, product_id, name, price_adjustment, stock, sku_suffix)
        VALUES (${v.id || `pv${Date.now()}-${Math.random().toString(36).slice(2, 8)}`}, ${id}, ${v.name}, ${v.priceAdjustment || 0}, ${v.stock || 0}, ${v.skuSuffix || ''})
      `
    }
  }

  if (body.addOns !== undefined) {
    await sql`DELETE FROM product_add_ons WHERE product_id = ${id}`
    for (const a of body.addOns) {
      await sql`
        INSERT INTO product_add_ons (id, product_id, name, price, max_select, required)
        VALUES (${a.id || `pa${Date.now()}-${Math.random().toString(36).slice(2, 8)}`}, ${id}, ${a.name}, ${a.price}, ${a.maxSelect || 1}, ${a.required || false})
      `
    }
  }

  return NextResponse.json(result[0])
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await sql`DELETE FROM product_variations WHERE product_id = ${id}`
  await sql`DELETE FROM product_add_ons WHERE product_id = ${id}`
  const result = await sql`DELETE FROM products WHERE id = ${id} RETURNING *`
  if (result.length === 0) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  return NextResponse.json(result[0])
}
