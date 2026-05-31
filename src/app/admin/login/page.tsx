'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthForm from '@/components/AuthForm'

export default function AdminLoginPage() {
  const router = useRouter()

  useEffect(() => {
    const raw = localStorage.getItem('auth_user')
    if (!raw) return
    try {
      const u = JSON.parse(raw)
      if (u.role === 'admin' || u.role === 'staff') router.replace('/admin')
    } catch {}
  }, [router])
  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-zinc-900 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <rect x="1" y="1" width="22" height="22" rx="6" fill="#e6f1fb" />
                <path d="M7 12l4 4 6-7" stroke="#185fa5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-zinc-900">Admin Login</h1>
            <p className="text-xs text-zinc-500 mt-1">Sign in to manage your store</p>
          </div>

          <AuthForm mode="login" role="admin" redirectTo="/admin" />

          <p className="text-xs text-zinc-400 text-center mt-4">
            Demo: admin@navotasfishport.com / admin123
          </p>
        </div>
      </div>
    </div>
  )
}
