'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getOrders } from '@/lib/api'

const statusColors: Record<string, string> = {
  delivered: 's-success', shipped: 's-info', processing: 's-warning', cancelled: 's-danger', pending: 's-warning',
}

export default function MyOrdersPage() {
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const raw = localStorage.getItem('auth_user')
    if (raw) try { setUser(JSON.parse(raw)) } catch {}
    getOrders().then(setOrders)
  }, [])

  const myOrders = orders.filter((o: any) => o.customer_email === user?.email)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>My Orders</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Track and manage your orders.</p>
        </div>
        <Link href="/account" className="text-xs" style={{ color: 'var(--text-info)' }}>← Back to Dashboard</Link>
      </div>
      {myOrders.length === 0 ? (
        <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '40px', textAlign: 'center' }}>
          <div className="text-4xl mb-3">📦</div>
          <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>No orders yet</h3>
          <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>When you place an order, it will show up here.</p>
          <Link href="/shop" className="text-xs px-4 py-2 rounded-lg inline-block" style={{ background: 'var(--bg-info)', color: 'var(--text-info)' }}>Browse Seafood</Link>
        </div>
      ) : (
        <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <table className="mini-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 16px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Order</th>
                <th style={{ textAlign: 'left', padding: '10px 16px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '10px 16px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Total</th>
                <th style={{ textAlign: 'left', padding: '10px 16px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Payment</th>
                <th style={{ textAlign: 'left', padding: '10px 16px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order: any) => (
                <tr key={order.id} className="cursor-pointer transition-colors duration-100"
                  onMouseEnter={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'var(--bg-secondary)') }}
                  onMouseLeave={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'transparent') }}
                >
                  <td style={{ padding: '10px 16px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, color: 'var(--text-info)' }}>{order.id}</td>
                  <td style={{ padding: '10px 16px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '10px 16px', borderBottom: '0.5px solid var(--border)', fontWeight: 500 }}>${Number(order.total).toFixed(2)}</td>
                  <td style={{ padding: '10px 16px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>{order.payment_method}</td>
                  <td style={{ padding: '10px 16px', borderBottom: '0.5px solid var(--border)' }}>
                    <span className={`s-badge ${statusColors[order.status] || 's-warning'}`}>{order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
