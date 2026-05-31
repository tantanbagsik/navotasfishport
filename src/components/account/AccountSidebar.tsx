'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  { section: 'My Account', items: [
    { href: '/account', label: 'Dashboard', icon: 'grid' },
    { href: '/account/orders', label: 'My Orders', icon: 'box' },
    { href: '/account/wishlist', label: 'Wishlist', icon: 'heart' },
  ]},
  { section: 'Settings', items: [
    { href: '/account/profile', label: 'My Profile', icon: 'user' },
    { href: '/account/addresses', label: 'Address Book', icon: 'map' },
  ]},
]

const icons: Record<string, React.ReactNode> = {
  grid: <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg>,
  box: <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 8h6M5 5h3M5 11h4"/></svg>,
  heart: <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 13.5l-1.5-1.3C3.5 9.5 2 8.2 2 6.5 2 4.5 3.5 3 5.5 3c1.2 0 2.4.6 3 1.5C9.1 3.6 10.3 3 11.5 3 13.5 3 15 4.5 15 6.5c0 1.7-1.5 3-4.5 5.7L8 13.5z"/></svg>,
  user: <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/></svg>,
  map: <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 4l4-2 4 2 4-2v10l-4 2-4-2-4 2V4z"/><path d="M6 2v10M10 4v10"/></svg>,
}

export default function AccountSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    router.push('/')
  }

  return (
    <aside className="w-[220px] bg-white border-r border-zinc-200 shrink-0 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto hidden sm:flex flex-col">
      <div className="py-2 flex flex-col gap-px flex-1">
        {navItems.map(section => (
          <div key={section.section}>
            <div className="px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              {section.section}
            </div>
            {section.items.map(item => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-4 py-2 text-xs cursor-pointer transition-colors relative select-none ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 font-medium'
                      : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <span className={`w-4 h-4 shrink-0 ${isActive ? 'opacity-100 text-sky-600' : 'opacity-65'}`}>
                    {icons[item.icon]}
                  </span>
                  {item.label}
                  {isActive && (
                    <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-sky-500 rounded-r" />
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-200 p-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  )
}
