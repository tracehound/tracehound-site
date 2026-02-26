import { cn } from '@/app/lib/utils'

export function Column({ direction }: { direction: 'left' | 'right' }) {
  return (
    <div
      className={cn(
        'fixed top-0 w-6 xl:w-20 h-full -z-1 bg-[repeating-linear-gradient(315deg,#D3D5CF_0,#D3D5CF_1px,transparent_1px,transparent_50%)] bg-size-[8px_8px] pointer-events-none border-(--border-accent) border-dashed',
        direction === 'left' && 'border-r left-0',
        direction === 'right' && 'border-l right-0',
      )}
    />
  )
}
