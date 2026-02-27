import { Button } from '../button'
import { Container } from '../container'

export function BottomSection() {
  return (
    <Container>
      <section className="relative w-full flex flex-col items-center justify-center gap-10 py-16 bg-(--accent-primary) lg:py-24 xl:gap-15 xl:py-30">
        <header className="flex flex-col items-center gap-2">
          <h3 className="font-heading font-bold text-xl/5 md:text-2xl/6 xl:text-5xl/12">
            Ready to Secure Your Runtime?
          </h3>
          <p className="text-center text-lg xl:text-2xl">
            Start with the open-core. <br />
            Upgrade when you need more capabilities.
          </p>
        </header>

        <nav className="flex items-center gap-10 flex-col xl:flex-row">
          <Button variant="secondary" href="/service">
            INITIALIZE RUNTIME
          </Button>
          <Button variant="neutral" href="/docs">
            READ THE DOCUMENTATION
          </Button>
          <Button variant="light" href="/contact">
            BOOK A TECHNICAL DEMO
          </Button>
        </nav>
      </section>
    </Container>
  )
}
