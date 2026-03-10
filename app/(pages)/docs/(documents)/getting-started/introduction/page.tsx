/* eslint-disable react/no-unescaped-entities, react/jsx-key */
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
import Image from 'next/image'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Introduction',
  description: 'Deterministic runtime security buffer for high-velocity APIs.',
}

export default function Introduction() {
  return (
    <DocsPageLayout>
      <DocsHeader label="GETTING STARTED" title="Introduction" />

      <DocsContent>
        <DocsContentBlock title="What is Tracehound?">
          <DocsContentParagraph>
            Tracehound is a <strong>deterministic security buffer</strong> for Node.js applications.
          </DocsContentParagraph>
          <DocsContentParagraph>
            When an upstream detector or risk service identifies a threat, Tracehound:
          </DocsContentParagraph>
          <DocsList
            items={[
              <p>
                <strong>Isolates</strong> the threat in a quarantine buffer
              </p>,
              <p>
                <strong>Records</strong> tamper-proof forensic evidence
              </p>,
              <p>
                <strong>Fails safely</strong> without blocking legitimate traffic
              </p>,
            ]}
          />
          <DocsContentParagraph>
            Think of it as the <strong>black box recorder</strong> for your security infrastructure.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Why Tracehound?">
          <DocsContentSubtitle>The Problem</DocsContentSubtitle>
          <DocsContentParagraph>
            Modern security stacks have a gap. What happens between threat detection and incident
            response? Usually:
          </DocsContentParagraph>
          <DocsList
            items={[
              <p>Logs get lost or rotated</p>,
              <p>Evidence is scattered across systems</p>,
              <p>Replay attacks can't be proven</p>,
              <p>Memory fills up with no eviction strategy</p>,
            ]}
          />

          <DocsContentSubtitle>The Solution</DocsContentSubtitle>
          <DocsContentParagraph>Tracehound fills this gap:</DocsContentParagraph>
          <Image
            width={989}
            height={120}
            src="/diagrams/problem-solution.svg"
            alt="Problem and Solution"
            className="select-none object-contain"
            decoding="async"
            loading="lazy"
          />

          <Table
            head={['Without Tracehound', 'With Tracehound']}
            body={[
              { row: ['Scattered logs', 'Unified evidence'] },
              { row: ['Mutable records', 'Tamper-proof chain'] },
              { row: ['Memory leaks', 'Bounded buffers'] },
              { row: ['Silent failures', 'Fail-open semantics'] },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="How It Works">
          <Image
            width={763}
            height={274}
            src="/diagrams/architecture.svg"
            alt="Architecture"
            className="select-none object-contain"
            decoding="async"
            loading="lazy"
          />

          <DocsContentSubtitle>Core Flow</DocsContentSubtitle>

          <DocsList
            items={[
              <p>
                <strong>Intercept:</strong> agent.intercept(scent) receives threat data
              </p>,
              <p>
                <strong>Quarantine:</strong> Threat is isolated with priority
              </p>,
              <p>
                <strong>Chain:</strong> Evidence is appended to tamper-proof audit chain
              </p>,
              <p>
                <strong>Evict:</strong> When full, low-priority evidence is evicted first
              </p>,
              <p>
                <strong>Export:</strong> Evidence can flow to S3/R2/GCS cold storage
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Who Is It For?">
          <div className="flex flex-col gap-2">
            <DocsContentSubtitle>Security-Conscious Teams</DocsContentSubtitle>
            <DocsContentParagraph>
              If you need to reconstruct what happened during an incident, Tracehound preserves
              verifiable evidence and runtime custody records.
            </DocsContentParagraph>
          </div>

          <div className="flex flex-col gap-2">
            <DocsContentSubtitle>Compliance Requirements</DocsContentSubtitle>
            <DocsContentParagraph>
              Tracehound provides retention, audit, and evidence-handling primitives that can feed
              your compliance controls and review workflows.
            </DocsContentParagraph>
          </div>

          <div className="flex flex-col gap-2">
            <DocsContentSubtitle>High-Traffic Services</DocsContentSubtitle>
            <DocsContentParagraph>
              Tracehound uses bounded memory with deterministic eviction. No memory leaks, no OOM
              crashes.
            </DocsContentParagraph>
          </div>

          <div className="flex flex-col gap-2">
            <DocsContentSubtitle>Fintech & Healthcare</DocsContentSubtitle>
            <DocsContentParagraph>
              When a breach costs millions, forensic evidence is non-negotiable.
            </DocsContentParagraph>
          </div>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Core Principles">
          <div className="flex flex-col gap-2">
            <DocsContentSubtitle>1. Fail-Open</DocsContentSubtitle>
            <DocsContentParagraph>
              Tracehound is designed to <strong>fail open on internal failures.</strong> If the
              security path fails, the application path continues.
            </DocsContentParagraph>
          </div>

          <div className="flex flex-col gap-2">
            <DocsContentSubtitle>2. Decision-Free</DocsContentSubtitle>
            <DocsContentParagraph>
              Tracehound <strong>does not make security decisions.</strong> Your upstream detector
              decides what's a threat. Tracehound quarantines and records.
            </DocsContentParagraph>
          </div>

          <div className="flex flex-col gap-2">
            <DocsContentSubtitle>3. Deterministic</DocsContentSubtitle>
            <DocsContentParagraph>
              Same input → same output. No ML, no heuristics, no surprises.
            </DocsContentParagraph>
          </div>

          <div className="flex flex-col gap-2">
            <DocsContentSubtitle>4. Bounded</DocsContentSubtitle>
            <DocsContentParagraph>
              Quarantine, payload size, notification delivery, and worker pressure are bounded by
              explicit limits rather than undefined growth.
            </DocsContentParagraph>
          </div>
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs',
          title: 'Summary',
          summary: 'Get started with Tracehound',
        }}
        next={{
          href: '/docs/getting-started/quickstart',
          title: 'Quickstart',
          summary: 'Get running in 5 minutes',
        }}
      />
    </DocsPageLayout>
  )
}
