'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProducts } from '@/lib/api'

const WISHLIST_KEY = 'navotas_wishlist'

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_KEY)
    const ids = stored ? JSON.parse(stored) : []
    setWishlistIds(ids)
    if (ids.length > 0) {
      getProducts().then(all => { setProducts(all.filter((p: any) => ids.includes(p.id))); setLoading(false) })
    } else { setLoading(false) }
  }, [])

  const remove = (id: string) => {
    const updated = wishlistIds.filter(i => i !== id)
    setWishlistIds(updated); localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated))
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>My Wishlist</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{wishlistIds.length} saved items.</p>
        </div>
        <Link href="/account" className="text-xs" style={{ color: 'var(--text-info)' }}>← Back to Dashboard</Link>
      </div>
      {loading ? <div className="text-center py-10" style={{ color: 'var(--text-tertiary)' }}>Loading...</div>
        : wishlistIds.length === 0 ? (
          <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '40px', textAlign: 'center' }}>
            <div className="text-4xl mb-3">❤️</div>
            <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Your wishlist is empty</h3>
            <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>Save your favorite seafood items here.</p>
            <Link href="/shop" className="text-xs px-4 py-2 rounded-lg inline-block" style={{ background: 'var(--bg-info)', color: 'var(--text-info)' }}>Browse Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <img src={product.image} alt={product.name} className="w-full h-36 object-cover" />
                <div style={{ padding: '14px' }}>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{product.name}</h3>
                  <div className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>${Number(product.price).toLocaleString()}</div>
                  <div className="flex gap-2">
                    <Link href={`/shop/${product.id}`} className="flex-1 text-xs text-center py-2 rounded-lg" style={{ background: 'var(--bg-info)', color: 'var(--text-info)' }}>View Product</Link>
                    <button onClick={() => remove(product.id)} className="text-xs px-3 py-2 rounded-lg" style={{ border: '0.5px solid var(--border)', color: 'var(--text-danger)', background: 'transparent', cursor: 'pointer' }}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}
