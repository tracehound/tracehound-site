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
    <section
      className="relative w-full py-16 lg:py-24 xl:py-30 bg-(--foreground)"
      data-background="dark">
      <Container>
        <header className="flex flex-col mb-12 px-6 lg:mb-16 xl:mb-25 xl:max-w-200 xl:px-12">
          <Badge variant="primary">SOLUTION</Badge>
          <h3 className="mt-3 mb-5 font-heading font-bold text-(--background) text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
            Don't Decide — Contain.
          </h3>
          <p className="font-sans font-light text-lg text-(--background) md:text-2xl xl:text-[32px]">
            Tracehound doesn't detect threats. <br />
            It bounds their cost.
          </p>
        </header>

        <article className="flex flex-col items-center justify-start gap-6 px-6 md:gap-12 xl:gap-18 lg:flex-row xl:px-12">
          <div className="flex flex-col items-center text-(--background)">
            <figure className="bg-(--background) text-(--foreground) rounded-md p-4 mb-3">
              <WarningIcon size={32} />
            </figure>

            <strong className="mb-1">SCENT</strong>
            <p className="text-center h-12 text-xs">
              WAF signals <br />
              headers
            </p>
          </div>

          <ArrowRightIcon size={32} className="text-(--background) rotate-90 lg:rotate-0" />

          <div className="flex flex-col items-center text-(--background)">
            <figure className="bg-(--background) text-(--foreground) rounded-full p-4 mb-3">
              <TargetIcon size={32} />
            </figure>

            <strong className="mb-1">CONTROL</strong>
            <p className="text-center h-12 text-xs">
              rate-limit <br />
              payload <br />
              patterns
            </p>
          </div>

          <ArrowRightIcon size={32} className="text-(--background) rotate-90 lg:rotate-0" />

          <div className="flex flex-col items-center text-(--background)">
            <figure className="bg-(--background) text-(--foreground) rounded-full p-4 mb-3">
              <FingerprintSimpleIcon size={32} />
            </figure>

            <strong className="mb-1">SIGNATURE</strong>
            <p className="text-center h-12 text-xs">
              SHA-256 HEX <br />
              UUID V7
            </p>
          </div>

          <ArrowRightIcon size={32} className="text-(--background) rotate-90 lg:rotate-0" />

          <div className="flex flex-col items-center text-(--background)">
            <figure className="bg-(--background) text-(--foreground) rounded-md p-4 mb-3">
              <ShieldStarIcon size={32} />
            </figure>

            <strong className="mb-1">AGENT</strong>
            <p className="text-center h-12 text-xs">
              .intercept() <br />
              child_process <br />
              os-level
            </p>
          </div>

          <ArrowsSplitIcon size={32} className="text-(--background) lg:-rotate-90" />

          <div className="flex flex-col items-start justify-center gap-10">
            <div className="flex flex-row items-center text-(--success)">
              <figure className="size-16 bg-(--success) text-(--foreground) rounded-full p-4 mr-8">
                <SealCheckIcon size={32} />
              </figure>

              <div className="flex-1 flex flex-col items-star gap-2.5">
                <strong>PASS</strong>
                <p className="text-xs">Request proceed normally</p>
              </div>
            </div>

            <div className="flex flex-row items-center text-(--error)">
              <figure className="size-16 bg-(--error) text-(--foreground) rounded-full p-4 mr-8">
                <VaultIcon size={32} />
              </figure>

              <div className="flex-1 flex flex-col items-star gap-2.5">
                <strong>QUARANTINE + COLD STORAGE</strong>
                <p className="text-xs">Evidence preserved, request blocked</p>
              </div>
            </div>
          </div>
        </article>

        <blockquote className="text-(--border-accent) border-l-4 border-(--border-accent) pl-6 mt-12 lg:mt-16 xl:mt-25 xl:pl-12 xl:ml-12">
          <strong>Tracehound</strong> takes decisions from your existing security systems and
          applies them through a deterministic containment layer. <br />
          Payload sizes are bounded. Memory usage is hard-coded limited. Disk saturation gracefully
          degrades. <br />
          Even in fail-open mode, the attacker cannot win — because the system fails predictably.
        </blockquote>
      </Container>
    </section>
  )
}
