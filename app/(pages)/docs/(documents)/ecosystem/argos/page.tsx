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
  title: 'Argos',
  description: 'Runtime behavioral observation for threat detection.',
}

export default function Argos() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="ECOSYSTEM"
        title="Argos"
        summary="WIP summary from RFC-0002: runtime behavioral observer as a separate product."
      />

      <DocsContent>
        <DocsContentBlock title="RFC Status">
          <DocsContentParagraph>
            Based on <strong>RFC-0002</strong>, Argos is in <strong>Draft</strong> state and
            defined as a standalone observer product (`@argos/core` in the RFC text), not as an
            implemented package in the current `tracehound` monorepo.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Current Position (RFC-0002)">
          <Table
            head={['Item', 'Summary']}
            body={[
              { row: ['Classification', 'Non-authoritative, observation-only layer'] },
              { row: ['Trust model', 'Signals must be cross-validated before escalation'] },
              { row: ['Decision authority', 'No blocking/decision role by itself'] },
              { row: ['Integration', 'Optional integration path with Tracehound core'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="WIP Notes">
          <DocsList
            items={[
              <p key="w1">This page intentionally avoids implementation snippets until RFC-to-code alignment exists.</p>,
              <p key="w2">No package API is documented here as canonical current-core behavior.</p>,
              <p key="w3">When implemented, this page should be revised against concrete package exports and tests.</p>,
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/ecosystem/core',
          title: 'Tracehound Core',
          summary: 'The main Tracehound package',
        }}
        next={{
          href: '/docs/ecosystem/talos',
          title: 'Talos',
          summary: 'External policy execution and decision routing',
        }}
      />
    </DocsPageLayout>
  )
}
