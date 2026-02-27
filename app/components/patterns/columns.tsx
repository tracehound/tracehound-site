import { cn } from '@/app/lib/utils'

export function Column({ direction }: { direction: 'left' | 'right' }) {
  return (
    <div
      className={cn(
        'fixed top-0 flex h-full -z-1 pointer-events-none w-12 xl:w-24',
        direction === 'left' && 'left-0 flex-row',
        direction === 'right' && 'right-0 flex-row-reverse',
      )}>
      <span
        className={cn(
          'h-full w-12 xl:w-24 bg-[repeating-linear-gradient(315deg,#D3D5CF_0,#D3D5CF_1px,transparent_1px,transparent_50%)] bg-size-[8px_8px] border-(--border-accent) border-dashed',
          direction === 'left' && 'border-r left-0',
          direction === 'right' && 'border-l right-0',
        )}
      />
      <span
        className={cn(
          'h-full w-6 xl:w-12 border-(--border-accent) border-dashed',
          direction === 'left' && 'border-r ml-auto',
          direction === 'right' && 'border-l mr-auto',
        )}
      />
    </div>
  )
}
