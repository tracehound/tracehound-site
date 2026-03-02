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
  title: 'Performance SLA Specification',
  description:
    'Latency targets, measurement scope, and performance characteristics for Tracehound core operations.',
}

export default function PerformanceSLASpecification() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Performance SLA Specification"
        summary="Latency targets, measurement scope, and performance characteristics for Tracehound core operations."
      />

      <DocsContent>
        <DocsContentBlock title="SLA Scope">
          <DocsContentParagraph>
            This SLA focuses on the synchronous hot-path behavior of{' '}
            <strong>`agent.intercept()`</strong> and related core runtime surfaces. Values are
            targets under controlled conditions, not universal guarantees across all deployments.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Latency Targets (Hot Path)">
          <Table
            head={['Percentile', 'Target', 'Scope']}
            body={[
              { row: ['p50', '< 0.5ms', 'Normal operation'] },
              { row: ['p99', '< 2ms', 'Normal operation'] },
              { row: ['p99.9', '< 10ms', 'Under pressure scenarios'] },
            ]}
          />
          <DocsList
            items={[
              <p key="l1">
                Measured from <strong>`agent.intercept()`</strong> call to return value.
              </p>,
              <p key="l2">Async HoundPool processing time is excluded.</p>,
              <p key="l3">Cold storage write latency is excluded.</p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="What Is Included vs Excluded">
          <Table
            head={['Included in SLA hot-path', 'Excluded from hot-path SLA']}
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
            Baseline targets should be validated using a stable reference profile before custom
            tuning.
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
            SLA tracking should include pressure signals, not only median latency, to detect
            approaching degradation conditions early.
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
          href: '/docs/ecosystem/core',
          title: 'Tracehound Core',
          summary: 'The main Tracehound package',
        }}
      />
    </DocsPageLayout>
  )
}
