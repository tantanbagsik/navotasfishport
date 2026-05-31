'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [mobileSidebar, setMobileSidebar] = useState(false)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false)
      return
    }

    const token = localStorage.getItem('auth_token')
    const user = localStorage.getItem('auth_user')

    if (!token || !user) {
      router.replace('/admin/login')
      return
    }

    try {
      const parsed = JSON.parse(user)
      if (parsed.role !== 'admin' && parsed.role !== 'staff') {
        router.replace('/admin/login')
        return
      }
      setAuthed(true)
    } catch {
      router.replace('/admin/login')
      return
    } finally {
      setChecking(false)
    }
  }, [router, pathname, isLoginPage])

  useEffect(() => { setMobileSidebar(false) }, [pathname])

  if (checking) return null

  if (isLoginPage) return <>{children}</>

  if (!authed) return null

  return (
    <div className="admin-shell">
      <AdminTopbar onToggleMobile={() => setMobileSidebar(v => !v)} />
      <div className="admin-body">
        <AdminSidebar mobileOpen={mobileSidebar} onCloseMobile={() => setMobileSidebar(false)} />
        <div className="admin-main">{children}</div>
      </div>
    </div>
  )
}
