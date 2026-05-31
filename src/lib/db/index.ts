import { sql } from './connection'

export function mapProduct(row: any) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    category: row.category,
    image: row.image,
    unit: row.unit,
    weight: row.weight,
    stock: row.stock,
    sku: row.sku,
    rating: Number(row.rating),
    reviews: row.reviews,
    isOnSale: row.is_on_sale,
    isBestSeller: row.is_best_seller,
    isNew: row.is_new,
    tags: row.tags,
  }
}

export function mapOrder(row: any) {
  return {
    id: row.id,
    customerId: row.customer_id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    total: Number(row.total),
    subtotal: Number(row.subtotal),
    shipping: Number(row.shipping),
    tax: Number(row.tax),
    status: row.status,
    paymentMethod: row.payment_method,
    shippingAddress: typeof row.shipping_address === 'string' ? JSON.parse(row.shipping_address) : row.shipping_address,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function mapCustomer(row: any) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    ordersCount: row.orders_count,
    totalSpent: Number(row.total_spent),
    joinDate: row.join_date,
    status: row.status,
    address: typeof row.address === 'string' ? JSON.parse(row.address) : row.address,
  }
}

export async function getAllProducts() {
  const rows = await sql`SELECT * FROM products ORDER BY created_at DESC`
  return rows.map(mapProduct)
}

export async function getProductById(id: string) {
  const rows = await sql`SELECT * FROM products WHERE id = ${id}`
  return rows.length ? mapProduct(rows[0]) : null
}

export async function getAllOrders() {
  const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`
  return rows.map(mapOrder)
}

export async function getAllCustomers() {
  const rows = await sql`SELECT * FROM customers ORDER BY join_date DESC`
  return rows.map(mapCustomer)
}

export { sql }
