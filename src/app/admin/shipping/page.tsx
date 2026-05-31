'use client'

import { useState, useEffect } from 'react'

export default function AdminShipping() {
  const [rules, setRules] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)

  const load = () => fetch('/api/shipping').then(r => r.json()).then(setRules)
  useEffect(() => { load() }, [])

  const toggleActive = async (id: string, is_active: boolean) => {
    await fetch('/api/shipping', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, is_active }) })
    load()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = { name: fd.get('name'), min_order: parseFloat(fd.get('min_order') as string) || 0, cost: parseFloat(fd.get('cost') as string) || 0, estimated_days: fd.get('estimated_days') }
    await fetch('/api/shipping', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setShowForm(false)
    load()
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '7px 12px', fontSize: '13px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', marginTop: '4px' }

  return (
    <>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div className="page-title" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Shipping Rules</div>
          <div className="page-sub" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{rules.length} shipping rules configured</div>
        </div>
        <button onClick={() => setShowForm(true)} className="btn primary" style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid transparent', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontFamily: 'var(--font-sans)' }}>+ Add Rule</button>
      </div>

      <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table className="mini-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Min Order</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Cost</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Est. Days</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r: any) => (
              <tr key={r.id}
                onMouseEnter={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'var(--bg-secondary)') }}
                onMouseLeave={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'transparent') }}
              >
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 500, color: 'var(--text-primary)' }}>{r.name}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>${Number(r.min_order).toLocaleString()}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 500 }}>${Number(r.cost).toFixed(2)}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>{r.estimated_days}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                  <span className={`s-badge ${r.is_active ? 's-success' : ''}`} style={!r.is_active ? { background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)', fontSize: '11px', padding: '2px 8px', borderRadius: '99px', fontWeight: 600 } : {}}>
                    {r.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                  <span onClick={() => toggleActive(r.id, !r.is_active)} style={{ color: 'var(--text-info)', cursor: 'pointer', fontSize: '12px' }}>
                    {r.is_active ? 'Deactivate' : 'Activate'}
                  </span>
                </td>
              </tr>
            ))}
            {rules.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-tertiary)' }}>No shipping rules yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowForm(false)}>
          <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', width: '420px', maxWidth: '90vw' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>New Shipping Rule</div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Name</label>
                <input name="name" required style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Min Order ($)</label>
                  <input name="min_order" type="number" step="0.01" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Cost ($)</label>
                  <input name="cost" type="number" step="0.01" style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Estimated Delivery (e.g. 3-5 days)</label>
                <input name="estimated_days" placeholder="3-5" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid var(--border)', background: 'transparent', color: 'var(--text-primary)' }}>Cancel</button>
                <button type="submit" style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid transparent', background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
