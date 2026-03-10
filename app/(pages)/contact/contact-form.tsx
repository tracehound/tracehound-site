'use client'

import Link from 'next/link'
import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error ?? 'Something went wrong.')
      }

      setStatus('success')
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Name *" name="name" type="text" required placeholder="Jane Smith" />
        <Field label="Email *" name="email" type="email" required placeholder="jane@company.com" />
      </div>

      <Field label="Company" name="company" type="text" placeholder="Acme Corp" />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-bold font-heading">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Request Type: Partnership&#10;Organization: ..."
          className="border border-(--border-accent) bg-transparent px-3 py-2 text-sm font-mono placeholder:text-(--foreground)/40 focus:outline-none focus:border-(--accent-primary) focus:bg-(--background) resize-none"
        />
      </div>

      {status === 'success' && (
        <p className="text-sm text-(--accent-primary) font-bold">
          Message sent. We&apos;ll follow up within 2–3 business days.
        </p>
      )}

      {status === 'error' && <p className="text-sm text-red-400 font-bold">{error}</p>}

      <p className="mt-2 text-xs">Include these fields for faster triage</p>

      <div className="border border-dashed border-(--border-accent) bg-(--background) px-6 py-4 font-mono text-xs whitespace-pre-wrap">
        <strong>Request Type:</strong> Architecture | Technical | Partnership Organization / Team:{' '}
        {`<name>`} <br />
        <strong>Environment:</strong> Cloud / On-Prem / Hybrid Current Stage: Evaluation / Pilot /
        Production <br />
        <strong>Target Packages:</strong> @tracehound/core | @tracehound/express |
        @tracehound/fastify | @tracehound/cli <br />
        <strong>Main Constraint:</strong> Latency / Compliance / Integration / Cost Expected <br />
        <strong>Timeline:</strong> {`<date range>`} <br />
        <strong>Notes:</strong> {`<context + objective>`}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="self-start border-0 bg-(--accent-primary) text-(--foreground) hover:bg-(--accent-primary-hover) font-bold font-heading h-9 xl:h-11 px-6 xl:text-lg/normal inline-flex items-center justify-center transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>

      <p className="mt-6 text-sm md:text-base xl:text-lg">
        For navigation: see{' '}
        <Link href="/faq" className="underline">
          FAQ
        </Link>{' '}
        and{' '}
        <Link href="/changelog" className="underline">
          Changelog
        </Link>{' '}
        before submitting deep technical questions.
      </p>
    </form>
  )
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string
  name: string
  type: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-bold font-heading">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="border border-(--border-accent) bg-transparent px-3 py-2 text-sm font-mono placeholder:text-(--foreground)/40 focus:outline-none focus:border-(--accent-primary) focus:bg-(--background)"
      />
    </div>
  )
}
