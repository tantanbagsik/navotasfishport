'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const ADDRESS_KEY = 'navotas_addresses'
interface Address { id: string; label: string; street: string; city: string; state: string; zip: string; isDefault: boolean }

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ label: '', street: '', city: '', state: '', zip: '' })

  useEffect(() => {
    const stored = localStorage.getItem(ADDRESS_KEY)
    if (stored) { try { setAddresses(JSON.parse(stored)) } catch {} }
    else { const d = [{ id: '1', label: 'Home', street: '123 Rizal St', city: 'Navotas', state: 'Metro Manila', zip: '1409', isDefault: true }]; setAddresses(d); localStorage.setItem(ADDRESS_KEY, JSON.stringify(d)) }
  }, [])

  const persist = (list: Address[]) => { setAddresses(list); localStorage.setItem(ADDRESS_KEY, JSON.stringify(list)) }
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const newAddr: Address = { id: Date.now().toString(), ...form, isDefault: addresses.length === 0 }
    persist([...addresses, newAddr])
    setForm({ label: '', street: '', city: '', state: '', zip: '' })
    setShowForm(false)
  }
  const handleDelete = (id: string) => persist(addresses.filter(a => a.id !== id))
  const setDefault = (id: string) => persist(addresses.map(a => ({ ...a, isDefault: a.id === id })))

  const inputStyle: React.CSSProperties = { width: '100%', padding: '7px 10px', fontSize: '13px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Address Book</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage your shipping addresses.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/account" className="text-xs" style={{ color: 'var(--text-info)' }}>← Back</Link>
          <button onClick={() => setShowForm(!showForm)} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-info)', color: 'var(--text-info)', border: 'none', cursor: 'pointer' }}>+ Add Address</button>
        </div>
      </div>
      {showForm && (
        <form onSubmit={handleAdd} style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '480px' }}>
            <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Label</label><input required value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} placeholder="Home, Office, etc." style={inputStyle} /></div>
            <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Street</label><input required value={form.street} onChange={e => setForm({ ...form, street: e.target.value })} style={inputStyle} /></div>
            <div><label style={labelStyle}>City</label><input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} style={inputStyle} /></div>
            <div><label style={labelStyle}>State</label><input required value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} style={inputStyle} /></div>
            <div><label style={labelStyle}>ZIP</label><input required value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} style={inputStyle} /></div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}><button type="submit" style={{ width: '100%', padding: '7px 14px', fontSize: '13px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid transparent', background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>Save</button></div>
          </div>
        </form>
      )}
      <div className="grid gap-4">
        {addresses.map(addr => (
          <div key={addr.id} style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{addr.label}</span>
                  {addr.isDefault && <span className="s-badge s-info" style={{ fontSize: '10px' }}>DEFAULT</span>}
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{addr.street}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{addr.city}, {addr.state} {addr.zip}</p>
              </div>
              <div className="flex gap-2">
                {!addr.isDefault && <button onClick={() => setDefault(addr.id)} className="text-[11px]" style={{ color: 'var(--text-info)', cursor: 'pointer', background: 'none', border: 'none' }}>Set Default</button>}
                <button onClick={() => handleDelete(addr.id)} className="text-[11px]" style={{ color: 'var(--text-danger)', cursor: 'pointer', background: 'none', border: 'none' }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
