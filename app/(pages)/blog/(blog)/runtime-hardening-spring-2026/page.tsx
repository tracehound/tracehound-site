/* eslint-disable react/jsx-no-comment-textnodes */
import { Badge } from '@/app/components/badge'
import { Row } from '@/app/components/patterns/row'
import Link from 'next/link'

export default function BlogPost() {
  return (
    <section className="relative w-full pb-16 lg:pb-24 xl:pb-30">
      <header className="w-full flex flex-col p-6 max-w-6xl mx-auto xl:p-12">
        <Badge variant="neutral">BLOG POST</Badge>
        <h3 className="my-3 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
          From v1.6 to v1.8: Operational Truth and Runtime Hardening
        </h3>
        <p className="font-sans font-light text-base mb-4 md:text-xl xl:text-2xl">
          A recap of the strongest recent Tracehound changes across runtime truth, evidence
          lifecycle, and adversarial-path hardening.
        </p>

        <div className="flex items-center gap-4 mb-2 xl:mb-4">
          <time dateTime="March 9, 2026">March 9, 2026</time>
          <strong>// Tracehound Team</strong>
        </div>

        <nav className="flex items-center gap-4">
          <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
            #release
          </span>
          <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
            #hardening
          </span>
          <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
            #forensics
          </span>
        </nav>
      </header>

      <Row />

      <article className="flex flex-col p-6 xl:p-12 gap-3 max-w-6xl mx-auto lg:gap-6 xl:gap-9">
        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          Why this wave matters
        </h3>
        <p className="font-sans md:text-lg xl:text-xl">
          Over the last release cycle, we did not chase feature count. We tightened the trust
          model. The focus was practical: make runtime state truthful, keep evidence custody
          deterministic, and close bypass windows attackers actually use under pressure.
        </p>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          v1.6: Operational truth first
        </h3>
        <p className="font-sans md:text-lg xl:text-xl">
          We removed fabricated healthy fallbacks from operator-facing surfaces and moved CLI/runtime
          status to signed snapshot input. If the snapshot is missing or invalid, operators now see
          explicit disconnected states instead of false green.
        </p>
        <ul className="pl-2 space-y-2 xl:list-disc xl:pl-6 text-lg">
          <li>Signed system snapshots with integrity verification and freshness checks.</li>
          <li>Fail-open runtime behavior preserved while observability truth got stricter.</li>
          <li>Contract-level cleanup around coordination and typed runtime errors.</li>
        </ul>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          v1.7: Evidence lifecycle hardening
        </h3>
        <p className="font-sans md:text-lg xl:text-xl">
          The Enhanced Quarantine Protocol landed as implemented behavior, not roadmap intent. We
          extended evidence custody from capture to decay/archive with bounded, deterministic rules.
        </p>
        <ul className="pl-2 space-y-2 xl:list-disc xl:pl-6 text-lg">
          <li>TTL-driven decay with bounded batch processing and explicit failure policy.</li>
          <li>Cold-storage archival path with timeout and cancellation semantics.</li>
          <li>Raw ingress byte support for deterministic hashing when adapters expose `rawBody`.</li>
          <li>Audit continuity reinforcement with stronger lifecycle-event custody.</li>
        </ul>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          v1.8: Runtime hardening on adversarial paths
        </h3>
        <p className="font-sans md:text-lg xl:text-xl">
          This release tightened real attack-path behavior. We added TLS source signals and closed
          edge cases around rate-limit rotation, runtime source mutability, and telemetry side
          effects.
        </p>
        <ul className="pl-2 space-y-2 xl:list-disc xl:pl-6 text-lg">
          <li>
            TLS source metadata support in runtime/adapters (`cipherSuite`, `version`, optional
            `alpn`).
          </li>
          <li>
            Rate limiter hardening against same-IP fingerprint rotation and eviction-based bypass.
          </li>
          <li>
            Bounded source-key normalization to reduce CPU amplification from oversized headers.
          </li>
          <li>
            Runtime source metadata exposure moved toward immutable/fail-closed behavior under
            malformed shapes.
          </li>
          <li>Telemetry hook failures isolated from intercept outcome changes.</li>
        </ul>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          Documentation and operator alignment
        </h3>
        <p className="font-sans md:text-lg xl:text-xl">
          In parallel with runtime changes, we aligned docs and website references around current
          behavior: source modeling, limiter semantics, and release/changelog sync. The goal is to
          reduce drift between shipped code and operator expectations.
        </p>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">What comes next</h3>
        <p className="font-sans md:text-lg xl:text-xl">
          The active direction remains real-world validation: installation friction, operator
          usability, false-positive containment noise, and incident reconstruction quality. We also
          logged a deferred hardening track for deeper forensic metadata immutability analysis and
          strict test-type hardening phases.
        </p>

        <p className="font-sans md:text-lg xl:text-xl">
          If you are already running Tracehound, this is a good checkpoint to update and verify your
          adapter `extractScent` path emits full `ScentSource` metadata where available.
        </p>

        <div className="flex flex-col gap-2">
          <Link
            href="/changelog"
            className="font-sans font-bold underline md:text-lg xl:text-xl hover:no-underline">
            See full changelog
          </Link>
          <Link
            href="/docs/getting-started/quickstart"
            className="font-sans font-bold underline md:text-lg xl:text-xl hover:no-underline">
            Review updated quickstart
          </Link>
          <Link
            href="/docs/references/api-reference"
            className="font-sans font-bold underline md:text-lg xl:text-xl hover:no-underline">
            Review API reference
          </Link>
        </div>
      </article>
    </section>
  )
}
