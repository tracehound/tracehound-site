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
  availabilityCheckCode,
  integrityReadCode,
  integrityWriteCode,
  leastPrivilegePolicyCode,
  s3AdapterCode,
} from './codes'

export const metadata: Metadata = {
  title: 'Cold Storage Security',
  description: 'Security controls and operational guidance for long-term evidence archival.',
}

export default function ColdStorageSecurity() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Cold Storage Security"
        summary="Security controls and operational guidance for long-term evidence archival."
      />

      <DocsContent>
        <DocsContentBlock title="Scope and Security Objective">
          <DocsContentParagraph>
            Cold storage in Tracehound is the archival layer for evidence outside in-memory
            quarantine. The objective is to preserve integrity, control access, and keep failures
            visible without destabilizing your runtime path.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Architecture Model">
          <Table
            head={['Layer', 'Responsibility']}
            body={[
              {
                row: [
                  'Encoding layer',
                  'Compress + hash payload via integrity codecs before archive writes',
                ],
              },
              {
                row: [
                  'Adapter layer',
                  'Write/read/delete/isAvailable through injected storage client',
                ],
              },
              {
                row: [
                  'Storage provider',
                  'TLS transport, encryption-at-rest, IAM/policy enforcement',
                ],
              },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Adapter Integration (S3-Compatible)">
          <DocsContentParagraph>
            Core ships a provider-neutral `S3LikeClient` interface. You inject your own SDK-backed
            client.
          </DocsContentParagraph>
          <Code code={s3AdapterCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Integrity Requirements">
          <DocsContentSubtitle>Write path</DocsContentSubtitle>
          <Code code={integrityWriteCode} />

          <DocsContentSubtitle>Read path (verify before decode)</DocsContentSubtitle>
          <Code code={integrityReadCode} />

          <DocsList
            items={[
              <p key="i1">Never decode archival payloads before `verify(payload)` passes.</p>,
              <p key="i2">Treat integrity mismatch as a security incident, not a normal retry case.</p>,
              <p key="i3">
                Keep evidence IDs and storage keys deterministic to simplify investigations.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Transport and Encryption Controls">
          <Table
            head={['Control', 'Recommendation']}
            body={[
              { row: ['Transport', 'TLS 1.2+ (prefer TLS 1.3 where available)'] },
              {
                row: [
                  'At-rest encryption',
                  'Enable provider encryption (SSE-S3/SSE-KMS/CMEK equivalents)',
                ],
              },
              {
                row: [
                  'Key management',
                  'Use managed KMS and enforce documented rotation cadence',
                ],
              },
            ]}
          />
          <DocsContentParagraph>
            These controls are mostly provider-side controls; Tracehound integrates with them
            through your injected storage client configuration.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Access Control and Least Privilege">
          <DocsContentParagraph>
            Scope storage credentials to the minimum required actions and bucket prefix.
          </DocsContentParagraph>
          <Code code={leastPrivilegePolicyCode} language="json" />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Availability and Failure Handling">
          <DocsContentParagraph>
            Cold storage availability should be monitored explicitly. Archive errors must be logged
            and alerted, not silently ignored.
          </DocsContentParagraph>
          <Code code={availabilityCheckCode} />
          <Table
            head={['Failure mode', 'Operational response']}
            body={[
              {
                row: [
                  'Write failure',
                  'Log error + alert, continue runtime path according to policy',
                ],
              },
              {
                row: [
                  'Read failure',
                  'Return forensic retrieval error, do not fabricate payload state',
                ],
              },
              {
                row: [
                  'Integrity verify failure',
                  'Mark evidence compromised and trigger incident workflow',
                ],
              },
              {
                row: [
                  'Provider unavailable',
                  'Emit availability alert and activate degraded archival mode',
                ],
              },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Production Checklist">
          <DocsList
            items={[
              <p key="c1">Archive write path tested with real provider credentials in staging.</p>,
              <p key="c2">Read path always enforces verify-before-decode.</p>,
              <p key="c3">IAM/policy scope is prefix-limited and least-privilege.</p>,
              <p key="c4">Provider-side encryption and key rotation are documented.</p>,
              <p key="c5">Cold storage availability and error metrics are connected to alerts.</p>,
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/guides/threat-model',
          title: 'Threat Model',
          summary: 'Security boundaries, legal/liability and more',
        }}
        next={{
          href: '/docs/guides/fail-open-behaviour',
          title: 'Fail-Open Behaviour',
          summary: 'Tracehound error management',
        }}
      />
    </DocsPageLayout>
  )
}
