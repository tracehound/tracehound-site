/* eslint-disable react/no-unescaped-entities, react/jsx-key */
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
  coldStorageExport,
  customRateLimiting,
  expressInstallCode,
  expressSetupCode,
  fastifyInstallCode,
  fastifySetupCode,
  instalCode,
  interceptRequestCode,
  quickStartCode,
  snapshotEnvCode,
  snapshotRuntimeCode,
  wafIntegrationCode,
} from './codes'

export const metadata: Metadata = {
  title: 'Quickstart',
  description: 'Get Tracehound running in your Node.js application in under 5 minutes.',
}

export default function Quickstart() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GETTING STARTED"
        title="Quickstart"
        summary="Get Tracehound running in your Node.js application in under 5 minutes."
      />

      <DocsContent>
        <DocsContentBlock title="Prerequisites">
          <DocsList items={[<p>Node.js 20+</p>, <p>npm, pnpm, or yarn</p>]} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Installation">
          <Code code={instalCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Quick Start">
          <DocsContentSubtitle>Step 1: Create Tracehound</DocsContentSubtitle>

          <Code code={quickStartCode} />

          <DocsContentParagraph>
            That's it. You now have a working Tracehound instance.
          </DocsContentParagraph>

          <DocsContentSubtitle>Step 2: Intercept Requests</DocsContentSubtitle>

          <Code code={interceptRequestCode} />

          <DocsContentSubtitle>Step 3: Handle Results</DocsContentSubtitle>

          <Table
            head={['Status', 'Meaning', 'Action']}
            body={[
              { row: [<strong>`clean`</strong>, 'No threat detected', 'Proceed normally'] },
              {
                row: [
                  <strong>`quarantined`</strong>,
                  'Threat isolated',
                  'Block request, evidence preserved',
                ],
              },
              {
                row: [
                  <strong>`rate_limited`</strong>,
                  'Too many requests',
                  <>
                    Return 429 with `<strong>retryAfter</strong>`
                  </>,
                ],
              },
              {
                row: [<strong>`ignored`</strong>, 'Duplicate threat', 'Already quarantined, block'],
              },
              {
                row: [
                  <strong>`payload_too_large`</strong>,
                  'Payload exceeds configured limit',
                  'Return 413 and reduce/request trim payload',
                ],
              },
              {
                row: [
                  <strong>`error`</strong>,
                  'Internal pipeline error',
                  'Return 500, log structured error context',
                ],
              },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="CLI Snapshot Wiring (Required)">
          <DocsContentParagraph>
            Enable signed runtime snapshot export so CLI commands can read verified live state.
          </DocsContentParagraph>
          <DocsContentParagraph>
            When runtime snapshot input is missing or invalid, CLI commands fail explicitly with{' '}
            <strong>`NO_INSTANCE`</strong> or <strong>`INTEGRITY_VIOLATION`</strong> instead of
            synthesizing healthy output.
          </DocsContentParagraph>

          <Code code={snapshotRuntimeCode} />

          <DocsContentSubtitle>Runtime environment variables</DocsContentSubtitle>
          <DocsContentParagraph>
            <strong>@tracehound/core</strong> exports <strong>`SYSTEM_SNAPSHOT_ENV`</strong> for
            programmatic key access (`PATH`, `SECRET`, `MAX_AGE_MS`, `MAX_FUTURE_SKEW_MS`).
          </DocsContentParagraph>
          <Code code={snapshotEnvCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Framework Adapters">
          <DocsContentParagraph>
            Use the Express or Fastify adapters (separate packages):
          </DocsContentParagraph>

          <DocsContentSubtitle>Express</DocsContentSubtitle>

          <Code code={expressInstallCode} />
          <Code code={expressSetupCode} />

          <DocsContentSubtitle>Fastify</DocsContentSubtitle>
          <Code code={fastifyInstallCode} />
          <Code code={fastifySetupCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Common Patterns">
          <DocsContentSubtitle>Pattern 1: WAF Integration</DocsContentSubtitle>

          <DocsContentParagraph>
            Connect your existing WAF (Cloudflare, AWS WAF) to Tracehound:
          </DocsContentParagraph>

          <Code code={wafIntegrationCode} />

          <DocsContentSubtitle>Pattern 2: Custom Rate Limiting</DocsContentSubtitle>

          <DocsContentParagraph>Add rate limiting per source IP:</DocsContentParagraph>

          <Code code={customRateLimiting} />

          <DocsContentSubtitle>Pattern 3: Cold Storage Export</DocsContentSubtitle>

          <DocsContentParagraph>
            Archive evidence to S3-compatible storage (AWS S3, Cloudflare R2, GCS, MinIO):
          </DocsContentParagraph>

          <Code code={coldStorageExport} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Troubleshooting">
          <div className="flex flex-col gap-2">
            <DocsContentSubtitle>"Quarantine is full" warnings</DocsContentSubtitle>

            <DocsContentParagraph>
              Your quarantine has reached `<strong>maxCount</strong>`. Options:
            </DocsContentParagraph>

            <DocsList
              items={[
                <p>
                  <strong>Increase limit:</strong>{' '}
                  <strong>{`createTracehound({ quarantine: { maxCount: 5000 } })`}</strong>
                </p>,
                <p>
                  <strong>Enable cold storage:</strong> Use `<strong>createS3ColdStorage</strong>`
                  for archival
                </p>,
                <p>
                  <strong>Eviction:</strong> Default `<strong>priority</strong>` policy keeps
                  high-severity threats
                </p>,
              ]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <DocsContentSubtitle>High memory usage</DocsContentSubtitle>

            <DocsContentParagraph>
              Tracehound uses bounded memory by design. If you're seeing high usage:
            </DocsContentParagraph>

            <DocsList
              items={[
                <p>
                  Reduce <strong>`maxBytes`:</strong>{' '}
                  <strong>{`createTracehound({ quarantine: { maxBytes: 50_000_000 } })`}</strong>{' '}
                  (50MB)
                </p>,
                <p>Use async codec for cold storage I/O</p>,
                <p>
                  Check payload limits:{' '}
                  <strong>{`createTracehound({ maxPayloadSize: 100_000 })`}</strong>
                </p>,
              ]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <DocsContentSubtitle>Requests are slow</DocsContentSubtitle>

            <DocsContentParagraph>
              `<strong>agent.intercept()</strong>` is synchronous and should be &lt;1ms. If slow:
            </DocsContentParagraph>

            <DocsList
              items={[
                <p>Move heavy detection logic outside Tracehound</p>,
                <p>
                  Use `<strong>@tracehound/express</strong>` adapter (optimized)
                </p>,
                <p>Check if you’re doing async work inside the intercept call</p>,
              ]}
            />
          </div>
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/getting-started/introduction',
          title: 'Introduction',
          summary: 'Introduction of core package',
        }}
        next={{
          href: '/docs/references/configuration',
          title: 'Configuration',
          summary: 'All configuration options',
        }}
      />
    </DocsPageLayout>
  )
}

