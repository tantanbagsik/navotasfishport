'use client'

import { useRef } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  delta: string
  isDown?: boolean
}

export default function StatCard({ label, value, delta, isDown = false }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      draggable
      className="stat-card select-none relative cursor-grab active:cursor-grabbing transition-all duration-150"
      style={{
        background: 'var(--bg-primary)',
        border: '0.5px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '13px 15px',
      }}
    >
      <span className="drag-handle absolute top-[9px] right-[11px] text-xs opacity-50 select-none" style={{ color: 'var(--text-tertiary)' }}>⠿</span>
      <div className="text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </div>
      <div className="text-[24px] font-semibold my-[5px] tracking-[-0.5px]" style={{ color: 'var(--text-primary)' }}>
        {value}
      </div>
      <div className={`text-[11px] ${isDown ? '' : ''}`} style={{ color: isDown ? 'var(--text-danger)' : 'var(--text-success)' }}>
        {isDown ? '↓' : '↑'} {Math.abs(Number(delta))}% {isDown ? 'vs last week' : 'vs yesterday'}
      </div>
    </div>
  )
}
