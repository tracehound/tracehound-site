import { createClient } from '@libsql/client'
import { NextRequest, NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LIMITS = {
  name: 100,
  email: 254,
  company: 200,
  message: 5000,
}

function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const name = sanitize(body.name, LIMITS.name)
    const email = sanitize(body.email, LIMITS.email)
    const company = sanitize(body.company, LIMITS.company)
    const message = sanitize(body.message, LIMITS.message)

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const db = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    })

    await db.execute({
      sql: `INSERT INTO contact_submissions (name, email, company, message, created_at)
            VALUES (?, ?, ?, ?, ?)`,
      args: [name, email, company || null, message, new Date().toISOString()],
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 },
    )
  }
}
