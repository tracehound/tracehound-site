import { cn } from '@/app/lib/utils'
import type { PropsWithChildren } from 'react'

export function DocsContentParagraph({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <p className={cn('font-sans md:text-lg xl:text-xl', className)}>{children}</p>
}
