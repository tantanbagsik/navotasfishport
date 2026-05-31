import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  if (status) {
    const result = await sql`SELECT * FROM orders WHERE status = ${status} ORDER BY created_at DESC`
    return NextResponse.json(result)
  }

  const result = await sql`SELECT * FROM orders ORDER BY created_at DESC`
  return NextResponse.json(result)
}

function generateTrackingNumber(): string {
  const now = new Date()
  const yy = now.getFullYear().toString().slice(2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `NFP-${yy}${mm}${dd}-${rand}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = `ORD-${Date.now().toString(36).toUpperCase()}`
    const trackingNumber = generateTrackingNumber()

    // Validate and decrement stock
    if (body.items?.length) {
      for (const item of body.items) {
        const product = await sql`SELECT stock FROM products WHERE id = ${item.id}`
        if (!product.length) {
          return NextResponse.json({ error: `Product "${item.name}" not found` }, { status: 400 })
        }
        const available = Number(product[0].stock)
        if (available < item.quantity) {
          return NextResponse.json({
            error: `Insufficient stock for "${item.name}". Available: ${available}, requested: ${item.quantity}`
          }, { status: 400 })
        }
      }
    }

    const result = await sql`
      INSERT INTO orders (id, customer_id, customer_name, customer_email, total, subtotal, shipping, tax, status, payment_method, shipping_address, notes, tracking_number)
      VALUES (${id}, ${body.customerId || ''}, ${body.customerName}, ${body.customerEmail}, ${body.total}, ${body.subtotal}, ${body.shipping || 0}, ${body.tax || 0}, ${body.status || 'pending'}, ${body.paymentMethod || ''}, ${JSON.stringify(body.shippingAddress || {})}, ${body.notes || ''}, ${trackingNumber})
      RETURNING *
    `

    if (body.items?.length) {
      for (const item of body.items) {
        await sql`
          INSERT INTO order_items (order_id, product_id, product_name, quantity, price, image)
          VALUES (${id}, ${item.id}, ${item.name}, ${item.quantity}, ${item.price}, ${item.image || ''})
        `
        await sql`UPDATE products SET stock = stock - ${item.quantity} WHERE id = ${item.id}`
      }
    }

    return NextResponse.json({ ...result[0], items: body.items || [] }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create order' }, { status: 500 })
  }
}
