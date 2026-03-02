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
  auditIntegrityCode,
  interceptOutcomesCode,
  localStateCode,
  scentModelCode,
  trustBoundaryCode,
} from './codes'

export const metadata: Metadata = {
  title: 'Concepts',
  description: "Core concepts that make Tracehound's behavior predictable and operable.",
}

export default function Concepts() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Concepts"
        summary="Core concepts that make Tracehound's behavior predictable and operable."
      />

      <DocsContent>
        <DocsContentBlock title="Mental Model">
          <DocsContentParagraph>
            Tracehound is a <strong>decision-free security buffer</strong>. Detection stays outside
            (WAF/SIEM/custom detector), while Tracehound applies bounded containment and evidence
            handling.
          </DocsContentParagraph>
          <Table
            head={['Detector Layer', 'Tracehound Layer']}
            body={[
              { row: ['Decides if request is malicious', 'Processes provided threat signal'] },
              { row: ['Heuristic / semantic logic', 'Deterministic runtime behavior'] },
              { row: ['Policy ownership', 'Containment + evidence ownership'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Core Data Units">
          <DocsContentSubtitle>Scent and ThreatSignal</DocsContentSubtitle>
          <DocsContentParagraph>
            `agent.intercept` consumes a <strong>Scent</strong>. Threat classification is optional;
            when threat is absent, result is typically `clean`.
          </DocsContentParagraph>
          <Code code={scentModelCode} />
          <DocsList
            items={[
              <p key="d1">
                Canonical categories:{' '}
                <strong>`injection | ddos | flood | spam | malware | unknown`</strong>.
              </p>,
              <p key="d2">
                Severity: <strong>`low | medium | high | critical`</strong>.
              </p>,
              <p key="d3">Payload must be JSON-serializable.</p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Deterministic Intercept Outcomes">
          <DocsContentParagraph>
            Every interception ends in a typed status union. This is the primary operational
            contract between your app and Tracehound.
          </DocsContentParagraph>
          <Code code={interceptOutcomesCode} />
          <Table
            head={['Status', 'Meaning']}
            body={[
              { row: [<strong>`clean`</strong>, 'No threat signal or no action needed'] },
              { row: [<strong>`rate_limited`</strong>, 'Source throttled by limiter state'] },
              {
                row: [<strong>`payload_too_large`</strong>, 'Payload exceeds configured max size'],
              },
              { row: [<strong>`ignored`</strong>, 'Duplicate threat signature already stored'] },
              { row: [<strong>`quarantined`</strong>, 'Evidence accepted into quarantine'] },
              { row: [<strong>`error`</strong>, 'Structured internal error payload'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Fail-Open Semantics (Precise)">
          <DocsContentParagraph>
            Tracehound is designed to preserve service continuity under internal stress, but this is
            <strong> not equivalent to "everything always passes"</strong>.
          </DocsContentParagraph>
          <DocsList
            items={[
              <p key="f1">
                Internal failures are surfaced as typed outcomes/events, not silent undefined
                behavior.
              </p>,
              <p key="f2">
                Rate limiting can still return <strong>`rate_limited`</strong>; this is intentional
                configured behavior, not a failure.
              </p>,
              <p key="f3">
                Under pressure, system prioritizes bounded resource usage and host stability.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Local State by Default">
          <DocsContentParagraph>
            Each Tracehound instance keeps local runtime state (rate limiter maps, quarantine store,
            watcher counters). There is no built-in cross-instance synchronization in core.
          </DocsContentParagraph>
          <Code code={localStateCode} />
          <DocsContentParagraph>
            This keeps latency low and avoids distributed-state fragility, but global coordination
            is your responsibility at architecture level.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Evidence Integrity and Audit Chain">
          <DocsContentParagraph>
            AuditChain links records cryptographically. If historical records are altered, chain
            verification fails.
          </DocsContentParagraph>
          <Code code={auditIntegrityCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Trust Boundaries as a First-Class Concept">
          <DocsContentParagraph>
            External detector and storage assumptions should be modeled explicitly. Trust boundary
            helpers let you validate those assumptions before deployment.
          </DocsContentParagraph>
          <Code code={trustBoundaryCode} />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/references/advanced',
          title: 'Advanced',
          summary: 'Advanced configuration',
        }}
        next={{
          href: '/docs/guides/security-assurance',
          title: 'Security Assurance',
          summary: 'Facts, limitations, architectural',
        }}
      />
    </DocsPageLayout>
  )
}
