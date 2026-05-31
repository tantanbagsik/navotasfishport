'use client'

import { useState, useEffect } from 'react'

const statusColors: Record<string, string> = {
  delivered: '#059669',
  shipped: '#0284c7',
  processing: '#d97706',
  cancelled: '#dc2626',
  refunded: '#dc2626',
  pending: '#d97706',
}

export default function OrderDetailModal({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => { setOrder(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [orderId])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      background: 'rgba(0,0,0,0.4)', padding: '20px', overflowY: 'auto',
    }}>
      <div style={{
        background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)',
        border: '0.5px solid var(--border)', width: '100%', maxWidth: '640px',
        marginTop: '40px',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px', borderBottom: '0.5px solid var(--border)',
        }}>
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Order {orderId}
          </span>
          <button onClick={onClose} style={{
            width: '28px', height: '28px', borderRadius: '50%', border: 'none',
            background: 'var(--bg-secondary)', color: 'var(--text-secondary)',
            cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center',
            justifyContent: 'center',
          }}>✕</button>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '13px' }}>Loading...</div>
        ) : !order ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-danger)', fontSize: '13px' }}>Failed to load order</div>
        ) : (
          <div style={{ padding: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Customer</div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{order.customer_name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{order.customer_email}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Status</div>
                <span style={{
                  display: 'inline-block', fontSize: '11px', fontWeight: 600, padding: '3px 10px',
                  borderRadius: 'var(--radius-md)', background: `${statusColors[order.status] || '#d97706'}18`,
                  color: statusColors[order.status] || '#d97706',
                }}>
                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                </span>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Payment</div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{order.payment_method || '-'}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Date</div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                  {order.created_at ? new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                </div>
              </div>
              {order.tracking_number && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Tracking #</div>
                  <div style={{ fontSize: '13px', fontFamily: "'Courier New', monospace", letterSpacing: '0.05em', color: 'var(--text-primary)' }}>{order.tracking_number}</div>
                </div>
              )}
              {order.shipping_address && (
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Shipping Address</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    {typeof order.shipping_address === 'string'
                      ? JSON.parse(order.shipping_address).street || ''
                      : order.shipping_address?.street || ''
                    }
                    {typeof order.shipping_address === 'string'
                      ? `, ${JSON.parse(order.shipping_address).city || ''}`
                      : `, ${order.shipping_address?.city || ''}`
                    }
                    {typeof order.shipping_address === 'string'
                      ? `, ${JSON.parse(order.shipping_address).state || ''}`
                      : `, ${order.shipping_address?.state || ''}`
                    }
                  </div>
                </div>
              )}
            </div>

            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Items</div>
            <div style={{ border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, fontSize: '11px', color: 'var(--text-tertiary)' }}>Product</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', fontWeight: 600, fontSize: '11px', color: 'var(--text-tertiary)' }}>Qty</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', fontWeight: 600, fontSize: '11px', color: 'var(--text-tertiary)' }}>Price</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', fontWeight: 600, fontSize: '11px', color: 'var(--text-tertiary)' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {(order.items || []).map((item: any) => (
                    <tr key={item.id} style={{ borderTop: '0.5px solid var(--border)' }}>
                      <td style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.image && <img src={item.image} alt="" style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }} />}
                        <span style={{ color: 'var(--text-primary)' }}>{item.product_name}</span>
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--text-secondary)' }}>{item.quantity}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--text-secondary)' }}>₱{Number(item.price).toLocaleString()}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 500, color: 'var(--text-primary)' }}>₱{(Number(item.price) * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '14px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <span>Subtotal</span>
                <span>₱{Number(order.subtotal).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <span>Shipping</span>
                <span>₱{Number(order.shipping || 0).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', borderTop: '0.5px solid var(--border)', paddingTop: '6px', marginTop: '4px' }}>
                <span>Total</span>
                <span>₱{Number(order.total).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
