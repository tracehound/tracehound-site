import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const requestTypes = new Set(['architecture', 'technical', 'partnership'])
const environments = new Set(['cloud', 'on-prem', 'hybrid'])
const stages = new Set(['evaluation', 'pilot', 'production'])
const constraints = new Set(['latency', 'compliance', 'integration', 'cost'])

type ContactPayload = {
  requestType: string
  name: string
  email: string
  organization: string
  environment: string
  stage: string
  targetPackages: string
  constraint: string
  timeline: string
  notes: string
}

type ContactSubmission = ContactPayload & {
  honeypot: string
}

type ValidationResult =
  | { ok: true; submission: ContactSubmission }
  | { ok: false; message: string; field?: keyof ContactPayload }

function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function validatePayload(input: unknown): ValidationResult {
  if (typeof input !== 'object' || input === null) {
    return { ok: false, message: 'Submission body must be a JSON object.' }
  }

  const payload = input as Record<string, unknown>

  const submission: ContactSubmission = {
    requestType: sanitizeString(payload.requestType, 32),
    name: sanitizeString(payload.name, 160),
    email: sanitizeString(payload.email, 320),
    organization: sanitizeString(payload.organization, 160),
    environment: sanitizeString(payload.environment, 32),
    stage: sanitizeString(payload.stage, 32),
    targetPackages: sanitizeString(payload.targetPackages, 200),
    constraint: sanitizeString(payload.constraint, 32),
    timeline: sanitizeString(payload.timeline, 160),
    notes: sanitizeString(payload.notes, 4000),
    honeypot: sanitizeString(payload._trap, 200),
  }

  if (!requestTypes.has(submission.requestType)) {
    return { ok: false, field: 'requestType', message: 'Select a valid request type.' }
  }

  if (!submission.name) {
    return { ok: false, field: 'name', message: 'Name is required.' }
  }

  if (!isEmail(submission.email)) {
    return { ok: false, field: 'email', message: 'Provide a valid work email address.' }
  }

  if (!environments.has(submission.environment)) {
    return { ok: false, field: 'environment', message: 'Select a valid environment.' }
  }

  if (!stages.has(submission.stage)) {
    return { ok: false, field: 'stage', message: 'Select a valid current stage.' }
  }

  if (!constraints.has(submission.constraint)) {
    return { ok: false, field: 'constraint', message: 'Select a valid primary constraint.' }
  }

  if (!submission.notes) {
    return { ok: false, field: 'notes', message: 'Notes are required.' }
  }

  if (submission.notes.length < 10) {
    return {
      ok: false,
      field: 'notes',
      message: 'Notes must be at least 10 characters so the request can be triaged.',
    }
  }

  return { ok: true, submission }
}

function buildSubject(payload: ContactPayload): string {
  const orgSegment = payload.organization ? ` | ${payload.organization}` : ''
  return `Tracehound contact: ${payload.requestType}${orgSegment}`
}

function buildTextBody(payload: ContactPayload, request: NextRequest): string {
  const ip =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    'unknown'
  const userAgent = request.headers.get('user-agent') ?? 'unknown'
  const referer = request.headers.get('referer') ?? 'unknown'

  return [
    'Tracehound contact form submission',
    '',
    `Request type: ${payload.requestType}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Organization: ${payload.organization || 'n/a'}`,
    `Environment: ${payload.environment}`,
    `Stage: ${payload.stage}`,
    `Target packages: ${payload.targetPackages || 'n/a'}`,
    `Main constraint: ${payload.constraint}`,
    `Timeline: ${payload.timeline || 'n/a'}`,
    '',
    'Notes:',
    payload.notes,
    '',
    `IP: ${ip}`,
    `User-Agent: ${userAgent}`,
    `Referer: ${referer}`,
  ].join('\n')
}

function buildHtmlBody(payload: ContactPayload, request: NextRequest): string {
  const ip =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    'unknown'
  const userAgent = request.headers.get('user-agent') ?? 'unknown'
  const referer = request.headers.get('referer') ?? 'unknown'

  const fields: Array<[string, string]> = [
    ['Request type', payload.requestType],
    ['Name', payload.name],
    ['Email', payload.email],
    ['Organization', payload.organization || 'n/a'],
    ['Environment', payload.environment],
    ['Stage', payload.stage],
    ['Target packages', payload.targetPackages || 'n/a'],
    ['Main constraint', payload.constraint],
    ['Timeline', payload.timeline || 'n/a'],
    ['IP', ip],
    ['User-Agent', userAgent],
    ['Referer', referer],
  ]

  return `
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #111827;">
      <h1 style="font-size: 18px;">Tracehound contact form submission</h1>
      <table style="border-collapse: collapse; width: 100%; margin-top: 16px;">
        <tbody>
          ${fields
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 8px; border: 1px solid #d1d5db; font-weight: 700; width: 180px;">${escapeHtml(label)}</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db;">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
      <h2 style="font-size: 16px; margin-top: 24px;">Notes</h2>
      <pre style="white-space: pre-wrap; border: 1px solid #d1d5db; padding: 12px; background: #f9fafb;">${escapeHtml(payload.notes)}</pre>
    </div>
  `
}

function getMailerConfig():
  | { ok: true; resend: Resend; to: string; from: string }
  | { ok: false; message: string } {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.TRACEHOUND_CONTACT_TO
  const from = process.env.TRACEHOUND_CONTACT_FROM

  if (!apiKey) {
    return { ok: false, message: 'Contact delivery is not configured.' }
  }

  if (!to || !from) {
    return { ok: false, message: 'Contact delivery is incomplete.' }
  }

  return {
    ok: true,
    resend: new Resend(apiKey),
    to,
    from,
  }
}

export async function POST(request: NextRequest) {
  let json: unknown

  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid JSON payload.' }, { status: 400 })
  }

  const validation = validatePayload(json)

  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: validation.message,
        field: validation.field ?? null,
      },
      { status: 400 },
    )
  }

  const { submission } = validation

  if (submission.honeypot) {
    return NextResponse.json({
      ok: true,
      message: 'Message accepted.',
    })
  }

  const payload: ContactPayload = {
    requestType: submission.requestType,
    name: submission.name,
    email: submission.email,
    organization: submission.organization,
    environment: submission.environment,
    stage: submission.stage,
    targetPackages: submission.targetPackages,
    constraint: submission.constraint,
    timeline: submission.timeline,
    notes: submission.notes,
  }

  const mailer = getMailerConfig()

  if (!mailer.ok) {
    return NextResponse.json(
      { ok: false, message: mailer.message },
      { status: 503 },
    )
  }

  try {
    const response = await mailer.resend.emails.send({
      from: mailer.from,
      to: [mailer.to],
      subject: buildSubject(payload),
      text: buildTextBody(payload, request),
      html: buildHtmlBody(payload, request),
      replyTo: payload.email,
    })

    if (response.error) {
      console.error('Resend contact delivery failed', response.error)
      return NextResponse.json(
        { ok: false, message: 'Message could not be delivered at this time.' },
        { status: 502 },
      )
    }
  } catch (error) {
    console.error('Resend contact delivery threw', error)
    return NextResponse.json(
      { ok: false, message: 'Message could not be delivered at this time.' },
      { status: 502 },
    )
  }

  return NextResponse.json({
    ok: true,
    message: 'Message accepted. The team will review it and respond through the appropriate channel.',
  })
}
