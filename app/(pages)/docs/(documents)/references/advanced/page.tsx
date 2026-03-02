/* eslint-disable react/jsx-key */
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
import Image from 'next/image'
import type { Metadata } from 'next/types'
import {
  errorHandlingCode,
  failSafeCode,
  gracefulShutdownCode,
  houndPoolTuningCode,
  lowLevelCompositionCode,
  manualWiringCode,
  metricsBaselineCode,
  schedulerCleanupCode,
  testingHookCode,
  trustBoundaryCode,
} from './codes'

export const metadata: Metadata = {
  title: 'Advanced',
  description: 'Low-level APIs and internal runtime mechanics for advanced Tracehound usage.',
}

export default function Advanced() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="REFERENCES"
        title="Advanced"
        summary="Low-level APIs and internal runtime mechanics for advanced Tracehound usage."
      />

      <DocsContent>
        <DocsContentBlock title="Audience and Scope">
          <DocsContentParagraph>
            This page is for teams that need to tune internals, build custom wiring, or reason about
            runtime behavior under load. If you are new, start with Quickstart and Examples first.
          </DocsContentParagraph>
          <DocsList
            items={[
              <p key="a1">
                Default recommendation: keep using <strong>`createTracehound(options)`</strong>.
              </p>,
              <p key="a2">
                Use low-level APIs when you need explicit component ownership and lifecycle control.
              </p>,
              <p key="a3">
                Treat this page as an operator/developer reference, not a beginner guide.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Internal Runtime Flow">
          <DocsContentParagraph>
            Tracehound runtime follows a deterministic orchestration flow. Threat detection is
            always external; Tracehound consumes the signal and executes bounded processing.
          </DocsContentParagraph>
          <Image
            width={544}
            height={449}
            src="/diagrams/internal-runtime-flow.svg"
            alt="Internal Runtime Flow"
            className="select-none object-contain"
            decoding="async"
            loading="lazy"
          />
          <Table
            head={['Stage', 'Primary Component', 'Output']}
            body={[
              { row: ['Rate check', 'RateLimiter', 'allow / reject + retryAfter'] },
              { row: ['Threat gate', 'Agent', 'clean or continue'] },
              { row: ['Evidence build', 'EvidenceFactory', 'signature + bytes + hash'] },
              { row: ['Retention', 'Quarantine + AuditChain', 'stored / evicted records'] },
              { row: ['Async work', 'HoundPool', 'processed / timeout / error result'] },
              { row: ['Observability', 'Watcher + Notifications', 'snapshots + events'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Low-level Composition">
          <DocsContentParagraph>
            Manual composition gives explicit control over component lifecycle and dependency
            wiring.
          </DocsContentParagraph>
          <Code code={lowLevelCompositionCode} />
          <DocsContentParagraph>
            In this model, you own the creation order and can replace components in tests or
            specialized runtime profiles.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Manual Hound Result Wiring">
          <DocsContentParagraph>
            <strong>`createTracehound`</strong> wires HoundPool results automatically. In low-level
            mode, you can wire timeout/error outcomes into your own operational policy.
          </DocsContentParagraph>
          <Code code={manualWiringCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="HoundPool Tuning">
          <DocsContentParagraph>
            HoundPool is process-separated and asynchronous. Tune it for your risk and throughput
            profile.
          </DocsContentParagraph>
          <Code code={houndPoolTuningCode} />
          <DocsContentSubtitle>Tuning guidance</DocsContentSubtitle>
          <DocsList
            items={[
              <p key="h1">
                <strong>`poolSize`</strong>: higher for concurrency, but increases resource
                footprint.
              </p>,
              <p key="h2">
                <strong>`timeout`</strong>: lower for stricter fail-open behavior under stuck
                workers.
              </p>,
              <p key="h3">
                <strong>`onPoolExhausted`</strong>: <strong>`defer`</strong> for best-effort
                completion, <strong>`drop`</strong> for hard shedding.
              </p>,
              <p key="h4">
                Process constraints are defense-in-depth and platform-dependent, not hard security
                boundaries by themselves.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Fail-Safe Integration">
          <DocsContentParagraph>
            Fail-Safe provides threshold-driven panic hooks. Use it to trigger emergency actions
            when memory, quarantine, or error-rate pressure crosses your limits.
          </DocsContentParagraph>
          <Code code={failSafeCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Scheduler for Background Maintenance">
          <DocsContentParagraph>
            Scheduler helps run periodic maintenance work with jitter and busy-aware skipping.
          </DocsContentParagraph>
          <Code code={schedulerCleanupCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Trust Boundary Modeling">
          <DocsContentParagraph>
            Trust Boundary helpers allow you to formalize trust assumptions around detector sources
            and cold storage endpoints.
          </DocsContentParagraph>
          <Code code={trustBoundaryCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Testing and Simulation Hooks">
          <DocsContentParagraph>
            For deterministic tests, use <strong>`createMockAdapter()`</strong> with HoundPool
            instead of spawning real processes.
          </DocsContentParagraph>
          <Code code={testingHookCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Lifecycle and Failure Modes">
          <DocsContentSubtitle>Graceful shutdown</DocsContentSubtitle>
          <DocsContentParagraph>
            In low-level integrations, you are responsible for lifecycle cleanup. Stop schedulers
            and shutdown worker pools during process termination.
          </DocsContentParagraph>
          <Code code={gracefulShutdownCode} />

          <DocsContentSubtitle>Pool exhaustion policy trade-offs</DocsContentSubtitle>
          <Table
            head={['Mode', 'Behavior', 'Best for', 'Risk']}
            body={[
              {
                row: [
                  <strong>`drop`</strong>,
                  'Immediate reject when pool is full',
                  'Strict latency budgets',
                  'Forensic loss under pressure',
                ],
              },
              {
                row: [
                  <strong>`defer`</strong>,
                  'Queue until worker becomes available',
                  'Balanced throughput + evidence retention',
                  'Queue growth if sustained overload',
                ],
              },
              {
                row: [
                  <strong>`escalate`</strong>,
                  'Emit escalation errors immediately',
                  'Aggressive incident signaling',
                  'Higher alert noise during bursts',
                ],
              },
            ]}
          />

          <DocsContentSubtitle>Error taxonomy handling</DocsContentSubtitle>
          <DocsContentParagraph>
            Treat `InterceptResult.error` as structured operational data. Route by error code and
            recoverability, not by message text.
          </DocsContentParagraph>
          <Code code={errorHandlingCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Production Readiness Checklist">
          <DocsContentSubtitle>Minimum metrics baseline</DocsContentSubtitle>
          <Code code={metricsBaselineCode} />

          <DocsContentSubtitle>Go-live checklist</DocsContentSubtitle>
          <DocsList
            items={[
              <p key="g1">
                Intercept handling is exhaustive for all statuses{' '}
                <strong>
                  (`clean`, `rate_limited`, `payload_too_large`, `quarantined`, `ignored`, `error`)
                </strong>
                .
              </p>,
              <p key="g2">
                Quarantine and payload limits are explicitly configured and load-tested with
                realistic traffic.
              </p>,
              <p key="g3">
                HoundPool policy <strong>(`drop`/`defer`/`escalate`)</strong> is chosen
                intentionally and documented.
              </p>,
              <p key="g4">
                Runtime alerts are connected for <strong>`system.panic`</strong>, timeout spikes,
                and rate-limit rejection anomalies.
              </p>,
              <p key="g5">
                Graceful shutdown path is implemented{' '}
                <strong>(`scheduler.stop()`, `houndPool.shutdown()`)</strong>.
              </p>,
              <p key="g6">
                Cold storage path (if used) is tested with integrity encode/verify/decode flow.
              </p>,
              <p key="g7">
                <strong>Detector-to-`ThreatSignal`</strong> mapping is type-safe and uses canonical
                categories only.
              </p>,
              <p key="g8">
                Staging soak test and rollback plan are completed before production rollout.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Operational Guardrails">
          <Table
            head={['Area', 'Guardrail']}
            body={[
              {
                row: [
                  'Rate limiting',
                  'Always surface 429 + retryAfter explicitly in edge/application responses',
                ],
              },
              {
                row: [
                  'Quarantine size',
                  'Use bounded maxCount/maxBytes and monitor capacityPercent in Watcher snapshots',
                ],
              },
              {
                row: [
                  'Async worker failures',
                  'Alert on hound timeout/error and track totalTimeouts/totalErrors from pool stats',
                ],
              },
              {
                row: [
                  'Runtime assumptions',
                  'Do not rely on declarative process constraints alone for isolation guarantees',
                ],
              },
              {
                row: [
                  'Deployment safety',
                  'Roll out low-level custom wiring behind staging soak tests before production',
                ],
              },
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/references/examples',
          title: 'Examples',
          summary: 'Real-world examples',
        }}
        next={{
          href: '/docs/guides/concepts',
          title: 'Concepts',
          summary: "Tracehound's core concepts",
        }}
      />
    </DocsPageLayout>
  )
}
