'use client'

import { CaretDownIcon } from '@phosphor-icons/react'
import { cn } from '@/app/lib/utils'
import { ChangeEvent, FormEvent, useState } from 'react'

const requestTypes = ['architecture', 'technical', 'partnership'] as const
const environments = ['cloud', 'on-prem', 'hybrid'] as const
const stages = ['evaluation', 'pilot', 'production'] as const
const constraints = ['latency', 'compliance', 'integration', 'cost'] as const

type ContactFormValues = {
  requestType: (typeof requestTypes)[number]
  name: string
  email: string
  organization: string
  environment: (typeof environments)[number]
  stage: (typeof stages)[number]
  targetPackages: string
  constraint: (typeof constraints)[number]
  timeline: string
  notes: string
  _trap: string
}

type SubmissionState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string; field?: string | null }

const initialValues: ContactFormValues = {
  requestType: 'architecture',
  name: '',
  email: '',
  organization: '',
  environment: 'cloud',
  stage: 'evaluation',
  targetPackages: '@tracehound/core',
  constraint: 'integration',
  timeline: '',
  notes: '',
  _trap: '',
}

const fieldClassName =
  'w-full border border-(--border-accent) bg-transparent px-4 py-3 text-sm md:text-base outline-none transition-colors placeholder:text-(--border) focus:border-(--foreground)'

const selectClassName = cn(fieldClassName, 'appearance-none pr-12')

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [submission, setSubmission] = useState<SubmissionState>({ kind: 'idle' })

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target
    setValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmission({ kind: 'submitting' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const payload = (await response.json()) as {
        ok?: boolean
        message?: string
        field?: string | null
      }

      if (!response.ok || !payload.ok) {
        setSubmission({
          kind: 'error',
          message:
            payload.message ?? 'Submission failed. Try again shortly.',
          field: payload.field ?? null,
        })
        return
      }

      setValues(initialValues)
      setSubmission({
        kind: 'success',
        message:
          payload.message ??
          'Message accepted. The team will review it and respond through the appropriate channel.',
      })
    } catch {
      setSubmission({
        kind: 'error',
        message: 'Submission failed due to a network or runtime error. Try again shortly.',
        field: null,
      })
    }
  }

  return (
    <div className="border border-dashed border-(--border-accent) p-6 xl:p-8">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="font-heading font-bold text-sm md:text-base">Request Type</span>
            <div className="relative">
              <select
                name="requestType"
                value={values.requestType}
                onChange={handleChange}
                className={selectClassName}>
                {requestTypes.map((requestType) => (
                  <option key={requestType} value={requestType}>
                    {requestType[0].toUpperCase()}
                    {requestType.slice(1)}
                  </option>
                ))}
              </select>
              <CaretDownIcon
                size={18}
                weight="bold"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--border)"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-heading font-bold text-sm md:text-base">Work Email</span>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="security@company.tld"
              className={fieldClassName}
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-heading font-bold text-sm md:text-base">Name</span>
            <input
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className={fieldClassName}
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-heading font-bold text-sm md:text-base">Organization / Team</span>
            <input
              name="organization"
              type="text"
              value={values.organization}
              onChange={handleChange}
              placeholder="Platform Security"
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-heading font-bold text-sm md:text-base">Environment</span>
            <div className="relative">
              <select
                name="environment"
                value={values.environment}
                onChange={handleChange}
                className={selectClassName}>
                {environments.map((environment) => (
                  <option key={environment} value={environment}>
                    {environment === 'on-prem'
                      ? 'On-Prem'
                      : environment[0].toUpperCase() + environment.slice(1)}
                  </option>
                ))}
              </select>
              <CaretDownIcon
                size={18}
                weight="bold"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--border)"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-heading font-bold text-sm md:text-base">Current Stage</span>
            <div className="relative">
              <select
                name="stage"
                value={values.stage}
                onChange={handleChange}
                className={selectClassName}>
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage[0].toUpperCase()}
                    {stage.slice(1)}
                  </option>
                ))}
              </select>
              <CaretDownIcon
                size={18}
                weight="bold"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--border)"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-heading font-bold text-sm md:text-base">Target Packages</span>
            <input
              name="targetPackages"
              type="text"
              value={values.targetPackages}
              onChange={handleChange}
              placeholder="@tracehound/core, @tracehound/express"
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-heading font-bold text-sm md:text-base">Main Constraint</span>
            <div className="relative">
              <select
                name="constraint"
                value={values.constraint}
                onChange={handleChange}
                className={selectClassName}>
                {constraints.map((constraint) => (
                  <option key={constraint} value={constraint}>
                    {constraint[0].toUpperCase()}
                    {constraint.slice(1)}
                  </option>
                ))}
              </select>
              <CaretDownIcon
                size={18}
                weight="bold"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-(--border)"
              />
            </div>
          </label>
        </div>

        <label className="hidden" aria-hidden="true">
          <span>Website</span>
          <input
            name="_trap"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values._trap}
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-heading font-bold text-sm md:text-base">Expected Timeline</span>
          <input
            name="timeline"
            type="text"
            value={values.timeline}
            onChange={handleChange}
            placeholder="Q2 pilot, production in Q3"
            className={fieldClassName}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-heading font-bold text-sm md:text-base">Notes</span>
          <textarea
            name="notes"
            value={values.notes}
            onChange={handleChange}
            placeholder="Context, objective, deployment shape, and current blocker."
            className={cn(fieldClassName, 'min-h-40 resize-y')}
            minLength={10}
            required
          />
          <span className="text-xs text-(--border)">
            Minimum 10 characters. Include enough context for routing and triage.
          </span>
        </label>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
          <button
            type="submit"
            disabled={submission.kind === 'submitting'}
            className={cn(
              'border-0 bg-clip-padding font-bold gap-2 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none select-none cursor-pointer font-heading h-11 xl:h-13 px-7 xl:text-lg/normal bg-(--accent-primary) text-(--foreground) hover:bg-(--accent-primary-hover)',
            )}>
            {submission.kind === 'submitting' ? 'SUBMITTING' : 'SUBMIT REQUEST'}
          </button>
        </div>
      </form>

      <div aria-live="polite" className="mt-6">
        {submission.kind === 'success' ? (
          <p className="bg-(--success) text-(--foreground) font-bold px-4 py-3 text-sm md:text-base">
            {submission.message}
          </p>
        ) : null}

        {submission.kind === 'error' ? (
          <p className="bg-(--error) text-(--foreground) font-bold px-4 py-3 text-sm md:text-base">
            {submission.field ? `[${submission.field}] ` : ''}
            {submission.message}
          </p>
        ) : null}
      </div>
    </div>
  )
}
