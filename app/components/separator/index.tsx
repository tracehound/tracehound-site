import { cn } from '@/app/lib/utils'

export function Separator({ className }: { className?: string }) {
  return (
    <hr
      className={cn(
        'shrink-0 w-full border-b-px border-(--border-accent) border-dashed',
        className,
      )}
    />
  )
}
