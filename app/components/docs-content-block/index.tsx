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
    <div className={cn('flex flex-col gap-4 lg:gap-6 xl:gap-8', className)}>
      <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">{title}</h3>
      {children}
    </div>
  )
}
