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
import type { Metadata } from 'next/types'
import {
  createTracehoundExampleCode,
  envMappingCode,
  snapshotEnvKeysCode,
  tracehoundOptionsInterfaceCode,
} from './codes'

export const metadata: Metadata = {
  title: 'Configuration',
  description: 'Authoritative configuration reference for Tracehound Core.',
}

export default function Configuration() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="REFERENCES"
        title="Configuration"
        summary="Authoritative configuration reference for the current Tracehound Core API."
      />

      <DocsContent>
        <DocsContentBlock title="Initialization">
          <DocsContentParagraph>
            Configure Tracehound through a single entry point:{' '}
            <strong>`createTracehound(options)`</strong>.
          </DocsContentParagraph>

          <Code code={createTracehoundExampleCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="TracehoundOptions">
          <DocsContentParagraph>
            The options object accepted by <strong>`createTracehound`</strong>:
          </DocsContentParagraph>

          <Code code={tracehoundOptionsInterfaceCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Default Values">
          <Table
            head={['Option', 'Default']}
            body={[
              { row: [<strong>`maxPayloadSize`</strong>, <strong>`1_000_000`</strong>] },
              { row: [<strong>`quarantine.maxCount`</strong>, <strong>`10_000`</strong>] },
              { row: [<strong>`quarantine.maxBytes`</strong>, <strong>`100_000_000`</strong>] },
              { row: [<strong>`rateLimit.windowMs`</strong>, <strong>`60_000`</strong>] },
              { row: [<strong>`rateLimit.maxRequests`</strong>, <strong>`100`</strong>] },
              { row: [<strong>`rateLimit.blockDurationMs`</strong>, <strong>`300_000`</strong>] },
              { row: [<strong>`watcher.maxAlertsPerWindow`</strong>, <strong>`10`</strong>] },
              { row: [<strong>`watcher.alertWindowMs`</strong>, <strong>`60_000`</strong>] },
              { row: [<strong>`watcher.quarantineHighWatermark`</strong>, <strong>`0.8`</strong>] },
              { row: [<strong>`houndPool.poolSize`</strong>, <strong>`4`</strong>] },
              { row: [<strong>`houndPool.timeout`</strong>, <strong>`30_000`</strong>] },
              { row: [<strong>`houndPool.rotationJitterMs`</strong>, <strong>`1000`</strong>] },
              { row: [<strong>`houndPool.onPoolExhausted`</strong>, <strong>`defer`</strong>] },
              { row: [<strong>`houndPool.deferQueueLimit`</strong>, <strong>`100`</strong>] },
              { row: [<strong>`snapshot.intervalMs`</strong>, <strong>`1000`</strong>] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Important Notes">
          <DocsList
            items={[
              <p key="eviction">
                In <strong>`createTracehound`</strong>, quarantine uses priority-based eviction
                internally.
              </p>,
              <p key="watcher">
                Watcher is pull-based. Use <strong>`th.watcher.snapshot()`</strong>, not{' '}
                <strong>`getSnapshot()`</strong>.
              </p>,
              <p key="env">
                Core does not include an automatic environment loader. Map environment variables in
                your application layer.
              </p>,
              <p key="snapshot">
                For CLI operational commands, use <strong>`SYSTEM_SNAPSHOT_ENV`</strong> keys:
                required <strong>`PATH`</strong>/<strong>`SECRET`</strong>, optional{' '}
                <strong>`MAX_AGE_MS`</strong>/<strong>`MAX_FUTURE_SKEW_MS`</strong>.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Environment Mapping Example">
          <DocsContentSubtitle>Application-level env mapping</DocsContentSubtitle>
          <Code code={envMappingCode} />
          <DocsContentSubtitle>Snapshot env key constants</DocsContentSubtitle>
          <Code code={snapshotEnvKeysCode} />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/getting-started/quickstart',
          title: 'Quickstart',
          summary: 'Get running in 5 minutes',
        }}
        next={{
          href: '/docs/references/api-reference',
          title: 'API Reference',
          summary: 'Complete API and type surface',
        }}
      />
    </DocsPageLayout>
  )
}
