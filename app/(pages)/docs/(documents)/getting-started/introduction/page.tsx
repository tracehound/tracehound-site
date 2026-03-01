import { DocsContent } from '@/app/components/docs-content'
import { DocsContentBlock } from '@/app/components/docs-content-block'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsList } from '@/app/components/docs-list'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import { Separator } from '@/app/components/separator'
import Image from 'next/image'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Introduction',
  description: 'Deterministic Runtime Security Buffer for Modern Applications.',
}

export default function Introduction() {
  return (
    <DocsPageLayout>
      <DocsHeader label="GETTING STARTED" title="Introduction" />

      <DocsContent>
        <DocsContentBlock title="What is Tracehound?">
          <p className="font-sans md:text-lg xl:text-xl">
            Tracehound is a <strong>deterministic security</strong> buffer for Node.js applications.
          </p>
          <p className="font-sans md:text-lg xl:text-xl">
            When your WAF or detection system identifies a threat, Tracehound:
          </p>
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
          <p className="font-sans md:text-lg xl:text-xl">
            Think of it as the black box recorder for your security infrastructure.
          </p>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Why Tracehound?">
          <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">The Problem</h4>
          <p className="font-sans md:text-lg xl:text-xl">
            Modern security stacks have a gap. What happens between threat detection and incident
            response? Usually:
          </p>
          <ul className="pl-2 xl:list-disc xl:pl-6 text-lg">
            <li>Logs get lost or rotated</li>
            <li>Evidence is scattered across systems</li>
            <li>Replay attacks can't be proven</li>
            <li>Memory fills up with no eviction strategy</li>
          </ul>
          <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">The Solution</h4>
          <p className="font-sans md:text-lg xl:text-xl">Tracehound fills this gap:</p>
          <Image
            width={945}
            height={120}
            src="/diagrams/problem-solution.svg"
            alt="Problem and Solutionture"
            className="select-none"
            objectFit="contain"
            decoding="async"
            loading="lazy"
          />

          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="[&_tr]:border-b [&_tr]:border-(--border-accent)">
                  <th className="text-foreground h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                    Without Tracehound
                  </th>
                  <th className="text-foreground h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                    With Tracehound
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0 [&_tr]:border-(--border-accent)">
                <tr className="hover:bg-(--background) border-b transition-colors">
                  <td className="py-2 px-4 align-middle whitespace-nowrap">Scattered logs</td>
                  <td className="py-2 px-4 align-middle whitespace-nowrap">Unified evidence</td>
                </tr>
                <tr className="hover:bg-(--background) border-b transition-colors">
                  <td className="py-2 px-4 align-middle whitespace-nowrap">Mutable records</td>
                  <td className="py-2 px-4 align-middle whitespace-nowrap">Tamper-proof chain</td>
                </tr>
                <tr className="hover:bg-(--background) border-b transition-colors">
                  <td className="py-2 px-4 align-middle whitespace-nowrap">Memory leaks</td>
                  <td className="py-2 px-4 align-middle whitespace-nowrap">Bounded buffers</td>
                </tr>
                <tr className="hover:bg-(--background) border-b transition-colors">
                  <td className="py-2 px-4 align-middle whitespace-nowrap">Silent failures</td>
                  <td className="py-2 px-4 align-middle whitespace-nowrap">Fail-open semantics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="How It Works">
          <Image
            width={720}
            height={274}
            src="/diagrams/architecture.svg"
            alt="Architecture"
            className="select-none"
            objectFit="contain"
            decoding="async"
            loading="lazy"
          />

          <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">Core Flow</h4>
          <ul className="pl-2 xl:list-disc xl:pl-6 text-lg">
            <li>
              <strong>Intercept:</strong> agent.intercept(scent) receives threat data
            </li>
            <li>
              <strong>Quarantine:</strong> Threat is isolated with priority
            </li>
            <li>
              <strong>Chain:</strong> Evidence is appended to tamper-proof audit chain
            </li>
            <li>
              <strong>Evict:</strong> When full, low-priority evidence is evicted first
            </li>
            <li>
              <strong>Export:</strong> Evidence can flow to S3/R2/GCS cold storage
            </li>
          </ul>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Who Is It For?">
          <div className="flex flex-col gap-2">
            <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
              Security-Conscious Teams
            </h4>
            <p className="font-sans md:text-lg xl:text-xl">
              If you need to prove what happened during an incident, Tracehound provides court-grade
              evidence.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
              Compliance Requirements
            </h4>
            <p className="font-sans md:text-lg xl:text-xl">
              GDPR, SOC2, PCI-DSS all require evidence retention. Tracehound's audit chain is
              designed for compliance.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
              High-Traffic Services
            </h4>
            <p className="font-sans md:text-lg xl:text-xl">
              Tracehound uses bounded memory with deterministic eviction. No memory leaks, no OOM
              crashes.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
              Fintech & Healthcare
            </h4>
            <p className="font-sans md:text-lg xl:text-xl">
              When a breach costs millions, forensic evidence is non-negotiable.
            </p>
          </div>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Core Principles">
          <div className="flex flex-col gap-2">
            <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">1. Fail-Open</h4>
            <p className="font-sans md:text-lg xl:text-xl">
              Tracehound <strong>never blocks legitimate traffic.</strong> If the agent crashes,
              traffic passes through.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
              2. Decision-Free
            </h4>
            <p className="font-sans md:text-lg xl:text-xl">
              Tracehound <strong>does not make security decisions.</strong> Your WAF/detector
              decides what's a threat. Tracehound quarantines and records.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
              3. Deterministic
            </h4>
            <p className="font-sans md:text-lg xl:text-xl">
              Same input → same output. No ML, no heuristics, no surprises.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">4. Open Core</h4>
            <p className="font-sans md:text-lg xl:text-xl">
              Core security features are <strong>free and open source.</strong> Commercial packages
              extend capability, not safety.
            </p>
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
