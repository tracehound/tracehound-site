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
  detectorContractCode,
  failOpenHandlingCode,
  ingressHardeningCode,
  riskMonitoringCode,
} from './codes'

export const metadata: Metadata = {
  title: 'Threat Model',
  description:
    'Deterministic boundaries, threat classes, and explicit ownership model for Tracehound deployments.',
}

export default function ThreatModel() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Threat Model"
        summary="Deterministic boundaries, threat classes, and explicit ownership model for Tracehound deployments."
      />

      <DocsContent>
        <DocsContentBlock title="Threat Model Objective">
          <DocsContentParagraph>
            This page clarifies what Tracehound is expected to protect, what it explicitly does not
            protect, and where operational responsibility remains with the host application and
            SecOps.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="System Boundary">
          <Table
            head={['Boundary', 'Inside Tracehound', 'Outside Tracehound']}
            body={[
              {
                row: [
                  'Threat decision',
                  'Consumes ThreatSignal and applies deterministic handling',
                  'WAF/SIEM/rule engine decides maliciousness',
                ],
              },
              {
                row: [
                  'Request processing',
                  'Rate limiting, payload bounds, quarantine, notifications',
                  'Business authorization and domain logic',
                ],
              },
              {
                row: [
                  'Forensic integrity',
                  'Evidence lifecycle + audit chain verification',
                  'External retention/legal governance process',
                ],
              },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Threat Classes and Coverage">
          <Table
            head={['Threat class', 'Coverage in Tracehound', 'Notes']}
            body={[
              {
                row: [
                  'Volumetric pressure / abuse',
                  'Bounded handling',
                  'Rate limiting + capacity limits reduce blast radius',
                ],
              },
              {
                row: [
                  'Evidence tampering (application layer)',
                  'Tamper-evident detection',
                  'Audit chain verifies record continuity',
                ],
              },
              {
                row: [
                  'Semantic exploit detection (SQLi/XSS/RCE etc.)',
                  'Out of scope',
                  'Must be provided by external detector layer',
                ],
              },
              {
                row: [
                  'OS/kernel/container escape',
                  'Out of scope',
                  'Host and platform hardening responsibility',
                ],
              },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Liability and Ownership Boundaries">
          <DocsList
            items={[
              <p key="o1">
                <strong>Business-logic vulnerabilities</strong> (access control, IDOR, workflow
                flaws) remain with application architecture.
              </p>,
              <p key="o2">
                <strong>Data governance obligations</strong> (PII minimization/redaction/legal
                retention) remain with data owners and compliance processes.
              </p>,
              <p key="o3">
                <strong>Host security and privileged compromise</strong> are platform/operations
                concerns, not solved solely by in-process middleware.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Failure Modes and Blast Radius">
          <DocsContentSubtitle>Fail-open under internal error</DocsContentSubtitle>
          <Code code={failOpenHandlingCode} />
          <DocsContentParagraph>
            Tracehound returns typed outcomes and is designed to avoid turning security middleware
            into an availability kill-switch.
          </DocsContentParagraph>

          <DocsContentSubtitle>Upstream parser boundary</DocsContentSubtitle>
          <Code code={ingressHardeningCode} />
          <DocsContentParagraph>
            If request parsing fails before scent creation, Tracehound cannot intervene. Input
            parser limits must be enforced upstream.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Detector Contract Model">
          <DocsContentParagraph>
            Convert detector-native outputs into canonical <strong>`ThreatSignal`</strong>{' '}
            categories and severities. Keep this mapping explicit and versioned.
          </DocsContentParagraph>
          <Code code={detectorContractCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Residual Risk and Mitigation Matrix">
          <Table
            head={['Residual risk', 'Practical mitigation']}
            body={[
              {
                row: [
                  'Fail-open window exploitation attempts',
                  'Tight rate limits, panic alerts, and anomaly monitoring',
                ],
              },
              {
                row: [
                  'Quarantine saturation under sustained attack',
                  'Tune maxCount/maxBytes, monitor capacityPercent, add archival workflow',
                ],
              },
              {
                row: [
                  'Worker timeout/error storms',
                  'Track houndPool timeout/error counters and trigger incident workflows',
                ],
              },
              {
                row: [
                  'Detector classification drift',
                  'Contract tests for detector-to-ThreatSignal mapping',
                ],
              },
            ]}
          />
          <Code code={riskMonitoringCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Practical Summary">
          <DocsContentParagraph>
            Threat model maturity here means explicit boundaries: Tracehound is a deterministic
            containment and evidence substrate, while threat semantics and policy decisions stay in
            detector and application layers.
          </DocsContentParagraph>
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/guides/evidence-lifecycle',
          title: 'Evidence Lifecycle',
          summary: 'Evidence retention, eviction and more',
        }}
        next={{
          href: '/docs/guides/cold-storage-security',
          title: 'Cold Storage Security',
          summary: 'Long-term archival layer for evidence',
        }}
      />
    </DocsPageLayout>
  )
}
