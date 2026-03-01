import { DocsContent } from '@/app/components/docs-content'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Threat Model',
  description:
    'Deterministic security boundaries, predictable failure modes, and legal/liability constraints of the Tracehound Resilience Edge',
}

export default function ThreatModel() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Threat Model"
        summary="This document outlines the deterministic security boundaries, predictable failure modes,
          and legal/liability constraints of the Tracehound Resilience Edge."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/guides/evidence-lifecycle',
          title: 'Evidence Lifecycle',
          summary: 'Evidence retention, eviction and more',
        }}
        next={{
          href: '/docs/guides/cold-storage-security',
          title: 'Cold Storage Security',
          summary: 'Long-term archival layer for evidence',
        }}
      />
    </DocsPageLayout>
  )
}
