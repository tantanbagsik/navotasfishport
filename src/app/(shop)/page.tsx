'use client'

import { useState, useEffect } from 'react'
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
    </>
  )
}
