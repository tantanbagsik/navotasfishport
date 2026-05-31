'use client'

import { useState, useEffect } from 'react'

const statusColors: Record<string, string> = {
  pending: 's-warning',
  approved: 's-info',
  denied: 's-danger',
  refunded: 's-success',
}

export default function AdminReturns() {
  const [returns, setReturns] = useState<any[]>([])

  const load = () => fetch('/api/returns').then(r => r.json()).then(setReturns)
  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/returns/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    load()
  }

  return (
    <>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div className="page-title" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Returns & Refunds</div>
          <div className="page-sub" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{returns.length} return requests</div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table className="mini-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Return ID</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Order ID</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Customer</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Product</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Reason</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Amount</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((r: any) => (
              <tr key={r.id}
                onMouseEnter={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'var(--bg-secondary)') }}
                onMouseLeave={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'transparent') }}
              >
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, color: 'var(--text-info)' }}>{r.id}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 500, color: 'var(--text-primary)' }}>{r.order_id}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                  <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{r.customer_name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{r.customer_email}</div>
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>{r.product_name || '-'}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.reason || '-'}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 500 }}>${Number(r.refund_amount).toFixed(2)}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                  <select
                    value={r.status}
                    onChange={e => updateStatus(r.id, e.target.value)}
                    style={{ padding: '4px 8px', fontSize: '11px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer' }}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="denied">Denied</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-tertiary)' }}>
                  {r.created_at ? new Date(r.created_at).toLocaleDateString() : '-'}
                </td>
              </tr>
            ))}
            {returns.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-tertiary)' }}>No return requests yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
