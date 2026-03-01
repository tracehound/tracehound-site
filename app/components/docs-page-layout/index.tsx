import type { PropsWithChildren } from 'react'

export function DocsPageLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col min-h-screen">{children}</div>
}
