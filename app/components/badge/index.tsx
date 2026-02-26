import { cn } from '@/app/lib/utils'
import { PropsWithChildren } from 'react'

type BadgeProps = {
  variant: 'primary' | 'secondary' | 'neutral' | 'light'
}

export function Badge({ variant, children }: PropsWithChildren<BadgeProps>) {
  return (
    <span
      className={cn(
        'h-5 gap-1 border border-transparent px-2 py-0.5 text-sm font-bold font-heading transition-all inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 overflow-hidden group/badge pointer-events-none select-none',
        variant === 'primary' && 'border-(--accent-primary) text-(--accent-primary)',
        variant === 'secondary' && 'border-(--accent-secondary) text-(--accent-secondary)',
        variant === 'neutral' && 'border-(--foreground) text-(--foreground)',
      )}>
      {children}
    </span>
  )
}
