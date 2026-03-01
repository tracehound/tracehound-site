import type { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { Row } from '../patterns/row'

type Step = {
  href: Url
  title: string
  summary: string
}

type DocsNavigationProps = {
  prev?: Step
  next?: Step
}

export function DocsNavigation({ prev, next }: DocsNavigationProps) {
  return (
    <>
      <Row className="mb-8 xl:mb-16" />

      <div className="w-full flex items-start px-6 xl:px-12">
        {prev && (
          <div className="w-full flex flex-col items-start justify-end gap-4">
            <strong>Prev Steps</strong>

            <Link
              className="flex flex-col items-start pl-6 border-l-2 border-(--accent-secondary) transition-colors hover:text-(--accent-secondary)"
              href={prev.href}>
              <strong className="font-bold text-lg">{prev.title}</strong>
              <span>{prev.summary}</span>
            </Link>
          </div>
        )}

        {next && (
          <div className="w-full flex flex-col items-end justify-end gap-4">
            <strong>Next Steps</strong>

            <Link
              className="flex flex-col items-end pr-6 border-r-2 border-(--accent-secondary) transition-colors hover:text-(--accent-secondary)"
              href={next.href}>
              <strong className="font-bold text-lg">{next.title}</strong>
              <span>{next.summary}</span>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
