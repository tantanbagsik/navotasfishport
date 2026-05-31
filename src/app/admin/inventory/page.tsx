'use client'

import { useState, useEffect } from 'react'

export default function AdminInventory() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [editingStock, setEditingStock] = useState<{ id: string; val: number } | null>(null)

  const load = () => fetch('/api/inventory').then(r => r.json()).then(setProducts)
  useEffect(() => { load() }, [])

  const updateStock = async (id: string, stock: number) => {
    await fetch('/api/inventory', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, stock }) })
    setEditingStock(null)
    load()
  }

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div className="page-title" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Inventory</div>
          <div className="page-sub" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{products.length} products in stock</div>
        </div>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', fontSize: '14px', pointerEvents: 'none' }}>⌕</span>
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '240px', padding: '7px 12px 7px 34px', fontSize: '13px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table className="mini-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Product</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>SKU</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Category</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Stock</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Low Stock Alert</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p: any) => {
              const stockColor = p.stock > 20 ? 'var(--text-success)' : p.stock > 5 ? 'var(--text-warning)' : 'var(--text-danger)'
              return (
                <tr key={p.id}
                  onMouseEnter={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'var(--bg-secondary)') }}
                  onMouseLeave={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'transparent') }}
                >
                  <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 500, color: 'var(--text-primary)' }}>{p.name}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>{p.sku}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>{p.category}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                    {editingStock?.id === p.id ? (
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <input
                          type="number"
                          value={editingStock!.val}
                          onChange={e => setEditingStock({ id: p.id, val: parseInt(e.target.value) || 0 })}
                          style={{ width: '70px', padding: '4px 8px', fontSize: '12px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                        <span onClick={() => updateStock(p.id, editingStock!.val)} style={{ color: 'var(--text-info)', cursor: 'pointer', fontSize: '12px' }}>Save</span>
                        <span onClick={() => setEditingStock(null)} style={{ color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '12px' }}>Cancel</span>
                      </div>
                    ) : (
                      <span
                        onClick={() => setEditingStock({ id: p.id, val: p.stock })}
                        style={{ color: stockColor, cursor: 'pointer', fontWeight: 500 }}
                      >
                        {p.stock}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                    {p.stock <= 20 ? (
                      <span className={`s-badge ${p.stock <= 5 ? 's-danger' : 's-warning'}`}>
                        {p.stock <= 5 ? 'Critical' : 'Low'}
                      </span>
                    ) : (
                      <span className="s-badge s-success">In Stock</span>
                    )}
                  </td>
                  <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                    {p.is_on_sale
                      ? <span className="s-badge s-danger">Sale</span>
                      : p.is_best_seller
                      ? <span className="s-badge s-warning">Best Seller</span>
                      : p.is_new
                      ? <span className="s-badge s-info">New</span>
                      : <span className="s-badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>Active</span>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
