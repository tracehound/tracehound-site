import { DocsContent } from '@/app/components/docs-content'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'API References',
  description: 'Complete reference for the @tracehound/core package.',
}

export default function APIReferences() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="REFERENCES"
        title="API References"
        summary="Complete reference for the @tracehound/core package."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/references/configuration',
          title: 'Configuration',
          summary: 'All configuration options',
        }}
        next={{
          href: '/docs/references/examples',
          title: 'Examples',
          summary: 'Real-world examples',
        }}
      />
    </DocsPageLayout>
  )
}
