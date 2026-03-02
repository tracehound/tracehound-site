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
  coldStorageCode,
  detectorAdapterCode,
  envBasedConfigCode,
  expressAdapterCode,
  fastifyAdapterCode,
  minimalExpressCode,
  observabilityCode,
} from './codes'

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Detailed, production-oriented integration examples for Tracehound.',
}

export default function Examples() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="REFERENCES"
        title="Examples"
        summary="Detailed, production-oriented integration examples for Tracehound."
      />

      <DocsContent>
        <DocsContentBlock title="How to Use This Page">
          <DocsContentParagraph>
            This page is ordered from minimum viable setup to production patterns. If you are new,
            follow the sections in order.
          </DocsContentParagraph>

          <Table
            head={['Step', 'Goal', 'Section']}
            body={[
              { row: ['1', 'Run Tracehound in one app', 'Minimal Express Integration'] },
              { row: ['2', 'Reduce boilerplate', 'Express Adapter Integration'] },
              { row: ['3', 'Use Fastify path', 'Fastify Adapter Integration'] },
              { row: ['4', 'Map detector output safely', 'Detector Adapter Pattern'] },
              { row: ['5', 'Prepare production config', 'Environment-based Production Config'] },
              { row: ['6', 'Observe behavior in runtime', 'Observability and Events'] },
              { row: ['7', 'Archive evidence externally', 'Cold Storage Pattern'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Minimal Express Integration">
          <DocsContentParagraph>
            Start with direct <strong>`agent.intercept()`</strong> usage first. This makes the
            runtime behavior easy to understand before introducing adapters.
          </DocsContentParagraph>
          <Code code={minimalExpressCode} />
          <DocsList
            items={[
              <p key="m1">
                Handle all <strong>`InterceptResult`</strong> statuses explicitly{' '}
                <strong>
                  (`clean`, `rate_limited`, `payload_too_large`, `quarantined`, `ignored`, `error`)
                </strong>
                .
              </p>,
              <p key="m2">
                Keep threat detection outside Tracehound and pass only the resulting
                <strong> `ThreatSignal`</strong>.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Express Adapter Integration">
          <DocsContentParagraph>
            Once baseline behavior is clear, switch to <strong>`@tracehound/express`</strong> for
            cleaner middleware wiring.
          </DocsContentParagraph>
          <Code code={expressAdapterCode} />
          <DocsContentSubtitle>When to use adapter mode</DocsContentSubtitle>
          <DocsList
            items={[
              <p key="e1">You want a standard request interception layer across services.</p>,
              <p key="e2">
                You need a shared <strong>`extractScent`</strong> convention for multiple teams.
              </p>,
              <p key="e3">
                You want to centralize response formatting with <strong>`onIntercept`</strong>.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Fastify Adapter Integration">
          <DocsContentParagraph>
            Fastify integration follows the same model with <strong>`tracehoundPlugin`</strong>,
            keeping the same <strong>Scent</strong> and <strong>ThreatSignal</strong> concepts.
          </DocsContentParagraph>
          <Code code={fastifyAdapterCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Detector Adapter Pattern">
          <DocsContentParagraph>
            Most teams already have a detector with its own schema. Create a small mapping layer
            from detector output to Tracehound <strong>`ThreatSignal`</strong>.
          </DocsContentParagraph>
          <Code code={detectorAdapterCode} />
          <DocsContentParagraph>
            This adapter isolates vendor lock-in and keeps your interception pipeline stable when
            you swap WAF/SIEM providers.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Environment-based Production Config">
          <DocsContentParagraph>
            Tracehound core does not auto-read environment variables. Map environment values in your
            application bootstrap.
          </DocsContentParagraph>
          <Code code={envBasedConfigCode} />
          <DocsList
            items={[
              <p key="p1">Keep values bounded and numeric parsing explicit.</p>,
              <p key="p2">Version-control defaults, override only environment-specific values.</p>,
              <p key="p3">Use lower limits in staging to surface pressure signals early.</p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Observability and Events">
          <DocsContentParagraph>
            Use <strong>`watcher.snapshot()`</strong> for pull-based state and{' '}
            <strong>`notifications.on(...)`</strong> for runtime events.
          </DocsContentParagraph>
          <Code code={observabilityCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Cold Storage Pattern">
          <DocsContentParagraph>
            For long-term retention, archive encoded evidence to an S3-compatible backend.
          </DocsContentParagraph>
          <Code code={coldStorageCode} />
          <DocsContentSubtitle>Recommended rollout path</DocsContentSubtitle>
          <DocsList
            items={[
              <p key="c1">Start with one critical service and validate evidence lifecycle.</p>,
              <p key="c2">Measure write latency and failure handling in staging.</p>,
              <p key="c3">
                Add alerts for archive failures before enabling organization-wide rollout.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Common Mistakes">
          <Table
            head={['Mistake', 'Why it hurts', 'Correct approach']}
            body={[
              {
                row: [
                  'Using non-standard category values',
                  'Breaks type safety and consistency',
                  'Map to official categories: injection/ddos/flood/spam/malware/unknown',
                ],
              },
              {
                row: [
                  'Ignoring rate_limited status',
                  'Requests may pass when they should be throttled',
                  'Return 429 and include retryAfter',
                ],
              },
              {
                row: [
                  'Treating Tracehound as a detector',
                  'Wrong architecture boundary',
                  'Keep detection in WAF/SIEM/custom detector layer',
                ],
              },
              {
                row: [
                  'Overloading single giant payloads',
                  'Creates validation failures and noisy logs',
                  'Set proper maxPayloadSize and pre-validate at edge',
                ],
              },
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/references/api-reference',
          title: 'API Reference',
          summary: 'Complete reference for core',
        }}
        next={{
          href: '/docs/references/advanced',
          title: 'Advanced',
          summary: 'Advanced configuration',
        }}
      />
    </DocsPageLayout>
  )
}
