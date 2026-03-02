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
import type { Metadata } from 'next/types'
import { coreUsage, expressIntegration, fastifyIntegration } from './codes'

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Tracehound Core is a deterministic and fail-open runtime security layer designed to operate between detection systems and operational response.',
}

export default function Docs() {
  return (
    <DocsPageLayout>
      <DocsHeader
        title="Summary"
        summary={[
          'Tracehound Core is a deterministic and fail-open runtime security layer designed to operate between detection systems and operational response.',
          'It provides bounded ingestion, rate and buffer controls, controlled choke mechanisms, and reproducible event processing.',
          'The system does not classify threats or enforce policies. Instead, it guarantees controlled runtime behavior and integrity of the resulting event chain.',
        ]}
      />

      <DocsContent>
        <DocsContentBlock title="About the project">
          <DocsContentParagraph>
            It doesn't use heuristics or "guess" if a request is malicious; instead, it acts as a
            high-integrity buffer for explicit security signals (Scents) from external detectors.
          </DocsContentParagraph>
          <DocsContentParagraph>
            By quarantining suspicious events and preserving them in a tamper-evident AuditChain,
            Tracehound ensures that security events are forever auditable without disrupting
            production traffic.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Why we built this">
          <DocsContentParagraph>
            Modern security architectures often face a trade-off between "blocking and breaking" or
            "logging and losing" forensic details. We built Tracehound to solve the gap between
            real-time traffic and backend security analysis:
          </DocsContentParagraph>

          <DocsList
            items={[
              <p>
                <strong>Resilience:</strong> Fail-open semantics ensure security tooling never
                becomes a self-imposed DoS vector.
              </p>,
              <p>
                <strong>Forensic Integrity:</strong> Tamper-evident AuditChain provides an immutable
                record of what actually happened, solving the "log tampering" problem.
              </p>,
              <p>
                <strong>Decoupling:</strong> By trusting external logic for detection, Tracehound
                remains a lightweight, stable, and deterministic buffer that stays out of the way of
                your application logic.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Key features">
          <DocsList
            items={[
              <p>
                <strong>Deterministic Security Buffer:</strong> No heuristics, no false positives.
                It only operates on explicit signals.
              </p>,
              <p>
                <strong>Decision-Free Architecture:</strong> Trusts external detection logic,
                focusing on deterministic evidence handling and bounded ingestion safety.
              </p>,
              <p>
                <strong>Fail-Open Semantics:</strong> Designed for high-velocity APIs where
                production availability is paramount.
              </p>,
              <p>
                <strong>AuditChain:</strong> Merkle-chained, tamper-evident forensic logging of all
                security events.
              </p>,
              <p>
                <strong>Bounded Runtime Controls:</strong> Size, queue, and timeout controls are
                enforced in core paths; performance envelope is deployment-dependent.
              </p>,
              <p>
                <strong>Cold Storage Adapters:</strong> Automatic archival of evidence to S3, R2, or
                GCS.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Quick Start">
          <DocsContentSubtitle>Core Usage</DocsContentSubtitle>

          <Code code={coreUsage} />

          <DocsContentSubtitle>Express Integration</DocsContentSubtitle>

          <Code code={expressIntegration} />

          <DocsContentSubtitle>Fastify Integration</DocsContentSubtitle>

          <Code code={fastifyIntegration} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Core principles">
          <DocsList
            items={[
              <p>
                <strong>Decision-free:</strong> Tracehound never decides if a request is malicious.
                It only acts on external decisions.
              </p>,
              <p>
                <strong>Detection is external:</strong> Use your existing WAF, SIEM, or ML engine to
                drive Tracehound.
              </p>,
              <p>
                <strong>Forensics &gt; Visualization:</strong> Immutable evidence is our primary
                product, not pretty dashboards.
              </p>,
              <p>
                <strong>Local-First:</strong> Operates within your application runtime for
                low-latency interception and auditability.
              </p>,
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        next={{
          href: '/docs/getting-started/introduction',
          title: 'Introduction',
          summary: 'Get started with Tracehound',
        }}
      />
    </DocsPageLayout>
  )
}
