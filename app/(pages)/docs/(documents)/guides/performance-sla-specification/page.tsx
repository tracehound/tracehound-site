import { DocsContent } from '@/app/components/docs-content'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Performance SLA Specification',
  description: 'Latency guarantees and performance characteristics for Tracehound core operations',
}

export default function PerformanceSLASpecification() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Performance SLA Specification"
        summary="This document specifies latency guarantees and performance characteristics for Tracehound
          core operations."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/guides/local-state-semantics',
          title: 'Locale State Semantics',
          summary: 'General behaviour of the instances.',
        }}
        next={{
          href: '/docs/ecosystem/core',
          title: 'Tracehound Core',
          summary: 'The main Tracehound package',
        }}
      />
    </DocsPageLayout>
  )
}
