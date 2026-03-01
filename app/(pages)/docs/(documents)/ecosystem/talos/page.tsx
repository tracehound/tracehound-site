import { DocsContent } from '@/app/components/docs-content'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Talos',
  description: 'External policy execution and decision routing.',
}

export default function Talos() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="ECOSYSTEM"
        title="Talos"
        summary="External policy execution and decision routing."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/ecosystem/argos',
          title: 'Argos',
          summary: 'Runtime behavioral observation for threat detection',
        }}
        next={{
          href: '/docs/ecosystem/huginn',
          title: 'Huginn',
          summary: 'Threat intelligence ingestion and correlation',
        }}
      />
    </DocsPageLayout>
  )
}
