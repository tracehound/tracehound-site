import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Watchtower',
  description: 'Forensic cockpit and operational dashboards.',
}

export default function Watchtower() {
  return (
    <div className="flex flex-col min-h-screen px-6 xl:px-12">
      <DocsHeader
        label="ECOSYSTEM"
        title="Watchtower"
        summary="Forensic cockpit and operational dashboards."
      />

      <DocsPageLayout>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsPageLayout>

      <DocsNavigation
        prev={{
          href: '/docs/ecosystem/furies',
          title: 'Furies',
          summary: 'Chaos engineering for security infrastructure',
        }}
      />
    </div>
  )
}
