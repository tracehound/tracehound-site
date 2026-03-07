/* eslint-disable react/no-unescaped-entities */
import {
  ArrowRightIcon,
  ArrowsSplitIcon,
  FingerprintSimpleIcon,
  SealCheckIcon,
  ShieldStarIcon,
  TargetIcon,
  VaultIcon,
  WarningIcon,
} from '@phosphor-icons/react/dist/ssr'
import { Badge } from '../badge'
import { Container } from '../container'

export function SolutionSection() {
  return (
    <Container>
      <section className="relative w-full py-16 space-y-16 lg:py-24 xl:py-30 xl:space-y-0 bg-(--foreground)">
        <header className="w-full flex flex-col pt-0! p-6 xl:p-24">
          <Badge variant="primary">SOLUTION</Badge>
          <h3 className="mt-3 mb-5 font-heading font-bold text-(--background) text-4xl/10 xl:text-[64px]/16">
            Don't Decide — Contain.
          </h3>
          <p className="font-sans font-light text-lg text-(--background) md:text-2xl xl:text-[32px]">
            Tracehound doesn't detect threats. <br />
            It bounds their cost.
          </p>
        </header>

        <article className="flex flex-col items-start justify-around gap-6 px-6 lg:items-center xl:flex-row xl:gap-0 xl:px-24">
          <div className="flex items-center gap-8 text-(--background) xl:flex-col xl:gap-0">
            <figure className="bg-(--background) text-(--foreground) rounded-md p-4 xl:mb-3">
              <WarningIcon size={32} />
            </figure>

            <p className="flex flex-col xl:items-center">
              <strong className="mb-1">SCENT</strong>
              <span className="text-center text-xs xl:h-12">
                WAF signals <br className="hidden xl:inline" />
                headers
              </span>
            </p>
          </div>

          <ArrowRightIcon
            size={32}
            className="text-(--background) rotate-90 xl:rotate-0 ml-4 lg:ml-0"
          />

          <div className="flex items-center gap-8 text-(--background) xl:flex-col xl:gap-0">
            <figure className="bg-(--background) text-(--foreground) rounded-full p-4 xl:mb-3">
              <TargetIcon size={32} />
            </figure>

            <p className="flex flex-col xl:items-center">
              <strong className="mb-1">CONTROL</strong>
              <span className="text-center text-xs xl:h-12">
                rate-limit <br className="hidden xl:inline" />
                payload <br className="hidden xl:inline" />
                patterns
              </span>
            </p>
          </div>

          <ArrowRightIcon
            size={32}
            className="text-(--background) rotate-90 xl:rotate-0 ml-4 lg:ml-0"
          />

          <div className="flex items-center gap-8 text-(--background) xl:flex-col xl:gap-0">
            <figure className="bg-(--background) text-(--foreground) rounded-full p-4 xl:mb-3">
              <FingerprintSimpleIcon size={32} />
            </figure>

            <p className="flex flex-col xl:items-center">
              <strong className="mb-1">SIGNATURE</strong>
              <span className="text-center xl:h-12 text-xs">
                SHA-256 HEX <br className="hidden xl:inline" />
                UUID V7
              </span>
            </p>
          </div>

          <ArrowRightIcon
            size={32}
            className="text-(--background) rotate-90 xl:rotate-0 ml-4 lg:ml-0"
          />

          <div className="flex items-center gap-8 text-(--background) xl:flex-col xl:gap-0">
            <figure className="bg-(--background) text-(--foreground) rounded-md p-4 xl:mb-3">
              <ShieldStarIcon size={32} />
            </figure>

            <p className="flex flex-col xl:items-center">
              <strong className="mb-1">AGENT</strong>
              <span className="text-center xl:h-12 text-xs">
                .intercept() <br className="hidden xl:inline" />
                child_process <br className="hidden xl:inline" />
                os-level
              </span>
            </p>
          </div>

          <ArrowsSplitIcon size={32} className="text-(--background) xl:-rotate-90 ml-4 lg:ml-0" />

          <div className="flex flex-col items-start justify-center gap-10">
            <div className="flex flex-row items-center gap-8 text-(--success)">
              <figure className="size-16 bg-(--success) text-(--foreground) rounded-full p-4">
                <SealCheckIcon size={32} />
              </figure>

              <div className="flex-1 flex flex-col items-star gap-2.5">
                <strong>PASS</strong>
                <p className="text-xs">Request proceed normally</p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-8 text-(--error)">
              <figure className="size-16 bg-(--error) text-(--foreground) rounded-full p-4">
                <VaultIcon size={32} />
              </figure>

              <div className="flex-1 flex flex-col items-star gap-2.5">
                <strong>QUARANTINE + COLD STORAGE</strong>
                <p className="text-xs">Evidence preserved, request blocked</p>
              </div>
            </div>
          </div>
        </article>

        <blockquote className="text-(--border-accent) xl:border-l-4 border-(--border-accent) p-6 mt-12 lg:mt-16 xl:mt-25 xl:pl-12 xl:ml-24">
          <strong>Tracehound</strong> takes decisions from your existing security systems and
          applies them through a deterministic containment layer. <br />
          Payload sizes are bounded. Memory usage is hard-coded limited. Disk saturation gracefully
          degrades. <br />
          Even in fail-open mode, the attacker cannot win — because the system fails predictably.
        </blockquote>
      </section>
    </Container>
  )
}
