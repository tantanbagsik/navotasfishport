import { Product, Order, Customer, DashboardStats, Activity, SalesDataPoint, TrafficSource, Category } from './types'

export const categories: Category[] = [
  { id: 'c1', name: 'Fresh Fish', slug: 'fresh-fish', image: '/images/fresh-fish.jpg', productCount: 12, description: 'Whole and filleted fish caught daily' },
  { id: 'c2', name: 'Shrimp & Prawns', slug: 'shrimp-prawns', image: '/images/shrimp.jpg', productCount: 8, description: 'Gulf shrimp, tiger prawns, and more' },
  { id: 'c3', name: 'Crabs & Lobsters', slug: 'crabs-lobsters', image: '/images/crab.jpg', productCount: 6, description: 'Live and fresh crabs and lobsters' },
  { id: 'c4', name: 'Shellfish', slug: 'shellfish', image: '/images/shellfish.jpg', productCount: 7, description: 'Oysters, clams, mussels, scallops' },
  { id: 'c5', name: 'Value Packs', slug: 'value-packs', image: '/images/value-packs.jpg', productCount: 5, description: 'Curated seafood boxes and bundles' },
  { id: 'c6', name: 'Smoked & Cured', slug: 'smoked-cured', image: '/images/smoked.jpg', productCount: 4, description: 'Premium smoked and cured seafood' },
]

