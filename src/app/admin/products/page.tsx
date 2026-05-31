'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/api'
import ProductFormModal from '@/components/admin/ProductFormModal'

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [editingProduct, setEditingProduct] = useState<any | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => { getProducts().then(setProducts) }, [])

  const openEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`)
      const product = await res.json()
      setEditingProduct(product)
      setShowForm(true)
    } catch {}
  }

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div className="page-title" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Products</div>
          <div className="page-sub" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{products.length} products in your store</div>
        </div>
        <div className="btn-row" style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '240px' }}>
            <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', fontSize: '14px', pointerEvents: 'none' }}>⌕</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '7px 12px 7px 34px', fontSize: '13px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <button onClick={() => setShowForm(true)} className="btn primary" style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid transparent', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontFamily: 'var(--font-sans)' }}>
            + Add product
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table className="mini-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Product</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>SKU</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Category</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Price</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Stock</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Rating</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product: any) => (
              <tr key={product.id} className="cursor-pointer transition-colors duration-100"
                onClick={() => openEdit(product.id)}
                onMouseEnter={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'var(--bg-secondary)') }}
                onMouseLeave={e => { const tds = e.currentTarget.querySelectorAll('td'); tds.forEach(td => (td as HTMLElement).style.background = 'transparent') }}
              >
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={product.image} alt={product.name} style={{ width: '34px', height: '34px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '0.5px solid var(--border)' }} />
                    <div>
                      <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{product.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.description}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>{product.sku}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>{product.category}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 500 }}>${Number(product.price).toLocaleString()}</td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                  <span style={{ color: product.stock > 20 ? 'var(--text-success)' : product.stock > 5 ? 'var(--text-warning)' : 'var(--text-danger)' }}>
                    {product.stock}
                  </span>
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>
                  {product.rating ? `${'★'.repeat(Math.round(Number(product.rating)))} ${product.rating}` : '-'}
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border)' }}>
                  {product.is_on_sale
                    ? <span className="s-badge s-danger">Sale</span>
                    : product.is_best_seller
                    ? <span className="s-badge s-warning">Best Seller</span>
                    : product.is_new
                    ? <span className="s-badge s-info">New</span>
                    : <span className="s-badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>Active</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => { setShowForm(false); setEditingProduct(null); getProducts().then(setProducts) }}
        />
      )}
    </>
  )
}
