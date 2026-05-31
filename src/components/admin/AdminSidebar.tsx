'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  { section: 'Overview', items: [
    { href: '/admin', label: 'Dashboard', icon: 'grid' },
    { href: '/admin/analytics', label: 'Analytics', icon: 'chart' },
  ]},
  { section: 'Commerce', items: [
    { href: '/admin/orders', label: 'Orders', icon: 'box', badge: 12 },
    { href: '/admin/products', label: 'Products', icon: 'package' },
    { href: '/admin/bulk-import', label: 'Bulk Import', icon: 'upload' },
    { href: '/admin/media', label: 'Media Library', icon: 'image' },
    { href: '/admin/inventory', label: 'Inventory', icon: 'list', badge: 3 },
    { href: '/admin/customers', label: 'Customers', icon: 'users' },
  ]},
  { section: 'Marketing', items: [
    { href: '/admin/promotions', label: 'Promotions', icon: 'promo' },
    { href: '/admin/email', label: 'Email Campaigns', icon: 'email' },
  ]},
  { section: 'Fulfillment', items: [
    { href: '/admin/returns', label: 'Returns & Refunds', icon: 'return', badge: 2 },
    { href: '/admin/shipping', label: 'Shipping Rules', icon: 'shipping' },
  ]},
  { section: 'Store', items: [
    { href: '/admin/settings', label: 'Settings', icon: 'settings' },
    { href: '/admin/integrations', label: 'Integrations', icon: 'integrations' },
    { href: '/admin/audit', label: 'Audit Log', icon: 'audit' },
  ]},
]

const icons: Record<string, React.ReactNode> = {
  grid: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg>,
  chart: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 12l3-5 3 3 3-6 3 4" fill="none"/></svg>,
  box: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 8h6M5 5h3M5 11h4"/></svg>,
  package: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 1L14 4v6l-6 3L2 10V4z"/><path d="M8 1v12M2 4l6 3 6-3"/></svg>,
  list: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 5h10M3 8h7M3 11h5"/><rect x="1" y="2" width="14" height="12" rx="2"/></svg>,
  users: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/></svg>,
  promo: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 13L13 3M6 4H3v3M10 12h3v-3"/></svg>,
  email: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="3" width="14" height="10" rx="2"/><path d="M1 6h14"/></svg>,
  return: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="5" width="14" height="8" rx="1.5"/><path d="M5 5V3a2 2 0 014 0v2"/></svg>,
  shipping: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 8h10M8 3l5 5-5 5"/></svg>,
  settings: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="8" cy="8" r="2.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2"/></svg>,
  integrations: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="5" cy="5" r="2"/><circle cx="11" cy="11" r="2"/><path d="M5 7v2a4 4 0 004 4"/></svg>,
  audit: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 7h6M5 10h4"/><rect x="1" y="2" width="14" height="12" rx="2"/><path d="M5 4h6"/></svg>,
  image: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="2" width="14" height="12" rx="1.5"/><circle cx="6" cy="6" r="1.5"/><path d="M1 12l4-4 3 3 2-2 4 4"/></svg>,
  upload: <svg className="nav-icon w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 11V3M4 7l4-4 4 4M2 12v2h12v-2"/></svg>,
}

export default function AdminSidebar({ mobileOpen, onCloseMobile }: { mobileOpen?: boolean; onCloseMobile?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 sm:hidden" style={{ background: 'rgba(0,0,0,0.3)' }} onClick={onCloseMobile} />
      )}
      <div id="sidebar"
        className={`${mobileOpen ? 'fixed inset-y-0 left-0 z-50 flex' : 'hidden sm:flex'} w-[220px] shrink-0 flex-col`}
        style={{ background: 'var(--bg-primary)', borderRight: '0.5px solid var(--border)', top: mobileOpen ? 0 : '52px', height: mobileOpen ? '100vh' : 'calc(100vh - 52px)', overflowY: 'auto' }}>
        {mobileOpen && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '0.5px solid var(--border)' }}>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>ShopAdmin</span>
            <button onClick={onCloseMobile} style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>
        )}
      <div style={{ padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {navItems.map(section => (
          <div key={section.section}>
            <div className="nav-section" style={{ padding: '10px 16px 3px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
              {section.section}
            </div>
            {section.items.map(item => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px',
                    cursor: 'pointer', fontSize: '13px', transition: 'background 0.12s, color 0.12s',
                    position: 'relative', userSelect: 'none', textDecoration: 'none',
                    background: isActive ? 'var(--bg-secondary)' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  <span style={{ opacity: isActive ? 1 : 0.65 }}>{icons[item.icon]}</span>
                  {item.label}
                  {item.badge !== undefined && (
                    <span className="nav-badge" style={{ marginLeft: 'auto', fontSize: '10px', background: 'var(--bg-danger)', color: 'var(--text-danger)', padding: '2px 6px', borderRadius: '99px', fontWeight: 600 }}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span style={{ position: 'absolute', left: 0, top: '5px', bottom: '5px', width: '3px', background: 'var(--text-info)', borderRadius: '0 3px 3px 0' }} />
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
