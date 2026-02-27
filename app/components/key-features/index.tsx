import {
  FalloutShelterIcon,
  FireIcon,
  LinkIcon,
  NetworkSlashIcon,
  ShippingContainerIcon,
} from '@phosphor-icons/react/dist/ssr'
import { Badge } from '../badge'
import { Container } from '../container'
import { Row } from '../patterns/row'

export function KeyFeatures() {
  return (
    <section className="relative w-full py-16 lg:py-24 xl:py-30" data-background="light">
      <Container>
        <Row />

        <header className="flex flex-col mb-10 px-6 pt-6 lg:mb-12 xl:mb-15 xl:max-w-200 xl:px-12 xl:pt-12">
          <Badge variant="neutral">FEATURES</Badge>
          <h3 className="mt-3 mb-5 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
            Key Features
          </h3>
        </header>

        <article className="grid grid-cols-1 px-6 gap-8 xl:gap-16 xl:grid-cols-2 xl:grid-rows-3 xl:px-12">
          <div className="flex flex-col gap-7.5 md:bg-(--background) md:border md:border-(--accent-primary) md:p-12">
            <FireIcon weight="thin" className="size-12 xl:size-16" />

            <div className="flex flex-col">
              <h4 className="font-bold text-xl/5 xl:text-3xl/8">Zero-Hot-Path Overhead</h4>
              <p className="font-medium">p50 &lt; 0.5ms, p99 &lt; 2ms</p>
            </div>

            <ul className="space-y-2 pl-4 list-disc">
              <li>
                <strong>.intercept() call:</strong> non-blocking, O(1) map lookup
              </li>
              <li>
                <strong>Rate limiting:</strong> ~10μs
              </li>
              <li>
                <strong>Evidence creation:</strong> ~100μs
              </li>
              <li>No measurable latency in production traffic</li>
            </ul>
          </div>

          <div className="flex flex-col gap-7.5 md:bg-(--background) md:border md:border-(--accent-primary) md:p-12">
            <ShippingContainerIcon weight="thin" className="size-12 xl:size-16" />

            <div className="flex flex-col">
              <h4 className="font-bold text-xl/5 xl:text-3xl/8">Process Isolation Architecture</h4>
              <p className="font-medium">If the Security Engine Crashes, Your App Survives</p>
            </div>

            <ul className="space-y-2 pl-4 list-disc">
              <li>OS-level child process isolation</li>
              <li>
                <strong>SIGKILL test:</strong> host app stays alive, worker respawns
              </li>
              <li>Host app mathematically isolated</li>
              <li>
                <strong>"Poison Pill Resilience"</strong>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-7.5 md:bg-(--background) md:border md:border-(--accent-primary) md:p-12">
            <NetworkSlashIcon weight="thin" className="size-12 xl:size-16" />

            <div className="flex flex-col">
              <h4 className="font-bold text-xl/5 xl:text-3xl/8">Deterministic Failure Modes</h4>
              <p className="font-medium">Every Failure Is Known in Advance</p>
            </div>

            <ul className="space-y-2 pl-4 list-disc">
              <li>
                <strong>Fail-Open:</strong> System stays stable, traffic allowed
              </li>
              <li>
                <strong>Fail-Closed:</strong> Rejected in critical conditions
              </li>
              <li>
                <strong>Hard Shedding:</strong> On memory full, quarantine drops — no OOM
              </li>
              <li>
                <strong>Graceful Drain:</strong> 10GB payload = 413 response, socket preserved
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-7.5 md:bg-(--background) md:border md:border-(--accent-primary) md:p-12">
            <LinkIcon weight="thin" className="size-12 xl:size-16" />

            <div className="flex flex-col">
              <h4 className="font-bold text-xl/5 xl:text-3xl/8">Forensic Evidence Chain</h4>
              <p className="font-medium">Evidence Doesn't Decay — It Can't Be Tampered</p>
            </div>

            <ul className="space-y-2 pl-4 list-disc">
              <li>
                <strong>SHA-256</strong> hash linking (buffer to disk)
              </li>
              <li>
                <strong>Tamper-evident audit log</strong>
              </li>
              <li>
                <strong>GDPR-compliant</strong> retention policies
              </li>
              <li>Automatic archiving to cold storage</li>
            </ul>
          </div>

          <div className="flex flex-col gap-7.5 md:bg-(--background) md:border md:border-(--accent-primary) md:p-12">
            <FalloutShelterIcon weight="thin" className="size-12 xl:size-16" />

            <div className="flex flex-col">
              <h4 className="font-bold text-xl/5 xl:text-3xl/8">Bounded Blast Radius</h4>
              <p className="font-medium">Even Worst-Case Is Measurable</p>
            </div>

            <ul className="space-y-2 pl-4 list-disc">
              <li>
                <strong>Max quarantine:</strong> 10,000 items / 100MB (default, configurable)
              </li>
              <li>
                <strong>Disk WAL quota:</strong> exceeded = oldest logs purged
              </li>
              <li>ENOSPC detected → gracefully degrade → app stays up</li>
            </ul>
          </div>
        </article>
      </Container>
    </section>
  )
}
