import { Code } from '@/app/components/code'
import { DocsContent } from '@/app/components/docs-content'
import { DocsContentBlock } from '@/app/components/docs-content-block'
import { DocsContentParagraph } from '@/app/components/docs-content-paragraph'
import { DocsContentSubtitle } from '@/app/components/docs-content-subtitle'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsList } from '@/app/components/docs-list'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import { Separator } from '@/app/components/separator'
import { Table } from '@/app/components/table'
import type { Metadata } from 'next/types'
import {
  aggregationPatternCode,
  duplicateScopeCode,
  localInstancesCode,
  monitoringSnapshotCode,
} from './codes'

export const metadata: Metadata = {
  title: 'Local State Semantics',
  description:
    'How per-instance state works in Tracehound and what it means for multi-instance deployments.',
}

export default function LocalStateSemantics() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Local State Semantics"
        summary="How per-instance state works in Tracehound and what it means for multi-instance deployments."
      />

      <DocsContent>
        <DocsContentBlock title="Core Rule">
          <DocsContentParagraph>
            Every Tracehound instance owns its own runtime state. There is no built-in global
            coordination layer in core.
          </DocsContentParagraph>
          <Table
            head={['State area', 'Scope in core']}
            body={[
              { row: ['Quarantine contents', 'Per instance'] },
              { row: ['Rate limiter counters/maps', 'Per instance'] },
              { row: ['Watcher counters/alerts', 'Per instance'] },
              { row: ['Audit chain records', 'Per instance'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Why It Works This Way">
          <DocsList
            items={[
              <p key="w1">No distributed-state dependency for default operation.</p>,
              <p key="w2">
                Predictable latency without network round-trips for hot-path decisions.
              </p>,
              <p key="w3">
                Failure isolation: one instance degradation does not directly corrupt others.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Practical Implications">
          <DocsContentSubtitle>Rate limiting is local</DocsContentSubtitle>
          <Code code={localInstancesCode} />
          <DocsContentParagraph>
            The same source may be blocked on one instance and not blocked on another, depending on
            traffic distribution and local counters.
          </DocsContentParagraph>

          <DocsContentSubtitle>Duplicate detection is local</DocsContentSubtitle>
          <Code code={duplicateScopeCode} />
          <DocsContentParagraph>
            The same threat signature can be quarantined by multiple instances independently.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Multi-Instance Deployment Pattern">
          <DocsContentParagraph>
            Recommended baseline: keep interception local, aggregate evidence externally through a
            shared archival layer.
          </DocsContentParagraph>
          <Code code={aggregationPatternCode} />
          <Table
            head={['Requirement', 'Recommended approach']}
            body={[
              {
                row: [
                  'Cross-instance evidence visibility',
                  'Archive to shared cold storage and query there',
                ],
              },
              {
                row: [
                  'Fleet-level monitoring',
                  'Collect per-instance watcher/rate metrics into central observability',
                ],
              },
              {
                row: [
                  'Global throttling logic',
                  'Implement externally (edge gateway / coordination layer)',
                ],
              },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Operational Monitoring">
          <DocsContentParagraph>
            Because state is local, aggregate metrics across instances to avoid blind spots.
          </DocsContentParagraph>
          <Code code={monitoringSnapshotCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Anti-Patterns to Avoid">
          <DocsList
            items={[
              <p key="a1">
                Assuming one instance blocklist automatically protects the entire cluster.
              </p>,
              <p key="a2">Assuming one instance quarantine is globally queryable by default.</p>,
              <p key="a3">
                Treating uneven load balancer distribution as “security inconsistency” without
                checking local-state semantics first.
              </p>,
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/guides/fail-open-behaviour',
          title: 'Fail-Open Behaviour',
          summary: 'Tracehound error management',
        }}
        next={{
          href: '/docs/guides/performance-sla-specification',
          title: 'Performance Characteristics',
          summary: 'Current hot-path scope and measurement guidance',
        }}
      />
    </DocsPageLayout>
  )
}
