import Link from 'next/link'
import { categories } from '@/lib/data'

export default function CategorySection() {
  return (
    <section className="py-16 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-zinc-900">Shop by Category</h2>
          <p className="text-zinc-500 mt-2">Explore our wide selection of premium seafood</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white rounded-xl border border-zinc-200 p-5 text-center hover:border-sky-200 hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center group-hover:from-sky-200 group-hover:to-cyan-200 transition-colors">
                <svg className="w-7 h-7 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm text-zinc-900 group-hover:text-sky-600 transition-colors">{cat.name}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">{cat.productCount} items</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
