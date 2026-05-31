'use client'

interface TrafficSource {
  name: string
  percentage: number
  color: string
}

export default function TrafficSources({ trafficSources }: { trafficSources: TrafficSource[] }) {
  const data = trafficSources?.length ? trafficSources : [
    { name: 'Organic', percentage: 50, color: '#185fa5' },
    { name: 'Social', percentage: 31, color: '#3b6d11' },
    { name: 'Paid ads', percentage: 18, color: '#854f0b' },
    { name: 'Direct', percentage: 1, color: '#9a9994' },
  ]
  const totalR = 27
  const circumference = 2 * Math.PI * totalR
  let offset = 0

  return (
    <div className="panel" draggable style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div className="panel-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', borderBottom: '0.5px solid var(--border)' }}>
        <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>Traffic sources</span>
        <span className="text-xs" style={{ color: 'var(--text-info)', cursor: 'pointer' }}>Details →</span>
      </div>
      <div style={{ padding: '12px 15px' }}>
        <div className="donut-wrap" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '4px 0' }}>
          <svg width="74" height="74" viewBox="0 0 74 74">
            {data.map(source => {
              const dashLen = (source.percentage / 100) * circumference
              const dashOffset = -offset
              offset += dashLen
              return (
                <circle key={source.name} cx="37" cy="37" r={totalR}
                  fill="none" stroke={source.color} strokeWidth="14"
                  strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                  strokeDashoffset={`${dashOffset}`}
                  transform="rotate(-90 37 37)" />
              )
            })}
            <text x="37" y="42" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
              Today
            </text>
          </svg>
          <div className="donut-legend" style={{ display: 'flex', flexDirection: 'column', gap: '7px', flex: 1 }}>
            {data.map(source => (
              <div key={source.name} className="legend-row" style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, background: source.color }} />
                {source.name}
                <span className="legend-pct" style={{ marginLeft: 'auto', fontWeight: 600, fontSize: '12px', color: source.color }}>
                  {source.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
