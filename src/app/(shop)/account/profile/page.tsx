'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem('auth_user')
    if (raw) {
      try {
        const u = JSON.parse(raw)
        setUser(u)
        setForm({ name: u.name || '', email: u.email || '', phone: u.phone || '' })
      } catch {}
    }
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const updated = { ...user, ...form }
    localStorage.setItem('auth_user', JSON.stringify(updated))
    setUser(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>My Profile</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage your personal information.</p>
        </div>
        <Link href="/account" className="text-xs" style={{ color: 'var(--text-info)' }}>← Back to Dashboard</Link>
      </div>
      <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', maxWidth: '480px' }}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Full Name</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              style={{ width: '100%', padding: '7px 10px', fontSize: '13px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              style={{ width: '100%', padding: '7px 10px', fontSize: '13px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Phone</label>
            <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+63 912 345 6789"
              style={{ width: '100%', padding: '7px 10px', fontSize: '13px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} />
          </div>
          {saved && <div style={{ fontSize: '12px', padding: '8px 12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-success)', color: 'var(--text-success)' }}>Profile updated successfully!</div>}
          <button type="submit" style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid transparent', background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>Save Changes</button>
        </form>
      </div>
    </div>
  )
}
