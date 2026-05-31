'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, shipping, total, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Your Cart is Empty</h1>
        <p className="text-zinc-500 mb-8">Looks like you haven&apos;t added any seafood yet. Let&apos;s fix that!</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-sky-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-sky-700 transition-colors"
        >
          Browse Seafood
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Shopping Cart</h1>
          <p className="text-sm text-zinc-500 mt-1">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 border-b border-zinc-100 last:border-b-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover border border-zinc-100" />
                <div className="flex-1 min-w-0">
                  <Link href={`/shop/${item.id}`} className="font-semibold text-zinc-900 hover:text-sky-600 transition-colors">
                    {item.name}
                  </Link>
                  <div className="text-sm text-zinc-500 mt-0.5">₱{item.price.toLocaleString()} / {item.unit}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-zinc-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-zinc-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-zinc-900">₱{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80">
          <div className="bg-white border border-zinc-200 rounded-xl p-6 sticky top-24">
            <h3 className="font-semibold text-zinc-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-zinc-600">
                <span>Subtotal</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `₱${shipping.toLocaleString()}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[11px] text-zinc-400">Free shipping on orders over ₱2,000</p>
              )}
              <hr className="border-zinc-200" />
              <div className="flex items-center justify-between font-semibold text-zinc-900 text-base">
                <span>Total</span>
                <span>₱{total.toLocaleString()}</span>
              </div>
            </div>
            <Link href="/checkout" className="block w-full text-center mt-5 bg-zinc-900 text-white text-sm font-semibold py-3 rounded-lg hover:bg-zinc-800 transition-colors">
              Proceed to Checkout
            </Link>
            <Link
              href="/shop"
              className="block w-full text-center mt-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors py-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
