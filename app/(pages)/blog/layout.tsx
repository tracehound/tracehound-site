import { Container } from '@/app/components/container'
import type { ReactNode } from 'react'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <main className="relative w-full pb-12 xl:pb-24">{children}</main>
    </Container>
  )
}
