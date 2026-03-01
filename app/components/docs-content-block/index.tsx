import { cn } from '@/app/lib/utils'
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
    <div className={cn('flex flex-col', className)}>
      <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">{title}</h3>
      {children}
    </div>
  )
}
