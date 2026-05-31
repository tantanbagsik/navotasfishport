'use client'

interface SalesPoint {
  day: string
  value: number
}

export default function SalesChart({ salesData }: { salesData: SalesPoint[] }) {
  const data = salesData?.length ? salesData : [
    { day: 'Mon', value: 62 }, { day: 'Tue', value: 88 }, { day: 'Wed', value: 74 },
    { day: 'Thu', value: 95 }, { day: 'Fri', value: 81 }, { day: 'Sat', value: 110 }, { day: 'Sun', value: 72 },
  ]
  const maxV = Math.max(...data.map(d => d.value))

  return (
    <div className="panel" draggable style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div className="panel-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', borderBottom: '0.5px solid var(--border)' }}>
        <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>Sales — last 7 days</span>
        <span className="text-xs" style={{ color: 'var(--text-info)', cursor: 'pointer' }}>Details →</span>
      </div>
      <div style={{ padding: '12px 15px' }}>
        <div className="bar-chart" style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '72px', padding: '0 2px' }}>
          {data.map(d => {
            const pct = maxV > 0 ? Math.round((d.value / maxV) * 100) : 0
            return (
              <div key={d.day} className="bar-col" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                <div className="bar-fill" style={{ width: '100%', borderRadius: '3px 3px 0 0', background: 'var(--bg-info)', border: '0.5px solid var(--text-info)', minHeight: '4px', height: `${pct}%`, transition: 'height 0.4s ease' }} />
                <span className="bar-lbl" style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}>{d.day}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
