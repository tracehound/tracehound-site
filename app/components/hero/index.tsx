import { Button } from '../button'
import { Container } from '../container'

export function Hero() {
  return (
    <Container>
      <section className="flex justify-between flex-col gap-6 px-6 pt-12 xl:gap-12 xl:px-12 xl:pt-24">
        <h2 className="text-2xl/6 tracking-normal font-normal font-heading flex flex-col md:text-6xl/16 xl:text-8xl/22">
          Deterministic runtime buffer <strong>for security evidence.</strong>
        </h2>
        <p className="text-base xl:text-3xl/11 xl:max-w-8/12">
          <strong>Tracehound</strong> ingests security signals, quarantines suspicious events, and
          preserves them in a tamper-evident AuditChain. Fail-open, bounded, and designed for
          verifiable forensic integrity.
        </p>
        <div className="flex flex-col gap-4 md:gap-10 md:flex-row md:items-center">
          <Button variant="primary" href="/services" size="lg">
            INIT RUNTIME
          </Button>
          <Button variant="secondary" href="/docs" size="lg">
            READ THE DOCUMENTS
          </Button>
        </div>
      </section>
    </Container>
  )
}
