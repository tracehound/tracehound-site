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
          Hello, world. Tracehound is live.
        </h3>
        <p className="font-sans font-light text-base mb-4 md:text-xl xl:text-2xl">
          A launch-day note on what Tracehound already does, why we built it, and where we want to
          take deterministic runtime security next.
        </p>

        <div className="flex items-center gap-4 mb-2 xl:mb-4">
          <time dateTime="March 16, 2026">March 16, 2026</time>
          <strong>// Tracehound Team</strong>
          <span className="size-1 rounded-full bg-(--border)" />
          <span>02:47 minute read</span>
          <span className="size-1 rounded-full bg-(--border)" />
          <span>659 words</span>
        </div>

        <nav className="flex items-center gap-4">
          <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
            #launch
          </span>
          <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
            #oss
          </span>
          <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
            #runtime-security
          </span>
        </nav>
      </header>

      <Row />

      <article className="flex flex-col p-6 xl:p-12 gap-3 max-w-6xl mx-auto lg:gap-6 xl:gap-9">
        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          Today felt like the right day to say hello properly.
        </h3>

        <p className="font-sans md:text-lg xl:text-xl">
          Tracehound has been taking shape in the open for a while, but today is the point where it
          feels real enough to introduce with a straight face: the docs are aligned, the runtime is
          hardened, the CLI tells the truth, and the shape of the product is finally honest.
        </p>

        <p className="font-sans md:text-lg xl:text-xl">
          So this is our launch-day hello. Not a giant manifesto. Just a clear note about what
          Tracehound is, what problem it is here to solve, and why we think this layer matters.
        </p>

        <hr className="shrink-0 h-px w-full border-b border-(--border-accent) border-dashed" />

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          What Tracehound is today
        </h3>

        <p className="font-sans md:text-lg xl:text-xl">
          Tracehound is an open-source deterministic runtime security buffer for Node.js. It sits
          between upstream detection and downstream response. It does not try to guess whether
          traffic is malicious, and it does not pretend to be a WAF, SIEM, or observability suite.
        </p>

        <p className="font-sans md:text-lg xl:text-xl">
          Instead, it accepts explicit threat signals, quarantines evidence, preserves
          tamper-evident custody, and applies bounded runtime controls without turning the host
          application into collateral damage.
        </p>

        <ul className="pl-2 space-y-2 xl:list-disc xl:pl-6 text-lg">
          <li>Deterministic intercept outcomes instead of heuristic branching.</li>
          <li>Quarantine and evidence custody designed around bounded resource usage.</li>
          <li>Fail-open behavior so internal faults do not become application-layer outages.</li>
          <li>
            Signed runtime snapshots so the CLI reports real state instead of synthetic green.
          </li>
          <li>Thin Express and Fastify adapters with no hidden decision engine inside them.</li>
        </ul>

        <p className="font-sans md:text-lg xl:text-xl">
          The current OSS surface is already practical: `@tracehound/core`, `@tracehound/express`,
          `@tracehound/fastify`, and `@tracehound/cli`, with the public repo now sitting at the
          `v1.8.6` line.
        </p>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          The problem we wanted to solve
        </h3>

        <p className="font-sans md:text-lg xl:text-xl">
          Modern application security has a lot of intelligence and not enough reflex. Detection
          systems can raise strong signals, but once a suspicious request reaches a live runtime,
          the handling path often becomes messy: logs scatter, evidence gets lost, blocking is
          inconsistent, and operators are left reconstructing an incident from fragments.
        </p>

        <p className="font-sans md:text-lg xl:text-xl">
          We kept coming back to the same idea: if an upstream authority already knows enough to
          mark something as dangerous, the runtime should respond in a disciplined way. That means
          preserving the artifact, bounding the cost, keeping the host process stable, and making
          the operational record trustworthy enough to inspect later.
        </p>

        <p className="font-sans md:text-lg xl:text-xl">
          That is the job Tracehound is trying to do. Not to be the brain. To be the reflex system.
        </p>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          Why the value is different
        </h3>

        <p className="font-sans md:text-lg xl:text-xl">
          A lot of tooling in this area competes on visibility, alerts, or intelligence. Tracehound
          is more opinionated about something narrower and more operational: what should happen
          inside the runtime once a threat-linked event exists.
        </p>

        <ul className="pl-2 space-y-2 xl:list-disc xl:pl-6 text-lg">
          <li>It gives upstream security systems a deterministic execution partner.</li>
          <li>
            It improves incident reconstruction because evidence custody is part of the runtime
            contract.
          </li>
          <li>It reduces ambiguity for operators by keeping runtime truth explicit and signed.</li>
          <li>
            It protects availability by treating security-path faults as something to contain, not
            amplify.
          </li>
        </ul>

        <p className="font-sans md:text-lg xl:text-xl">
          For us, that is the real value proposition: less security theater, more operational truth.
        </p>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">Why launch now</h3>

        <p className="font-sans md:text-lg xl:text-xl">
          Because the last few release waves made the foundation credible. From `v1.6` through
          `v1.8`, we tightened runtime truth, hardened the evidence lifecycle, added TLS source
          signals, closed rate-limit bypass edges, and aligned documentation with the software that
          actually ships.
        </p>

        <p className="font-sans md:text-lg xl:text-xl">
          That matters more than a flashy feature list. Launching a security product should come
          after the product has learned to be honest about its own boundaries.
        </p>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">What comes next</h3>

        <p className="font-sans md:text-lg xl:text-xl">
          The near-term goal is not to turn Tracehound into a bigger buzzword machine. The goal is
          to make it easier to adopt, easier to trust, and harder to misuse.
        </p>

        <ul className="pl-2 space-y-2 xl:list-disc xl:pl-6 text-lg">
          <li>Reduce installation friction and improve first-run experience.</li>
          <li>Keep refining operator usability across CLI, docs, and runtime signals.</li>
          <li>Validate behavior under real-world OSS deployment pressure.</li>
          <li>Keep improving evidence quality for incident review and forensic reconstruction.</li>
        </ul>

        <p className="font-sans md:text-lg xl:text-xl">
          We are still early, and that is part of the fun. But the direction is steady: stronger
          runtime guarantees, sharper evidence custody, and calmer security operations for teams
          shipping fast Node.js services.
        </p>

        <p className="font-sans md:text-lg xl:text-xl">
          If you are checking Tracehound out for the first time today, welcome. We hope the project
          feels useful, legible, and worth pressure-testing with us.
        </p>

        <div className="flex flex-col gap-2">
          <Link
            href="/docs/getting-started/introduction"
            className="font-sans font-bold underline md:text-lg xl:text-xl hover:no-underline">
            Read the introduction
          </Link>
          <Link
            href="/docs/getting-started/quickstart"
            className="font-sans font-bold underline md:text-lg xl:text-xl hover:no-underline">
            Start with the quickstart
          </Link>
          <Link
            href="/changelog"
            className="font-sans font-bold underline md:text-lg xl:text-xl hover:no-underline">
            Follow the changelog
          </Link>
        </div>
      </article>
    </section>
  )
}
