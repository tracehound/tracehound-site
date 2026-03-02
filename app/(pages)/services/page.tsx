import { Badge } from '@/app/components/badge'
import { Button } from '@/app/components/button'
import { Container } from '@/app/components/container'
import { Row } from '@/app/components/patterns/row'
import { Table } from '@/app/components/table'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Security architecture, pilot enablement, and incident-readiness services for Tracehound adopters.',
}

const serviceTracks = [
  {
    title: 'Architecture Review',
    summary:
      'Validate deployment boundaries, threat model fit, and runtime failure semantics before production rollout.',
    scope: [
      'Current-state security architecture review',
      'Tracehound package placement and boundary mapping',
      'Risk and integration constraints assessment',
    ],
  },
  {
    title: 'Pilot Enablement',
    summary:
      'Run a structured pilot to verify performance, evidence integrity, and operational fit in your environment.',
    scope: [
      'Pilot plan and success criteria definition',
      'Environment-specific integration guidance',
      'Validation checkpoints and rollout recommendation',
    ],
  },
  {
    title: 'Incident Readiness',
    summary:
      'Design investigation workflows and response runbooks around tamper-evident evidence and deterministic controls.',
    scope: [
      'SOC and SecOps runbook alignment',
      'Evidence handling and retention playbook',
      'Tabletop scenarios for runtime incidents',
    ],
  },
]

const deliverables = [
  {
    row: ['Architecture memo', 'Boundary mapping, threat assumptions, and rollout constraints'],
  },
  {
    row: ['Configuration baseline', 'Recommended defaults and environment-specific controls'],
  },
  {
    row: ['Validation checklist', 'Pilot gates for latency, resilience, and evidence consistency'],
  },
  {
    row: ['Handover notes', 'Operational ownership, escalation paths, and next-step plan'],
  },
]

const engagementModel = [
  {
    step: 'Discovery',
    description: 'Define scope, critical risks, and operational objectives.',
  },
  {
    step: 'Scoping',
    description: 'Produce an execution plan with milestones and ownership.',
  },
  {
    step: 'Execution',
    description: 'Run architecture/pilot/readiness workstream with checkpoints.',
  },
  {
    step: 'Handover',
    description: 'Transfer artifacts, recommendations, and operational guidance.',
  },
]

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <header className="flex flex-col gap-5 px-6 xl:px-12">
            <h1 className="font-heading font-bold text-3xl/8 md:text-5xl/14 xl:text-7xl/20 xl:max-w-8/12">
              Security engagement tracks for adoption and operations.
            </h1>
            <p className="font-sans text-base md:text-2xl xl:text-3xl/11 xl:max-w-8/12">
              Services are designed for SecOps, platform security teams, and MSSP environments that
              need deterministic runtime controls with forensic-grade evidence handling.
            </p>
          </header>
        </Container>
      </section>

      <Container>
        <Row />
      </Container>

      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <header className="flex flex-col gap-3 px-6 xl:px-12">
            <Badge variant="neutral">SERVICE TRACKS</Badge>
            <h2 className="font-heading font-bold text-2xl/6 md:text-4xl/11 xl:text-6xl/16">
              Pick the right workstream
            </h2>
          </header>

          <article className="grid grid-cols-1 gap-6 px-6 pt-8 xl:grid-cols-3 xl:px-12 xl:pt-12">
            {serviceTracks.map((track) => (
              <div key={track.title} className="border border-dashed border-(--border-accent) p-6">
                <h3 className="font-heading font-bold text-xl/6 xl:text-3xl/8">{track.title}</h3>
                <p className="mt-3 text-base xl:text-lg">{track.summary}</p>
                <ul className="mt-5 list-disc space-y-2 pl-5 text-sm xl:text-base">
                  {track.scope.map((item) => (
                    <li key={`${track.title}-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </article>
        </Container>
      </section>

      <Container>
        <Row />
      </Container>

      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <header className="flex flex-col gap-3 px-6 xl:px-12">
            <Badge variant="primary">DELIVERABLES</Badge>
            <h2 className="font-heading font-bold text-2xl/6 md:text-4xl/11 xl:text-6xl/16">
              What you get
            </h2>
          </header>

          <div className="px-6 pt-8 xl:px-12 xl:pt-12">
            <Table head={['Deliverable', 'Outcome']} body={deliverables} />
          </div>
        </Container>
      </section>

      <Container>
        <Row />
      </Container>

      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <header className="flex flex-col gap-3 px-6 xl:px-12">
            <Badge variant="secondary">ENGAGEMENT MODEL</Badge>
            <h2 className="font-heading font-bold text-2xl/6 md:text-4xl/11 xl:text-6xl/16">
              From scope to handover
            </h2>
          </header>

          <article className="grid grid-cols-1 gap-6 px-6 pt-8 xl:grid-cols-4 xl:px-12 xl:pt-12">
            {engagementModel.map((phase, index) => (
              <div key={phase.step} className="border border-dashed border-(--border-accent) p-6">
                <p className="text-xs font-mono text-(--border)">0{index + 1}</p>
                <h3 className="mt-2 font-heading font-bold text-xl/6">{phase.step}</h3>
                <p className="mt-3 text-sm xl:text-base">{phase.description}</p>
              </div>
            ))}
          </article>

          <div className="px-6 pt-10 xl:px-12 xl:pt-12 flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <Button variant="primary" href="/contact" size="lg">
              START A CONVERSATION
            </Button>
            <Button variant="secondary" href="/docs" size="lg">
              REVIEW DOCUMENTATION
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
