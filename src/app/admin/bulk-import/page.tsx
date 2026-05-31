'use client'

import { useState, useRef, useCallback } from 'react'
import * as XLSX from 'xlsx'

export default function AdminBulkImport() {
  const [rows, setRows] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<{ imported: number; errors?: string[] } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target!.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const json: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 })
      if (json.length < 2) return
      const cols = json[0].map((c: any) => String(c).trim())
      setColumns(cols)
      const parsed = json.slice(1).map((row: any[]) => {
        const obj: any = {}
        cols.forEach((col, i) => { obj[col] = row[i] !== undefined ? row[i] : '' })
        return obj
      }).filter((r: any) => r.name || r.Name || r.NAME)
      setRows(parsed)
      setResult(null)
    }
    reader.readAsArrayBuffer(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }, [processFile])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const mapRow = (r: any) => ({
    name: r.name || r.Name || r.NAME || '',
    description: r.description || r.Description || r.DESC || '',
    price: r.price || r.Price || r.PRICE || '',
    original_price: r.original_price || r.originalPrice || r.OriginalPrice || r.ORIGINAL_PRICE || '',
    category: r.category || r.Category || r.CATEGORY || 'Fresh Fish',
    image: r.image || r.Image || r.IMAGE || r.img || r.IMG || '',
    unit: r.unit || r.Unit || r.UNIT || 'kg',
    weight: r.weight || r.Weight || r.WEIGHT || '1 kg',
    stock: r.stock || r.Stock || r.STOCK || 0,
    sku: r.sku || r.Sku || r.SKU || '',
    is_on_sale: r.is_on_sale || r.isOnSale || r.IsOnSale || r.IS_ON_SALE || false,
    is_best_seller: r.is_best_seller || r.isBestSeller || r.IsBestSeller || r.IS_BEST_SELLER || false,
    is_new: r.is_new || r.isNew || r.IsNew || r.IS_NEW || false,
    tags: r.tags || r.Tags || r.TAGS || '',
    video_url: r.video_url || r.videoUrl || r.VideoUrl || r.VIDEO_URL || '',
  })

  const handleImport = async () => {
    setImporting(true)
    setResult(null)
    try {
      const res = await fetch('/api/products/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: rows.map(mapRow) }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setResult({ imported: 0, errors: [err.message] })
    } finally {
      setImporting(false)
    }
  }

  const btnStyle: React.CSSProperties = { fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', display: 'inline-flex', alignItems: 'center', gap: '6px' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '7px 12px', fontSize: '13px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }
  const thStyle: React.CSSProperties = { textAlign: 'left', padding: '8px 10px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }
  const tdStyle: React.CSSProperties = { padding: '8px 10px', borderBottom: '0.5px solid var(--border)', fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }

  return (
    <>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div className="page-title" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Bulk Product Import</div>
          <div className="page-sub" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Upload an Excel file (.xlsx) to import products in bulk
          </div>
        </div>
        {rows.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{rows.length} products</span>
            <button onClick={() => { setRows([]); setColumns([]); setResult(null) }} style={btnStyle}>Clear</button>
            <button onClick={handleImport} disabled={importing}
              style={{ ...btnStyle, border: '0.5px solid transparent', background: 'var(--text-primary)', color: 'var(--bg-primary)', opacity: importing ? 0.6 : 1 }}>
              {importing ? 'Importing...' : `Import ${rows.length} Products`}
            </button>
          </div>
        )}
      </div>

      {/* Dropzone */}
      {rows.length === 0 && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? 'var(--text-info)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-lg)', padding: '60px 20px', textAlign: 'center',
            cursor: 'pointer', transition: 'border 0.15s', marginTop: '12px',
            background: dragging ? 'var(--bg-secondary)' : 'transparent',
          }}
        >
          <svg className="w-10 h-10" style={{ margin: '0 auto 12px', color: 'var(--text-tertiary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {dragging ? 'Drop your file here' : 'Drag & drop an Excel file here'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            or click to browse &middot; .xlsx, .xls, .csv supported
          </div>
          <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} style={{ display: 'none' }} />
          {/* Template download */}
          <div style={{ marginTop: '16px' }}>
            <a href="#" onClick={(e) => {
              e.preventDefault()
              const wb = XLSX.utils.book_new()
              const data = [['name', 'price', 'original_price', 'category', 'description', 'image', 'unit', 'weight', 'stock', 'sku', 'is_on_sale', 'is_best_seller', 'is_new', 'tags', 'video_url']]
              const ws = XLSX.utils.aoa_to_sheet(data)
              XLSX.utils.book_append_sheet(wb, ws, 'Products')
              XLSX.writeFile(wb, 'product-import-template.xlsx')
            }} style={{ fontSize: '12px', color: 'var(--text-info)', textDecoration: 'none' }}>Download template</a>
          </div>
        </div>
      )}

      {/* Result banner */}
      {result && (
        <div style={{ marginTop: '12px', padding: '12px 16px', borderRadius: 'var(--radius-md)', background: result.errors?.length ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)', border: `0.5px solid ${result.errors?.length ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}` }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: result.errors?.length ? 'var(--text-danger)' : 'var(--text-success)' }}>
            {result.imported} product{result.imported !== 1 ? 's' : ''} imported successfully
          </div>
          {result.errors && result.errors.length > 0 && (
            <div style={{ marginTop: '8px', maxHeight: '200px', overflow: 'auto' }}>
              {result.errors.map((e, i) => (
                <div key={i} style={{ fontSize: '11px', color: 'var(--text-danger)', padding: '2px 0' }}>{e}</div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Preview table */}
      {rows.length > 0 && (
        <div style={{ marginTop: '12px', overflowX: 'auto', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: '30px' }}>#</th>
                {columns.map(col => (
                  <th key={col} style={thStyle}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 50).map((row, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{i + 1}</td>
                  {columns.map(col => (
                    <td key={col} style={tdStyle}>{String(row[col] ?? '')}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > 50 && (
            <div style={{ padding: '10px 14px', fontSize: '11px', color: 'var(--text-tertiary)', textAlign: 'center', borderTop: '0.5px solid var(--border)' }}>
              Showing first 50 of {rows.length} rows
            </div>
          )}
        </div>
      )}
    </>
  )
}
