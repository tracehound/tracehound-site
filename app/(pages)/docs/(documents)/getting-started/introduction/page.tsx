import { Badge } from '@/app/components/badge'
import Link from 'next/link'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Introduction',
  description: 'Deterministic Runtime Security Buffer for Modern Applications.',
}

export default function Introduction() {
  return (
    <div className="flex flex-col min-h-screen px-6 xl:px-12">
      <header className="w-full flex flex-col pb-6 xl:pb-12">
        <Badge variant="secondary">GETTING STARTED</Badge>
        <h2 className="mb-5 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-6xl/16">
          Introduction
        </h2>
      </header>

      <article className="flex flex-col gap-6 lg:gap-8 xl:gap-12">
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">
            What is Tracehound?
          </h3>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            Tracehound is a <strong>deterministic security</strong> buffer for Node.js applications.
          </p>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            When your WAF or detection system identifies a threat, Tracehound:
          </p>
          <ul className="pl-2 xl:list-disc xl:pl-6 text-lg mb-3 lg:mb-6 xl:mb-9">
            <li>
              <strong>Isolates</strong> the threat in a quarantine buffer
            </li>
            <li>
              <strong>Records</strong> tamper-proof forensic evidence
            </li>
            <li>
              <strong>Fails safely</strong> without blocking legitimate traffic
            </li>
          </ul>
          <p className="font-sans md:text-lg xl:text-xl lg:mb-6">
            Think of it as the black box recorder for your security infrastructure.
          </p>
        </div>

        <hr className="shrink-0 h-px w-full border-b border-(--border-accent) border-dashed" />

        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">
            Why Tracehound?
          </h3>
          <h4 className="mb-5 font-heading font-bold text-lg md:text-xl xl:text-3xl">
            The Problem
          </h4>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            Modern security stacks have a gap. What happens between threat detection and incident
            response? Usually:
          </p>
          <ul className="pl-2 xl:list-disc xl:pl-6 text-lg mb-3 lg:mb-6 xl:mb-9">
            <li>Logs get lost or rotated</li>
            <li>Evidence is scattered across systems</li>
            <li>Replay attacks can't be proven</li>
            <li>Memory fills up with no eviction strategy</li>
          </ul>
          <h4 className="mb-5 font-heading font-bold text-lg md:text-xl xl:text-3xl">
            The Solution
          </h4>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            Tracehound fills this gap:
          </p>
          <img
            src="/diagrams/problem-solution.svg"
            alt="Problem and Solution"
            className="object-cover w-fit select-none mb-3 lg:mb-6 xl:mb-9"
          />

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

        <hr className="shrink-0 h-px w-full border-b border-(--border-accent) border-dashed" />

        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">
            How It Works
          </h3>

          <img
            src="/diagrams/architecture.svg"
            alt="Architecture"
            className="object-cover w-fit select-none mb-3 lg:mb-6 xl:mb-9"
          />

          <h4 className="mb-5 font-heading font-bold text-lg md:text-xl xl:text-3xl">Core Flow</h4>
          <ul className="pl-2 xl:list-disc xl:pl-6 text-lg mb-3 lg:mb-6 xl:mb-9">
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
        </div>

        <hr className="shrink-0 h-px w-full border-b border-(--border-accent) border-dashed" />

        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">
            Who Is It For?
          </h3>

          <h4 className="mb-2 font-heading font-bold text-lg md:text-xl xl:text-3xl">
            Security-Conscious Teams
          </h4>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            If you need to prove what happened during an incident, Tracehound provides court-grade
            evidence.
          </p>

          <h4 className="mb-2 font-heading font-bold text-lg md:text-xl xl:text-3xl">
            Compliance Requirements
          </h4>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            GDPR, SOC2, PCI-DSS all require evidence retention. Tracehound's audit chain is designed
            for compliance.
          </p>

          <h4 className="mb-2 font-heading font-bold text-lg md:text-xl xl:text-3xl">
            High-Traffic Services
          </h4>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            Tracehound uses bounded memory with deterministic eviction. No memory leaks, no OOM
            crashes.
          </p>

          <h4 className="mb-2 font-heading font-bold text-lg md:text-xl xl:text-3xl">
            Fintech & Healthcare
          </h4>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            When a breach costs millions, forensic evidence is non-negotiable.
          </p>
        </div>

        <hr className="shrink-0 h-px w-full border-b border-(--border-accent) border-dashed" />

        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">
            Core Principles
          </h3>

          <h4 className="mb-2 font-heading font-bold text-lg md:text-xl xl:text-3xl">
            1. Fail-Open
          </h4>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            Tracehound <strong>never blocks legitimate traffic.</strong> If the agent crashes,
            traffic passes through.
          </p>

          <h4 className="mb-2 font-heading font-bold text-lg md:text-xl xl:text-3xl">
            2. Decision-Free
          </h4>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            Tracehound <strong>does not make security decisions.</strong> Your WAF/detector decides
            what's a threat. Tracehound quarantines and records.
          </p>

          <h4 className="mb-2 font-heading font-bold text-lg md:text-xl xl:text-3xl">
            3. Deterministic
          </h4>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            Same input → same output. No ML, no heuristics, no surprises.
          </p>

          <h4 className="mb-2 font-heading font-bold text-lg md:text-xl xl:text-3xl">
            4. Open Core
          </h4>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
            Core security features are <strong>free and open source.</strong> Commercial packages
            extend capability, not safety.
          </p>
        </div>
      </article>

      <hr className="shrink-0 h-px w-full border-b border-(--border-accent) border-dashed my-8 xl:my-16" />

      <div className="w-full flex flex-col items-end justify-end gap-4">
        <strong>Next Steps</strong>

        <Link
          className="flex flex-col items-end pr-6 border-r-2 border-(--accent-secondary) transition-colors hover:text-(--accent-secondary)"
          href="/docs/getting-started/quickstart">
          <strong className="font-bold text-lg">Quickstart</strong>
          <span>Get running in 5 minutes.</span>
        </Link>
      </div>
    </div>
  )
}
