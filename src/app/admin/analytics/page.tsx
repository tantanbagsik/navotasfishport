'use client'

import { useState, useEffect } from 'react'

export default function AdminAnalytics() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/analytics').then(r => r.json()).then(setData)
  }, [])

  if (!data) {
    return <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-tertiary)' }}>Loading analytics...</div>
  }

  const stats = [
    { label: 'Total Revenue', value: `$${Number(data.totalRevenue).toLocaleString()}`, color: 'var(--text-success)' },
    { label: 'Total Orders', value: data.totalOrders, color: 'var(--text-info)' },
    { label: 'Avg Order Value', value: `$${data.avgOrderValue}`, color: 'var(--text-warning)' },
    { label: 'Conversion Rate', value: `${data.conversionRate}%`, color: 'var(--text-primary)' },
  ]

  const maxVal = Math.max(...data.salesData.map((d: any) => Number(d.value)), 1)
  const statusColors: Record<string, string> = {
    delivered: 's-success', shipped: 's-info', processing: 's-warning', cancelled: 's-danger', refunded: 's-danger', pending: 's-warning',
  }

  return (
    <>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div className="page-title" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Analytics</div>
          <div className="page-sub" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Revenue, trends, and performance metrics</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '10px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
        <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>Revenue (Last 30 Days)</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '160px' }}>
            {data.salesData.map((d: any, i: number) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '100%', background: 'var(--bg-info)', borderRadius: '3px 3px 0 0', height: `${(Number(d.value) / maxVal) * 140}px`, minHeight: '4px', opacity: 0.8 }} />
                <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{d.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>Top Products</div>
          {data.topProducts.map((p: any, i: number) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < data.topProducts.length - 1 ? '0.5px solid var(--border)' : 'none', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.product_name}</span>
              <span style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}>{p.qty} sold</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', padding: '14px 14px 0' }}>Recent Orders</div>
        <table className="mini-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Order</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Customer</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Total</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.recentOrders.map((o: any) => (
              <tr key={o.id}
                onMouseEnter={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'var(--bg-secondary)') }}
                onMouseLeave={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'transparent') }}
              >
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, color: 'var(--text-info)' }}>{o.id}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-primary)' }}>{o.customer_name}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 500 }}>${Number(o.total).toFixed(2)}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                  <span className={`s-badge ${statusColors[o.status] || 's-warning'}`}>{o.status?.charAt(0).toUpperCase() + o.status?.slice(1)}</span>
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-tertiary)' }}>
                  {o.created_at ? new Date(o.created_at).toLocaleDateString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
