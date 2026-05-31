'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getOrders } from '@/lib/api'

export default function AccountDashboard() {
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const raw = localStorage.getItem('auth_user')
    if (raw) try { setUser(JSON.parse(raw)) } catch {}
    getOrders().then(setOrders)
  }, [])

  const userOrders = orders.filter((o: any) => o.customer_email === user?.email)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Welcome back, {user?.name?.split(' ')[0] || 'there'}!</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Here&apos;s what&apos;s happening with your account.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '13px 15px' }}>
          <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Total Orders</div>
          <div className="text-2xl font-semibold mt-1 mb-1" style={{ color: 'var(--text-primary)' }}>{userOrders.length}</div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Lifetime orders placed</div>
        </div>
        <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '13px 15px' }}>
          <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Active Orders</div>
          <div className="text-2xl font-semibold mt-1 mb-1" style={{ color: 'var(--text-info)' }}>{userOrders.filter((o: any) => o.status === 'processing' || o.status === 'shipped').length}</div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>In progress</div>
        </div>
        <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '13px 15px' }}>
          <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Delivered</div>
          <div className="text-2xl font-semibold mt-1 mb-1" style={{ color: 'var(--text-success)' }}>{userOrders.filter((o: any) => o.status === 'delivered').length}</div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Successfully delivered</div>
        </div>
      </div>
      <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', borderBottom: '0.5px solid var(--border)' }}>
          <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Orders</span>
          <Link href="/account/orders" className="text-xs" style={{ color: 'var(--text-info)' }}>View all →</Link>
        </div>
        {userOrders.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center' }}>
            <div className="text-3xl mb-2">🛒</div>
            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>No orders yet</p>
            <Link href="/shop" className="text-xs px-4 py-2 rounded-lg inline-block" style={{ background: 'var(--bg-info)', color: 'var(--text-info)' }}>Start Shopping</Link>
          </div>
        ) : (
          <div>
            {userOrders.slice(0, 5).map((order: any) => (
              <div key={order.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 15px', borderBottom: '0.5px solid var(--border)' }}>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{order.id}</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{new Date(order.created_at).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>${Number(order.total).toFixed(2)}</div>
                  <span className={`s-badge ${order.status === 'delivered' ? 's-success' : order.status === 'shipped' ? 's-info' : order.status === 'processing' ? 's-warning' : ''}`}
                    style={order.status === 'pending' || order.status === 'cancelled' ? { background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)', fontSize: '11px', padding: '2px 8px', borderRadius: '99px', fontWeight: 600 } : {}}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '15px' }}>
        <h2 className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Account Details</h2>
        <div className="space-y-2 text-sm">
          <div style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--text-tertiary)', width: '80px', flexShrink: 0 }}>Name:</span><span style={{ color: 'var(--text-primary)' }}>{user?.name}</span></div>
          <div style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--text-tertiary)', width: '80px', flexShrink: 0 }}>Email:</span><span style={{ color: 'var(--text-primary)' }}>{user?.email}</span></div>
          <div style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--text-tertiary)', width: '80px', flexShrink: 0 }}>Role:</span><span style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>{user?.role}</span></div>
        </div>
      </div>
    </div>
  )
}
