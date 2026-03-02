import { Badge } from '@/app/components/badge'
import { Button } from '@/app/components/button'
import { Container } from '@/app/components/container'
import { Row } from '@/app/components/patterns/row'
import { Table } from '@/app/components/table'
import Link from 'next/link'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact channels and engagement paths for Tracehound.',
}

const contactTracks = [
  {
    title: 'Architecture & Deployment',
    description:
      'For runtime integration design, rollout strategy, and environment hardening decisions.',
    ctaLabel: 'Go to Services',
    ctaHref: '/services',
  },
  {
    title: 'Docs & Technical Questions',
    description:
      'For package behavior, API boundaries, and implementation-level guidance before adoption.',
    ctaLabel: 'Open Documentation',
    ctaHref: '/docs',
  },
  {
    title: 'Business & Partnership',
    description:
      'For commercial collaborations, consulting scopes, and strategic security programs.',
    ctaLabel: 'Visit Cluster 127',
    ctaHref: 'https://www.cluster127.com/contact',
  },
]

const responseMatrix = [
  {
    row: ['Architecture session request', 'Services channel', '1-2 business days'],
  },
  {
    row: ['Technical clarification', 'Documentation channel', 'Best effort, async'],
  },
  {
    row: ['Partnership inquiry', 'Business channel', '2-3 business days'],
  },
]

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <header className="flex flex-col gap-5 px-6 xl:px-12">
            <h1 className="font-heading font-bold text-3xl/8 md:text-5xl/14 xl:text-7xl/20 xl:max-w-8/12">
              Route your request to the right security workflow.
            </h1>
            <p className="font-sans text-base md:text-2xl xl:text-3xl/11 xl:max-w-8/12">
              Tracehound uses focused communication tracks so SecOps teams can get faster and more
              actionable responses. Pick your path below based on request type.
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
            <Badge variant="neutral">CONTACT TRACKS</Badge>
            <h2 className="font-heading font-bold text-2xl/6 md:text-4xl/11 xl:text-6xl/16">
              Choose a channel
            </h2>
          </header>

          <article className="grid grid-cols-1 gap-6 px-6 pt-8 xl:grid-cols-3 xl:px-12 xl:pt-12">
            {contactTracks.map((track) => (
              <div
                key={track.title}
                className="border border-dashed border-(--border-accent) p-6 flex flex-col">
                <h3 className="font-heading font-bold text-xl/6 xl:text-3xl/8">{track.title}</h3>
                <p className="mt-3 text-base xl:text-lg flex-1">{track.description}</p>
                {track.ctaHref.startsWith('http') ? (
                  <a
                    href={track.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex border border-dashed border-(--border-accent) px-3 py-1.5 text-sm font-bold hover:bg-(--accent-primary)/20 transition-colors w-fit">
                    {track.ctaLabel}
                  </a>
                ) : (
                  <Button href={track.ctaHref} variant="light" size="sm" className="mt-6 w-fit">
                    {track.ctaLabel}
                  </Button>
                )}
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
            <Badge variant="primary">RESPONSE TARGETS</Badge>
            <h2 className="font-heading font-bold text-2xl/6 md:text-4xl/11 xl:text-6xl/16">
              Expected response windows
            </h2>
          </header>

          <div className="px-6 pt-8 xl:px-12 xl:pt-12">
            <Table
              head={['Request Type', 'Preferred Channel', 'Target Response']}
              body={responseMatrix}
            />
          </div>
        </Container>
      </section>

      <Container>
        <Row />
      </Container>

      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <header className="flex flex-col gap-3 px-6 xl:px-12">
            <Badge variant="secondary">MESSAGE TEMPLATE</Badge>
            <h2 className="font-heading font-bold text-2xl/6 md:text-4xl/11 xl:text-6xl/16">
              Include these fields for faster triage
            </h2>
          </header>

          <article className="px-6 pt-8 xl:px-12 xl:pt-12">
            <div className="border border-dashed border-(--border-accent) p-6 font-mono text-xs md:text-sm whitespace-pre-wrap">
              Request Type: Architecture | Technical | Partnership{`\n`}
              Organization / Team: {`<name>`}
              {`\n`}
              Environment: Cloud / On-Prem / Hybrid{`\n`}
              Current Stage: Evaluation / Pilot / Production{`\n`}
              Target Packages: Core, Argos, Talos, etc.{`\n`}
              Main Constraint: Latency / Compliance / Integration / Cost{`\n`}
              Expected Timeline: {`<date range>`}
              {`\n`}
              Notes: {`<context + objective>`}
            </div>

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
          </article>
        </Container>
      </section>
    </div>
  )
}
