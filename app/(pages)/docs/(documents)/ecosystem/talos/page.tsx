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
  title: 'Talos',
  description: 'External policy execution and decision routing.',
}

export default function Talos() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="ECOSYSTEM"
        title="Talos"
        summary="WIP summary from RFC-0003: external policy-driven response boundary."
      />

      <DocsContent>
        <DocsContentBlock title="RFC Status">
          <DocsContentParagraph>
            Based on <strong>RFC-0003</strong>, Talos is currently
            <strong> Placeholder (v2.0.0 scope)</strong>. It is not documented as an implemented
            package in this repository.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Current Position (RFC-0003)">
          <Table
            head={['Item', 'Summary']}
            body={[
              { row: ['Core principle', 'External policy control'] },
              {
                row: ['Decision authority', 'Talos/ResponseEngine does not make decisions itself'],
              },
              { row: ['Role', 'Executes response actions from external policy outcomes'] },
              { row: ['Dependency context', 'Defined relative to core RFC model'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="WIP Notes">
          <DocsList
            items={[
              <p key="w1">This page intentionally keeps to RFC-level semantics only.</p>,
              <p key="w2">
                No runtime API, SDK usage, or config contract is treated as current-core canonical.
              </p>,
              <p key="w3">
                Production documentation should be published after package-level implementation
                exists.
              </p>,
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/ecosystem/argos',
          title: 'Argos',
          summary: 'Runtime behavioral observation for threat detection',
        }}
        next={{
          href: '/docs/ecosystem/muninn',
          title: 'Muninn',
          summary: 'Historical ledger and time-series aggregation',
        }}
      />
    </DocsPageLayout>
  )
}
