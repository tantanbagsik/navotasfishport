'use client'

import { useState, useEffect } from 'react'

interface Variation {
  id?: string
  name: string
  priceAdjustment: number
  stock: number
  skuSuffix: string
}

interface AddOn {
  id?: string
  name: string
  price: number
  maxSelect: number
  required: boolean
}

interface ProductFormData {
  name: string
  description: string
  price: number
  originalPrice: number | null
  category: string
  image: string
  unit: string
  weight: string
  stock: number
  sku: string
  isOnSale: boolean
  isBestSeller: boolean
  isNew: boolean
  tags: string
  variations: Variation[]
  addOns: AddOn[]
}

interface ProductFormModalProps {
  product?: any
  onClose: () => void
}

const categories = [
  'Fresh Fish', 'Shrimp & Prawns', 'Crabs & Lobsters',
  'Shellfish', 'Value Packs', 'Smoked & Cured',
]

export default function ProductFormModal({ product, onClose }: ProductFormModalProps) {
  const isEdit = !!product

  const [form, setForm] = useState<ProductFormData>({
    name: '', description: '', price: 0, originalPrice: null,
    category: categories[0], image: '', unit: 'kg', weight: '1 kg',
    stock: 0, sku: '', isOnSale: false, isBestSeller: false, isNew: false,
    tags: '', variations: [], addOns: [],
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!product) return
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: Number(product.price) || 0,
      originalPrice: product.original_price ? Number(product.original_price) : null,
      category: product.category || categories[0],
      image: product.image || '',
      unit: product.unit || 'kg',
      weight: product.weight || '1 kg',
      stock: product.stock || 0,
      sku: product.sku || '',
      isOnSale: !!product.is_on_sale,
      isBestSeller: !!product.is_best_seller,
      isNew: !!product.is_new,
      tags: product.tags?.join(', ') || '',
      variations: (product.variations || []).map((v: any) => ({
        id: v.id,
        name: v.name || '',
        priceAdjustment: Number(v.price_adjustment) || 0,
        stock: v.stock || 0,
        skuSuffix: v.sku_suffix || '',
      })),
      addOns: (product.addOns || []).map((a: any) => ({
        id: a.id,
        name: a.name || '',
        price: Number(a.price) || 0,
        maxSelect: a.max_select || 1,
        required: !!a.required,
      })),
    })
  }, [product])

  const update = (key: keyof ProductFormData, value: any) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const addVariation = () =>
    update('variations', [...form.variations, { name: '', priceAdjustment: 0, stock: 0, skuSuffix: '' }])

  const removeVariation = (i: number) =>
    update('variations', form.variations.filter((_, idx) => idx !== i))

  const updateVariation = (i: number, key: keyof Variation, value: any) => {
    const list = [...form.variations]
    list[i] = { ...list[i], [key]: value }
    update('variations', list)
  }

  const addAddOn = () =>
    update('addOns', [...form.addOns, { name: '', price: 0, maxSelect: 1, required: false }])

  const removeAddOn = (i: number) =>
    update('addOns', form.addOns.filter((_, idx) => idx !== i))

  const updateAddOn = (i: number, key: keyof AddOn, value: any) => {
    const list = [...form.addOns]
    list[i] = { ...list[i], [key]: value }
    update('addOns', list)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const url = isEdit ? `/api/products/${product.id}` : '/api/products'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags ? form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save product')
      }
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '7px 10px', fontSize: '13px',
    border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)',
    background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '11px', fontWeight: 600,
    color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase',
    letterSpacing: '0.04em',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      background: 'rgba(0,0,0,0.4)', padding: '20px', overflowY: 'auto',
    }}>
      <div style={{
        background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)',
        border: '0.5px solid var(--border)', width: '100%', maxWidth: '720px',
        maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px', borderBottom: '0.5px solid var(--border)',
        }}>
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {isEdit ? 'Edit Product' : 'Add Product'}
          </span>
          <button onClick={onClose} style={{
            width: '28px', height: '28px', borderRadius: '50%', border: 'none',
            background: 'var(--bg-secondary)', color: 'var(--text-secondary)',
            cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center',
            justifyContent: 'center',
          }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '18px', overflowY: 'auto', flex: 1 }}>
          {error && <div style={{ marginBottom: '12px', padding: '8px 12px', background: 'var(--bg-danger)', color: 'var(--text-danger)', borderRadius: 'var(--radius-md)', fontSize: '12px' }}>{error}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Product Name</label>
              <input required value={form.name} onChange={e => update('name', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Description</label>
              <textarea rows={3} value={form.description} onChange={e => update('description', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div>
              <label style={labelStyle}>Price (₱)</label>
              <input required type="number" step="0.01" min="0" value={form.price} onChange={e => update('price', parseFloat(e.target.value) || 0)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Original Price (₱)</label>
              <input type="number" step="0.01" min="0" value={form.originalPrice ?? ''} onChange={e => update('originalPrice', e.target.value ? parseFloat(e.target.value) : null)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={form.category} onChange={e => update('category', e.target.value)} style={inputStyle}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>SKU</label>
              <input value={form.sku} onChange={e => update('sku', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Stock</label>
              <input type="number" min="0" value={form.stock} onChange={e => update('stock', parseInt(e.target.value) || 0)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Unit</label>
              <input value={form.unit} onChange={e => update('unit', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Weight</label>
              <input value={form.weight} onChange={e => update('weight', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Image URL</label>
              <input value={form.image} onChange={e => update('image', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Tags (comma-separated)</label>
              <input value={form.tags} onChange={e => update('tags', e.target.value)} style={inputStyle} placeholder="e.g. premium, fresh, best-seller" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.isOnSale} onChange={e => update('isOnSale', e.target.checked)} />
              On Sale
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.isBestSeller} onChange={e => update('isBestSeller', e.target.checked)} />
              Best Seller
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.isNew} onChange={e => update('isNew', e.target.checked)} />
              New Arrival
            </label>
          </div>

          {/* Variations Section */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Variations</span>
              <button type="button" onClick={addVariation} style={{ fontSize: '11px', padding: '4px 10px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid var(--border-md)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>+ Add Variation</button>
            </div>
            {form.variations.length === 0 && (
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', padding: '8px 0' }}>No variations yet. Add options like size (Small, Medium, Large).</div>
            )}
            {form.variations.map((v, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', padding: '8px 10px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '0.5px solid var(--border)' }}>
                <input placeholder="Name (e.g. Large)" value={v.name} onChange={e => updateVariation(i, 'name', e.target.value)} style={{ ...inputStyle, flex: 2 }} />
                <input type="number" step="0.01" placeholder="Price Adj." value={v.priceAdjustment} onChange={e => updateVariation(i, 'priceAdjustment', parseFloat(e.target.value) || 0)} style={{ ...inputStyle, flex: 1 }} />
                <input type="number" placeholder="Stock" value={v.stock} onChange={e => updateVariation(i, 'stock', parseInt(e.target.value) || 0)} style={{ ...inputStyle, flex: 1 }} />
                <input placeholder="SKU suffix" value={v.skuSuffix} onChange={e => updateVariation(i, 'skuSuffix', e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                <button type="button" onClick={() => removeVariation(i)} style={{ background: 'none', border: 'none', color: 'var(--text-danger)', cursor: 'pointer', fontSize: '16px', padding: '4px' }}>✕</button>
              </div>
            ))}
          </div>

          {/* Add-ons Section */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Add-ons</span>
              <button type="button" onClick={addAddOn} style={{ fontSize: '11px', padding: '4px 10px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid var(--border-md)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>+ Add Add-on</button>
            </div>
            {form.addOns.length === 0 && (
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', padding: '8px 0' }}>No add-ons yet. Add optional extras like sauce, seasoning, or ice pack.</div>
            )}
            {form.addOns.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', padding: '8px 10px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '0.5px solid var(--border)' }}>
                <input placeholder="Name (e.g. Extra Sauce)" value={a.name} onChange={e => updateAddOn(i, 'name', e.target.value)} style={{ ...inputStyle, flex: 2 }} />
                <input type="number" step="0.01" placeholder="Price" value={a.price} onChange={e => updateAddOn(i, 'price', parseFloat(e.target.value) || 0)} style={{ ...inputStyle, flex: 1 }} />
                <input type="number" min="1" placeholder="Max select" value={a.maxSelect} onChange={e => updateAddOn(i, 'maxSelect', parseInt(e.target.value) || 1)} style={{ ...inputStyle, flex: 1 }} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-secondary)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  <input type="checkbox" checked={a.required} onChange={e => updateAddOn(i, 'required', e.target.checked)} />
                  Required
                </label>
                <button type="button" onClick={() => removeAddOn(i)} style={{ background: 'none', border: 'none', color: 'var(--text-danger)', cursor: 'pointer', fontSize: '16px', padding: '4px' }}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '0.5px solid var(--border)', paddingTop: '14px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid var(--border-md)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid transparent', background: 'var(--text-primary)', color: 'var(--bg-primary)', opacity: saving ? 0.6 : 1 }}>
              {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
