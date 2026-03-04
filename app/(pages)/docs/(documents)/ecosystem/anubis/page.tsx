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
  title: 'Anubis',
  description: 'Post-mortem forensic pipeline for reconstructing evidence chains.',
}

export default function Anubis() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="ECOSYSTEM"
        title="Anubis"
        summary="Draft summary from RFC-0012: post-mortem forensic pipeline, out-of-band pipeline for converting historical logs into tamper-evident evidence chains."
      />

      <DocsContent>
        <DocsContentBlock title="RFC Status">
          <DocsContentParagraph>
            Based on <strong>RFC-0012</strong>, Anubis is in <strong>Draft</strong> status and
            operates as a post-mortem forensic pipeline. It has no runtime enforcement authority and
            does not replace the core interception path.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Current Position (RFC-0012)">
          <Table
            head={['Item', 'Summary']}
            body={[
              { row: ['Timing model', 'Batch and out-of-band only (post-incident)'] },
              {
                row: [
                  'Primary role',
                  'Normalize logs to TEF and build Merkle-based evidence chains',
                ],
              },
              { row: ['Decision authority', 'None; archival and integrity pipeline only'] },
              { row: ['MVP connectors', 'json, cef (tracehound-export in later phase)'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="WIP Notes">
          <DocsList
            items={[
              <p key="w1">
                This page documents RFC-level behavior and not a finalized package API.
              </p>,
              <p key="w2">
                Correlation strategies and connector coverage are roadmap-bound and may evolve.
              </p>,
              <p key="w3">
                Legal admissibility notes in the RFC apply to processing-time proofs, not event-time
                guarantees.
              </p>,
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/ecosystem/loki',
          title: 'Loki',
          summary: 'Passive deception and tarpit layer',
        }}
        next={{
          href: '/docs/ecosystem/norns',
          title: 'Norns',
          summary: 'Pre-deployment security posture validation.',
        }}
      />
    </DocsPageLayout>
  )
}
