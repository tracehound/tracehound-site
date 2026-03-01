import { DocsContent } from '@/app/components/docs-content'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Advanced',
  description: 'Advanced configuration for production deployments.',
}

export default function Advanced() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="REFERENCES"
        title="Advanced"
        summary="Advanced configuration for production deployments."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/references/examples',
          title: 'Examples',
          summary: 'Real-world examples',
        }}
        next={{
          href: '/docs/guides/concepts',
          title: 'Concepts',
          summary: "Tracehound's core concepts",
        }}
      />
    </DocsPageLayout>
  )
}
