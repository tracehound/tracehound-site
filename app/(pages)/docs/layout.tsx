import { Container } from '@/app/components/container'
import { DocumentPageSelect } from '@/app/components/docs-page-selector'
import { DocumentPageSidebar } from '@/app/components/docs-page-sidebar'
import type { ReactNode } from 'react'

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <main className="relative w-full h-full flex">
        <DocumentPageSidebar />

        <section className="relative flex-1 flex flex-col gap-6 h-full lg:border-l border-dashed border-(--border-accent) pb-9 lg:pb-12 xl:pb-24">
          <DocumentPageSelect />

          {children}
        </section>
      </main>
    </Container>
  )
}
