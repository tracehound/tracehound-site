import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Locale State Semantics',
  description:
    'Tracehound follows fail-open semantics: when the security subsystem encounters an error, traffic passes through rather than blocking.',
}

export default function LocaleStateSemantics() {
  return (
    <div className="flex flex-col min-h-screen px-6 xl:px-12">
      <DocsHeader
        label="GUIDES"
        title="Locale State Semantics"
        summary="This document outlines the general behaviour of the Tracehound instances."
      />

      <DocsPageLayout>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsPageLayout>

      <DocsNavigation
        prev={{
          href: '/docs/guides/fail-open-behaviour',
          title: 'Fail-Open Behaviour',
          summary: 'Tracehound error management',
        }}
        next={{
          href: '/docs/guides/performance-sla-specification',
          title: 'Performance SLA',
          summary: 'Latency guarantees and performance characteristics',
        }}
      />
    </div>
  )
}
