'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import AuthGuard from '@/components/AuthGuard'

const paymentMethods = [
  { id: 'cod', label: 'Cash on Delivery', description: 'Pay when you receive your order' },
  { id: 'gcash', label: 'GCash', description: 'Pay via GCash mobile wallet' },
  { id: 'card', label: 'Credit/Debit Card', description: 'Visa, Mastercard, or other cards' },
]

function CheckoutContent() {
  const router = useRouter()
  const { items, subtotal, shipping, total, clearCart } = useCart()

  const [user, setUser] = useState<any>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    notes: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const raw = localStorage.getItem('auth_user')
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setUser(parsed)
        setForm(prev => ({ ...prev, name: parsed.name || '', email: parsed.email || '' }))
      } catch {}
    }
  }, [])

  const update = (key: string, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    setPlacing(true)
    setError('')

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: user?.id || '',
          customerName: form.name,
          customerEmail: form.email,
          subtotal,
          shipping,
          total,
          paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod,
          status: 'pending',
          shippingAddress: {
            street: form.street,
            city: form.city,
            state: form.state,
            zip: form.zip,
            phone: form.phone,
          },
          notes: form.notes,
          items: items.map(i => ({
            id: i.id,
            name: i.name,
            quantity: i.quantity,
            price: i.price,
            image: i.image,
          })),
        }),
      })

      if (!res.ok) {
        let msg = 'Failed to place order'
        try { const data = await res.json(); msg = data.error || msg } catch {}
        throw new Error(msg)
      }

      const order = await res.json()
      clearCart()
      router.push(`/order-confirmation/${order.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setPlacing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Your Cart is Empty</h1>
        <p className="text-zinc-500 mb-8">Add some items to your cart before checking out.</p>
        <Link href="/shop" className="inline-flex items-center gap-2 bg-sky-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-sky-700 transition-colors">
          Browse Seafood
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Checkout</h1>
        <p className="text-sm text-zinc-500 mt-1">Complete your order</p>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="bg-white border border-zinc-200 rounded-xl p-6">
              <h2 className="font-semibold text-zinc-900 mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Full Name *</label>
                  <input required value={form.name} onChange={e => update('name', e.target.value)} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Email *</label>
                  <input required type="email" value={form.email} onChange={e => update('email', e.target.value)} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Phone *</label>
                  <input required value={form.phone} onChange={e => update('phone', e.target.value)} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400 transition-colors" placeholder="+63 912 345 6789" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Street Address *</label>
                  <input required value={form.street} onChange={e => update('street', e.target.value)} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">City *</label>
                  <input required value={form.city} onChange={e => update('city', e.target.value)} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">State / Province</label>
                  <input value={form.state} onChange={e => update('state', e.target.value)} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">ZIP / Postal Code</label>
                  <input value={form.zip} onChange={e => update('zip', e.target.value)} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400 transition-colors" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-6">
              <h2 className="font-semibold text-zinc-900 mb-4">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map(m => (
                  <label key={m.id} className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === m.id ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'}`}>
                    <input type="radio" name="payment" value={m.id} checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} className="mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-zinc-900">{m.label}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{m.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-6">
              <h2 className="font-semibold text-zinc-900 mb-4">Order Notes</h2>
              <textarea
                value={form.notes}
                onChange={e => update('notes', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400 transition-colors resize-none"
                rows={3}
                placeholder="Special instructions for delivery..."
              />
            </div>
          </div>

          <div className="w-full lg:w-96">
            <div className="bg-white border border-zinc-200 rounded-xl p-6 sticky top-24">
              <h3 className="font-semibold text-zinc-900 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-zinc-100" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-zinc-900 truncate">{item.name}</div>
                      <div className="text-xs text-zinc-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-sm font-medium text-zinc-900">₱{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <hr className="border-zinc-200 mb-3" />

              <div className="space-y-2 text-sm">
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

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">{error}</div>
              )}

              <button
                type="submit"
                disabled={placing}
                className="w-full mt-5 bg-zinc-900 text-white text-sm font-semibold py-3 rounded-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {placing ? 'Placing Order...' : `Place Order — ₱${total.toLocaleString()}`}
              </button>

              <p className="text-[11px] text-zinc-400 text-center mt-3">
                By placing this order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <AuthGuard>
      <CheckoutContent />
    </AuthGuard>
  )
}
