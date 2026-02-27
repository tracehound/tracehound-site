import Link from 'next/link'
import { Container } from '../container'
import { Row } from '../patterns/row'
import { Logo } from './logo'
import { Navigation } from './navigation'

export function Header() {
  return (
    <header className="relative w-full pt-6 pb-20 xl:pt-12 xl:pb-40">
      <Container>
        <Row />

        <div className="relative w-full flex items-center justify-between px-6 pt-6 xl:px-12 xl:pt-6">
          <h1 className="font-heading font-bold text-[32px]/8 text-foreground">
            <Link href="/" className="flex items-center gap-4" title="Tracehound">
              <Logo />
            </Link>
          </h1>

          <Navigation />
        </div>
      </Container>
    </header>
  )
}
