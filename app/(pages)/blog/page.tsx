/* eslint-disable react/jsx-no-comment-textnodes */
import { Row } from '@/app/components/patterns/row'
import Link from 'next/link'

export default function Blog() {
  return (
    <section className="relative flex flex-col gap-6 xl:gap-0">
      <header className="w-full flex flex-col p-6 xl:p-12">
        <h3 className="my-3 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
          Blog
        </h3>
        <p className="font-sans font-light text-base md:text-xl xl:text-2xl">
          Updates, engineering deep dives, and security insights.
        </p>
      </header>

      <Row />

      <article className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col p-6 xl:p-12 border-b border-dashed border-(--border-accent) xl:border-r">
          <div className="flex items-center gap-4">
            <time dateTime="March 16, 2026">March 16, 2026</time>
            <strong>// Tracehound Team</strong>
          </div>

          <Link href="/blog/launch-day-hello-world" className="group">
            <h3 className="mb-3 font-heading font-bold text-xl md:text-2xl xl:text-4xl group-hover:pl-2.5 group-hover:bg-(--accent-primary)/50 transition-all">
              Hello, world. Tracehound is live.
            </h3>
            <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
              A launch-day note on what Tracehound already does, why we built it, and where we want
              to take deterministic runtime security next.
            </p>
          </Link>

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
        </div>

        <div className="flex flex-col p-6 xl:p-12 border-b border-dashed border-(--border-accent) xl:border-r">
          <div className="flex items-center gap-4">
            <time dateTime="March 9, 2026">March 9, 2026</time>
            <strong>// Tracehound Team</strong>
          </div>

          <Link href="/blog/runtime-hardening-spring-2026" className="group">
            <h3 className="mb-3 font-heading font-bold text-xl md:text-2xl xl:text-4xl group-hover:pl-2.5 group-hover:bg-(--accent-primary)/50 transition-all">
              From v1.6 to v1.8: Operational Truth and Runtime Hardening
            </h3>
            <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
              A practical recap of the last major Tracehound wave: signed snapshots, evidence
              lifecycle hardening, TLS source signals, and anti-bypass rate limiting.
            </p>
          </Link>

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
        </div>

        <div className="flex flex-col p-6 xl:p-12 border-b border-dashed border-(--border-accent) xl:border-r">
          <div className="flex items-center gap-4">
            <time dateTime="December 28, 2025">December 28, 2025</time>
            <strong>// Tracehound Team</strong>
          </div>

          <Link href="/blog/tracehound-launch" className="group">
            <h3 className="mb-3 font-heading font-bold text-xl md:text-2xl xl:text-4xl group-hover:pl-2.5 group-hover:bg-(--accent-primary)/50 transition-all">
              Introducing Tracehound: Deterministic Security Buffer for Node.js
            </h3>
            <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
              Why we built Tracehound, and how deterministic containment and tamper-evident
              evidence fit modern Node.js security operations.
            </p>
          </Link>

          <nav className="flex items-center gap-4">
            <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
              #release
            </span>
            <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
              #security
            </span>
            <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
              #node.js
            </span>
          </nav>
        </div>
      </article>
    </section>
  )
}
