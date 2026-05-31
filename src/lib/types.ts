export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  images?: string[]
  unit: string
  weight: string
  stock: number
  sku: string
  rating: number
  reviews: number
  isOnSale?: boolean
  isBestSeller?: boolean
  isNew?: boolean
  tags?: string[]
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'refunded' | 'cancelled'
  paymentMethod: string
  shippingAddress: Address
  createdAt: string
  updatedAt: string
  notes?: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  image: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  ordersCount: number
  totalSpent: number
  joinDate: string
  status: 'active' | 'inactive' | 'vip'
  address?: Address
}

export interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface DashboardStats {
  revenueToday: number
  revenueDelta: number
  orders: number
  ordersDelta: number
  avgOrderValue: number
  aovDelta: number
  activeCustomers: number
  customersDelta: number
}

export interface Activity {
  id: string
  type: 'order' | 'stock' | 'customer' | 'refund' | 'payment'
  message: string
  time: string
  color: 'success' | 'warning' | 'info' | 'danger'
}

export interface SalesDataPoint {
  day: string
  value: number
}

export interface TrafficSource {
  name: string
  percentage: number
  color: string
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
  description: string
}
