'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function ResellerStorePage() {
  const { slug } = useParams<{ slug: string }>()
  const [reseller, setReseller] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/resellers/${slug}`)
      .then(r => r.json())
      .then(data => { setReseller(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-400">Loading...</div>
  if (!reseller) return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-400">Store not found.</div>

  return (
    <div className="min-h-screen">
      {/* Cover + Store Info */}
      <section className="relative bg-gradient-to-br from-sky-950 via-sky-900 to-sky-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 40%)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-sm text-sky-200 hover:text-white mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
            Back to Marketplace
          </Link>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl border-4 border-white/30 shadow-xl overflow-hidden bg-white flex-shrink-0">
              <img src={reseller.logo} alt={reseller.store_name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold">{reseller.store_name}</h1>
                {reseller.has_app && (
                  <span className="text-[11px] bg-white/10 backdrop-blur border border-white/20 text-sky-200 font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="4" y="2" width="16" height="20" rx="3" /><path d="M9 18h6" />
                    </svg>
                    Mobile App Available
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-sky-200/80 mb-3">
                <span>{reseller.city}</span>
                {reseller.rating && (
                  <>
                    <span>•</span>
                    <span>★ {Number(reseller.rating).toFixed(1)} Rating</span>
                  </>
                )}
                <span>•</span>
                <span>{reseller.products_count} Products</span>
              </div>
              <p className="text-sky-100/70 text-sm max-w-2xl">{reseller.description}</p>
              {reseller.specialties?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {reseller.specialties.map((s: string) => (
                    <span key={s} className="text-[10px] bg-white/10 border border-white/10 text-sky-200 px-2.5 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Store Content: Products + Mobile App */}
      <section className="py-12 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Store Catalog */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-zinc-900 mb-6">Featured Products</h2>
              <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center">
                <div className="text-4xl mb-4">🛒</div>
                <h3 className="font-semibold text-zinc-900 mb-2">Product Catalog Coming Soon</h3>
                <p className="text-sm text-zinc-500 max-w-md mx-auto">
                  {reseller.store_name} is setting up their online catalog. Contact them directly for bulk orders and pricing.
                </p>
              </div>
            </div>

            {/* Right: Mobile App Card */}
            <div>
              <h2 className="text-xl font-bold text-zinc-900 mb-6">Mobile App</h2>
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-center sticky top-24">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-sky-500 to-sky-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <rect x="4" y="2" width="16" height="20" rx="3" /><path d="M9 18h6" />
                  </svg>
                </div>
                <h3 className="font-bold text-zinc-900 mb-2">{reseller.store_name} App</h3>
                <p className="text-xs text-zinc-500 mb-4">
                  Download the official mobile app for easy ordering, real-time inventory, and push notifications.
                </p>

                {/* Phone Mockup */}
                <div className="mx-auto w-44 h-80 bg-zinc-900 rounded-3xl border-4 border-zinc-800 p-2 shadow-xl mb-4">
                  <div className="w-full h-full bg-gradient-to-b from-sky-900 to-sky-800 rounded-2xl overflow-hidden flex flex-col">
                    <div className="bg-white/10 backdrop-blur px-3 py-2 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                      </div>
                      <div className="text-[8px] text-white/70 font-medium truncate">{reseller.store_name}</div>
                    </div>
                    <div className="flex-1 p-3 space-y-2">
                      <div className="h-2 w-3/4 bg-white/10 rounded" />
                      <div className="h-2 w-1/2 bg-white/10 rounded" />
                      <div className="h-16 bg-white/5 rounded-lg flex items-center justify-center">
                        <span className="text-[18px]">🐟</span>
                      </div>
                      <div className="h-2 w-2/3 bg-white/10 rounded" />
                      <div className="h-2 w-full bg-white/10 rounded" />
                      <div className="h-2 w-4/5 bg-white/10 rounded" />
                      <div className="h-8 bg-sky-500 rounded-lg mt-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full bg-zinc-900 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download for iOS
                  </button>
                  <button className="w-full bg-zinc-100 text-zinc-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download for Android
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-100">
                  <div className="flex items-center justify-center gap-4 text-xs text-zinc-400">
                    <div className="text-center">
                      <div className="font-bold text-zinc-700 text-sm">★ {Number(reseller.rating).toFixed(1)}</div>
                      <div>Store Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-zinc-700 text-sm">{reseller.products_count}</div>
                      <div>Products</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-zinc-700 text-sm">{reseller.city}</div>
                      <div>Location</div>
                    </div>
                  </div>
                </div>

                {reseller.website && (
                  <a
                    href={reseller.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Visit Website
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
