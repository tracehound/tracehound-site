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
  chaosSuiteCode,
  panicMonitoringCode,
  secOpsChecklistCode,
  upstreamHardeningCode,
} from './codes'

export const metadata: Metadata = {
  title: 'Security Assurance',
  description:
    'Verified invariants, known limitations, and operational assurance guidance for Tracehound.',
}

export default function SecurityAssurance() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Security Assurance"
        summary="Verified invariants, known limitations, and operational assurance guidance for Tracehound."
      />

      <DocsContent>
        <DocsContentBlock title="Assurance Scope">
          <DocsContentParagraph>
            This guide explains what Tracehound assurance means in practical terms: what has been
            verified through tests, what remains outside hard guarantees, and how SecOps teams
            should instrument production deployments.
          </DocsContentParagraph>
          <DocsList
            items={[
              <p key="s1">
                <strong>Goal:</strong> security layer should not become a single point of failure
                for the host app.
              </p>,
              <p key="s2">
                <strong>Method:</strong> bounded runtime controls + process separation +
                deterministic outcomes.
              </p>,
              <p key="s3">
                <strong>Caveat:</strong> assurance is not “perfect protection”; it is explicitly
                bounded and observable.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Verified Invariants">
          <DocsContentParagraph>
            Tracehound repository includes chaos-oriented verification{' '}
            <strong>(`test:chaos`)</strong> for critical resilience assumptions.
          </DocsContentParagraph>
          <Code code={chaosSuiteCode} language="bash" />
          <Table
            head={['Invariant', 'What is exercised', 'Expected outcome']}
            body={[
              {
                row: [
                  'Fail-open under worker stall',
                  'Hound worker timeout/stall path',
                  'Application path remains available; panic/alert signals emitted',
                ],
              },
              {
                row: [
                  'Process crash containment',
                  'Worker crash/termination behavior',
                  'Crash domain stays in child process; host process remains alive',
                ],
              },
              {
                row: [
                  'Degraded I/O resilience',
                  'Storage/write failure conditions',
                  'System degrades safely and surfaces operational signals',
                ],
              },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Threat Model Distinctions">
          <DocsContentParagraph>
            Tracehound is a deterministic runtime substrate, not an exploit detector. It should be
            evaluated as a containment and evidence layer.
          </DocsContentParagraph>
          <Table
            head={['Layer', 'Primary responsibility', 'What Tracehound adds']}
            body={[
              {
                row: [
                  'External detector (WAF/SIEM/rules)',
                  'Decide whether traffic is malicious',
                  'Consumes detector output as ThreatSignal input',
                ],
              },
              {
                row: [
                  'Application middleware',
                  'Serve business requests',
                  'Keeps response path deterministic with typed intercept outcomes',
                ],
              },
              {
                row: [
                  'Forensic / compliance pipeline',
                  'Preserve integrity and timeline',
                  'Quarantine + audit chain + optional cold storage adapters',
                ],
              },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Known Limitations and Gaps">
          <DocsList
            items={[
              <p key="k1">
                <strong>Pre-extraction risk:</strong> if upstream body parsing fails before scent
                creation, Tracehound cannot intervene.
              </p>,
              <p key="k2">
                <strong>Fail-open window risk:</strong> under extreme stress, attackers may attempt
                to exploit degraded periods.
              </p>,
              <p key="k3">
                <strong>Host/root trust:</strong> local audit artifacts are not immune to privileged
                host compromise.
              </p>,
              <p key="k4">
                <strong>Local-state default:</strong> cross-instance coordination is not provided by
                default in core.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Mitigation Playbook">
          <DocsContentSubtitle>1) Harden upstream parsing</DocsContentSubtitle>
          <Code code={upstreamHardeningCode} />

          <DocsContentSubtitle>2) Instrument panic and watcher signals</DocsContentSubtitle>
          <Code code={panicMonitoringCode} />

          <DocsContentSubtitle>3) Apply SecOps checks continuously</DocsContentSubtitle>
          <Code code={secOpsChecklistCode} language="typescript" />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="What Assurance Does Not Mean">
          <DocsList
            items={[
              <p key="n1">It does not mean Tracehound semantically detects all attack classes.</p>,
              <p key="n2">It does not mean every malicious request is always blocked.</p>,
              <p key="n3">
                It does not replace upstream parser hardening, network controls, or host security.
              </p>,
            ]}
          />
          <DocsContentParagraph>
            Assurance in Tracehound means bounded behavior, explicit failure visibility, and
            resilient integration characteristics under adverse conditions.
          </DocsContentParagraph>
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/guides/concepts',
          title: 'Concepts',
          summary: "Tracehound's core concepts",
        }}
        next={{
          href: '/docs/guides/evidence-lifecycle',
          title: 'Evidence Lifecycle',
          summary: 'Evidence retention, eviction and more',
        }}
      />
    </DocsPageLayout>
  )
}
