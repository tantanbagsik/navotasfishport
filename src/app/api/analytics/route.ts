import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET() {
  const [revenueResult] = await sql`
    SELECT COALESCE(SUM(total), 0) as total_revenue,
           COUNT(*) as total_orders
    FROM orders
  `

  const [todayResult] = await sql`
    SELECT COALESCE(SUM(total), 0) as today_revenue,
           COUNT(*) as today_orders
    FROM orders WHERE created_at::date = CURRENT_DATE
  `

  const avgOrderValue = revenueResult.total_orders > 0
    ? Number(revenueResult.total_revenue) / Number(revenueResult.total_orders)
    : 0

  const totalCustomers = await sql`SELECT COUNT(*) as count FROM customers`
  const conversionRate = totalCustomers[0].count > 0
    ? (Number(revenueResult.total_orders) / Number(totalCustomers[0].count)) * 100
    : 0

  const salesData = await sql`
    SELECT
      TO_CHAR(created_at, 'Mon DD') as label,
      COALESCE(SUM(total), 0) as value
    FROM orders
    WHERE created_at > NOW() - INTERVAL '30 days'
    GROUP BY TO_CHAR(created_at, 'Mon DD')
    ORDER BY MIN(created_at)
  `

  const recentOrders = await sql`
    SELECT id, customer_name, total, status, created_at
    FROM orders ORDER BY created_at DESC LIMIT 5
  `

  const topProducts = await sql`
    SELECT oi.product_name, SUM(oi.quantity) as qty, SUM(oi.price * oi.quantity) as revenue
    FROM order_items oi
    GROUP BY oi.product_name
    ORDER BY qty DESC LIMIT 5
  `

  return NextResponse.json({
    totalRevenue: Number(revenueResult.total_revenue),
    totalOrders: Number(revenueResult.total_orders),
    todayRevenue: Number(todayResult.today_revenue),
    todayOrders: Number(todayResult.today_orders),
    avgOrderValue: Number(avgOrderValue.toFixed(2)),
    conversionRate: Number(conversionRate.toFixed(1)),
    salesData,
    recentOrders,
    topProducts,
  })
}
