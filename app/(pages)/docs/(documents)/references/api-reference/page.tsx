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
  createTracehoundCode,
  interceptCode,
  notificationsCode,
  utilitiesCode,
  watcherCode,
} from './codes'

export const metadata: Metadata = {
  title: 'API Reference',
  description: 'Complete reference for the @tracehound/core package.',
}

export default function APIReferences() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="REFERENCES"
        title="API Reference"
        summary="Complete reference for the @tracehound/core package."
      />

      <DocsContent>
        <DocsContentBlock title="Breaking Changes (v1.6+)">
          <div className="border border-dashed border-(--warning) bg-(--background) p-4">
            <p className="font-mono text-xs text-(--warning)">WARNING</p>
            <DocsList
              items={[
                <p key="api-agent-stats">
                  Custom <strong>`IAgent`</strong> implementations must expose{' '}
                  <strong>`getStats(): Readonly&lt;AgentStats&gt;`</strong>.
                </p>,
                <p key="api-cli-snapshot">
                  CLI <strong>`status`</strong>/<strong>`stats`</strong>/<strong>`watch`</strong>{' '}
                  commands no longer return fabricated health data and now require a verified snapshot.
                </p>,
                <p key="api-fastify">
                  <strong>`@tracehound/fastify`</strong> default export was removed; use named export{' '}
                  <strong>`tracehoundPlugin`</strong>.
                </p>,
              ]}
            />
          </div>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Primary Entry Point">
          <DocsContentParagraph>
            The recommended public API is <strong>`createTracehound(options)`</strong>. It returns a
            fully wired runtime instance.
          </DocsContentParagraph>
          <Code code={createTracehoundCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Runtime Surface">
          <Table
            head={['Property', 'Description']}
            body={[
              { row: [<strong>`th.agent`</strong>, 'Intercept pipeline entry point'] },
              { row: [<strong>`th.quarantine`</strong>, 'Evidence storage with bounded capacity'] },
              { row: [<strong>`th.rateLimiter`</strong>, 'Per-source sliding window limiter'] },
              { row: [<strong>`th.watcher`</strong>, 'Pull-based observability state'] },
              { row: [<strong>`th.auditChain`</strong>, 'Tamper-evident chain records'] },
              { row: [<strong>`th.notifications`</strong>, 'Event emitter for runtime signals'] },
              { row: [<strong>`th.houndPool`</strong>, 'Process-separated async worker pool'] },
              { row: [<strong>`th.snapshot()`</strong>, 'Immutable runtime snapshot for signed transport'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="agent.intercept(scent)">
          <DocsContentParagraph>
            `agent.intercept` accepts a <strong>`Scent`</strong> and returns an
            <strong> `InterceptResult`</strong> union.
          </DocsContentParagraph>
          <Code code={interceptCode} />

          <DocsContentSubtitle>InterceptResult statuses</DocsContentSubtitle>
          <Table
            head={['Status', 'Fields']}
            body={[
              { row: [<strong>`clean`</strong>, 'none'] },
              { row: [<strong>`rate_limited`</strong>, <strong>`retryAfter: number`</strong>] },
              { row: [<strong>`payload_too_large`</strong>, <strong>`limit: number`</strong>] },
              { row: [<strong>`ignored`</strong>, <strong>`signature: string`</strong>] },
              { row: [<strong>`quarantined`</strong>, <strong>`handle: EvidenceHandle`</strong>] },
              { row: [<strong>`error`</strong>, <strong>`error: TracehoundError`</strong>] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Scent and ThreatSignal">
          <DocsList
            items={[
              <p key="scent">
                <strong>Scent</strong>: id, timestamp, source, payload, threat (optional)
              </p>,
              <p key="threat">
                <strong>ThreatSignal.category</strong>: injection | ddos | flood | spam | malware |
                unknown
              </p>,
              <p key="severity">
                <strong>ThreatSignal.severity</strong>: low | medium | high | critical
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Watcher and Notifications">
          <DocsContentSubtitle>Watcher snapshot API</DocsContentSubtitle>
          <Code code={watcherCode} />

          <DocsContentSubtitle>Notifications API</DocsContentSubtitle>
          <Code code={notificationsCode} />

          <DocsContentParagraph>
            Common event types: <strong>`threat.detected`</strong>,{' '}
            <strong>`evidence.quarantined`</strong>, <strong>`rate_limit.exceeded`</strong>,{' '}
            <strong>`system.panic`</strong>.
          </DocsContentParagraph>

          <DocsContentSubtitle>system.panic reason patterns</DocsContentSubtitle>
          <DocsList
            items={[
              <p key="panic-timeout">`hound_timeout: signature=&lt;signature&gt;`</p>,
              <p key="panic-error">`hound_error: &lt;error_code_or_message&gt;`</p>,
              <p key="panic-snapshot-write">`snapshot_write_failed`</p>,
              <p key="panic-snapshot-cleanup">`snapshot_cleanup_failed`</p>,
              <p key="panic-coordination-contract">`coordination.invalid_contract`</p>,
              <p key="panic-coordination-health">`coordination.health_failure`</p>,
              <p key="panic-membrane">`membrane.payload_egress_blocked`</p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Utilities and Cold Storage">
          <Code code={utilitiesCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Low-level APIs">
          <DocsContentParagraph>
            Use low-level APIs only when you need explicit component ownership, custom wiring, or
            deterministic test doubles.
          </DocsContentParagraph>
          <Table
            head={['Need', 'API']}
            body={[
              { row: ['Manual retention control', <strong>`new Quarantine(config, auditChain)`</strong>] },
              { row: ['Custom agent wiring', <strong>`createAgent(...)`</strong>] },
              { row: ['Independent limiter instance', <strong>`createRateLimiter(...)`</strong>] },
              { row: ['Pull-only observer state', <strong>`createWatcher(...)`</strong>] },
              { row: ['Process-separated worker pool', <strong>`createHoundPool(...)`</strong>] },
            ]}
          />
          <DocsContentParagraph>
            Advanced use cases can compose low-level classes/factories directly (for example,
            `Quarantine`, `createRateLimiter`, `createWatcher`, `createHoundPool`). <br />
            For most applications, prefer <strong>`createTracehound`</strong>.
          </DocsContentParagraph>
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/references/configuration',
          title: 'Configuration',
          summary: 'All configuration options',
        }}
        next={{
          href: '/docs/references/examples',
          title: 'Examples',
          summary: 'Real-world examples',
        }}
      />
    </DocsPageLayout>
  )
}