export const products: Product[] = [
  { id: 'p1', name: 'Fresh Bangus (Milkfish)', slug: 'fresh-bangus-milkfish', description: 'Premium fresh bangus from Navotas Fish Port, cleaned and ready to cook. Rich in omega-3 and perfect for frying, grilling, or stewing.', price: 180, category: 'Fresh Fish', image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&h=300&fit=crop', unit: 'kg', weight: '1 kg', stock: 50, sku: 'FF-001', rating: 4.8, reviews: 124, isBestSeller: true, isNew: false },
  { id: 'p2', name: 'Tilapia (Whole)', slug: 'tilapia-whole', description: 'Farm-fresh whole tilapia, perfect for pan-frying or steaming. Sourced from local sustainable farms.', price: 140, originalPrice: 160, category: 'Fresh Fish', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop', unit: 'kg', weight: '1 kg', stock: 80, sku: 'FF-002', rating: 4.6, reviews: 98, isOnSale: true, isBestSeller: false },
  { id: 'p3', name: 'Tuna Belly (Fresh)', slug: 'tuna-belly-fresh', description: 'Premium fresh tuna belly, perfect for sashimi and grilling. Deep red color with rich marbling.', price: 450, category: 'Fresh Fish', image: 'https://images.unsplash.com/photo-1564049489317-60d5ff2f6e10?w=400&h=300&fit=crop', unit: 'kg', weight: '500 g', stock: 25, sku: 'FF-003', rating: 4.9, reviews: 67, isBestSeller: true, isNew: false },
  { id: 'p4', name: 'Yellowfin Tuna Steaks', slug: 'yellowfin-tuna-steaks', description: 'Thick-cut yellowfin tuna steaks, sushi-grade quality. Perfect for grilling or searing.', price: 380, category: 'Fresh Fish', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c07d2e1e?w=400&h=300&fit=crop', unit: 'kg', weight: '500 g', stock: 30, sku: 'FF-004', rating: 4.7, reviews: 45, isBestSeller: false, isNew: true },
  { id: 'p5', name: 'Giant Tiger Prawns', slug: 'giant-tiger-prawns', description: 'Jumbo tiger prawns, perfect for grilling or butter garlic preparation. Peeled and deveined.', price: 650, originalPrice: 750, category: 'Shrimp & Prawns', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop', unit: 'kg', weight: '1 kg', stock: 20, sku: 'SP-001', rating: 4.8, reviews: 89, isOnSale: true, isBestSeller: true },
  { id: 'p6', name: 'Sugpo (Prawns) Large', slug: 'sugpo-prawns-large', description: 'Large fresh sugpo, ideal for sinigang, grilled dishes, or sweet sour preparations.', price: 520, category: 'Shrimp & Prawns', image: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=300&fit=crop', unit: 'kg', weight: '1 kg', stock: 35, sku: 'SP-002', rating: 4.5, reviews: 56, isBestSeller: false, isNew: false },
  { id: 'p7', name: 'Alaskan King Crab Legs', slug: 'alaskan-king-crab-legs', description: 'Premium Alaskan king crab legs, pre-cooked and frozen at sea. Ready to steam and serve.', price: 1800, category: 'Crabs & Lobsters', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=300&fit=crop', unit: 'kg', weight: '1 kg', stock: 10, sku: 'CL-001', rating: 4.9, reviews: 34, isBestSeller: true, isNew: false },
  { id: 'p8', name: 'Mud Crab (Alimango)', slug: 'mud-crab-alimango', description: 'Live fresh mud crabs, known for sweet and tender meat. Perfect for chili crab or steamed.', price: 750, category: 'Crabs & Lobsters', image: 'https://images.unsplash.com/photo-1590633841860-2f4b1e0fb39a?w=400&h=300&fit=crop', unit: 'kg', weight: '1 kg', stock: 15, sku: 'CL-002', rating: 4.7, reviews: 72, isBestSeller: false, isNew: false },
  { id: 'p9', name: 'Maine Lobster (Live)', slug: 'maine-lobster-live', description: 'Live Maine lobsters shipped directly to your door. Best for boiling, steaming, or grilling.', price: 1500, category: 'Crabs & Lobsters', image: 'https://images.unsplash.com/photo-1563120094-5f6b8c3cac2c?w=400&h=300&fit=crop', unit: 'kg', weight: '1 kg', stock: 8, sku: 'CL-003', rating: 4.8, reviews: 41, isBestSeller: false, isNew: true },
  { id: 'p10', name: 'Fresh Oysters (12pcs)', slug: 'fresh-oysters', description: 'Fresh shucked oysters on the half shell. Served with lemon wedges and mignonette sauce.', price: 280, category: 'Shellfish', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop', unit: 'dozen', weight: '12 pcs', stock: 40, sku: 'SF-001', rating: 4.6, reviews: 88, isBestSeller: false, isNew: false },
  { id: 'p11', name: 'Sea Scallops (Large)', slug: 'sea-scallops-large', description: 'Large diver sea scallops, dry-packed and chemical-free. Golden sear guaranteed.', price: 890, category: 'Shellfish', image: 'https://images.unsplash.com/photo-1599733589046-10c7f0d2d48e?w=400&h=300&fit=crop', unit: 'kg', weight: '500 g', stock: 18, sku: 'SF-002', rating: 4.7, reviews: 53, isBestSeller: true, isNew: false },
  { id: 'p12', name: 'Halaan (Clams)', slug: 'halaan-clams', description: 'Fresh clean halaan, perfect for soups, pasta, or steaming with garlic and white wine.', price: 120, category: 'Shellfish', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop', unit: 'kg', weight: '1 kg', stock: 60, sku: 'SF-003', rating: 4.4, reviews: 112, isBestSeller: false, isNew: false },
  { id: 'p13', name: 'Seafood Platter for 4', slug: 'seafood-platter-4', description: 'Curated platter with prawns, fish fillets, squid, mussels, and clams. Perfect for gatherings.', price: 1200, originalPrice: 1500, category: 'Value Packs', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop', unit: 'pack', weight: '2.5 kg', stock: 15, sku: 'VP-001', rating: 4.8, reviews: 29, isOnSale: true, isBestSeller: true, isNew: false },
  { id: 'p14', name: 'Grill Pack (2kg)', slug: 'grill-pack-2kg', description: 'Assorted seafood perfect for BBQ: tuna steaks, prawns, squid, and bangus. All pre-marinated.', price: 950, category: 'Value Packs', image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop', unit: 'pack', weight: '2 kg', stock: 12, sku: 'VP-002', rating: 4.6, reviews: 37, isBestSeller: false, isNew: false },
  { id: 'p15', name: 'Smoked Salmon (Premium)', slug: 'smoked-salmon-premium', description: 'Norwegian-style cold smoked salmon, thinly sliced. Ready to serve on bagels or salads.', price: 680, category: 'Smoked & Cured', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c07d2e1e?w=400&h=300&fit=crop', unit: 'kg', weight: '200 g', stock: 22, sku: 'SC-001', rating: 4.7, reviews: 63, isBestSeller: false, isNew: false },
  { id: 'p16', name: 'Dried Fish (Daing) Assorted', slug: 'dried-fish-daing', description: 'Traditional sun-dried fish selection. Includes danggit, tuyo, and dilis. Filipino breakfast favorite.', price: 180, category: 'Smoked & Cured', image: 'https://images.unsplash.com/photo-1564049489317-60d5ff2f6e10?w=400&h=300&fit=crop', unit: 'kg', weight: '500 g', stock: 45, sku: 'SC-002', rating: 4.3, reviews: 156, isBestSeller: false, isNew: true },
]

export const orders: Order[] = [
  { id: 'ORD-3841', customerId: 'cu1', customerName: 'Maria Santos', customerEmail: 'maria@example.com', items: [{ productId: 'p1', productName: 'Fresh Bangus (Milkfish)', quantity: 2, price: 180, image: '' }, { productId: 'p5', productName: 'Giant Tiger Prawns', quantity: 1, price: 650, image: '' }], total: 1010, subtotal: 1010, shipping: 0, tax: 0, status: 'delivered', paymentMethod: 'GCash', shippingAddress: { street: '123 Rizal St', city: 'Navotas', state: 'Metro Manila', zip: '1409', country: 'Philippines' }, createdAt: '2026-03-18T09:30:00Z', updatedAt: '2026-03-18T15:30:00Z' },
  { id: 'ORD-3840', customerId: 'cu2', customerName: 'James Okonkwo', customerEmail: 'james@example.com', items: [{ productId: 'p3', productName: 'Tuna Belly (Fresh)', quantity: 1, price: 450, image: '' }], total: 450, subtotal: 450, shipping: 50, tax: 0, status: 'shipped', paymentMethod: 'Credit Card', shippingAddress: { street: '45A Marine Drive', city: 'Lagos', state: 'Lagos', zip: '100001', country: 'Nigeria' }, createdAt: '2026-03-18T08:15:00Z', updatedAt: '2026-03-18T14:00:00Z' },
  { id: 'ORD-3839', customerId: 'cu3', customerName: 'Priya Menon', customerEmail: 'priya@example.com', items: [{ productId: 'p7', productName: 'Alaskan King Crab Legs', quantity: 1, price: 1800, image: '' }, { productId: 'p11', productName: 'Sea Scallops (Large)', quantity: 2, price: 890, image: '' }, { productId: 'p13', productName: 'Seafood Platter for 4', quantity: 1, price: 1200, image: '' }], total: 4780, subtotal: 4780, shipping: 0, tax: 0, status: 'processing', paymentMethod: 'Bank Transfer', shippingAddress: { street: '77 Temple Road', city: 'Chennai', state: 'Tamil Nadu', zip: '600001', country: 'India' }, createdAt: '2026-03-17T16:45:00Z', updatedAt: '2026-03-18T10:20:00Z' },
  { id: 'ORD-3838', customerId: 'cu4', customerName: 'Carlos Reyes', customerEmail: 'carlos@example.com', items: [{ productId: 'p2', productName: 'Tilapia (Whole)', quantity: 3, price: 140, image: '' }, { productId: 'p12', productName: 'Halaan (Clams)', quantity: 1, price: 120, image: '' }], total: 540, subtotal: 540, shipping: 0, tax: 0, status: 'cancelled', paymentMethod: 'PayPal', shippingAddress: { street: '22 Coastal Ave', city: 'Miami', state: 'FL', zip: '33101', country: 'USA' }, createdAt: '2026-03-17T12:00:00Z', updatedAt: '2026-03-18T09:00:00Z' },
  { id: 'ORD-3837', customerId: 'cu5', customerName: 'Aiko Tanaka', customerEmail: 'aiko@example.com', items: [{ productId: 'p4', productName: 'Yellowfin Tuna Steaks', quantity: 2, price: 380, image: '' }, { productId: 'p10', productName: 'Fresh Oysters (12pcs)', quantity: 1, price: 280, image: '' }, { productId: 'p15', productName: 'Smoked Salmon (Premium)', quantity: 1, price: 680, image: '' }], total: 1720, subtotal: 1720, shipping: 0, tax: 0, status: 'delivered', paymentMethod: 'Credit Card', shippingAddress: { street: '5-3-1 Ginza', city: 'Tokyo', state: 'Tokyo', zip: '104-0061', country: 'Japan' }, createdAt: '2026-03-17T10:00:00Z', updatedAt: '2026-03-18T12:00:00Z' },
]

export const customers: Customer[] = [
  { id: 'cu1', name: 'Maria Santos', email: 'maria@example.com', phone: '+639123456789', ordersCount: 15, totalSpent: 24500, joinDate: '2025-06-15', status: 'vip' },
  { id: 'cu2', name: 'James Okonkwo', email: 'james@example.com', phone: '+2348012345678', ordersCount: 3, totalSpent: 1850, joinDate: '2026-01-20', status: 'active' },
  { id: 'cu3', name: 'Priya Menon', email: 'priya@example.com', phone: '+919876543210', ordersCount: 8, totalSpent: 12400, joinDate: '2025-11-05', status: 'active' },
  { id: 'cu4', name: 'Carlos Reyes', email: 'carlos@example.com', phone: '+13055551234', ordersCount: 1, totalSpent: 540, joinDate: '2026-03-01', status: 'inactive' },
  { id: 'cu5', name: 'Aiko Tanaka', email: 'aiko@example.com', phone: '+819012345678', ordersCount: 6, totalSpent: 8900, joinDate: '2025-09-12', status: 'vip' },
  { id: 'cu6', name: 'Lena Müller', email: 'lena@example.com', phone: '+491512345678', ordersCount: 1, totalSpent: 320, joinDate: '2026-03-18', status: 'active' },
  { id: 'cu7', name: 'Raj Patel', email: 'raj@example.com', phone: '+254712345678', ordersCount: 4, totalSpent: 5600, joinDate: '2025-08-22', status: 'active' },
]

export const dashboardStats: DashboardStats = {
  revenueToday: 14280,
  revenueDelta: 8.4,
  orders: 348,
  ordersDelta: 12,
  avgOrderValue: 41.05,
  aovDelta: -2.1,
  activeCustomers: 2104,
  customersDelta: 5.7,
}

export const activities: Activity[] = [
  { id: 'a1', type: 'order', message: 'Order <strong>#3841</strong> delivered to Maria Santos', time: '2 min ago', color: 'success' },
  { id: 'a2', type: 'stock', message: 'Low stock: <strong>Classic Tee — S</strong> (2 left)', time: '18 min ago', color: 'warning' },
  { id: 'a3', type: 'customer', message: 'New customer: <strong>Lena Müller</strong>', time: '32 min ago', color: 'info' },
  { id: 'a4', type: 'refund', message: 'Refund requested on <strong>#3838</strong> — $55.90', time: '1 hr ago', color: 'danger' },
  { id: 'a5', type: 'payment', message: 'Payment received for <strong>#3836</strong>', time: '2 hr ago', color: 'success' },
]

export const salesData: SalesDataPoint[] = [
  { day: 'Mon', value: 62 },
  { day: 'Tue', value: 88 },
  { day: 'Wed', value: 74 },
  { day: 'Thu', value: 95 },
  { day: 'Fri', value: 81 },
  { day: 'Sat', value: 110 },
  { day: 'Sun', value: 72 },
]

export const trafficSources: TrafficSource[] = [
  { name: 'Organic', percentage: 50, color: '#185fa5' },
  { name: 'Social', percentage: 31, color: '#3b6d11' },
  { name: 'Paid ads', percentage: 18, color: '#854f0b' },
  { name: 'Direct', percentage: 1, color: '#9a9994' },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export function getOrderById(id: string): Order | undefined {
  return orders.find(o => o.id === id)
}

export function getCustomerById(id: string): Customer | undefined {
  return customers.find(c => c.id === id)
}
