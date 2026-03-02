import { cn, urlNormalizer } from '@/app/lib/utils'
import { LinkIcon } from '@phosphor-icons/react/dist/ssr'
import type { PropsWithChildren } from 'react'

export function DocsContentSubtitle({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <a href={`#${urlNormalizer(children?.toLocaleString() || '')}`}>
      <h5
        id={`${urlNormalizer(children?.toLocaleString() || '')}`}
        className={cn(
          'relative font-heading font-bold text-base md:text-xl xl:text-2xl group hover:text-(--border)',
          className,
        )}>
        <span className="absolute top-2 -left-5 hidden group-hover:inline-flex">
          <LinkIcon size={16} weight="bold" />
        </span>
        {children}
      </h5>
    </a>
  )
}
