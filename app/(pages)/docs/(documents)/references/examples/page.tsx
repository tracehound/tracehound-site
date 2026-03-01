import { DocsContent } from '@/app/components/docs-content'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Real-world examples of Tracehound integration.',
}

export default function Examples() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="REFERENCES"
        title="Examples"
        summary="Real-world examples of Tracehound integration."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/references/api-reference',
          title: 'API References',
          summary: 'Complete reference for core',
        }}
        next={{
          href: '/docs/references/advanced',
          title: 'Concepts',
          summary: 'Advanced configuration',
        }}
      />
    </DocsPageLayout>
  )
}
