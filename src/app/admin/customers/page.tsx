'use client'

import { useState, useEffect } from 'react'
import { getCustomers } from '@/lib/api'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([])

  useEffect(() => { getCustomers().then(setCustomers) }, [])

  return (
    <>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div className="page-title" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Customers</div>
          <div className="page-sub" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{customers.length} registered customers</div>
        </div>
        <div className="search" style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', fontSize: '14px', pointerEvents: 'none' }}>⌕</span>
          <input
            type="text"
            placeholder="Search customers…"
            style={{ width: '240px', padding: '7px 12px 7px 34px', fontSize: '13px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table className="mini-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Customer</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Email</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Phone</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Orders</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Total Spent</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c: any) => (
              <tr key={c.id} className="cursor-pointer transition-colors duration-100"
                onMouseEnter={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'var(--bg-secondary)') }}
                onMouseLeave={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'transparent') }}
              >
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--bg-info)', color: 'var(--text-info)', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {c.name?.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{c.name}</div>
                  </div>
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>{c.email}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>{c.phone}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 500 }}>{c.orders_count}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 500 }}>${Number(c.total_spent).toLocaleString()}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                  <span className={`s-badge ${c.status === 'vip' ? 's-warning' : c.status === 'active' ? 's-success' : ''}`}
                    style={c.status === 'inactive' ? { background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)', fontSize: '11px', padding: '2px 8px', borderRadius: '99px', fontWeight: 600 } : {}}>
                    {c.status?.charAt(0).toUpperCase() + c.status?.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-tertiary)' }}>
                  {c.join_date ? new Date(c.join_date).toLocaleDateString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
