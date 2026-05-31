'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import CategorySection from '@/components/CategorySection'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/api'

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => { getProducts().then(setProducts) }, [])

  const bestSellers = products.filter((p: any) => p.is_best_seller)
  const onSale = products.filter((p: any) => p.is_on_sale)
  const newArrivals = products.filter((p: any) => p.is_new)

  return (
    <>
      <Hero />

      <CategorySection />

      {/* ── Marketplace Promo ── */}
      <section className="py-12 bg-gradient-to-r from-sky-600 to-sky-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Multi-Store Marketplace</h2>
              <p className="text-sky-100 text-sm mt-1">Browse our network of trusted seafood resellers</p>
            </div>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 bg-white text-sky-700 font-semibold px-6 py-2.5 rounded-full hover:bg-sky-50 transition-all text-sm shadow-lg"
            >
              Visit Marketplace
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">Best Sellers</h2>
            <p className="text-zinc-500 mt-1">Our most popular seafood picks</p>
          </div>
          <a href="/shop" className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">View All →</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(bestSellers.length ? bestSellers : products.slice(0, 4)).slice(0, 4).map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {(onSale.length > 0) && (
        <section className="py-16 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">On Sale Now</h2>
                <p className="text-zinc-500 mt-1">Fresh catches at great prices</p>
              </div>
              <a href="/shop" className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">View All →</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {onSale.slice(0, 4).map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-sky-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Fresh & Sustainable Seafood</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            We source directly from Navotas Fish Port — the Philippines&apos; largest fishing hub.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { icon: '🚢', label: 'Direct from Port' },
              { icon: '❄️', label: 'Cold Chain Kept' },
              { icon: '🐟', label: 'Sustainably Sourced' },
              { icon: '🚚', label: 'Fast Delivery' },
            ].map(item => (
              <div key={item.label}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-medium text-white/80">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">New Arrivals</h2>
            <p className="text-zinc-500 mt-1">Freshly added to our market</p>
          </div>
          <a href="/shop" className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">View All →</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(newArrivals.length ? newArrivals : products.slice(0, 4)).slice(0, 4).map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── Reseller Program Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-sky-900 to-sky-800 text-white py-16 md:py-20">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/10 backdrop-blur px-4 py-1.5 rounded-full mb-4 border border-white/20">
                Reseller Program
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
                Scale Your Seafood Reselling with{' '}
                <span className="text-sky-300">Port-Direct Deals</span>
              </h2>
              <p className="text-sky-100/80 text-base sm:text-lg max-w-xl mb-6 leading-relaxed">
                Buy in bulk at true fishport prices. Get your own branded storefront, mobile app, and marketplace listing.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <Link
                  href="/reseller-program"
                  className="inline-flex items-center gap-2 bg-white text-sky-900 font-bold px-6 py-3 rounded-full hover:bg-sky-50 transition-all shadow-xl hover:shadow-2xl text-sm"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/reseller-program#get-started"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-all text-sm"
                >
                  Get Wholesale Access
                </Link>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3 max-w-md">
              {[
                { value: '34–40%+', label: 'Gross Margins' },
                { value: '3–7 Days', label: 'Storefront Setup' },
                { value: '50+', label: 'Seafood SKUs' },
                { value: '24/7', label: 'Seller Support' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                  <div className="text-xl sm:text-2xl font-extrabold text-sky-300">{stat.value}</div>
                  <div className="text-xs text-sky-200/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
