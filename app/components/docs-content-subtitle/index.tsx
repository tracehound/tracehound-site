import { cn } from '@/app/lib/utils'
import type { PropsWithChildren } from 'react'

export function DocsContentSubtitle({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h5 className={cn('font-heading font-bold text-base md:text-xl xl:text-2xl', className)}>
      {children}
    </h5>
  )
}
