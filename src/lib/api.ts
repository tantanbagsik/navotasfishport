const BASE = ''

async function fetchJSON(url: string) {
  const res = await fetch(`${BASE}${url}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function getProducts(params?: { category?: string; search?: string; sort?: string }) {
  const q = new URLSearchParams()
  if (params?.category) q.set('category', params.category)
  if (params?.search) q.set('search', params.search)
  if (params?.sort) q.set('sort', params.sort)
  const qs = q.toString()
  return fetchJSON(`/api/products${qs ? `?${qs}` : ''}`)
}

export async function getProduct(id: string) {
  return fetchJSON(`/api/products/${id}`)
}

export async function getOrders(status?: string) {
  return fetchJSON(`/api/orders${status ? `?status=${status}` : ''}`)
}

export async function getCustomers() {
  return fetchJSON('/api/customers')
}

export async function getDashboard() {
  return fetchJSON('/api/dashboard')
}
