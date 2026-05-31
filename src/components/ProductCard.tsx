'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    original_price?: number
    image: string
    unit: string
    rating: number
    reviews: number
    is_on_sale?: boolean
    is_best_seller?: boolean
    is_new?: boolean
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { id, name, description, price, original_price, image, unit, rating, reviews, is_on_sale, is_best_seller, is_new } = product

  return (
    <div className="group bg-white rounded-xl border border-zinc-200 overflow-hidden hover:shadow-lg hover:border-sky-200 transition-all duration-300">
      <Link href={`/shop/${id}`} className="block relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {is_on_sale && (
            <span className="text-[11px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">SALE</span>
          )}
          {is_best_seller && (
            <span className="text-[11px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">BEST SELLER</span>
          )}
          {is_new && (
            <span className="text-[11px] font-bold bg-sky-500 text-white px-2 py-0.5 rounded-full">NEW</span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-zinc-200'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[11px] text-zinc-400 ml-1">({reviews})</span>
        </div>

        <Link href={`/shop/${id}`}>
          <h3 className="font-semibold text-zinc-900 text-sm leading-tight mb-1 hover:text-sky-600 transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-xs text-zinc-500 line-clamp-2 mb-3">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-zinc-900">₱{price.toLocaleString()}</span>
            {original_price && (
              <span className="text-xs text-zinc-400 line-through">₱{original_price.toLocaleString()}</span>
            )}
            <span className="text-[11px] text-zinc-400">/{unit}</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              addItem({ id, name, price, image, unit })
            }}
            className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
