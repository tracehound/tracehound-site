import { DocsContent } from '@/app/components/docs-content'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Cold Storage Security',
  description: 'Cold Storage is the long-term archival layer for evidence.',
}

export default function ColdStorageSecurity() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Cold Storage Security"
        summary="Cold Storage is the long-term archival layer for evidence. This document specifies
          security requirements for production adapters (S3, R2, GCS)."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/guides/threat-model',
          title: 'Threat Model',
          summary: 'Security boundaries, legal/liability and more',
        }}
        next={{
          href: '/docs/guides/fail-open-behaviour',
          title: 'Fail-Open Behaviour',
          summary: 'Tracehound error management',
        }}
      />
    </DocsPageLayout>
  )
}
