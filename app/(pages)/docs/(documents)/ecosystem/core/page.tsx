import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Tracehound Core',
  description: 'The main Tracehound package.',
}

export default function Core() {
  return (
    <div className="flex flex-col min-h-screen px-6 xl:px-12">
      <DocsHeader
        label="ECOSYSTEM"
        title="Core"
        summary="The main Tracehound package. Includes everything you need to quarantine threats and
          preserve evidence."
      />

      <DocsPageLayout>
        <div className="flex flex-col">
          <h2 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">Horizon</h2>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            Horizon is a config extender for the Tracehound substrate. It unlocks scale-out
            capabilities for teams that need to go beyond core defaults.
          </p>
        </div>
      </DocsPageLayout>

      <DocsNavigation
        prev={{
          href: '/docs/guides/performance-sla-specification',
          title: 'Performance SLA',
          summary: 'Latency guarantees and performance characteristics',
        }}
        next={{
          href: '/docs/ecosystem/argos',
          title: 'Argos',
          summary: 'Runtime behavioral observation for threat detection',
        }}
      />
    </div>
  )
}
