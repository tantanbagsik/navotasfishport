export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3">About Us</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
            Your Premier Seafood Destination
          </h1>
          <p className="text-zinc-600 leading-relaxed mb-4">
            Located at the heart of Navotas Fish Port — the Philippines&apos; largest and busiest fishing port —
            we bring you the freshest catch directly from the sea to your table.
          </p>
          <p className="text-zinc-600 leading-relaxed mb-4">
            With decades of experience in the fishing industry, our team carefully selects every product
            to ensure premium quality. From succulent prawns to fresh catch of the day, we source
            sustainably and deliver with care.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Our mission is simple: make high-quality seafood accessible to everyone while supporting
            local fishermen and sustainable fishing practices.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=600&h=500&fit=crop"
            alt="Navotas Fish Port"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-8 mb-16">
        {[
          { number: '50+', label: 'Years of Fishing Heritage' },
          { number: '200+', label: 'Fresh Seafood Products' },
          { number: '5,000+', label: 'Happy Customers Served' },
        ].map(stat => (
          <div key={stat.label} className="text-center p-6 bg-zinc-50 rounded-xl">
            <div className="text-3xl font-bold text-sky-600 mb-1">{stat.number}</div>
            <div className="text-sm text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1599733589046-10c7f0d2d48e?w=600&h=400&fit=crop"
            alt="Fresh seafood"
            className="w-full h-64 object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">Our Commitment</h2>
          <ul className="space-y-4">
            {[
              { title: 'Sustainability', desc: 'We partner with fisheries that follow responsible fishing practices to protect our oceans.' },
              { title: 'Quality Assurance', desc: 'Every product is inspected for freshness, quality, and proper handling before delivery.' },
              { title: 'Cold Chain Integrity', desc: 'From port to package, our cold chain logistics ensure your seafood stays fresh.' },
              { title: 'Community Support', desc: 'We work directly with local fishermen to support the Navotas fishing community.' },
            ].map(item => (
              <li key={item.title} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 p-8 bg-zinc-50 rounded-2xl text-center">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Get in Touch</h2>
        <p className="text-zinc-500 mb-6 max-w-lg mx-auto">Have questions about our products or delivery? Reach out to us!</p>
        <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto">
          <div className="bg-white p-5 rounded-xl border border-zinc-200">
            <div className="text-lg font-semibold text-zinc-900">Judith Abuque</div>
            <div className="text-sm text-zinc-500 mt-1">09564804965</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-zinc-200">
            <div className="text-lg font-semibold text-zinc-900">Ray Panganiban</div>
            <div className="text-sm text-zinc-500 mt-1">09676900519</div>
          </div>
        </div>
      </div>
    </div>
  )
}
