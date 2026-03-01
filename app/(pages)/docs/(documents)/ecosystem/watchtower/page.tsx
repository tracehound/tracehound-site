import { DocsContent } from '@/app/components/docs-content'
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
    <DocsPageLayout>
      <DocsHeader
        label="ECOSYSTEM"
        title="Watchtower"
        summary="Forensic cockpit and operational dashboards."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/ecosystem/furies',
          title: 'Furies',
          summary: 'Chaos engineering for security infrastructure',
        }}
      />
    </DocsPageLayout>
  )
}
