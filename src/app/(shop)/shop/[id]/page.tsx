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
  const [showVideo, setShowVideo] = useState(false)
  const [selectedVariation, setSelectedVariation] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    getProduct(id).then(p => {
      setProduct(p)
      setSelectedVariation(null)
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

  const currentPrice = selectedVariation
    ? Number(product.price) + Number(selectedVariation.price_adjustment)
    : Number(product.price)

  const currentImage = selectedVariation?.image || product.image
  const currentStock = selectedVariation ? selectedVariation.stock : product.stock

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: currentImage,
      unit: product.unit,
      quantity: qty,
      variationId: selectedVariation?.id || null,
      variationName: selectedVariation?.name || null,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/shop" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6 inline-block">
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div>
          <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 relative">
            {product.video_url && (
              <div className="absolute top-3 left-3 z-10 flex gap-2">
                <button
                  onClick={() => setShowVideo(false)}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${!showVideo ? 'bg-zinc-900 text-white' : 'bg-white/80 text-zinc-600 hover:bg-white'}`}
                >Photo</button>
                <button
                  onClick={() => setShowVideo(true)}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${showVideo ? 'bg-zinc-900 text-white' : 'bg-white/80 text-zinc-600 hover:bg-white'}`}
                >Video</button>
              </div>
            )}
            {showVideo && product.video_url ? (
              product.video_url.includes('youtube') || product.video_url.includes('youtu.be') ? (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${product.video_url.split('v=')[1]?.split('&')[0] || product.video_url.split('/').pop()}`}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    allowFullScreen
                  />
                </div>
              ) : (
                <video controls className="w-full h-80 md:h-96 object-cover">
                  <source src={product.video_url} />
                </video>
              )
            ) : (
              <img src={currentImage} alt={product.name} className="w-full h-80 md:h-96 object-cover" />
            )}
            {selectedVariation?.image && (
              <div className="absolute bottom-3 left-3 z-10">
                <span className="text-[10px] bg-black/50 text-white px-2 py-0.5 rounded-full">{selectedVariation.name}</span>
              </div>
            )}
          </div>
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
            <span className="text-3xl font-bold text-zinc-900">${currentPrice.toLocaleString()}</span>
            {product.original_price && !selectedVariation && (
              <span className="text-lg text-zinc-400 line-through">${Number(product.original_price).toLocaleString()}</span>
            )}
            <span className="text-sm text-zinc-500">/{product.unit}</span>
          </div>

          {/* Variation selector */}
          {product.variations?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-zinc-700 mb-2">Select Option</h3>
              <div className="flex flex-wrap gap-2">
                {product.variations.map((v: any) => {
                  const isSelected = selectedVariation?.id === v.id
                  const outOfStock = v.stock <= 0
                  return (
                    <button
                      key={v.id}
                      disabled={outOfStock}
                      onClick={() => setSelectedVariation(isSelected ? null : v)}
                      style={{
                        padding: '8px 16px', borderRadius: 'var(--radius-md)', cursor: outOfStock ? 'not-allowed' : 'pointer',
                        fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-sans)',
                        border: isSelected ? '2px solid var(--text-primary)' : '1px solid var(--border)',
                        background: isSelected ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                        color: outOfStock ? 'var(--text-tertiary)' : 'var(--text-primary)',
                        opacity: outOfStock ? 0.5 : 1,
                        transition: 'all 0.12s',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                      }}
                    >
                      <span>{v.name}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        {v.price_adjustment > 0 ? `+$${Number(v.price_adjustment).toFixed(2)}` : v.price_adjustment < 0 ? `-$${Math.abs(Number(v.price_adjustment)).toFixed(2)}` : ''}
                        {outOfStock ? ' · Out of stock' : ''}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 cursor-pointer">−</button>
              <span className="px-4 py-2 text-sm font-medium text-zinc-900 border-x border-zinc-300 min-w-[40px] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 cursor-pointer">+</button>
            </div>
            <span className="text-sm text-zinc-500">({currentStock} available)</span>
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
