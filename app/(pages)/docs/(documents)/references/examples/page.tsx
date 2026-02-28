import { Badge } from '@/app/components/badge'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Real-world examples of Tracehound integration.',
}

export default function Examples() {
  return (
    <div className="flex flex-col min-h-screen px-6 xl:px-12">
      <header className="w-full flex flex-col pb-6 xl:pb-12">
        <Badge variant="secondary">REFERENCES</Badge>
        <h2 className="mb-5 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-6xl/16">
          Examples
        </h2>

        <p className="font-sans font-light text-lg md:text-xl xl:text-2xl">
          Real-world examples of Tracehound integration.
        </p>
      </header>

      <article className="flex flex-col gap-6 lg:gap-8 xl:gap-12">
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">WIP</h3>
        </div>
      </article>
    </div>
  )
}
