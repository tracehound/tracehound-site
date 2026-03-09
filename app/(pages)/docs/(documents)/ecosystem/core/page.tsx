/* eslint-disable react/jsx-key */
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

        <DocsContentBlock title="Public Repository Surface">
          <DocsContentParagraph>
            The public repository surface is the implemented monorepo itself. Coordination and
            scale-out patterns may exist as external or future work, but they are not part of the
            public `@tracehound/core` runtime contract unless they are implemented here.
          </DocsContentParagraph>
          <Table
            head={['Capability area', 'Public core position', 'Notes']}
            body={[
              {
                row: [
                  'HoundPool capacity',
                  'Configured locally per instance',
                  'No unlimited-worker guarantee is published',
                ],
              },
              {
                row: [
                  'Multi-instance coordination',
                  'Not built in by default',
                  'Use external coordination boundaries when needed',
                ],
              },
              {
                row: [
                  'Shared blocklist/global rate limiting',
                  'Not built in by default',
                  'Public core remains local-state first',
                ],
              },
              {
                row: [
                  'Policy and transport controls',
                  'Application-owned integration',
                  'Do not assume hidden extension behavior in OSS core',
                ],
              },
            ]}
          />
          <DocsList
            items={[
              <p key="h1">Core remains fully functional with deterministic local behavior.</p>,
              <p key="h2">
                Read production truth from implemented packages and public docs, not from legacy
                extension claims.
              </p>,
              <p key="h3">
                Evidence aggregation can still be handled with documented async cold-storage export
                patterns.
              </p>,
            ]}
          />
          <DocsContentParagraph>
            The public monorepo currently exposes packages `core`, `express`, `fastify`, and
            `cli`.
          </DocsContentParagraph>
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/guides/performance-sla-specification',
          title: 'Performance Characteristics',
          summary: 'Current hot-path scope and measurement guidance',
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
