import type { PropsWithChildren } from 'react'

export function DocsContent({ children }: PropsWithChildren) {
  return (
    <article className="flex flex-col gap-6 lg:gap-8 xl:gap-12 px-6 xl:px-12 py-6 xl:py-12">
      {children}
    </article>
  )
}
