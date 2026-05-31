'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/reseller-program', label: 'Reseller Program' },
  { href: '/about', label: 'About Us' },
]

const categories = [
  { label: 'All', slug: '' },
  { label: 'Fresh Fish', slug: 'Fresh Fish' },
  { label: 'Shrimp & Prawns', slug: 'Shrimp & Prawns' },
  { label: 'Crabs & Lobsters', slug: 'Crabs & Lobsters' },
  { label: 'Shellfish', slug: 'Shellfish' },
  { label: 'Value Packs', slug: 'Value Packs' },
  { label: 'Smoked & Cured', slug: 'Smoked & Cured' },
]

export default function Header() {
  const { items, itemCount, removeItem, subtotal } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    setLoggedIn(!!token)
    if (token) {
      try { setUser(JSON.parse(localStorage.getItem('auth_user') || '{}')) } catch {}
    }
  }, [])

  useEffect(() => {
    if (!userMenuOpen) return
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest('[data-user-menu]')) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [userMenuOpen])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setLoggedIn(false)
    setUser(null)
    setUserMenuOpen(false)
    window.location.href = '/'
  }

  useEffect(() => {
    if (!cartOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-cart-panel]') && !target.closest('[data-cart-toggle]')) {
        setCartOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [cartOpen])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-sky-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <span className="font-bold text-lg text-zinc-900">Navotas Fish Port</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-600 hover:text-sky-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                placeholder="Search products..."
                className="w-40 lg:w-56 pl-9 pr-3 py-1.5 text-sm border border-zinc-300 rounded-full bg-zinc-50 outline-none focus:border-zinc-500 focus:bg-white transition-colors"
              />
              <button type="submit" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </form>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                data-cart-toggle
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 text-zinc-600 hover:text-sky-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-sky-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {cartOpen && (
                <div
                  data-cart-panel
                  className="absolute right-0 top-full mt-2 w-80 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="p-3 border-b border-zinc-100">
                    <span className="text-sm font-semibold text-zinc-900">Cart ({itemCount})</span>
                  </div>
                  {items.length === 0 ? (
                    <div className="p-6 text-center text-sm text-zinc-400">Your cart is empty</div>
                  ) : (
                    <>
                      <div className="max-h-64 overflow-y-auto">
                        {items.map(item => (
                          <div key={item.id} className="flex items-center gap-3 px-3 py-2.5 border-b border-zinc-50">
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-zinc-100" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-zinc-900 truncate">{item.name}</div>
                              <div className="text-xs text-zinc-400">₱{item.price.toLocaleString()} x {item.quantity}</div>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-zinc-300 hover:text-red-500 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-zinc-100">
                        <div className="flex items-center justify-between text-sm font-semibold text-zinc-900 mb-3">
                          <span>Subtotal</span>
                          <span>₱{subtotal.toLocaleString()}</span>
                        </div>
                        <Link
                          href="/cart"
                          onClick={() => setCartOpen(false)}
                          className="block w-full text-center bg-zinc-900 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                          View Cart
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {loggedIn ? (
              <div className="relative" data-user-menu>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-sky-600 text-white text-[11px] font-bold flex items-center justify-center">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-zinc-700 max-w-[100px] truncate">
                    {user?.name || 'Account'}
                  </span>
                  <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-zinc-100">
                      <div className="text-sm font-medium text-zinc-900 truncate">{user?.name || 'User'}</div>
                      <div className="text-xs text-zinc-400 truncate">{user?.email || ''}</div>
                    </div>
                    <Link
                      href="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <rect x="2" y="2" width="20" height="20" rx="3" /><path d="M6 9h12M6 13h8M6 17h5" />
                      </svg>
                      My Orders
                    </Link>
                    <hr className="border-zinc-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-sky-600 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                Login
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-zinc-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block border-t border-zinc-100 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto py-1.5">
          {categories.map(cat => (
            <Link
              key={cat.label}
              href={cat.slug ? `/shop?category=${encodeURIComponent(cat.slug)}` : '/shop'}
              className="text-xs font-medium text-zinc-500 hover:text-sky-600 hover:bg-white px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm font-medium text-zinc-600 hover:text-sky-600"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-zinc-200" />
            {loggedIn ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  <div className="w-7 h-7 rounded-full bg-sky-600 text-white text-[11px] font-bold flex items-center justify-center">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-zinc-700">{user?.name || 'Account'}</span>
                </div>
                <Link href="/account" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-sky-600 hover:text-sky-700">
                  My Account
                </Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="block py-2 text-sm font-medium text-red-500 hover:text-red-600 w-full text-left">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-sky-600 hover:text-sky-700">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
