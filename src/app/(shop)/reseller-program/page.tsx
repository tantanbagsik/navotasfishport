'use client'

import { useState, useEffect } from 'react'

export default function ResellerProgramPage() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ storeName: '', ownerName: '', email: '', phone: '', city: '', description: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/resellers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeName: formData.storeName,
          ownerName: formData.ownerName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          description: formData.description,
          specialties: ['Fresh Fish'],
          website: `${formData.storeName?.toLowerCase().replace(/\s+/g, '')}.vercel.app`,
        }),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setSubmitted(true)
      setShowForm(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-sky-900 to-sky-800 text-white">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/10 backdrop-blur px-4 py-1.5 rounded-full mb-6 border border-white/20">
              Reseller Program
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Direct-from-Fishport Pricing.<br />
              <span className="text-sky-300">Bulk Orders, Bigger Margins.</span>
            </h1>
            <p className="text-lg sm:text-xl text-sky-100/80 max-w-2xl mb-10 leading-relaxed">
              Buy in bulk at true fishport prices and unlock huge profit margins. Plus: get your own branded website and mobile app, and be listed on our multi-store marketplace.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#get-started" onClick={(e) => { e.preventDefault(); setShowForm(true); }} className="inline-flex items-center gap-2 bg-white text-sky-900 font-bold px-8 py-3.5 rounded-full hover:bg-sky-50 transition-all shadow-xl hover:shadow-2xl">
                Get Wholesale Access
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#get-started" onClick={(e) => { e.preventDefault(); setShowForm(true); }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/20 transition-all">
                Book a 10-Minute Demo
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Value Props ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">Why Join the Reseller Program?</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">Everything you need to scale your seafood business — from pricing to platform.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '⚓', title: 'Port-Direct Pricing', desc: 'Cut out middlemen. Secure consistently low wholesale rates on high-demand seafood SKUs.' },
              { icon: '📦', title: 'Bulk Orders = Big Margins', desc: 'The larger you buy, the better your landed cost—and the higher your markup potential.' },
              { icon: '❄️', title: 'Freshness & Traceability', desc: 'Sourced at the fishport with cold-chain handling and batch tracking.' },
              { icon: '🛒', title: 'Your Own Storefront', desc: 'Launch a branded website and mobile app—no coding required.' },
              { icon: '🌐', title: 'Marketplace Exposure', desc: 'Get listed on our multi-ecommerce hub to reach ready-to-buy customers.' },
              { icon: '📊', title: 'Analytics Dashboard', desc: 'Real-time inventory, order management, and sales insights at your fingertips.' },
            ].map((item, i) => (
              <div key={i} className="group bg-zinc-50 border border-zinc-200 rounded-2xl p-6 hover:bg-sky-50 hover:border-sky-200 transition-all duration-300">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-sky-700 transition-colors">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Math / Margin Explainer ── */}
      <section className="py-16 bg-gradient-to-r from-sky-900 to-sky-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Your Margin Potential</h2>
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 md:p-10 inline-block mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
              {[
                { label: 'Bulk Buy Price', value: '₱3.20', sub: '/kg' },
                { label: 'Landed Cost', value: '₱3.60', sub: '/kg (incl. logistics)' },
                { label: 'Retail Price', value: '₱5.50–6.00', sub: '/kg in your market' },
                { label: 'Gross Margin', value: '34–40%+', sub: 'depending on volume' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-xs text-sky-200 uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="text-2xl md:text-3xl font-extrabold text-white">{item.value}</div>
                  <div className="text-xs text-sky-200 mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">How It Works</h2>
            <p className="text-zinc-500">Three simple steps to start selling.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Apply for Wholesale Access', desc: 'Tell us your target volumes and preferred species.' },
              { step: '02', title: 'Lock In Bulk Pricing', desc: 'We confirm availability, rates, and delivery schedules.' },
              { step: '03', title: 'Start Selling Everywhere', desc: 'We set up your branded site/app and list you on our marketplace.' },
            ].map((item, i) => (
              <div key={i} className="relative bg-white border border-zinc-200 rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-5xl font-black text-sky-200 mb-4">{item.step}</div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You Can Sell ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-6">What You Can Sell</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Shrimp, crab, squid, mussels',
                  'Tuna, salmon, mackerel, sardines',
                  'Grouper, snapper, pomfret',
                  'Seasonal & custom catches',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-zinc-700">
                    <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-sm text-zinc-400 mt-4">Custom requests based on port availability.</p>
            </div>
            <div className="flex-1">
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
                <h3 className="font-bold text-zinc-900 mb-4">Who This Is For</h3>
                <ul className="space-y-3">
                  {[
                    'Seafood resellers and distributors',
                    'Restaurants and caterers scaling procurement',
                    'Online grocers and social sellers',
                    'Market stall owners upgrading to e-commerce',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof & Assurances ── */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">Why Resellers Trust Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📅', title: 'Consistent Supply', desc: 'Daily port runs, priority allocation for bulk buyers.' },
              { icon: '✅', title: 'Quality Standards', desc: 'Grading, icing, and packaging at source; cold-chain maintained.' },
              { icon: '🚛', title: 'Flexible Logistics', desc: 'Pickup at port or refrigerated delivery to your city.' },
              { icon: '💰', title: 'Transparent Pricing', desc: 'Clear bulk tiers, no surprise fees.' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-zinc-200 rounded-xl p-6 text-center hover:border-sky-200 hover:shadow-md transition-all duration-300">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-zinc-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: 'What\'s the minimum order quantity?', a: 'Starts as low as one box per SKU; best pricing unlocks at pallet-level volume.' },
              { q: 'How fast can I launch my site/app?', a: 'Typical setup in 3–7 business days after onboarding.' },
              { q: 'Do you handle delivery?', a: 'Yes—refrigerated delivery options are available, or you can arrange port pickup.' },
              { q: 'How do I get paid on marketplace orders?', a: 'Funds are settled to your chosen account on a regular schedule after fulfillment.' },
              { q: 'Can I use my own branding and pricing?', a: 'Yes—full control over your brand, catalog, and margins.' },
            ].map((item, i) => (
              <details key={i} className="group bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors">
                  {item.q}
                  <svg className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-sm text-zinc-600 leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Form Modal ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 pb-0">
              <h3 className="text-lg font-bold text-zinc-900">Wholesale Access Application</h3>
              <button onClick={() => setShowForm(false)} className="p-1 text-zinc-400 hover:text-zinc-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Store Name *</label>
                  <input required value={formData.storeName} onChange={e => setFormData({ ...formData, storeName: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Your Name *</label>
                  <input required value={formData.ownerName} onChange={e => setFormData({ ...formData, ownerName: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Email *</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Phone</label>
                  <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">City</label>
                  <input value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Tell us about your business</label>
                  <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg outline-none focus:border-zinc-400 resize-none" placeholder="Target volumes, preferred species..." />
                </div>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button type="submit" disabled={submitting} className="w-full bg-sky-600 text-white font-semibold py-3 rounded-xl hover:bg-sky-700 disabled:opacity-50 transition-colors">
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <p className="text-[11px] text-zinc-400 text-center">We'll review and get back to you within 24 hours.</p>
            </form>
          </div>
        </div>
      )}

      {/* ── Success Toast ── */}
      {submitted && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl text-sm font-semibold flex items-center gap-2 animate-slide-in">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Application submitted! We'll contact you soon.
          <button onClick={() => setSubmitted(false)} className="ml-2 hover:text-green-200">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Final CTA ── */}
      <section id="get-started" className="py-20 bg-gradient-to-br from-sky-950 via-sky-900 to-sky-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/10 backdrop-blur px-4 py-1.5 rounded-full mb-6 border border-white/20">
            Limited Slots Available
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Grow Your Margins?</h2>
          <p className="text-sky-100/80 text-lg mb-4">
            Get wholesale access today and be live on our marketplace this week.
          </p>
          <p className="text-sky-300 text-sm font-semibold mb-8">
            New Seller Launch Offer: Free storefront setup + first-month marketplace fees waived.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 bg-white text-sky-900 font-bold px-8 py-3.5 rounded-full hover:bg-sky-50 transition-all shadow-xl hover:shadow-2xl">
              Get Wholesale Access
            </button>
            <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/20 transition-all">
              See Pricing
            </button>
            <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/20 transition-all">
              Book a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
