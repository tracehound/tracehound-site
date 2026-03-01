import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Evidence Lifecycle Policy',
  description: 'Evidence retention, eviction, and cleanup policies.',
}

export default function EvidenceLifecycle() {
  return (
    <div className="flex flex-col min-h-screen px-6 xl:px-12">
      <DocsHeader
        label="GUIDES"
        title="Evidence Lifecycle Policy"
        summary="This document specifies evidence retention, eviction, and cleanup policies."
      />

      <DocsPageLayout>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsPageLayout>

      <DocsNavigation
        prev={{
          href: '/docs/guides/security-assurance',
          title: 'Security Assurance',
          summary: 'Facts, limitations, architectural',
        }}
        next={{
          href: '/docs/guides/threat-model',
          title: 'Threat Model',
          summary: 'Security boundaries, legal/liability and more',
        }}
      />
    </div>
  )
}
