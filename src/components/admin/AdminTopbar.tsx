'use client'

export default function AdminTopbar({ onToggleMobile }: { onToggleMobile?: () => void }) {
  return (
    <div className="h-[52px] bg-[var(--bg-primary)] border-b-[0.5px] border-[var(--border)] flex items-center px-[18px] gap-3 shrink-0 sticky top-0 z-30" style={{ color: 'var(--text-primary)' }}>
      <button onClick={onToggleMobile} className="sm:hidden p-1 -ml-1 mr-1" style={{ color: 'var(--text-secondary)' }}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
      <div className="flex items-center gap-2 font-semibold text-[15px] shrink-0" style={{ color: 'var(--text-primary)' }}>
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <rect x="1" y="1" width="22" height="22" rx="6" fill="var(--bg-info)" />
          <path d="M7 12l4 4 6-7" stroke="var(--text-info)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        ShopAdmin
      </div>

      <div className="relative flex-1 max-w-[360px]">
        <span className="absolute left-[11px] top-1/2 -translate-y-1/2 text-sm pointer-events-none" style={{ color: 'var(--text-tertiary)' }}>⌕</span>
        <input
          type="text"
          placeholder="Search orders, products, customers…"
          className="w-full pl-[34px] pr-3 py-[7px] text-[13px] border-[0.5px] border-[var(--border)] rounded-[var(--radius-md)] outline-none transition-[border-color] duration-150"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--border-md)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
        />
      </div>

      <div className="flex-1" />

      <span className="chip text-xs px-[10px] py-[4px] rounded-[99px] border-[0.5px] border-[var(--border-md)] cursor-pointer whitespace-nowrap select-none transition-colors duration-150"
        style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
      >
        🔔 3 alerts
      </span>
      <span className="chip text-xs px-[10px] py-[4px] rounded-[99px] border-[0.5px] border-[var(--border-md)] cursor-pointer whitespace-nowrap select-none transition-colors duration-150"
        style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
      >
        ⚙ Settings
      </span>
      <div className="w-[30px] h-[30px] rounded-full text-xs font-semibold flex items-center justify-center cursor-pointer shrink-0"
        style={{ background: 'var(--bg-info)', color: 'var(--text-info)' }}>
        JD
      </div>
    </div>
  )
}
