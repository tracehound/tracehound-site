import Link from 'next/link'
import { Row } from '../patterns/row'
import { Logo } from './logo'
import { Navigation } from './navigation'

export function Header() {
  return (
    <header className="relative w-full mb-16 xl:mb-40">
      <Row />

      <div className="relative w-full flex items-center justify-between">
        <h1 className="font-sans font-bold text-2xl text-foreground">
          <Link href="/" className="flex items-center gap-6" title="Tracehound">
            <Logo />
            <span className="hidden xl:inline-flex">TRACEHOUND</span>
          </Link>
        </h1>

        <Navigation />
      </div>
    </header>
  )
}
