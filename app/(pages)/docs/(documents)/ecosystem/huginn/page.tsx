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
  title: 'Huginn',
  description: 'Threat intelligence ingestion and correlation.',
}

export default function Huginn() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="ECOSYSTEM"
        title="Huginn"
        summary="WIP summary from RFC-0005: external threat feed enrichment layer."
      />

      <DocsContent>
        <DocsContentBlock title="RFC Status">
          <DocsContentParagraph>
            Based on <strong>RFC-0005</strong>, Huginn is currently
            <strong> Placeholder (v2.0.0 scope)</strong> and positioned as an external integration
            layer, not a shipped package in this repository.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Current Position (RFC-0005)">
          <Table
            head={['Item', 'Summary']}
            body={[
              { row: ['Core principle', 'Enrichment, not detection'] },
              { row: ['Authority', 'Does not produce final threat decisions'] },
              { row: ['Input domain', 'External threat feed/intel sources'] },
              { row: ['Output intent', 'Context enrichment for downstream workflows'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="WIP Notes">
          <DocsList
            items={[
              <p key="w1">
                No package-level API contract is treated as canonical in current core docs.
              </p>,
              <p key="w2">
                Reference sources in RFC are non-normative and should not be read as implemented
                support.
              </p>,
              <p key="w3">
                This page will move from RFC summary to API reference after implementation.
              </p>,
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/ecosystem/muninn',
          title: 'Muninn',
          summary: 'Historical ledger and time-series aggregation',
        }}
        next={{
          href: '/docs/ecosystem/heimdall',
          title: 'Heimdall',
          summary: 'Supply-chain security package',
        }}
      />
    </DocsPageLayout>
  )
}
