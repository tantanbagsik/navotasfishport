'use client'

interface Activity {
  id: string
  type: string
  message: string
  time: string
  color?: string
}

const dotStyles: Record<string, { bg: string; border: string }> = {
  success: { bg: 'var(--bg-success)', border: 'var(--text-success)' },
  warning: { bg: 'var(--bg-warning)', border: 'var(--text-warning)' },
  info: { bg: 'var(--bg-info)', border: 'var(--text-info)' },
  danger: { bg: 'var(--bg-danger)', border: 'var(--text-danger)' },
  order: { bg: 'var(--bg-success)', border: 'var(--text-success)' },
  stock: { bg: 'var(--bg-warning)', border: 'var(--text-warning)' },
  customer: { bg: 'var(--bg-info)', border: 'var(--text-info)' },
  refund: { bg: 'var(--bg-danger)', border: 'var(--text-danger)' },
  payment: { bg: 'var(--bg-success)', border: 'var(--text-success)' },
}

export default function ActivityFeed({ activities }: { activities: Activity[] }) {
  return (
    <div className="panel" draggable style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div className="panel-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', borderBottom: '0.5px solid var(--border)' }}>
        <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>Activity feed</span>
        <span className="text-xs" style={{ color: 'var(--text-info)', cursor: 'pointer' }}>All →</span>
      </div>
      <div style={{ padding: '12px 15px' }}>
        {activities?.map((activity: Activity) => {
          const dot = dotStyles[activity.color || activity.type] || { bg: 'var(--bg-tertiary)', border: 'var(--text-tertiary)' }
          return (
            <div key={activity.id} className="activity-item" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '7px 0', borderBottom: '0.5px solid var(--border)', fontSize: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, marginTop: '3px', background: dot.bg, border: `1.5px solid ${dot.border}` }} />
              <div>
                <div className="activity-text" style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: activity.message }} />
                <div className="activity-time" style={{ color: 'var(--text-tertiary)', fontSize: '11px', marginTop: '2px' }}>{activity.time}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
