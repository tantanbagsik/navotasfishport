import { NextResponse } from 'next/server'

let campaigns: any[] = [
  { id: '1', name: 'Welcome Series', subject: 'Welcome to Navotas Fish Port', content: 'Thank you for signing up...', status: 'sent', created_at: '2026-03-15T10:00:00Z' },
  { id: '2', name: 'Spring Sale', subject: 'Spring Fresh Catch Deals', content: 'Get 20% off on all fresh fish...', status: 'draft', created_at: '2026-03-20T14:30:00Z' },
]

export async function GET() {
  return NextResponse.json(campaigns.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const campaign = {
      id: `camp-${Date.now()}`,
      name: body.name,
      subject: body.subject,
      content: body.content,
      status: body.status || 'draft',
      created_at: new Date().toISOString(),
    }
    campaigns.push(campaign)
    return NextResponse.json(campaign, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
