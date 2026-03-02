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
  archivePatternCode,
  interceptLifecycleCode,
  policyChecklistCode,
  purgeReasonsCode,
  quarantineOpsCode,
} from './codes'

export const metadata: Metadata = {
  title: 'Evidence Lifecycle Policy',
  description: 'How evidence is created, retained, evicted, archived, and removed in Tracehound.',
}

export default function EvidenceLifecycle() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Evidence Lifecycle Policy"
        summary="How evidence is created, retained, evicted, archived, and removed in Tracehound."
      />

      <DocsContent>
        <DocsContentBlock title="Lifecycle Overview">
          <DocsContentParagraph>
            In current core, evidence is produced by `agent.intercept`, stored in quarantine, and
            then removed via neutralization, eviction, purge, or flush workflows.
          </DocsContentParagraph>
          <Code code={interceptLifecycleCode} />
          <Table
            head={['State', 'Meaning', 'Trigger']}
            body={[
              { row: ['Created', 'Evidence object generated from Scent', 'Threat-bearing intercept'] },
              { row: ['Quarantined', 'Stored in bounded in-memory quarantine', 'Insert accepted'] },
              { row: ['Ignored', 'Duplicate signature not re-stored', 'Duplicate detection'] },
              { row: ['Neutralized', 'Removed with audit record', 'neutralize/flush/eviction'] },
              { row: ['Purged', 'Removed with explicit purge reason', 'purge(timeout/error/abort/panic)'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Retention and Eviction Semantics">
          <DocsContentParagraph>
            Quarantine capacity is bounded by `maxCount` and `maxBytes`. When limits are exceeded,
            core evicts by priority policy in deterministic order.
          </DocsContentParagraph>
          <Table
            head={['Dimension', 'Current core behavior']}
            body={[
              { row: ['Capacity bounds', '`maxCount` and `maxBytes` are enforced'] },
              { row: ['Eviction policy', 'Priority-based (lower severity first, then oldest)'] },
              { row: ['Default policy in createTracehound', '`priority`'] },
              { row: ['Built-in TTL retention', 'Not provided by default in current core'] },
              { row: ['Automatic cold storage evacuation', 'Not automatic in current core'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Quarantine Operations">
          <DocsContentParagraph>
            Core quarantine API gives explicit operations for inspection, removal, and emergency
            cleanup.
          </DocsContentParagraph>
          <Code code={quarantineOpsCode} />
          <DocsContentSubtitle>Purge reasons</DocsContentSubtitle>
          <Code code={purgeReasonsCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Audit Chain and Integrity">
          <DocsContentParagraph>
            Neutralization and lifecycle transitions are represented through chain-linked records in
            `AuditChain`. Integrity checks should be part of operational controls.
          </DocsContentParagraph>
          <Code code={policyChecklistCode} />
          <DocsList
            items={[
              <p key="a1">Monitor audit chain length growth against expected traffic.</p>,
              <p key="a2">Alert on any `auditChain.verify()` failure.</p>,
              <p key="a3">Treat integrity mismatch as a high-severity security event.</p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Cold Storage Archival Pattern">
          <DocsContentParagraph>
            S3-compatible storage is available through adapter APIs. In current core, archival is an
            explicit application workflow, not an automatic quarantine policy.
          </DocsContentParagraph>
          <Code code={archivePatternCode} />
          <DocsList
            items={[
              <p key="c1">Encode payload with integrity before storage write.</p>,
              <p key="c2">Use write failures as observable operational signals.</p>,
              <p key="c3">Validate retrieval path in staging before production enablement.</p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Policy Guidance">
          <Table
            head={['Objective', 'Practical guidance']}
            body={[
              {
                row: [
                  'Prevent memory pressure incidents',
                  'Tune maxCount/maxBytes with realistic load tests, not defaults only',
                ],
              },
              {
                row: [
                  'Keep high-value evidence',
                  'Use priority eviction and monitor severity distribution in stats',
                ],
              },
              {
                row: [
                  'Support incident forensics',
                  'Export selected evidence to cold storage and verify integrity path regularly',
                ],
              },
              {
                row: [
                  'Avoid silent lifecycle drift',
                  'Track quarantine stats + auditChain.verify() in your monitoring baseline',
                ],
              },
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/guides/security-assurance',
          title: 'Security Assurance',
          summary: 'Facts, limitations, architectural',
        }}
        next={{
          href: '/docs/guides/threat-model',
          title: 'Threat Model',
          summary: 'Security boundaries, legal/liability and more',
        }}
      />
    </DocsPageLayout>
  )
}
