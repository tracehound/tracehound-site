import { cn } from '@/app/lib/utils'

export function Row() {
  return (
    <div className="relative -top-px h-px w-full flex items-center justify-between -z-1 border-t border-(--border-accent) border-dashed pointer-events-none">
      <span
        className={cn(
          'absolute -top-2.5 -left-2.75',
          'before:w-5 before:h-px before:bg-(--border)/50 before:absolute before:top-2.25 before:left-0',
          'after:w-px after:h-5 after:bg-(--border)/50 after:absolute after:top-0 after:left-2.5',
        )}
      />

      <span
        className={cn(
          'absolute -top-2.5 right-2.5',
          'before:w-5 before:h-px before:bg-(--border)/50 before:absolute before:top-2.25 before:left-0',
          'after:w-px after:h-5 after:bg-(--border)/50 after:absolute after:top-0 after:left-2.5',
        )}
      />
    </div>
  )
}
