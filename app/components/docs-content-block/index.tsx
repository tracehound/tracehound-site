import { cn, urlNormalizer } from '@/app/lib/utils'
import { LinkIcon } from '@phosphor-icons/react/dist/ssr'
import { PropsWithChildren } from 'react'

type DocsContentBlock = {
  title: string
  className?: string
}

export function DocsContentBlock({
  title,
  className,
  children,
}: PropsWithChildren<DocsContentBlock>) {
  return (
    <div className={cn('flex flex-col gap-4 lg:gap-6 xl:gap-8 group', className)}>
      <a href={`#${urlNormalizer(title)}`}>
        <h3
          id={`${urlNormalizer(title)}`}
          className="relative font-heading font-bold text-xl md:text-2xl xl:text-4xl hover:text-(--border)">
          <span className="absolute top-2 -left-7 hidden group-hover:inline-flex">
            <LinkIcon size={24} weight="bold" />
          </span>
          {title}
        </h3>
      </a>
      {children}
    </div>
  )
}
