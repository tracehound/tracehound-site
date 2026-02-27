import { BiohazardIcon, DetectiveIcon, WarningOctagonIcon } from '@phosphor-icons/react/ssr'
import { Badge } from '../badge'
import { Container } from '../container'
import { Row } from '../patterns/row'

export function ProblemSection() {
  return (
    <section className="relative w-full py-16 lg:py-24 xl:py-30">
      <Container>
        <header className="w-full flex flex-col p-6 xl:p-12">
          <Badge variant="secondary">PROBLEM</Badge>
          <h3 className="mt-3 mb-5 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-[64px]/16 xl:max-w-200">
            Why Security Layers Become the Attack Surface
          </h3>
          <p className="font-sans font-light text-lg md:text-2xl xl:text-[32px] xl:max-w-200">
            Traditional WAFs and RASP solutions stop threats — but often stop your application in
            the process.
          </p>
        </header>

        <Row />

        <article className="grid grid-cols-1 gap-12 px-6 pt-6 lg:gap-y-24 items-start lg:grid-cols-2 xl:grid-cols-3 xl:px-12 xl:pt-12">
          <div className="flex flex-col gap-2.5 xl:gap-7.5">
            <WarningOctagonIcon size={32} className="fill-(--accent-secondary)" />

            <h4 className="font-heading text-xl font-bold md:text-2xl xl:text-[32px]">
              Single Point of Failure
            </h4>

            <ul className="flex flex-col gap-4 [&_li]:flex [&_li]:flex-col">
              <li>
                <strong>WAF failure</strong>
                <span>Entire application inaccessible</span>
              </li>
              <li>
                <strong>RASP crash</strong>
                <span>Node.js process dies</span>
              </li>
              <li>
                <strong>False positive</strong>
                <span>Legitimate traffic blocked</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2.5 xl:gap-7.5">
            <DetectiveIcon size={32} className="fill-(--accent-secondary)" />

            <h4 className="font-heading font-bold text-xl md:text-2xl xl:text-[32px]">
              Semantic Detection Fallacy
            </h4>

            <ul className="flex flex-col gap-4 [&_li]:flex [&_li]:flex-col">
              <li>
                <strong>"Is this an attack?"</strong>
                <span>Latency, error rate, bypass risk</span>
              </li>
              <li>
                <strong>New attack vector</strong>
                <span>Rule update cycle</span>
              </li>
              <li>
                <strong>Unknown threats</strong>
                <span>Unprotected gap</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2.5 xl:gap-7.5">
            <BiohazardIcon size={32} className="fill-(--accent-secondary)" />

            <h4 className="font-heading font-bold text-xl md:text-2xl xl:text-[32px]">
              Blast Radius Uncertainty
            </h4>

            <ul className="flex flex-col gap-4 [&_li]:flex [&_li]:flex-col">
              <li>
                <strong>OOM error</strong>
                <span>Entire cluster affected</span>
              </li>
              <li>
                <strong>Disk full</strong>
                <span>Database access lost</span>
              </li>
              <li>
                <strong>I/O starvation</strong>
                <span>API unresponsive</span>
              </li>
            </ul>
          </div>
        </article>
      </Container>
    </section>
  )
}
