import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const products = body.products

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'No products provided' }, { status: 400 })
    }

    let imported = 0
    let errors: string[] = []

    for (const [index, p] of products.entries()) {
      try {
        if (!p.name) { errors.push(`Row ${index + 1}: missing name`); continue }

        const id = p.id || `p${Date.now()}${Math.random().toString(36).slice(2, 6)}`
        const slug = p.slug || p.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || `product-${id}`

        await sql`
          INSERT INTO products (id, name, slug, description, price, original_price, category, image, unit, weight, stock, sku, is_on_sale, is_best_seller, is_new, tags, video_url)
          VALUES (
            ${id},
            ${p.name},
            ${slug},
            ${p.description || ''},
            ${parseFloat(p.price) || 0},
            ${p.original_price ? parseFloat(p.original_price) : null},
            ${p.category || 'Fresh Fish'},
            ${p.image || ''},
            ${p.unit || 'kg'},
            ${p.weight || '1 kg'},
            ${parseInt(p.stock) || 0},
            ${p.sku || ''},
            ${p.is_on_sale === true || p.is_on_sale === 'true' || p.is_on_sale === 'yes'},
            ${p.is_best_seller === true || p.is_best_seller === 'true' || p.is_best_seller === 'yes'},
            ${p.is_new === true || p.is_new === 'true' || p.is_new === 'yes'},
            ${p.tags ? (Array.isArray(p.tags) ? p.tags : p.tags.split(',').map((t: string) => t.trim()).filter(Boolean)) : []},
            ${p.video_url || ''}
          )
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            price = EXCLUDED.price,
            stock = EXCLUDED.stock
        `
        imported++
      } catch (err: any) {
        errors.push(`Row ${index + 1} (${p.name || 'unknown'}): ${err.message}`)
      }
    }

    return NextResponse.json({ imported, errors: errors.length > 0 ? errors : undefined })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
