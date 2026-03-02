import { Badge } from '@/app/components/badge'
import { Button } from '@/app/components/button'
import { Container } from '@/app/components/container'
import { EcosystemCanvas } from '@/app/components/ecosystem-canvas'
import { Row } from '@/app/components/patterns/row'
import { Table } from '@/app/components/table'
import type { Metadata } from 'next/types'
import { architectureLayers, guarantees, operationalFlows, packages, statusClass } from './data'

export const metadata: Metadata = {
  title: 'Ecosystem',
  description:
    'Tracehound ecosystem overview: package roles, operational flows, integration patterns, and roadmap status for SecOps teams.',
}

export default function EcosystemPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Container>
        <Row />

        <header className="relative z-10 w-full bg-(--background) flex flex-col items-center gap-8 mb-px py-16 lg:py-24 px-6 xl:px-12">
          <EcosystemCanvas />
          <h2 className="font-heading text-center text-3xl/8 md:text-5xl/14 xl:text-7xl/20">
            Package topology for <br className="hidden xl:inline" />
            <strong>runtime security operations.</strong>
          </h2>
          <p className="font-sans text-base text-center md:text-xl xl:text-3xl/10 xl:max-w-7/12">
            The Tracehound ecosystem is organized as composable packages for detection,
            decision-routing, evidence durability, and operational assurance. Each package has a
            narrow contract so SecOps teams can adopt capabilities incrementally without changing
            core runtime guarantees.
          </p>
          <div className="flex flex-col gap-4 items-center md:flex-row md:gap-8 md:justify-center-safe">
            <Button variant="primary" href="/docs" size="lg">
              READ DOCUMENTATION
            </Button>
            <Button variant="secondary" href="/services" size="lg">
              INITIALIZE RUNTIME
            </Button>
          </div>
        </header>

        <Row />
      </Container>

      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <header className="w-full flex flex-col items-center gap-3 px-6 xl:px-12">
            <Badge variant="neutral">ARCHITECTURE MAP</Badge>
            <h2 className="font-heading font-bold text-2xl/6 xl:text-5xl/12">
              Three operational planes
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
            <Badge variant="primary">PACKAGE CATALOG</Badge>
            <h2 className="font-heading font-bold text-2xl/6 xl:text-5xl/12">
              Responsibilities, boundaries, and status
            </h2>
          </header>

          <article className="grid grid-cols-1 gap-6 px-6 pt-8 xl:grid-cols-2 xl:px-12 xl:pt-12">
            {packages.map((pkg) => (
              <div key={pkg.name} className="p-6 bg-(--background)">
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
                <p className="mb-5 text-xs font-mono text-(--border)">
                  Standalone by default. Can form native bonds with other packages when needed.
                </p>
                <Button href={`/docs/ecosystem/${pkg.slug}`} variant="light" size="sm">
                  Open {pkg.name} docs
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
              How packages compose in real operations
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
          <header className="w-full items-center flex flex-col gap-3 px-6 xl:px-12">
            <Badge variant="neutral">INTEGRATION PATTERNS</Badge>
            <h2 className="font-heading font-bold text-2xl/6 xl:text-5xl/12">
              Recommended package bundles
            </h2>
          </header>

          <div className="px-6 pt-8 xl:px-12 xl:pt-12">
            <Table
              head={['Pattern', 'Packages', 'Best For', 'Tradeoff']}
              body={[
                {
                  row: [
                    'Minimal Runtime Guard',
                    'Core + Argos + Muninn',
                    'Fast adoption with forensic baseline',
                    'Limited policy orchestration',
                  ],
                },
                {
                  row: [
                    'Policy-Driven Response',
                    'Core + Argos + Talos + Muninn',
                    'Teams with centralized security policy governance',
                    'More policy lifecycle overhead',
                  ],
                },
                {
                  row: [
                    'Enterprise Visibility',
                    'Core + Argos + Muninn + Huginn + Watchtower',
                    'SOC teams running cross-system investigations',
                    'Higher integration and operations complexity',
                  ],
                },
              ]}
            />
          </div>
        </Container>
      </section>

      <Container>
        <Row />
      </Container>

      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <header className="w-full items-center flex flex-col gap-3 px-6 xl:px-12">
            <Badge variant="primary">TRUST & GUARANTEES</Badge>
            <h2 className="font-heading font-bold text-2xl/6 xl:text-5xl/12">
              Non-negotiable runtime properties
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
        </Container>
      </section>

      <Container>
        <Row />
      </Container>

      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <header className="w-full items-center flex flex-col gap-3 px-6 xl:px-12">
            <Badge variant="secondary">ROADMAP STATE</Badge>
            <h2 className="font-heading font-bold text-2xl/6 xl:text-5xl/12">
              Current implementation maturity
            </h2>
            <p className="text-center text-base md:text-lg xl:text-2xl xl:max-w-8/12">
              Status labels are intentionally explicit so teams can distinguish production-ready
              surfaces from RFC-level interfaces before making rollout decisions.
            </p>
          </header>

          <div className="px-6 pt-8 xl:px-12 xl:pt-12">
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
                    'Ready for production use under documented boundaries.',
                    'Core',
                  ],
                },
                {
                  row: [
                    <span
                      key="status-wip"
                      className={`border px-2 py-0.5 text-xs font-bold font-heading ${statusClass.WIP}`}>
                      WIP
                    </span>,
                    'Concept and docs exist; package is under active development.',
                    'Argos',
                  ],
                },
                {
                  row: [
                    <span
                      key="status-rfc"
                      className={`border px-2 py-0.5 text-xs font-bold font-heading ${statusClass.RFC}`}>
                      RFC
                    </span>,
                    'Contract direction is defined; implementation is not final.',
                    'Talos, Muninn, Huginn, Heimdall, Loki, Norns, Furies, Watchtower',
                  ],
                },
              ]}
            />
          </div>

          <div className="px-6 pt-10 xl:px-12 xl:pt-12 flex flex-col w-full items-center gap-4 md:flex-row md:justify-center md:gap-8">
            <Button variant="primary" href="/docs/ecosystem/core" size="lg">
              START WITH CORE
            </Button>
            <Button variant="secondary" href="/docs/ecosystem/argos" size="lg">
              EXPLORE ARGOS
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
