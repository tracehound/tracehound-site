import { DocsContent } from '@/app/components/docs-content'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Huginn',
  description: 'Threat intelligence ingestion and correlation.',
}

export default function Huginn() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="ECOSYSTEM"
        title="Huginn"
        summary="Threat intelligence ingestion and correlation."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/ecosystem/talos',
          title: 'Talos',
          summary: 'External policy execution and decision routing',
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
