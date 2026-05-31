'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import StatCard from '@/components/admin/StatCard'
import RecentOrders from '@/components/admin/RecentOrders'
import ActivityFeed from '@/components/admin/ActivityFeed'
import SalesChart from '@/components/admin/SalesChart'
import TopProducts from '@/components/admin/TopProducts'
import TrafficSources from '@/components/admin/TrafficSources'
import { getDashboard } from '@/lib/api'

function useDragReorder(containerId: string, selector: string) {
  const dragSrc = useRef<Element | null>(null)

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const handleDragStart = (e: Event) => {
      const ev = e as DragEvent
      const el = (ev.target as Element)?.closest(selector)
      if (!el) return
      dragSrc.current = el
      setTimeout(() => el.classList.add('dragging'), 0)
    }

    const handleDragEnd = () => {
      container.querySelectorAll(selector).forEach(el => {
        el.classList.remove('dragging')
        el.classList.remove('drag-over')
      })
      dragSrc.current = null
    }

    const handleDragOver = (e: Event) => {
      e.preventDefault()
      const ev = e as DragEvent
      const target = (ev.target as Element)?.closest(selector)
      if (!target || target === dragSrc.current) return
      container.querySelectorAll(selector).forEach(el => el.classList.remove('drag-over'))
      target.classList.add('drag-over')
    }

    const handleDragLeave = (e: Event) => {
      const target = (e.target as Element)?.closest(selector)
      if (target) target.classList.remove('drag-over')
    }

    const handleDrop = (e: Event) => {
      e.preventDefault()
      const ev = e as DragEvent
      const target = (ev.target as Element)?.closest(selector)
      if (!target || target === dragSrc.current || !dragSrc.current) return
      target.classList.remove('drag-over')
      const parent = target.parentNode!
      const srcNext = dragSrc.current.nextSibling
      const tgtNext = target.nextSibling
      if (tgtNext === dragSrc.current) {
        parent.insertBefore(dragSrc.current, target)
      } else {
        parent.insertBefore(dragSrc.current, tgtNext)
        parent.insertBefore(target, srcNext)
      }
    }

    container.addEventListener('dragstart', handleDragStart)
    container.addEventListener('dragend', handleDragEnd)
    container.addEventListener('dragover', handleDragOver)
    container.addEventListener('dragleave', handleDragLeave)
    container.addEventListener('drop', handleDrop)

    return () => {
      container.removeEventListener('dragstart', handleDragStart)
      container.removeEventListener('dragend', handleDragEnd)
      container.removeEventListener('dragover', handleDragOver)
      container.removeEventListener('dragleave', handleDragLeave)
      container.removeEventListener('drop', handleDrop)
    }
  }, [containerId, selector])
}

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null)
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    getDashboard().then(setData)
    setDateStr(new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }))
  }, [])

  useDragReorder('stat-grid', '.stat-card')
  useDragReorder('panel-row-1', '.panel')
  useDragReorder('panel-row-2', '.panel')

  if (!data) {
    return <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-tertiary)' }}>Loading dashboard...</div>
  }

  const { stats, activities, salesData, trafficSources } = data

  const statCards = [
    { label: 'Revenue today', value: `$${Number(stats.revenueToday).toLocaleString()}`, delta: String(stats.revenueDelta), isDown: false },
    { label: 'Orders', value: stats.orders, delta: String(stats.ordersDelta), isDown: false },
    { label: 'Avg. order value', value: `$${Number(stats.avgOrderValue).toFixed(2)}`, delta: String(Math.abs(stats.aovDelta)), isDown: true },
    { label: 'Active customers', value: Number(stats.activeCustomers).toLocaleString(), delta: String(stats.customersDelta), isDown: false },
  ]

  return (
    <>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div className="page-title" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Dashboard</div>
          <div className="page-sub" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {dateStr || 'Loading...'} — Drag any card or panel to reorder
          </div>
        </div>
        <div className="btn-row" style={{ display: 'flex', gap: '8px' }}>
          <button className="btn" style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid var(--border-md)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>Export</button>
          <button className="btn primary" style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid transparent', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontFamily: 'var(--font-sans)' }}>+ Add product</button>
        </div>
      </div>

      <div className="stat-grid" id="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '10px' }}>
        {statCards.map(s => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="panel-grid" id="panel-row-1" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
        <RecentOrders />
        <ActivityFeed activities={activities} />
      </div>

      <div className="panel-grid-3" id="panel-row-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
        <SalesChart salesData={salesData} />
        <TopProducts />
        <TrafficSources trafficSources={trafficSources} />
      </div>

      <div id="toolbar-hint" style={{ background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '10px 14px', fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>⠿ Drag any card or panel to rearrange your dashboard</span>
        <span className="hint-link" style={{ color: 'var(--text-info)', cursor: 'pointer', marginLeft: 'auto' }}>Customize layout →</span>
      </div>
    </>
  )
}
