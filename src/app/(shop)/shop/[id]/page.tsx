'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getProducts, getProduct } from '@/lib/api'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const [product, setProduct] = useState<any>(null)
  const [related, setRelated] = useState<any[]>([])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!id) return
    getProduct(id).then(p => {
      setProduct(p)
      if (p?.category) {
        getProducts({ category: p.category }).then(all => {
          setRelated(all.filter((r: any) => r.id !== p.id).slice(0, 4))
        })
      }
    })
  }, [id])

  if (!product) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-400">Loading...</div>
  }

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: Number(product.price), image: product.image, unit: product.unit, quantity: qty })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/shop" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6 inline-block">
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50">
          <img src={product.image} alt={product.name} className="w-full h-80 md:h-96 object-cover" />
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs bg-zinc-100 text-zinc-600 px-2.5 py-0.5 rounded-full">{product.category}</span>
            {product.is_on_sale && <span className="text-xs bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full font-semibold">Sale</span>}
            {product.is_new && <span className="text-xs bg-sky-100 text-sky-700 px-2.5 py-0.5 rounded-full font-semibold">New</span>}
            {product.is_best_seller && <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full font-semibold">Best Seller</span>}
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="text-amber-500 text-sm">
              {'★'.repeat(Math.round(Number(product.rating) || 0))}
              {'☆'.repeat(5 - Math.round(Number(product.rating) || 0))}
            </div>
            <span className="text-sm text-zinc-500">({product.reviews} reviews)</span>
          </div>

          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-zinc-900">${Number(product.price).toLocaleString()}</span>
            {product.original_price && (
              <span className="text-lg text-zinc-400 line-through">${Number(product.original_price).toLocaleString()}</span>
            )}
            <span className="text-sm text-zinc-500">/{product.unit}</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 cursor-pointer">−</button>
              <span className="px-4 py-2 text-sm font-medium text-zinc-900 border-x border-zinc-300 min-w-[40px] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 cursor-pointer">+</button>
            </div>
            <span className="text-sm text-zinc-500">({product.stock} available)</span>
          </div>

          <button
            onClick={handleAdd}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              added ? 'bg-green-600 text-white' : 'bg-zinc-900 text-white hover:bg-zinc-800'
            }`}
          >
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-zinc-50 rounded-lg p-3">
              <span className="text-zinc-400">SKU</span>
              <div className="font-medium text-zinc-900">{product.sku}</div>
            </div>
            <div className="bg-zinc-50 rounded-lg p-3">
              <span className="text-zinc-400">Weight</span>
              <div className="font-medium text-zinc-900">{product.weight}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Variations */}
      {product.variations?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Available Variations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {product.variations.map((v: any) => (
              <div key={v.id} className="border border-zinc-200 rounded-xl p-4 bg-white">
                <div className="font-medium text-zinc-900">{v.name}</div>
                <div className="text-sm text-zinc-500 mt-1">
                  {v.price_adjustment > 0 ? `+$${Number(v.price_adjustment).toFixed(2)}` : v.price_adjustment < 0 ? `-$${Math.abs(Number(v.price_adjustment)).toFixed(2)}` : 'Standard price'}
                </div>
                <div className="text-xs text-zinc-400 mt-1">{v.stock > 0 ? `${v.stock} in stock` : 'Out of stock'}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add-ons */}
      {product.addOns?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Available Add-ons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {product.addOns.map((a: any) => (
              <div key={a.id} className="border border-zinc-200 rounded-xl p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-zinc-900">{a.name}</div>
                    <div className="text-sm text-zinc-500">+${Number(a.price).toFixed(2)}</div>
                  </div>
                  {a.required && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">Required</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
