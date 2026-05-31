'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export default function LoginPage() {
  const router = useRouter()
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('auth_token')) router.replace('/')
  }, [router])

  return (
    <div className="min-h-screen flex">
      {/* Left Hero Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-900 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-sky-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-12 max-w-lg">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/25">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Fresh from the Port</h2>
          <p className="text-sky-200 text-sm leading-relaxed mb-8">
            Direct from Navotas Fish Port to your doorstep. Premium seafood sourced daily from local fishermen.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {['🐟', '🦐', '🦀'].map((emoji, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl py-4 px-3 ring-1 ring-white/15">
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-[11px] text-sky-200 font-medium">
                  {['Fresh Catch', 'Premium', 'Daily'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-zinc-50 to-white">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-10 justify-center lg:justify-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-sky-200">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <span className="font-bold text-lg text-zinc-900">Navotas Fish Port</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-zinc-900">
              {showRegister ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-sm text-zinc-500 mt-1.5">
              {showRegister
                ? 'Join thousands of seafood lovers'
                : 'Sign in to your account to continue'}
            </p>
          </div>

          {/* Social Logins */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-600 text-sm font-medium hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-600 text-sm font-medium hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill="#1877F2"/></svg>
              Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-xs text-zinc-400 font-medium">or continue with email</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* Auth Form */}
          <div className="bg-white rounded-2xl">
            {showRegister ? (
              <AuthForm mode="register" redirectTo="/account" />
            ) : (
              <AuthForm mode="login" />
            )}
          </div>

          {/* Toggle */}
          <div className="mt-6 text-center text-sm text-zinc-500">
            {showRegister ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setShowRegister(false)}
                  className="text-sky-600 font-semibold hover:text-sky-700 transition-colors cursor-pointer"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => setShowRegister(true)}
                  className="text-sky-600 font-semibold hover:text-sky-700 transition-colors cursor-pointer"
                >
                  Create one
                </button>
              </>
            )}
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
