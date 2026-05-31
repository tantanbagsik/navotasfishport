'use client'

import { useState, useEffect } from 'react'

export default function AdminMedia() {
  const [media, setMedia] = useState<any[]>([])
  const [tab, setTab] = useState<'all' | 'image' | 'video'>('all')
  const [showUpload, setShowUpload] = useState(false)
  const [uploadUrl, setUploadUrl] = useState('')
  const [uploadType, setUploadType] = useState<'image' | 'video'>('image')
  const [uploadFilename, setUploadFilename] = useState('')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerTab, setPickerTab] = useState<'image' | 'video'>('image')
  const [selectedMedia, setSelectedMedia] = useState<any>(null)
  const [previewMedia, setPreviewMedia] = useState<any>(null)

  const load = () => fetch('/api/media').then(r => r.json()).then(setMedia)
  useEffect(() => { load() }, [])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadUrl.trim()) return
    await fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: uploadUrl.trim(),
        type: uploadType,
        filename: uploadFilename || uploadUrl.trim().split('/').pop() || 'untitled',
      }),
    })
    setUploadUrl('')
    setUploadFilename('')
    setShowUpload(false)
    load()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media?')) return
    await fetch('/api/media', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    load()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string
      await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: dataUrl,
          type: file.type.startsWith('video') ? 'video' : 'image',
          filename: file.name,
          size: file.size,
        }),
      })
      load()
    }
    reader.readAsDataURL(file)
  }

  const filtered = media.filter(m =>
    tab === 'all' ? true : m.type === tab
  )

  const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)' }
  const tdStyle: React.CSSProperties = { padding: '10px 14px', borderBottom: '0.5px solid var(--border)', fontSize: '12px', color: 'var(--text-secondary)' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '7px 12px', fontSize: '13px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }

  return (
    <>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div className="page-title" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Media Library</div>
          <div className="page-sub" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{media.length} files</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <label className="btn" style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
            Upload File
            <input type="file" accept="image/*,video/*" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
          <button onClick={() => setShowUpload(true)} className="btn primary" style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid transparent', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontFamily: 'var(--font-sans)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Add URL
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '3px', width: 'fit-content' }}>
        {(['all', 'image', 'video'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding: '5px 14px', fontSize: '12px', fontWeight: 600, borderRadius: 'var(--radius-md)',
              border: 'none', cursor: 'pointer', textTransform: 'capitalize',
              background: tab === t ? 'var(--bg-primary)' : 'transparent',
              color: tab === t ? 'var(--text-primary)' : 'var(--text-tertiary)',
              boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s',
            }}
          >{t}</button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)', fontSize: '13px' }}>
          {tab === 'all' ? 'No media files yet. Upload or add a URL.' : `No ${tab} files.`}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {filtered.map(m => (
            <div key={m.id} style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
              onClick={() => setPreviewMedia(m)}
            >
              <div style={{ height: '140px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {m.type === 'video' ? (
                  <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {m.url.includes('youtube') || m.url.includes('youtu.be') ? (
                      <img src={`https://img.youtube.com/vi/${m.url.split('v=')[1]?.split('&')[0] || m.url.split('/').pop()}/hqdefault.jpg`} alt={m.alt || m.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <svg className="w-10 h-10 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
                    )}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z" /></svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img src={m.url} alt={m.alt || m.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <div style={{ padding: '8px 10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.filename}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{m.type} · {m.size ? `${(m.size / 1024).toFixed(0)} KB` : '-'}</div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(m.id) }} style={{ position: 'absolute', top: '6px', right: '6px', width: '24px', height: '24px', borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.4)', color: 'white', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewMedia && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setPreviewMedia(null)}>
          <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', maxWidth: '700px', width: '100%', maxHeight: '90vh', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '14px 18px', borderBottom: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{previewMedia.filename}</span>
              <button onClick={() => setPreviewMedia(null)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <div style={{ padding: '18px', maxHeight: '60vh', overflow: 'auto' }}>
              {previewMedia.type === 'video' ? (
                previewMedia.url.includes('youtube') || previewMedia.url.includes('youtu.be') ? (
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe src={`https://www.youtube.com/embed/${previewMedia.url.split('v=')[1]?.split('&')[0] || previewMedia.url.split('/').pop()}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 'var(--radius-md)' }} allowFullScreen />
                  </div>
                ) : (
                  <video controls style={{ width: '100%', borderRadius: 'var(--radius-md)' }}>
                    <source src={previewMedia.url} />
                  </video>
                )
              ) : (
                <img src={previewMedia.url} alt={previewMedia.alt || previewMedia.filename} style={{ width: '100%', borderRadius: 'var(--radius-md)' }} />
              )}
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>URL: <code style={{ wordBreak: 'break-all', fontSize: '11px', background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px' }}>{previewMedia.url}</code></div>
                <button onClick={() => { navigator.clipboard.writeText(previewMedia.url); alert('Copied!') }} style={{ fontSize: '12px', padding: '6px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)', alignSelf: 'flex-start' }}>Copy URL</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* URL Upload Modal */}
      {showUpload && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowUpload(false)}>
          <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', maxWidth: '480px', width: '100%', border: '0.5px solid var(--border)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '16px 18px', borderBottom: '0.5px solid var(--border)' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>Add Media URL</span>
            </div>
            <form onSubmit={handleUpload} style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', display: 'block', marginBottom: '4px' }}>Type</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['image', 'video'] as const).map(t => (
                    <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <input type="radio" name="mtype" checked={uploadType === t} onChange={() => setUploadType(t)} />
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', display: 'block', marginBottom: '4px' }}>URL</label>
                <input required value={uploadUrl} onChange={e => setUploadUrl(e.target.value)} placeholder={uploadType === 'image' ? 'https://example.com/image.jpg' : 'https://youtube.com/watch?v=...'} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', display: 'block', marginBottom: '4px' }}>Filename (optional)</label>
                <input value={uploadFilename} onChange={e => setUploadFilename(e.target.value)} placeholder={uploadType === 'image' ? 'product-photo.jpg' : 'product-video.mp4'} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                <button type="button" onClick={() => setShowUpload(false)} style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>Cancel</button>
                <button type="submit" style={{ fontSize: '13px', padding: '7px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '0.5px solid transparent', background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>Add Media</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
