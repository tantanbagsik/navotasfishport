import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/10 rounded-full px-4 py-1.5 mb-4">
              Direct from Navotas Fish Port
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Fresh from the
              <span className="text-cyan-300"> Ocean</span>
              <br />to Your Table
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-lg">
              Premium quality seafood sourced directly from Navotas Fish Port —
              the Philippines&apos; premier fishing hub. Caught fresh, delivered fast.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-sky-900 font-semibold px-6 py-3 rounded-full hover:bg-cyan-50 transition-colors"
              >
                Shop Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="space-y-4 mt-8">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=300&h=300&fit=crop" alt="Fresh Fish" className="w-full h-40 object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop" alt="Prawns" className="w-full h-52 object-cover" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=300&h=300&fit=crop" alt="King Crab" className="w-full h-52 object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=300&fit=crop" alt="Tilapia" className="w-full h-40 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
