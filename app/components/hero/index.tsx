import { Button } from '../button'
import { Container } from '../container'

export function Hero() {
  return (
    <Container>
      <section className="flex justify-between flex-col gap-6 px-6 pt-12 xl:gap-12 xl:px-12 xl:pt-24">
        <h2 className="text-4xl/10 tracking-normal font-normal font-heading xl:flex xl:flex-col md:text-6xl/16 xl:text-7xl/22">
          Operational security controls <strong>with forensic guarantees.</strong>
        </h2>
        <p className="text-base xl:text-3xl/11 xl:max-w-8/12">
          <strong>Tracehound</strong> separates security execution from the application process,
          consumes explicit threat signals from upstream controls, applies native guardrails for
          rate abuse and payload amplification, and preserves tamper-evident evidence for
          post-incident analysis.
        </p>
        <div className="flex flex-col gap-4 md:gap-10 md:flex-row md:items-center">
          <Button variant="primary" href="/services" size="lg">
            SECURE RUNTIME
          </Button>
          <Button variant="secondary" href="/docs" size="lg">
            READ THE DOCUMENTS
          </Button>
        </div>
      </section>
    </Container>
  )
}
