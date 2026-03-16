import { Badge } from '@/app/components/badge'
import { Button } from '@/app/components/button'
import { Container } from '@/app/components/container'
import { Row } from '@/app/components/patterns/row'
import { Table } from '@/app/components/table'
import type { Metadata } from 'next/types'
import { architectureLayers, guarantees, operationalFlows, packages, statusClass } from './data'

export const metadata: Metadata = {
  title: 'Packages',
  description:
    'Public Tracehound package overview: shipped OSS package roles, operational flows, and current implementation status.',
}

export default function PackagesPage() {
  return (
    <>
      <Container>
        <Row />

        <header className="relative z-10 w-full bg-(--background) flex flex-col items-center gap-8 mb-px py-16 lg:py-24 px-6 xl:px-12">
          <h2 className="font-heading text-center text-3xl/8 md:text-5xl/14 xl:text-7xl/20">
            Public package topology for <br className="hidden xl:inline" />
            <strong>runtime security operations.</strong>
          </h2>
          <p className="font-sans text-base text-center md:text-xl xl:text-3xl/10 xl:max-w-7/12">
            Current OSS surface is intentionally narrow: one runtime engine, two framework adapters,
            and one snapshot-backed operator toolchain. This page tracks shipped package truth, not
            draft ecosystem direction.
          </p>
          <div className="flex flex-col gap-4 items-center md:flex-row md:gap-8 md:justify-center-safe">
            <Button variant="primary" href="/docs" size="lg">
              READ DOCUMENTATION
            </Button>
            <Button variant="secondary" href="/changelog" size="lg">
              REVIEW CHANGELOG
            </Button>
          </div>
        </header>

        <Row />
      </Container>

      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <header className="w-full flex flex-col items-center gap-3 px-6 xl:px-12">
            <Badge variant="secondary">ARCHITECTURE MAP</Badge>
            <h2 className="font-heading font-bold text-2xl/6 xl:text-5xl/12">
              Three current operational planes
            </h2>
          </header>

          <article className="grid grid-cols-1 gap-8 px-6 pt-8 xl:grid-cols-3 xl:px-12 xl:pt-12">
            {architectureLayers.map((layer) => (
              <div
                key={layer.title}
                className="border border-dashed border-(--border-accent) p-6 bg-(--background)">
                <h3 className="font-heading font-bold text-xl/6 xl:text-3xl/8">{layer.title}</h3>
                <p className="mt-3 text-base xl:text-lg">{layer.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {layer.members.map((member) => (
                    <li
                      key={`${layer.title}-${member}`}
                      className="border border-dashed border-(--border-accent) bg-(--border-accent)/10 px-2.5 py-1 text-xs font-mono">
                      {member}
                    </li>
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
          <header className="w-full items-center flex flex-col gap-3 px-6 xl:px-12">
            <Badge variant="secondary">PACKAGE CATALOG</Badge>
            <h2 className="font-heading font-bold text-2xl/6 xl:text-5xl/12">
              Responsibilities, boundaries, and current docs
            </h2>
          </header>

          <article className="grid grid-cols-1 gap-6 px-6 pt-8 xl:grid-cols-2 xl:px-12 xl:pt-12">
            {packages.map((pkg) => (
              <div key={pkg.name} id={pkg.slug} className="p-6 bg-(--background)">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-heading font-bold text-xl/6 xl:text-3xl/8">{pkg.name}</h3>
                  <span
                    className={`border px-2 py-0.5 text-xs font-bold font-heading ${statusClass[pkg.status]}`}>
                    {pkg.status}
                  </span>
                </div>
                <p className="mt-1 text-xs font-mono text-(--border)">{pkg.layer}</p>
                <p className="mt-4 text-base xl:text-lg">{pkg.summary}</p>
                <dl className="mt-5 flex flex-col gap-2 mb-5 text-sm xl:text-base">
                  <div>
                    <dt className="font-bold">When to use</dt>
                    <dd>{pkg.whenToUse}</dd>
                  </div>
                  <div>
                    <dt className="font-bold">Input</dt>
                    <dd>{pkg.input}</dd>
                  </div>
                  <div>
                    <dt className="font-bold">Output</dt>
                    <dd>{pkg.output}</dd>
                  </div>
                </dl>
                <Button href={pkg.href} variant="light" size="sm">
                  Open relevant docs
                </Button>
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
          <header className="w-full items-center flex flex-col gap-3 px-6 xl:px-12">
            <Badge variant="secondary">OPERATIONAL FLOWS</Badge>
            <h2 className="font-heading font-bold text-2xl/6 xl:text-5xl/12">
              How shipped packages compose in real operations
            </h2>
          </header>

          <article className="grid grid-cols-1 gap-8 px-6 pt-8 xl:grid-cols-3 xl:px-12 xl:pt-12">
            {operationalFlows.map((flow) => (
              <div key={flow.name} className="p-6 bg-(--background)">
                <h3 className="font-heading font-bold text-base xl:text-xl/5">{flow.name}</h3>
                <p className="mt-3 text-base xl:text-lg">{flow.objective}</p>
                <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm xl:text-base">
                  {flow.sequence.map((step) => (
                    <li key={`${flow.name}-${step}`}>{step}</li>
                  ))}
                </ol>
                <div className="mt-5 flex flex-wrap gap-2">
                  {flow.packages.map((name) => (
                    <span
                      key={`${flow.name}-${name}`}
                      className="border border-dashed border-(--border-accent) bg-(--background) px-2.5 py-1 text-xs font-mono">
                      {name}
                    </span>
                  ))}
                </div>
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
          <article className="grid grid-cols-1 gap-6">
            <header className="w-full items-center flex flex-col gap-3 px-6 xl:px-12">
              <Badge variant="secondary">INTEGRATION PATTERNS</Badge>
              <h2 className="font-heading font-bold text-2xl/6 xl:text-5xl/12">
                Recommended public package bundles
              </h2>
            </header>

            <div className="px-6 pt-8 xl:px-12 xl:pt-12">
              <div className="overflow-x-auto">
                <Table
                  head={['Pattern', 'Packages', 'Best For', 'Tradeoff']}
                  body={[
                    {
                      row: [
                        'Core Only',
                        '@tracehound/core',
                        'Custom application wiring and explicit intercept ownership',
                        'You own all framework integration details',
                      ],
                    },
                    {
                      row: [
                        'Express Runtime',
                        '@tracehound/core + @tracehound/express',
                        'Express services that want standard middleware semantics',
                        'Adapter behavior stays intentionally thin and opinionated',
                      ],
                    },
                    {
                      row: [
                        'Fastify Runtime + CLI',
                        '@tracehound/core + @tracehound/fastify + @tracehound/cli',
                        'Fastify services with operator watch/status workflows',
                        'Requires signed snapshot export for truthful CLI reads',
                      ],
                    },
                  ]}
                />
              </div>
            </div>
          </article>
        </Container>
      </section>

      <Container>
        <Row />
      </Container>

      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <article className="grid grid-cols-1 gap-6">
            <header className="w-full items-center flex flex-col gap-3 px-6 xl:px-12">
              <Badge variant="secondary">TRUST & GUARANTEES</Badge>
              <h2 className="font-heading font-bold text-2xl/6 xl:text-5xl/12">
                Runtime properties exposed by current OSS packages
              </h2>
            </header>

            <article className="grid grid-cols-1 gap-6 px-6 pt-8 xl:grid-cols-3 xl:px-12 xl:pt-12">
              {guarantees.map((guarantee) => (
                <div
                  key={guarantee.title}
                  className="border border-dashed border-(--border-accent) p-6 bg-(--background)">
                  <h3 className="font-heading font-bold text-xl/6">{guarantee.title}</h3>
                  <p className="mt-3 text-base">{guarantee.description}</p>
                </div>
              ))}
            </article>
          </article>
        </Container>
      </section>

      <Container>
        <Row />
      </Container>

      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <header className="w-full items-center flex flex-col gap-3 px-6 xl:px-12">
            <Badge variant="secondary">CURRENT STATUS</Badge>
            <h2 className="font-heading font-bold text-2xl/6 xl:text-5xl/12">
              Public implementation maturity
            </h2>
            <p className="text-center text-base md:text-lg xl:text-2xl xl:max-w-8/12">
              This page intentionally tracks shipped OSS packages only. Draft package names,
              internal tracks, and RFC-only concepts are excluded from this status view.
            </p>
          </header>

          <div className="px-6 pt-8 xl:px-12 xl:pt-12">
            <div className="overflow-x-auto">
              <Table
                head={['Status', 'Meaning', 'Packages']}
                body={[
                  {
                    row: [
                      <span
                        key="status-released"
                        className={`border px-2 py-0.5 text-xs font-bold font-heading ${statusClass.RELEASED}`}>
                        RELEASED
                      </span>,
                      'Implemented in the repository and represented in current docs/changelog.',
                      '@tracehound/core, @tracehound/express, @tracehound/fastify, @tracehound/cli',
                    ],
                  },
                ]}
              />
            </div>
          </div>

          <div className="px-6 pt-10 xl:px-12 xl:pt-12 flex flex-col w-full items-center gap-4 md:flex-row md:justify-center md:gap-8">
            <Button variant="primary" href="/docs/references/api-reference" size="lg">
              START WITH CORE
            </Button>
            <Button variant="secondary" href="/docs/getting-started/quickstart" size="lg">
              REVIEW ADAPTER SETUP
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
