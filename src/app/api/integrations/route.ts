import { NextResponse } from 'next/server'

let integrations: Record<string, any> = {
  gcash: { enabled: true, label: 'GCash', apiKey: '' },
  paypal: { enabled: false, label: 'PayPal', apiKey: '' },
  facebook_login: { enabled: true, label: 'Facebook Login', apiKey: '' },
  google_login: { enabled: false, label: 'Google Login', apiKey: '' },
  sms_notifications: { enabled: true, label: 'SMS Notifications', apiKey: '' },
}

export async function GET() {
  return NextResponse.json(integrations)
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    if (body.key && integrations[body.key] !== undefined) {
      integrations[body.key] = { ...integrations[body.key], ...body.data }
    } else if (typeof body === 'object') {
      for (const [key, val] of Object.entries(body)) {
        if (integrations[key] !== undefined) {
          integrations[key] = { ...integrations[key], ...(val as any) }
        }
      }
    }
    return NextResponse.json(integrations)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
