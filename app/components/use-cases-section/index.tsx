import { Badge } from '../badge'
import { Container } from '../container'
import { Row } from '../patterns/row'

export function UseCasesSection() {
  return (
    <section
      className="relative w-full py-16 lg:py-24 xl:py-30 bg-(--foreground)"
      data-background="dark">
      <Container>
        <Row />

        <header className="flex flex-col mb-12 md:px-6 lg:mb-16 xl:mb-25 xl:max-w-200 xl:px-12">
          <Badge variant="primary">EXAMPLES</Badge>
          <h3 className="mt-3 mb-5 font-heading font-bold text-(--background) text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
            Use Cases
          </h3>
        </header>

        <article className="grid grid-cols-1 gap-6 md:px-6 md:gap-12 xl:gap-18 lg:grid-cols-2 xl:px-12">
          <div className="flex flex-col text-(--background)">
            <span className="text-(--border) font-heading font-thin text-8xl leading-6 xl:leading-14 xl:text-9xl">
              1.
            </span>

            <strong className="mb-3 text-xl xl:mb-6 xl:text-3xl">API Abuse Prevention</strong>
            <p className="xl:max-w-133">
              Protect your third-party APIs with rate limits and payload size constraints. Stop
              anomalous amplification and resource exhaustion.
            </p>
          </div>

          <div className="flex flex-col text-(--background)">
            <span className="text-(--border) font-heading font-thin text-8xl leading-6 xl:leading-14 xl:text-9xl">
              2.
            </span>

            <strong className="mb-3 text-xl xl:mb-6 xl:text-3xl">
              Zero-Trust Microsegmentation
            </strong>
            <p className="xl:max-w-133">
              Verify every request's source, size, and frequency across microservices. Limit blast
              radius with independent isolation.
            </p>
          </div>

          <div className="flex flex-col text-(--background)">
            <span className="text-(--border) font-heading font-thin text-8xl leading-6 xl:leading-14 xl:text-9xl">
              3.
            </span>

            <strong className="mb-3 text-xl xl:mb-6 xl:text-3xl">
              Incident Response & Forensics
            </strong>
            <p className="xl:max-w-133">
              Automatically quarantine evidence when threats are detected. Support forensic
              investigation with tamper-evident audit chain.
            </p>
          </div>

          <div className="flex flex-col text-(--background)">
            <span className="text-(--border) font-heading font-thin text-8xl leading-6 xl:leading-14 xl:text-9xl">
              4.
            </span>

            <strong className="mb-3 text-xl xl:mb-6 xl:text-3xl">Compliance & Audit</strong>
            <p className="xl:max-w-133">
              Immutable audit trail for PCI-DSS, SOC 2, GDPR requirements. Configurable retention
              policies.
            </p>
          </div>
        </article>
      </Container>
    </section>
  )
}
