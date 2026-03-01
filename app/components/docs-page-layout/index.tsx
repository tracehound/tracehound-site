import type { PropsWithChildren } from 'react'

export function DocsPageLayout({ children }: PropsWithChildren) {
  return <article className="flex flex-col gap-6 lg:gap-8 xl:gap-12">{children}</article>
}
