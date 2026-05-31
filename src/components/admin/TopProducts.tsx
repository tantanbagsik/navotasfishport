'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/api'

const productEmojis: Record<string, string> = {
  'p1': '🐟', 'p2': '🐟', 'p3': '🐟', 'p4': '🐟',
  'p5': '🦐', 'p6': '🦐', 'p7': '🦀', 'p8': '🦀',
  'p9': '🦞', 'p10': '🦪', 'p11': '🐚', 'p12': '🐚',
  'p13': '🦐', 'p14': '🐟', 'p15': '🐟', 'p16': '🐟',
}

export default function TopProducts() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => { getProducts().then(setProducts) }, [])

  const top = products.filter((p: any) => p.is_best_seller).slice(0, 4)

  return (
    <div className="panel" draggable style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div className="panel-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', borderBottom: '0.5px solid var(--border)' }}>
        <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>Top products</span>
        <span className="text-xs" style={{ color: 'var(--text-info)', cursor: 'pointer' }}>All →</span>
      </div>
      <div style={{ padding: '12px 15px', paddingTop: '6px' }}>
        {top.map((product: any) => {
          const sold = Math.floor(Math.random() * 80 + 10)
          const stockColor = sold > 60 ? 'var(--text-success)' : sold > 30 ? 'var(--text-warning)' : 'var(--text-danger)'
          return (
            <div key={product.id} className="product-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', borderBottom: '0.5px solid var(--border)', fontSize: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: 'var(--radius-md)', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0, background: 'var(--bg-secondary)' }}>
                {productEmojis[product.id] || '🐟'}
              </div>
              <div>
                <div className="product-name" style={{ fontWeight: 500, fontSize: '12px', color: 'var(--text-primary)' }}>{product.name}</div>
                <div className="product-sku" style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>SKU-{product.sku}</div>
              </div>
              <div className="product-stock" style={{ marginLeft: 'auto', fontWeight: 600, color: stockColor }}>
                {sold} sold
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
