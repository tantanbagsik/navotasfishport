'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { use } from 'react'

const statusColors: Record<string, string> = {
  delivered: '#059669', shipped: '#0284c7', processing: '#d97706',
  cancelled: '#dc2626', refunded: '#dc2626', pending: '#d97706',
}

function Receipt({ order, printRef }: { order: any; printRef: React.RefObject<HTMLDivElement | null> }) {
  const shipAddr = typeof order.shipping_address === 'string'
    ? JSON.parse(order.shipping_address || '{}')
    : (order.shipping_address || {})

  return (
    <div ref={printRef} id="receipt" className="bg-white rounded-xl border border-zinc-200 overflow-hidden" style={{ fontFamily: "'Courier New', monospace" }}>
      <div className="p-6 sm:p-8">
        <div className="text-center mb-6 border-b border-dashed border-zinc-300 pb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-sky-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-zinc-900">NAVOTAS FISH PORT</h1>
          <p className="text-[11px] text-zinc-500">M. Naval St., Navotas City, Philippines</p>
          <p className="text-[11px] text-zinc-500">Tel: (02) 8282-7777 | Email: info@navotasfishport.com</p>
          <div className="mt-3 inline-block border border-dashed border-zinc-300 rounded px-4 py-1.5">
            <p className="text-[10px] uppercase tracking-wider text-zinc-400">Receipt</p>
            <p className="text-sm font-bold text-zinc-900">#{order.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs mb-4">
          <div>
            <span className="text-zinc-400">Date:</span>
            <span className="text-zinc-800 ml-1">{new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div>
            <span className="text-zinc-400">Time:</span>
            <span className="text-zinc-800 ml-1">{new Date(order.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="col-span-2">
            <span className="text-zinc-400">Customer:</span>
            <span className="text-zinc-800 ml-1">{order.customer_name}</span>
          </div>
          <div className="col-span-2">
            <span className="text-zinc-400">Email:</span>
            <span className="text-zinc-800 ml-1">{order.customer_email}</span>
          </div>
          {shipAddr.street && (
            <div className="col-span-2">
              <span className="text-zinc-400">Ship to:</span>
              <span className="text-zinc-800 ml-1">{shipAddr.street}, {shipAddr.city}{shipAddr.state ? `, ${shipAddr.state}` : ''}</span>
            </div>
          )}
          {shipAddr.phone && (
            <div className="col-span-2">
              <span className="text-zinc-400">Phone:</span>
              <span className="text-zinc-800 ml-1">{shipAddr.phone}</span>
            </div>
          )}
        </div>

        <div className="mb-3 border-t border-dashed border-zinc-300 pt-3">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-1.5 pb-1.5 border-b border-zinc-100">
            <span className="flex-1">Item</span>
            <span className="w-12 text-center">Qty</span>
            <span className="w-20 text-right">Price</span>
            <span className="w-20 text-right">Total</span>
          </div>
          {order.items?.map((item: any, i: number) => (
            <div key={item.id || i} className="flex items-center text-xs py-1.5 border-b border-zinc-50">
              <span className="flex-1 text-zinc-800 truncate">{item.product_name}</span>
              <span className="w-12 text-center text-zinc-600">{item.quantity}</span>
              <span className="w-20 text-right text-zinc-600">₱{Number(item.price).toLocaleString()}</span>
              <span className="w-20 text-right font-medium text-zinc-800">₱{(Number(item.price) * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-zinc-300 pt-2 space-y-1">
          <div className="flex justify-between text-xs text-zinc-600">
            <span>Subtotal</span>
            <span>₱{Number(order.subtotal).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs text-zinc-600">
            <span>Shipping</span>
            <span>{Number(order.shipping || 0) === 0 ? 'FREE' : `₱${Number(order.shipping).toLocaleString()}`}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-zinc-900 border-t border-dashed border-zinc-300 pt-1.5 mt-1.5">
            <span>TOTAL</span>
            <span>₱{Number(order.total).toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="border border-zinc-200 rounded p-2.5">
            <span className="text-zinc-400 text-[10px] uppercase tracking-wider">Payment</span>
            <p className="font-medium text-zinc-800 mt-0.5">{order.payment_method || 'Cash on Delivery'}</p>
          </div>
          <div className="border border-zinc-200 rounded p-2.5">
            <span className="text-zinc-400 text-[10px] uppercase tracking-wider">Status</span>
            <p className="font-medium mt-0.5" style={{ color: statusColors[order.status] || '#d97706' }}>
              {(order.status || 'pending').charAt(0).toUpperCase() + (order.status || 'pending').slice(1)}
            </p>
          </div>
        </div>

        {order.tracking_number && (
          <div className="mt-4 text-center border-t border-dashed border-zinc-300 pt-4">
            <p className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1">Tracking Number</p>
            <p className="text-lg font-bold tracking-widest text-zinc-900">{order.tracking_number}</p>
            <p className="text-[10px] text-zinc-400 mt-1">Track your order at navotasfishport.com/track</p>
          </div>
        )}

        <div className="mt-4 text-center border-t border-dashed border-zinc-300 pt-4">
          <p className="text-[10px] text-zinc-400">Thank you for your order!</p>
          <p className="text-[10px] text-zinc-400">Fresh seafood from Navotas Fish Port to your table.</p>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const printRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => { setOrder(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow || !order) return
    printWindow.document.write(`
      <html>
      <head><title>Receipt #${order.id}</title>
      <style>
        body { margin: 0; padding: 20px; font-family: 'Courier New', monospace; font-size: 12px; color: #18181b; }
        @page { margin: 10mm; }
        table { width: 100%; border-collapse: collapse; }
        td, th { padding: 4px 8px; text-align: left; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .border-dashed { border-top: 1px dashed #a1a1aa; }
        .border-bottom { border-bottom: 1px dashed #a1a1aa; }
        .text-zinc-400 { color: #a1a1aa; }
        .text-zinc-600 { color: #52525b; }
        .text-zinc-800 { color: #27272a; }
        .text-zinc-900 { color: #18181b; }
        .font-bold { font-weight: bold; }
        .text-sm { font-size: 14px; }
        .text-xs { font-size: 11px; }
        .text-lg { font-size: 18px; }
        .text-\\[10px\\] { font-size: 10px; }
        .text-\\[11px\\] { font-size: 11px; }
        .tracking-wider { letter-spacing: 0.05em; }
        .tracking-widest { letter-spacing: 0.1em; }
        .uppercase { text-transform: uppercase; }
        .mt-1 { margin-top: 4px; }
        .mt-2 { margin-top: 8px; }
        .mt-3 { margin-top: 12px; }
        .mt-4 { margin-top: 16px; }
        .mb-1 { margin-bottom: 4px; }
        .mb-2 { margin-bottom: 8px; }
        .mb-3 { margin-bottom: 12px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-6 { margin-bottom: 24px; }
        .pt-1 { padding-top: 4px; }
        .pt-2 { padding-top: 8px; }
        .pt-3 { padding-top: 12px; }
        .pt-4 { padding-top: 16px; }
        .pb-1 { padding-bottom: 4px; }
        .pb-2 { padding-bottom: 8px; }
        .pb-3 { padding-bottom: 12px; }
        .pb-4 { padding-bottom: 16px; }
        .p-2 { padding: 8px; }
        .p-3 { padding: 12px; }
        .p-4 { padding: 16px; }
        .px-2 { padding-left: 8px; padding-right: 8px; }
        .px-3 { padding-left: 12px; padding-right: 12px; }
        .py-1 { padding-top: 4px; padding-bottom: 4px; }
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: 1fr 1fr; }
        .gap-2 { gap: 8px; }
        .gap-3 { gap: 12px; }
        .inline-block { display: inline-block; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .w-12 { width: 48px; }
        .h-12 { height: 48px; }
        .rounded { border-radius: 4px; }
        .rounded-full { border-radius: 9999px; }
        .border { border: 1px solid #e4e4e7; }
        .border-zinc-200 { border-color: #e4e4e7; }
        .border-zinc-300 { border-color: #d4d4d8; }
        @media print { .no-print { display: none; } }
      </style>
      </head>
      <body>
    `)
    printWindow.document.write(document.getElementById('receipt')?.innerHTML || '')
    printWindow.document.write('</body></html>')
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => printWindow.print(), 300)
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-zinc-400 text-sm">Loading order details...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-xl font-bold text-zinc-900 mb-2">Order Not Found</h1>
        <p className="text-zinc-500 mb-6">We couldn&apos;t find this order.</p>
        <Link href="/shop" className="inline-flex items-center gap-2 bg-sky-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-sky-700 transition-colors">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-zinc-900 mb-1">Order Confirmed!</h1>
        <p className="text-sm text-zinc-500">Thank you for your order. Your receipt is below.</p>
      </div>

      <Receipt order={order} printRef={printRef} />

      <div className="flex items-center justify-center gap-3 mt-6 no-print">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
          </svg>
          Print Receipt
        </button>
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 px-5 py-2.5 transition-colors">
          Continue Shopping →
        </Link>
      </div>
    </div>
  )
}
