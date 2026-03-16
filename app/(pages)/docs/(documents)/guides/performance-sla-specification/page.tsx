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
import { interceptLatencyHarnessCode, pressureSignalsCode, tuningProfileCode } from './codes'

export const metadata: Metadata = {
  title: 'Performance Characteristics',
  description:
    'Current hot-path scope, measurement guidance, and implemented performance characteristics for Tracehound core operations.',
}

export default function PerformanceSLASpecification() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Performance Characteristics"
        summary="Current hot-path scope, measurement guidance, and implemented performance characteristics for Tracehound core operations."
      />

      <DocsContent>
        <DocsContentBlock title="Scope">
          <DocsContentParagraph>
            This page is descriptive, not contractual. It explains the current hot-path model of{' '}
            <strong>`agent.intercept()`</strong> and how to interpret repository benchmark output.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Hot-Path Boundary">
          <DocsList
            items={[
              <p key="l1">
                The synchronous hot path is measured from <strong>`agent.intercept()`</strong> entry
                to its return value.
              </p>,
              <p key="l2">Async HoundPool analysis is excluded.</p>,
              <p key="l3">Cold storage archival and notification/webhook delivery are excluded.</p>,
              <p key="l4">
                Scenario-test output is environment-dependent and should be read as current
                measurement, not fixed SLA.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="What Is Included vs Excluded">
          <Table
            head={['Included in hot path', 'Excluded from hot path']}
            body={[
              { row: ['Rate limiter check', 'HoundPool async analysis duration'] },
              {
                row: ['Evidence creation and signature generation', 'Cold storage write/read RTT'],
              },
              {
                row: [
                  'Quarantine insertion and capacity handling',
                  'Notification/webhook delivery latency',
                ],
              },
              { row: ['Immediate InterceptResult return', 'External detector execution time'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Reference Configuration Profile">
          <DocsContentParagraph>
            Use a stable reference profile when comparing one run to another.
          </DocsContentParagraph>
          <Code code={tuningProfileCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Measurement Methodology">
          <DocsContentSubtitle>Minimal benchmark harness</DocsContentSubtitle>
          <Code code={interceptLatencyHarnessCode} />
          <DocsList
            items={[
              <p key="m1">Warm up runtime/JIT before collecting percentile data.</p>,
              <p key="m2">Run on representative instance type and payload distributions.</p>,
              <p key="m3">
                Compare clean and threat-bearing traffic separately to avoid mixed-profile bias.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Pressure and Degradation Signals">
          <DocsContentParagraph>
            Track pressure signals together with latency so you catch degradation before it turns
            into tail-latency drift or bounded dropping.
          </DocsContentParagraph>
          <Code code={pressureSignalsCode} />
          <Table
            head={['Signal', 'Interpretation']}
            body={[
              { row: ['watcher.quarantine.capacityPercent', 'Quarantine memory pressure trend'] },
              {
                row: [
                  'houndPool.totalTimeouts / totalErrors',
                  'Async worker stress and instability',
                ],
              },
              { row: ['rateLimiter.totalRejections', 'Traffic pressure and abuse intensity'] },
              { row: ['watcher.overloaded', 'System entered overload state indicator'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Tuning Guidance">
          <DocsContentParagraph>
            Current implementation still has known hot spots in eviction, stats derivation, and
            rate-limiter pruning. Tune for safe bounds first; do not assume constant-time behavior
            where the implementation does not yet provide it.
          </DocsContentParagraph>
          <Table
            head={['Knob', 'Primary effect', 'Trade-off']}
            body={[
              {
                row: [
                  <>
                    <strong>`maxPayloadSize`</strong>
                  </>,
                  'Limits per-request payload processing cost',
                  'Too low values can increase payload_too_large outcomes',
                ],
              },
              {
                row: [
                  <>
                    <strong>`quarantine.maxBytes`</strong>
                  </>,
                  'Controls memory footprint of evidence retention',
                  'Lower values increase eviction frequency',
                ],
              },
              {
                row: [
                  <>
                    <strong>`houndPool.poolSize`</strong>
                  </>,
                  'Raises async processing concurrency',
                  'Higher resource usage under load',
                ],
              },
              {
                row: [
                  <>
                    <strong>`houndPool.timeout`</strong>
                  </>,
                  'Bounds stuck-worker time',
                  'Too low values may increase timeout noise',
                ],
              },
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/guides/local-state-semantics',
          title: 'Local State Semantics',
          summary: 'General behaviour of the instances.',
        }}
        next={{
          href: '/packages',
          title: 'Packages',
          summary: 'Current public package topology',
        }}
      />
    </DocsPageLayout>
  )
}
