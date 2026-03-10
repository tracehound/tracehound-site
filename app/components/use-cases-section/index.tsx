import { Badge } from '../badge'
import { Container } from '../container'

export function UseCasesSection() {
  return (
    <Container>
      <section className="relative w-full py-16 lg:py-24 xl:py-30 bg-(--foreground)">
        <header className="w-full flex flex-col pt-0! p-6 lg:p-12 xl:p-24">
          <Badge variant="primary">EXAMPLES</Badge>
          <h3 className="mt-3 mb-5 font-heading font-bold text-(--background) text-4xl/10 xl:text-[64px]/16">
            Use Cases
          </h3>
        </header>

        <article className="grid grid-cols-1 gap-6 px-6 md:gap-12 xl:gap-18 lg:grid-cols-2 xl:px-24">
          <div className="flex flex-col text-(--background)">
            <span className="text-(--border) font-heading font-thin text-2xl lg:text-8xl leading-6 xl:leading-14 xl:text-9xl">
              1.
            </span>

            <strong className="mb-3 text-xl xl:mb-6 xl:text-3xl">API Abuse Prevention</strong>
            <p className="xl:max-w-133">
              For fintech and payment APIs, bound request frequency, payload amplification, and
              origin-side resource pressure without turning the runtime into a semantic detector.
            </p>
          </div>

          <div className="flex flex-col text-(--background)">
            <span className="text-(--border) font-heading font-thin text-2xl lg:text-8xl leading-6 xl:leading-14 xl:text-9xl">
              2.
            </span>

            <strong className="mb-3 text-xl xl:mb-6 xl:text-3xl">
              Trusted Proxy Boundaries
            </strong>
            <p className="xl:max-w-133">
              For edge-routed platforms and service gateways, preserve trusted upstream verdicts at
              the origin and keep containment local to the runtime instance.
            </p>
          </div>

          <div className="flex flex-col text-(--background)">
            <span className="text-(--border) font-heading font-thin text-2xl lg:text-8xl leading-6 xl:leading-14 xl:text-9xl">
              3.
            </span>

            <strong className="mb-3 text-xl xl:mb-6 xl:text-3xl">
              Incident Response & Forensics
            </strong>
            <p className="xl:max-w-133">
              For SecOps and DFIR workflows, quarantine evidence only when explicit threat signals
              are present and preserve a tamper-evident operational trail.
            </p>
          </div>

          <div className="flex flex-col text-(--background)">
            <span className="text-(--border) font-heading font-thin text-2xl lg:text-8xl leading-6 xl:leading-14 xl:text-9xl">
              4.
            </span>

            <strong className="mb-3 text-xl xl:mb-6 xl:text-3xl">Evidence Retention & Audit</strong>
            <p className="xl:max-w-133">
              For regulated environments, map runtime evidence custody to retention, erasure, and
              audit review workflows without claiming policy ownership.
            </p>
          </div>
        </article>
      </section>
    </Container>
  )
}
