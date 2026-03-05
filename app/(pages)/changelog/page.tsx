import { Badge } from '@/app/components/badge'
import { Container } from '@/app/components/container'
import { Row } from '@/app/components/patterns/row'
import { Table } from '@/app/components/table'
import { changelogGeneratedAt, recentReleases, timelineRows } from './data.generated'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Release history and engineering change highlights for @tracehound/core.',
}

export default function Changelog() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-16 lg:py-24">
        <Container>
          <header className="flex flex-col gap-5 px-6 xl:px-12">
            <Badge variant="neutral">CHANGELOG</Badge>
            <h1 className="font-heading font-bold text-3xl/8 md:text-5xl/14 xl:text-7xl/20 xl:max-w-8/12">
              Core release history and security engineering progression.
            </h1>
            <p className="font-sans text-base md:text-2xl xl:text-3xl/11 xl:max-w-8/12">
              This page is generated from <strong>@tracehound/core</strong> changelog notes and
              summarizes major release-level changes for SecOps and platform teams.
            </p>
            <div className="border border-dashed border-(--warning) bg-(--background) p-4">
              <p className="font-mono text-xs text-(--warning)">MIGRATION WARNING</p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm xl:text-base">
                <li>CLI <strong>status/stats/watch</strong> now requires verified snapshot input.</li>
                <li>Fastify adapter default export was removed; use <strong>tracehoundPlugin</strong>.</li>
                <li>Custom <strong>IAgent</strong> adapters must implement <strong>getStats()</strong>.</li>
              </ul>
              <p className="mt-3 text-sm">
                See <a className="underline" href="/docs/references/configuration">Configuration</a>,{' '}
                <a className="underline" href="/docs/references/api-reference">API Reference</a>, and{' '}
                <a className="underline" href="/docs/getting-started/quickstart">Quickstart</a> for migration details.
              </p>
            </div>
            <p className="text-xs font-mono text-(--border)">
              Last synced: {new Date(changelogGeneratedAt).toISOString()}
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
            <Badge variant="secondary">LATEST RELEASES</Badge>
            <h2 className="font-heading font-bold text-2xl/6 md:text-4xl/11 xl:text-6xl/16">
              Detailed updates
            </h2>
          </header>

          <article className="grid grid-cols-1 gap-6 px-6 pt-8 xl:px-12 xl:pt-12">
            {recentReleases.map((release) => (
              <div
                key={release.version}
                className="border border-dashed border-(--border-accent) p-6 hover:bg-(--background) transition-colors">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary">v{release.version}</Badge>
                  <time className="text-xs font-mono text-(--border)">{release.date}</time>
                </div>
                <h3 className="mt-3 font-heading font-bold text-xl/6 xl:text-3xl/8">
                  {release.title}
                </h3>
                <p className="mt-3 text-base xl:text-lg">{release.summary}</p>
                {release.highlights.length > 0 && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm xl:text-base">
                    {release.highlights.map((item) => (
                      <li key={`${release.version}-${item}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>
        </Container>
      </section>

      {timelineRows.length > 0 && (
        <>
          <Container>
            <Row />
          </Container>

          <section className="relative w-full py-16 lg:py-24">
            <Container>
              <header className="flex flex-col gap-3 px-6 xl:px-12">
                <Badge variant="secondary">VERSION TIMELINE</Badge>
                <h2 className="font-heading font-bold text-2xl/6 md:text-4xl/11 xl:text-6xl/16">
                  Older releases
                </h2>
              </header>

              <div className="px-6 pt-8 xl:px-12 xl:pt-12">
                <Table
                  head={['Version', 'Date/Phase', 'Key Focus']}
                  body={timelineRows.map((row) => ({
                    row: [row.version, row.date, row.title],
                  }))}
                />
              </div>
            </Container>
          </section>
        </>
      )}
    </div>
  )
}
