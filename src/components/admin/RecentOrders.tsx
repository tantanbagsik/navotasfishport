'use client'

import { useState, useEffect } from 'react'
import { getOrders } from '@/lib/api'

const statusColors: Record<string, string> = {
  delivered: 's-success',
  shipped: 's-info',
  processing: 's-warning',
  cancelled: 's-danger',
  refunded: 's-danger',
  pending: 's-warning',
}

const tabs = ['All', 'Pending', 'Shipped', 'Refunds']

export default function RecentOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('All')

  useEffect(() => { getOrders().then(setOrders) }, [])

  const filtered = activeTab === 'All'
    ? orders
    : orders.filter((o: any) => {
        if (activeTab === 'Pending') return o.status === 'pending' || o.status === 'processing'
        if (activeTab === 'Shipped') return o.status === 'shipped'
        if (activeTab === 'Refunds') return o.status === 'refunded' || o.status === 'cancelled'
        return true
      })

  return (
    <div className="panel" draggable style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div className="panel-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', borderBottom: '0.5px solid var(--border)' }}>
        <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>Recent orders</span>
        <span className="text-xs" style={{ color: 'var(--text-info)', cursor: 'pointer' }}>View all →</span>
      </div>
      <div className="tab-row" style={{ display: 'flex', borderBottom: '0.5px solid var(--border)' }}>
        {tabs.map(tab => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="tab cursor-pointer whitespace-nowrap select-none transition-colors duration-100 text-xs px-[14px] py-[8px]"
            style={{
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === tab ? '2px solid var(--text-primary)' : '2px solid transparent',
              fontWeight: activeTab === tab ? 500 : 400,
            }}
          >
            {tab}
          </span>
        ))}
      </div>
      <div style={{ padding: '0 15px 14px' }}>
        <table className="mini-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '5px 8px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Order</th>
              <th style={{ textAlign: 'left', padding: '5px 8px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Customer</th>
              <th style={{ textAlign: 'left', padding: '5px 8px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Total</th>
              <th style={{ textAlign: 'left', padding: '5px 8px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 5).map((order: any) => (
              <tr key={order.id} className="cursor-pointer transition-colors duration-100"
                style={{ cursor: 'pointer' }}
                onMouseEnter={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'var(--bg-secondary)') }}
                onMouseLeave={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'transparent') }}
              >
                <td style={{ padding: '8px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, color: 'var(--text-info)' }}>{order.id}</td>
                <td style={{ padding: '8px', borderBottom: '0.5px solid var(--border)' }}>{order.customer_name}</td>
                <td style={{ padding: '8px', borderBottom: '0.5px solid var(--border)' }}>${Number(order.total).toFixed(2)}</td>
                <td style={{ padding: '8px', borderBottom: '0.5px solid var(--border)' }}>
                  <span className={`s-badge ${statusColors[order.status] || 's-warning'}`}
                    style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '99px', fontWeight: 600 }}>
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
