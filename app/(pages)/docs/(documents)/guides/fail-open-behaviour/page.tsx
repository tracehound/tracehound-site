import { DocsContent } from '@/app/components/docs-content'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Fail-Open Behaviour',
  description:
    'Tracehound follows fail-open semantics: when the security subsystem encounters an error, traffic passes through rather than blocking.',
}

export default function ThreatModel() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Fail-Open Behaviour"
        summary="Tracehound follows fail-open semantics: when the security subsystem encounters an error,
          traffic passes through rather than blocking. This prevents security tooling from becoming
          a denial-of-service vector."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/guides/cold-storage-security',
          title: 'Cold Storage Security',
          summary: 'Long-term archival layer for evidence',
        }}
        next={{
          href: '/docs/guides/local-state-semantics',
          title: 'Locale State Semantics',
          summary: 'General behaviour of the instances',
        }}
      />
    </DocsPageLayout>
  )
}
