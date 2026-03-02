import { DocsContent } from '@/app/components/docs-content'
import { DocsContentBlock } from '@/app/components/docs-content-block'
import { DocsContentParagraph } from '@/app/components/docs-content-paragraph'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsList } from '@/app/components/docs-list'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import { Separator } from '@/app/components/separator'
import { Table } from '@/app/components/table'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Heimdall',
  description: 'WIP summary from RFC-0006: supply-chain security package.',
}

export default function Heimdall() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="ECOSYSTEM"
        title="Heimdall"
        summary="WIP summary from RFC-0006: supply-chain security package."
      />

      <DocsContent>
        <DocsContentBlock title="RFC Status">
          <DocsContentParagraph>
            Based on <strong>RFC-0006</strong>, Heimdall is in <strong>Draft</strong> state and
            positioned as a supply-chain security package with optional Tracehound integration.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Current Position (RFC-0006)">
          <Table
            head={['Item', 'Summary']}
            body={[
              { row: ['Classification', 'Can run standalone, can be integrated with core'] },
              { row: ['Main focus', 'Dependency/package integrity and CI workflow checks'] },
              {
                row: [
                  'Core components (RFC)',
                  'Scanner, CI/CD integration, source monitor, reports',
                ],
              },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="WIP Notes">
          <DocsList
            items={[
              <p key="w1">
                This page is RFC-level summary only and intentionally avoids speculative API docs.
              </p>,
              <p key="w2">
                Package surface should be documented after implementation lands in canonical
                sources.
              </p>,
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/ecosystem/huginn',
          title: 'Huginn',
          summary: 'External threat feed enrichment layer',
        }}
        next={{
          href: '/docs/ecosystem/loki',
          title: 'Loki',
          summary: 'Passive deception and tarpit layer',
        }}
      />
    </DocsPageLayout>
  )
}
