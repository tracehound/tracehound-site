import { Badge } from '@/app/components/badge'
import Link from 'next/link'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Quickstart',
  description: 'Get Tracehound running in your Node.js application in under 5 minutes.',
}

export default function Quickstart() {
  return (
    <div className="flex flex-col min-h-screen px-6 xl:px-12">
      <header className="w-full flex flex-col pb-6 xl:pb-12">
        <Badge variant="secondary">GETTING STARTED</Badge>
        <h2 className="mb-5 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-6xl/16">
          Quickstart
        </h2>

        <p className="font-sans font-light text-lg md:text-xl xl:text-2xl">
          Get Tracehound running in your Node.js application in under 5 minutes.
        </p>
      </header>

      <article className="flex flex-col gap-6 lg:gap-8 xl:gap-12">
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </article>

      <hr className="shrink-0 h-px w-full border-b border-(--border-accent) border-dashed my-8 xl:my-16" />

      <div className="w-full flex items-start">
        <div className="w-full flex flex-col items-start justify-end gap-4">
          <strong>Prev Steps</strong>

          <Link
            className="flex flex-col items-start pl-6 border-l-2 border-(--accent-secondary) transition-colors hover:text-(--accent-secondary)"
            href="/docs/getting-started/introduction">
            <strong className="font-bold text-lg">Introduction</strong>
            <span>Introduction of core package.</span>
          </Link>
        </div>

        <div className="w-full flex flex-col items-end justify-end gap-4">
          <strong>Next Steps</strong>

          <Link
            className="flex flex-col items-end pr-6 border-r-2 border-(--accent-secondary) transition-colors hover:text-(--accent-secondary)"
            href="/docs/references/configuration">
            <strong className="font-bold text-lg">Configuration</strong>
            <span>All configuration options.</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
