import { DocsContent } from '@/app/components/docs-content'
import { DocsContentBlock } from '@/app/components/docs-content-block'
import { DocsContentParagraph } from '@/app/components/docs-content-paragraph'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsList } from '@/app/components/docs-list'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import { Separator } from '@/app/components/separator'
import { Table } from '@/app/components/table'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Tracehound Core',
  description: 'The main Tracehound package with deterministic local security controls.',
}

export default function Core() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="ECOSYSTEM"
        title="Core"
        summary="The main Tracehound package with local interception, quarantine, watcher, and audit primitives."
      />

      <DocsContent>
        <DocsContentBlock title="Scope">
          <DocsContentParagraph>
            Core is the canonical runtime substrate. The primary public entry point is
            <strong>`createTracehound(options)`</strong> from `@tracehound/core`.
          </DocsContentParagraph>
          <Table
            head={['Core surface', 'Role']}
            body={[
              { row: [<strong>`agent`</strong>, 'Intercept pipeline and InterceptResult outcomes'] },
              { row: [<strong>`quarantine`</strong>, 'Bounded evidence retention with eviction'] },
              { row: [<strong>`rateLimiter`</strong>, 'Per-source local rate-limiting'] },
              { row: [<strong>`watcher`</strong>, 'Pull-based runtime snapshot state'] },
              { row: [<strong>`auditChain`</strong>, 'Tamper-evident event chaining'] },
              { row: [<strong>`notifications`</strong>, 'Event stream for external consumers'] },
              { row: [<strong>`houndPool`</strong>, 'Process-separated async worker execution'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Operational Model">
          <DocsList
            items={[
              <p key="o1">Decision-free design: core enforces deterministic mechanics, not external policy.</p>,
              <p key="o2">Local state semantics by default: each instance keeps independent runtime state.</p>,
              <p key="o3">Fail-open behavior on internal errors to avoid turning security tooling into a DoS vector.</p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Horizon Extension (Current Docs Position)">
          <DocsContentParagraph>
            Canonical docs reference <strong>`@tracehound/horizon`</strong> as an extension for
            multi-instance coordination and scale-out scenarios (for example shared coordination
            patterns), while core remains local-first.
          </DocsContentParagraph>
          <Table
            head={['Capability area', 'Core default', 'With Horizon']}
            body={[
              { row: ['HoundPool processes', '8 max (SLA table)', 'Unlimited (docs claim)'] },
              { row: ['Multi-instance coordination', 'Not built in', 'Redis/KeyDB coordination pattern'] },
              { row: ['Shared blocklist', 'Not built in', 'Supported via Horizon coordination'] },
              { row: ['Global rate limiting', 'Per-instance only', 'Cross-instance sync model'] },
              { row: ['mTLS enforcement', 'Not in core defaults', 'Documented as Horizon capability'] },
              { row: ['Policy broker integration', 'External integration by app', 'Documented Horizon feature'] },
            ]}
          />
          <DocsList
            items={[
              <p key="h1">Core remains fully functional without Horizon and keeps deterministic local behavior.</p>,
              <p key="h2">Use Horizon when you need fleet-level shared controls rather than per-instance isolation.</p>,
              <p key="h3">Evidence aggregation can still be handled in core via async cold-storage export patterns.</p>,
            ]}
          />
          <DocsContentParagraph>
            The `tracehound` monorepo currently exposes packages `core`, `express`, `fastify`, and
            `cli`; Horizon is documented as an extension track, not a package in this repository.
          </DocsContentParagraph>
        </DocsContentBlock>
      </DocsContent>

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
    </DocsPageLayout>
  )
}
