import { Button } from '../button'
import { Container } from '../container'

export function Hero() {
  return (
    <Container>
      <section
        className="flex justify-between flex-col gap-6 xl:gap-12 px-6 2xl:flex-row 2xl:items-end 2xl:gap-0 xl:px-12"
        data-background="light">
        <h2 className="text-3xl/8 tracking-normal font-normal font-heading flex flex-col xl:whitespace-nowrap md:text-4xl/12 xl:text-8xl/22">
          Deterministic
          <strong className="font-bold">runtime security buffer</strong>
          for modern applications
        </h2>

        <div className="text-base flex flex-col gap-10 xl:text-3xl/11 2xl:max-w-5/12">
          <p className="xl:pr-8 md:max-w-7/12 xl:max-w-full">
            Tracehound actively contains security-relevant runtime anomalies in a bounded,
            deterministic layer. It isolates, rate-limits, and quarantines threats
            <strong> — without making security decisions.</strong>
          </p>

          <div className="flex flex-col gap-4 md:gap-10 md:flex-row md:items-center">
            <Button variant="primary" href="/services" size="lg">
              INIT RUNTIME
            </Button>
            <Button variant="secondary" href="/docs" size="lg">
              READ THE DOCUMENTS
            </Button>
          </div>
        </div>
      </section>
    </Container>
  )
}
