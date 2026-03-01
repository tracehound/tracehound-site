import { DocsContent } from '@/app/components/docs-content'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Quickstart',
  description: 'Get Tracehound running in your Node.js application in under 5 minutes.',
}

export default function Quickstart() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GETTING STARTED"
        title="Quickstart"
        summary="Get Tracehound running in your Node.js application in under 5 minutes."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/getting-started/introduction',
          title: 'Introduction',
          summary: 'Introduction of core package',
        }}
        next={{
          href: '/docs/references/configuration',
          title: 'Configuration',
          summary: 'All configuration options',
        }}
      />
    </DocsPageLayout>
  )
}
