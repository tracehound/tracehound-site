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
              <p key="source-tls">
                <strong>Scent.source</strong>: `ip` plus optional `userAgent` and TLS metadata
                (`cipherSuite`, `version`, optional `alpn`) when available from the adapter/runtime.
              </p>,
              <p key="threat">
                <strong>ThreatSignal.category</strong>: injection | ddos | flood | spam | malware |
                unknown
              </p>,
              <p key="severity">
                <strong>ThreatSignal.severity</strong>: low | medium | high | critical
              </p>,
              <p key="limiter-behavior">
                <strong>Rate limiter behavior</strong>: sliding-window with composite source tracking +
                IP ceiling enforcement to constrain same-IP fingerprint rotation.
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
            <strong>`pressure.transition`</strong>,{' '}
            <strong>`pressure.archive_suppressed`</strong>, <strong>`system.panic`</strong>.
          </DocsContentParagraph>

          <DocsContentSubtitle>Webhook delivery policy</DocsContentSubtitle>
          <DocsList
            items={[
              <p key="webhook-bounded">
                Webhook delivery is bounded with a fixed inflight worker cap and bounded backlog.
              </p>,
              <p key="webhook-ssrf">
                Loopback, RFC1918, link-local, metadata-service, malformed, and redirecting
                destinations are rejected.
              </p>,
              <p key="webhook-credentials">
                Embedded URL credentials such as <strong>`https://user:pass@example.com/hook`</strong>{' '}
                are intentionally rejected. If the receiver needs authentication, send it through
                explicit headers such as <strong>`Authorization`</strong>.
              </p>,
            ]}
          />

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
          <DocsContentParagraph>
            <strong>@tracehound/core</strong> also exports canonical operational helpers such as{' '}
            <strong>`SYSTEM_SNAPSHOT_ENV`</strong>, <strong>`HOUND_PRESSURE_ERRORS`</strong>,{' '}
            <strong>`HoundPressureErrorCode`</strong>, and{' '}
            <strong>`isHoundPressureError`</strong> so CLI wiring and pressure matching do not rely
            on raw string literals.
          </DocsContentParagraph>
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
        <Separator />

        <DocsContentBlock title="Adapter Options (Express / Fastify)">
          <DocsContentParagraph>
            <strong>`@tracehound/express`</strong> and <strong>`@tracehound/fastify`</strong> expose
            options beyond <strong>`agent`</strong> that affect memory safety and source IP
            fidelity. See the full reference in{' '}
            <a href="/docs/references/configuration">Configuration → Adapter Options</a>.
          </DocsContentParagraph>
          <Table
            head={['Option', 'Description']}
            body={[
              {
                row: [
                  <strong key="mp">`maxPayloadSize`</strong>,
                  'Body clone guard. Skips JSON.stringify+parse when Content-Length exceeds this value, preventing memory amplification before agent rejection.',
                ],
              },
              {
                row: [
                  <strong key="ip">`resolveSourceIp`</strong>,
                  'Custom IP resolver. Override req.ip when running behind a proxy or CDN to prevent X-Forwarded-For spoofing from bypassing rate limiting.',
                ],
              },
              {
                row: [
                  <strong key="sig">`emitSignatureInResponse`</strong>,
                  'Include evidence signature in HTTP 403 body. Disabled by default — prevents correlation attacks.',
                ],
              },
              {
                row: [
                  <strong key="tid">`emitTraceIdHeader`</strong>,
                  'Emit x-tracehound-trace-id on quarantined responses. Disabled by default for privacy-sensitive environments.',
                ],
              },
            ]}
          />
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

