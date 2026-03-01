import { DocsHeader } from '@/app/components/docs-header'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Security Assurance',
  description:
    "Known limitations, and architectural rationale behind Tracehound's design as a High-Assurance Security Substrate",
}

export default function SecurityAssurance() {
  return (
    <div className="flex flex-col min-h-screen px-6 xl:px-12">
      <DocsHeader
        label="GUIDES"
        title="Security Assurance"
        summary="This document outlines the proven facts, known limitations, and architectural rationale
          behind Tracehound's design as a High-Assurance Security Substrate."
      />

      <DocsPageLayout>
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </DocsPageLayout>

      <DocsNavigation
        prev={{
          href: '/docs/guides/concepts',
          title: 'Concepts',
          summary: "Tracehound's core concepts",
        }}
        next={{
          href: '/docs/guides/evidence-lifecycle',
          title: 'Evidence Lifecycle',
          summary: 'Evidence retention, eviction and more',
        }}
      />
    </div>
  )
}
