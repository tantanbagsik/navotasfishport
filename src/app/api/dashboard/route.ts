import { NextResponse } from 'next/server'
import { sql } from '@/lib/db/connection'

export async function GET() {
  const [revenueResult] = await sql`
    SELECT COALESCE(SUM(total), 0) as revenue_today,
           COUNT(*) as orders_today
    FROM orders
    WHERE created_at::date = CURRENT_DATE
  `

  const [stats] = await sql`
    SELECT
      COALESCE(SUM(total), 0) as revenue,
      COUNT(*) as total_orders,
      CASE WHEN COUNT(*) > 0 THEN SUM(total) / COUNT(*) ELSE 0 END as avg_order_value,
      (SELECT COUNT(*) FROM customers) as total_customers
    FROM orders
  `

  const activities = await sql`
    SELECT id, 'order' as type,
      'Order <strong>#' || id || '</strong> from ' || customer_name as message,
      CASE
        WHEN created_at > NOW() - INTERVAL '1 hour' THEN 'Just now'
        WHEN created_at > NOW() - INTERVAL '2 hours' THEN '1 hr ago'
        ELSE created_at::text
      END as time
    FROM orders ORDER BY created_at DESC LIMIT 5
  `

  const salesData = await sql`
    SELECT
      TO_CHAR(created_at, 'Dy') as day,
      COALESCE(SUM(total), 0) as value
    FROM orders
    WHERE created_at > NOW() - INTERVAL '7 days'
    GROUP BY TO_CHAR(created_at, 'Dy')
    ORDER BY MIN(created_at)
  `

  const trafficSources = [
    { name: 'Organic', percentage: 50, color: '#185fa5' },
    { name: 'Social', percentage: 31, color: '#3b6d11' },
    { name: 'Paid ads', percentage: 18, color: '#854f0b' },
    { name: 'Direct', percentage: 1, color: '#9a9994' },
  ]

  return NextResponse.json({
    stats: {
      revenueToday: Number(revenueResult.revenue_today),
      revenueDelta: 8.4,
      orders: Number(revenueResult.orders_today),
      ordersDelta: 12,
      avgOrderValue: Number(stats.avg_order_value),
      aovDelta: -2.1,
      activeCustomers: Number(stats.total_customers),
      customersDelta: 5.7,
    },
    activities,
    salesData,
    trafficSources,
  })
}
