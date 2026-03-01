import { DocsContent } from '@/app/components/docs-content'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Furies',
  description: 'Chaos engineering for security infrastructure.',
}

export default function Furies() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="ECOSYSTEM"
        title="Furies"
        summary="Chaos engineering for security infrastructure."
      />

      <DocsContent>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/ecosystem/norns',
          title: 'Norns',
          summary: 'Pre-deployment security posture validation',
        }}
        next={{
          href: '/docs/ecosystem/watchtower',
          title: 'Watchtower',
          summary: 'Forensic cockpit and operational dashboards',
        }}
      />
    </DocsPageLayout>
  )
}
