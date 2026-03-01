import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Configuration',
  description: 'All configuration options for Tracehound components with recommended defaults.',
}

export default function Configuration() {
  return (
    <div className="flex flex-col min-h-screen px-6 xl:px-12">
      <DocsHeader
        label="REFERENCES"
        title="Configuration"
        summary="All configuration options for Tracehound components with recommended defaults."
      />

      <DocsPageLayout>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsPageLayout>

      <DocsNavigation
        prev={{
          href: '/docs/getting-started/quickstart',
          title: 'Quickstart',
          summary: 'Get running in 5 minutes',
        }}
        next={{
          href: '/docs/references/api-reference',
          title: 'API References',
          summary: 'Complete reference for core',
        }}
      />
    </div>
  )
}
