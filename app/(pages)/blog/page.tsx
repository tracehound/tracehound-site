import { Row } from '@/app/components/patterns/row'
import Link from 'next/link'

export default function Blog() {
  return (
    <section className="relative flex flex-col gap-6">
      <header className="w-full flex flex-col p-6 xl:p-12">
        <h3 className="my-3 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
          Blog
        </h3>
        <p className="font-sans font-light text-base md:text-xl xl:text-2xl">
          Updates, engineering deep dives, and security insights.
        </p>
      </header>

      <Row />

      <article className="grid grid-cols-1 gap-12 p-6 xl:grid-cols-2 xl:p-12 xl:gap-24">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <time dateTime="December 28, 2025">December 29, 2025</time>
            <strong>// Tracehound Team</strong>
          </div>

          <Link href="/blog/meet-argos" className="group">
            <h3 className="mb-3 font-heading font-bold text-xl md:text-2xl xl:text-4xl group-hover:pl-2.5 group-hover:bg-(--accent-primary)/50 transition-all">
              Meet Argos: The Eye That Never Sleeps
            </h3>
            <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
              Why we built a separate behavioral observer for the Node.js runtime, and what it sees
              that APMs miss.
            </p>
          </Link>

          <nav className="flex items-center gap-4">
            <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
              #argos
            </span>
            <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
              #observability
            </span>
            <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
              #nodejs
            </span>
          </nav>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <time dateTime="December 28, 2025">December 28, 2025</time>
            <strong>// Tracehound Team</strong>
          </div>

          <Link href="/blog/tracehound-launch" className="group">
            <h3 className="mb-3 font-heading font-bold text-xl md:text-2xl xl:text-4xl group-hover:pl-2.5 group-hover:bg-(--accent-primary)/50 transition-all">
              Introducing Tracehound: Deterministic Security Runtime for NodeJS
            </h3>
            <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
              Why we built Tracehound, and how it solves the runtime security problem for modern
              applications.
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
              #nodejs
            </span>
          </nav>
        </div>
      </article>
    </section>
  )
}
