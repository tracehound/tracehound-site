import { DocsContent } from '@/app/components/docs-content'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Concepts',
  description: "Understanding Tracehound's core concepts helps you use it effectively",
}

export default function Concepts() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Concepts"
        summary="Understanding Tracehound's core concepts helps you use it effectively"
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/references/advanced',
          title: 'Advanced',
          summary: 'Advanced configuration',
        }}
        next={{
          href: '/docs/guides/security-assurance',
          title: 'Security Assurance',
          summary: 'Facts, limitations, architectural',
        }}
      />
    </DocsPageLayout>
  )
}
