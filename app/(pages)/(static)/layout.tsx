import { Container } from '@/app/components/container'
import { NavLink } from '@/app/components/header/link'
import { Row } from '@/app/components/patterns/row'
import type { ReactNode } from 'react'

export default function StaticLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <main className="relative w-full">
        <nav className="relative flex items-center gap-6 px-6 pb-6 xl:px-12 xl:pb-12">
          <NavLink
            activeClass="bg-(--accent-primary)"
            className="px-3 py-1.5 hover:bg-(--accent-primary)/20"
            href="/cookie-policy">
            Cookie Policy
          </NavLink>
          <span className="size-1 bg-(--border-accent) rounded-sm" />
          <NavLink
            activeClass="bg-(--accent-primary)"
            className="px-3 py-1.5 hover:bg-(--accent-primary)/20"
            href="/privacy-policy">
            Privacy Policy
          </NavLink>
          <span className="size-1 bg-(--border-accent) rounded-sm" />
          <NavLink
            activeClass="bg-(--accent-primary)"
            className="px-3 py-1.5 hover:bg-(--accent-primary)/20"
            href="/terms-of-services">
            Teams of Services
          </NavLink>
          <span className="size-1 bg-(--border-accent) rounded-sm" />
          <NavLink
            activeClass="bg-(--accent-primary)"
            className="px-3 py-1.5 hover:bg-(--accent-primary)/20"
            href="/acceptable-use-policy">
            Acceptable Use Policy
          </NavLink>
        </nav>

        <Row />

        <section className="relative flex flex-col gap-6">{children}</section>
      </main>
    </Container>
  )
}
