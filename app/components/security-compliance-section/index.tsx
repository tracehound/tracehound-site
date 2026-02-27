import { ChecksIcon, InfoIcon, ProhibitIcon } from '@phosphor-icons/react/dist/ssr'
import { Badge } from '../badge'
import { Container } from '../container'
import { Row } from '../patterns/row'

export function SecurityCompliance() {
  return (
    <section className="relative w-full py-16 lg:py-24 xl:py-30" data-background="light">
      <Container>
        <Row />

        <header className="flex flex-col mb-10 px-6 pt-6 lg:mb-12 xl:mb-15 xl:max-w-200 xl:px-12 xl:pt-12">
          <Badge variant="neutral">BOUNDARIES</Badge>
          <h3 className="mt-3 mb-5 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
            Security & Compliance
          </h3>
          <p className="font-sans font-light text-lg md:text-2xl xl:text-[32px]">
            Liability Boundary — Clear and Documented
          </p>
        </header>

        <article className="grid grid-cols-1 gap-12 px-6 pt-6 lg:gap-y-24 items-start lg:grid-cols-2 xl:grid-cols-3 xl:px-12 xl:pt-12">
          <div className="flex flex-col gap-2.5 xl:gap-7.5">
            <figure className="p-2.5 rounded-full bg-(--accent-primary) size-fit">
              <ChecksIcon size={32} weight="light" className="fill-(--foregrounde)" />
            </figure>

            <h4 className="font-heading text-xl font-bold md:text-2xl xl:text-[32px]">In Scope</h4>

            <ul className="flex flex-col gap-4">
              <li>Runtime resource containment</li>
              <li>Payload amplification bounding</li>
              <li>Rate abuse prevention</li>
              <li>Forensic evidence preservation</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2.5 xl:gap-7.5">
            <figure className="p-2.5 rounded-full bg-(--accent-primary) size-fit">
              <ProhibitIcon size={32} weight="light" className="fill-(--foreground)" />
            </figure>

            <h4 className="font-heading font-bold text-xl md:text-2xl xl:text-[32px]">
              Out of Scope
            </h4>

            <ul className="flex flex-col gap-4">
              <li>Semantic exploit detection (WAFs do this)</li>
              <li>Business logic flaws (IDOR, Broken Access Control)</li>
              <li>Kernel-level escalation</li>
              <li>OS-level container escape</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2.5 xl:gap-7.5">
            <figure className="p-2.5 rounded-full bg-(--accent-primary) size-fit">
              <InfoIcon size={32} weight="light" className="fill-(--foreground)" />
            </figure>

            <h4 className="font-heading font-bold text-xl md:text-2xl xl:text-[32px]">
              Blast Radius Uncertainty
            </h4>

            <ul className="flex flex-col gap-4">
              <li>
                <strong>GDPR:</strong> Custom PII redaction configurable
              </li>
              <li>
                <strong>SOC 2:</strong> Audit chain, immutable logs
              </li>
              <li>
                <strong>PCI-DSS:</strong> Evidence retention policies
              </li>
              <li>
                <strong>ISO 27001:</strong> Risk assessment framework
              </li>
            </ul>
          </div>
        </article>

        <blockquote className="text-(--foreground-accent) border-l-4 border-(--foreground-accent) pl-6 mt-6 lg:mt-12 xl:mt-16 xl:pl-12 xl:ml-12">
          <strong>Worst-case scenario:</strong> Self-DoS due to misconfiguration. <br />
          <strong>Second scenario:</strong> Local resource exhaustion. <br />
          <br />
          Advisory mode and bounded buffers minimize this risk.
        </blockquote>
      </Container>
    </section>
  )
}
