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
  title: 'Loki',
  description: 'WIP summary from RFC-0007: passive deception and tarpit layer.',
}

export default function Loki() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="ECOSYSTEM"
        title="Loki"
        summary="WIP summary from RFC-0007: passive deception and tarpit layer."
      />

      <DocsContent>
        <DocsContentBlock title="RFC Coverage">
          <DocsContentParagraph>
            This page is based on <strong>RFC-0007</strong>, which defines Loki conceptually as a
            passive deception and tarpit layer. The RFC does not currently define a final package
            contract in this repository.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Current Position (RFC-0007)">
          <Table
            head={['Item', 'Summary']}
            body={[
              { row: ['Strategic theme', 'Cost asymmetry via passive defense patterns'] },
              { row: ['Core concepts', 'Low-cost baits and protocol-level friction (tarpit)'] },
              { row: ['Integration note', 'Architecture integration is discussed at RFC level'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="WIP Notes">
          <DocsList
            items={[
              <p key="w1">
                No implementation snippets are included to avoid documenting assumptions.
              </p>,
              <p key="w2">
                API docs should be published only after canonical code/package availability.
              </p>,
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/ecosystem/heimdall',
          title: 'Heimdall',
          summary: 'Supply-chain security and dependency integrity checks',
        }}
        next={{
          href: '/docs/ecosystem/anubis',
          title: 'Anubis',
          summary: 'Post-mortem forensic control layer',
        }}
      />
    </DocsPageLayout>
  )
}
