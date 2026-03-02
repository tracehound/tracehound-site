import { cn } from '@/app/lib/utils'
import { PropsWithChildren } from 'react'

export function Container({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn('w-full mx-auto max-w-max-w', className)}>{children}</div>
}
