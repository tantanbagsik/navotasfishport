'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/api'
import ProductCard from '@/components/ProductCard'

const categories = [
  'All', 'Fresh Fish', 'Shrimp & Prawns', 'Crabs & Lobsters',
  'Shellfish', 'Value Packs', 'Smoked & Cured',
]

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('')

  useEffect(() => {
    const params: any = {}
    if (activeCategory !== 'All') params.category = activeCategory
    if (sort) params.sort = sort
    getProducts(params).then(setProducts)
  }, [activeCategory, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Our Seafood</h1>
          <p className="text-sm text-zinc-500 mt-1">Fresh from Navotas Fish Port to your table</p>
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="text-sm px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-700 outline-none focus:border-zinc-500"
        >
          <option value="">Sort by: Latest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm px-4 py-1.5 rounded-full border transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-zinc-400">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
