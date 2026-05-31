import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort')

  let query = sql`SELECT * FROM products`
  let orderClause = 'ORDER BY created_at DESC'

  if (sort === 'price-asc') orderClause = 'ORDER BY price ASC'
  else if (sort === 'price-desc') orderClause = 'ORDER BY price DESC'
  else if (sort === 'rating') orderClause = 'ORDER BY rating DESC'
  else if (sort === 'name') orderClause = 'ORDER BY name ASC'

  if (category && search) {
    const q = `%${search}%`
    query = sql`SELECT * FROM products WHERE category = ${category} AND (name ILIKE ${q} OR description ILIKE ${q}) ${sql.unsafe(orderClause)}`
  } else if (category) {
    query = sql`SELECT * FROM products WHERE category = ${category} ${sql.unsafe(orderClause)}`
  } else if (search) {
    const q = `%${search}%`
    query = sql`SELECT * FROM products WHERE name ILIKE ${q} OR description ILIKE ${q} ${sql.unsafe(orderClause)}`
  } else {
    query = sql`SELECT * FROM products ${sql.unsafe(orderClause)}`
  }

  const result = await query

  const productsWithExtras = await Promise.all(result.map(async (product: any) => {
    const variations = await sql`SELECT * FROM product_variations WHERE product_id = ${product.id} ORDER BY name`
    const addOns = await sql`SELECT * FROM product_add_ons WHERE product_id = ${product.id} ORDER BY name`
    return { ...product, variations, addOns }
  }))

  return NextResponse.json(productsWithExtras)
}

export async function POST(request: Request) {
  const body = await request.json()
  const productId = body.id || `p${Date.now()}`
  const slug = body.slug || body.name?.toLowerCase().replace(/\s+/g, '-')

  const result = await sql`
    INSERT INTO products (id, name, slug, description, price, original_price, category, image, unit, weight, stock, sku, is_on_sale, is_best_seller, is_new, tags)
    VALUES (${productId}, ${body.name}, ${slug}, ${body.description || ''}, ${body.price}, ${body.originalPrice || null}, ${body.category}, ${body.image || ''}, ${body.unit || 'kg'}, ${body.weight || '1 kg'}, ${body.stock || 0}, ${body.sku || ''}, ${body.isOnSale || false}, ${body.isBestSeller || false}, ${body.isNew || false}, ${body.tags || []})
    RETURNING *
  `

  if (body.variations?.length) {
    for (const v of body.variations) {
      await sql`
        INSERT INTO product_variations (id, product_id, name, price_adjustment, stock, sku_suffix)
        VALUES (${v.id || `pv${Date.now()}-${Math.random().toString(36).slice(2, 8)}`}, ${productId}, ${v.name}, ${v.priceAdjustment || 0}, ${v.stock || 0}, ${v.skuSuffix || ''})
      `
    }
  }

  if (body.addOns?.length) {
    for (const a of body.addOns) {
      await sql`
        INSERT INTO product_add_ons (id, product_id, name, price, max_select, required)
        VALUES (${a.id || `pa${Date.now()}-${Math.random().toString(36).slice(2, 8)}`}, ${productId}, ${a.name}, ${a.price}, ${a.maxSelect || 1}, ${a.required || false})
      `
    }
  }

  return NextResponse.json(result[0], { status: 201 })
}
