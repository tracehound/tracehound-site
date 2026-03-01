import { DocsContent } from '@/app/components/docs-content'
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
    <DocsPageLayout>
      <DocsHeader
        label="REFERENCES"
        title="Configuration"
        summary="All configuration options for Tracehound components with recommended defaults."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

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
    </DocsPageLayout>
  )
}
