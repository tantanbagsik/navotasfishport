'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  unit: string
  variationId?: string | null
  variationName?: string | null
}

function itemKey(item: CartItem) {
  return item.variationId ? `${item.id}__${item.variationId}` : item.id
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, qty: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  shipping: number
  total: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems(prev => {
      const newItem: CartItem = { ...item, quantity: item.quantity || 1 }
      const key = itemKey(newItem)
      const existingIndex = prev.findIndex(i => itemKey(i) === key)
      if (existingIndex >= 0) {
        return prev.map((i, idx) =>
          idx === existingIndex ? { ...i, quantity: i.quantity + newItem.quantity } : i
        )
      }
      return [...prev, newItem]
    })
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems(prev => prev.filter(i => itemKey(i) !== key))
  }, [])

  const updateQuantity = useCallback((key: string, qty: number) => {
    if (qty <= 0) {
      removeItem(key)
      return
    }
    setItems(prev => prev.map(i => (itemKey(i) === key ? { ...i, quantity: qty } : i)))
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shipping = subtotal >= 2000 ? 0 : 150
  const total = subtotal + shipping

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, shipping, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
