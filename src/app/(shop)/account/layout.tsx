'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AccountSidebar from '@/components/account/AccountSidebar'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const raw = localStorage.getItem('auth_user')
    if (!token || !raw) {
      router.replace('/login')
      return
    }
    try {
      const parsed = JSON.parse(raw)
      setUser(parsed)
    } catch {
      router.replace('/login')
      return
    } finally {
      setChecking(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    router.push('/')
  }

  if (checking) return null
  if (!user) return null

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="sticky top-0 z-30" style={{ background: 'var(--bg-primary)', borderBottom: '0.5px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-info)' }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--text-info)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Navotas Fish Port</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/shop" className="text-xs" style={{ color: 'var(--text-secondary)' }}>← Back to Shop</Link>
              <button onClick={handleLogout} className="text-xs sm:hidden px-2 py-1 rounded" style={{ color: 'var(--text-danger)', border: '0.5px solid var(--border)' }}>Logout</button>
              <div className="flex items-center gap-2 pl-3" style={{ borderLeft: '0.5px solid var(--border)' }}>
                <div className="w-7 h-7 rounded-full text-[10px] font-semibold flex items-center justify-center" style={{ background: 'var(--bg-info)', color: 'var(--text-info)' }}>
                  {user.name?.charAt(0) || 'U'}
                </div>
                <span className="text-xs hidden sm:inline" style={{ color: 'var(--text-secondary)' }}>{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        <AccountSidebar />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-57px)]">{children}</div>
      </div>
    </div>
  )
}
