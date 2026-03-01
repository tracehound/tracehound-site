import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Argos',
  description: 'Runtime behavioral observation for threat detection.',
}

export default function Argos() {
  return (
    <div className="flex flex-col min-h-screen px-6 xl:px-12">
      <DocsHeader
        label="ECOSYSTEM"
        title="Argos"
        summary="Runtime behavioral observation for threat detection."
      />

      <DocsPageLayout>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsPageLayout>

      <DocsNavigation
        prev={{
          href: '/docs/ecosystem/core',
          title: 'Tracehound Core',
          summary: 'The main Tracehound package',
        }}
        next={{
          href: '/docs/ecosystem/talos',
          title: 'Talos',
          summary: 'External policy execution and decision routing',
        }}
      />
    </div>
  )
}
