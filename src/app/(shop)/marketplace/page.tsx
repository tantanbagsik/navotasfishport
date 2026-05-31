'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MarketplacePage() {
  const [resellers, setResellers] = useState<any[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/resellers').then(r => r.json()).then(setResellers)
  }, [])

  const filtered = resellers.filter(r =>
    r.store_name?.toLowerCase().includes(search.toLowerCase()) ||
    r.specialties?.some((s: string) => s.toLowerCase().includes(search.toLowerCase())) ||
    r.city?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-sky-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/10 backdrop-blur px-4 py-1.5 rounded-full mb-4 border border-white/20">
            Multi-Store Marketplace
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Explore Our <span className="text-sky-300">Reseller Stores</span>
          </h1>
          <p className="text-sky-100/80 text-lg max-w-2xl mx-auto mb-8">
            Browse trusted seafood resellers on our platform. Each store has its own catalog, pricing, and mobile app.
          </p>
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by store name, specialty, or location..."
              className="w-full pl-10 pr-4 py-3 rounded-full text-sm text-zinc-900 bg-white outline-none focus:ring-2 focus:ring-sky-400"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Reseller Grid */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              {search ? 'No stores match your search.' : 'No resellers listed yet.'}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(r => (
                <Link
                  key={r.id}
                  href={`/marketplace/${r.slug}`}
                  className="group bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-32 bg-gradient-to-br from-sky-100 to-sky-50 relative overflow-hidden">
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/30" />
                    <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/20" />
                  </div>
                  <div className="px-6 pb-6 -mt-10 relative">
                    <div className="w-16 h-16 rounded-xl border-4 border-white bg-white shadow-md overflow-hidden mb-3">
                      <img src={r.logo} alt={r.store_name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-zinc-900 group-hover:text-sky-700 transition-colors">{r.store_name}</h3>
                      {r.has_app && (
                        <span className="text-[10px] bg-sky-100 text-sky-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <rect x="4" y="2" width="16" height="20" rx="3" /><path d="M9 18h6" />
                          </svg>
                          App
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mb-1">{r.city}</p>
                    <p className="text-sm text-zinc-600 line-clamp-2 mb-3">{r.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {r.rating && (
                        <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                          ★ {Number(r.rating).toFixed(1)}
                        </span>
                      )}
                      <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">
                        {r.products_count} products
                      </span>
                    </div>
                    {r.specialties?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {r.specialties.slice(0, 3).map((s: string) => (
                          <span key={s} className="text-[10px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                        {r.specialties.length > 3 && (
                          <span className="text-[10px] text-zinc-400">+{r.specialties.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA to join */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">Want to List Your Store?</h2>
          <p className="text-zinc-500 mb-6">Join our reseller program and get your own storefront, mobile app, and marketplace exposure.</p>
          <Link href="/reseller-program" className="inline-flex items-center gap-2 bg-sky-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-sky-700 transition-all shadow-lg">
            Become a Reseller
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
