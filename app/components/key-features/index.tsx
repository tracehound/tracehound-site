/* eslint-disable react/no-unescaped-entities */
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
    <section className="relative w-full py-16 lg:py-24 xl:py-30">
      <Container>
        <header className="w-full flex flex-col p-6 xl:p-12">
          <Badge variant="neutral">FEATURES</Badge>
          <h3 className="mt-3 mb-5 font-heading font-bold text-4xl/10 xl:text-[64px]/16">
            Key Features
          </h3>
        </header>

        <Row />

        <article className="grid grid-cols-1 px-6 gap-8 mt-6 xl:gap-16 xl:grid-cols-2 xl:grid-rows-3 xl:px-12 xl:mt-12">
          <div className="flex flex-col gap-7.5 md:bg-(--background) md:p-12">
            <FireIcon weight="thin" className="size-12 xl:size-16" />

            <div className="flex flex-col">
              <h4 className="font-bold text-xl/5 xl:text-3xl/8">Zero-Hot-Path Overhead</h4>
              <p className="font-medium">
                Synchronous intercept path. Background work stays off the hot path.
              </p>
            </div>

            <ul className="space-y-2 pl-4 list-disc">
              <li>
                <strong>.intercept() call:</strong> non-blocking, O(1) map lookup
              </li>
              <li>Cold storage, snapshots, notifications, and hound analysis stay off-path</li>
              <li>Deterministic synchronous work in the request path</li>
              <li>No fixed p50/p99 promise is claimed at the landing layer</li>
            </ul>
          </div>

          <div className="flex flex-col gap-7.5 md:bg-(--background) md:p-12">
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
              <li>Worker crash does not collapse the host process</li>
              <li>
                <strong>"Poison Pill Resilience"</strong>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-7.5 md:bg-(--background) md:p-12">
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
                <strong>Explicit outcomes:</strong> 429 / 413 / 403 under bounded conditions
              </li>
              <li>
                <strong>Hard Shedding:</strong> On memory full, quarantine drops — no OOM
              </li>
              <li>
                <strong>Graceful Drain:</strong> 10GB payload = 413 response, socket preserved
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-7.5 md:bg-(--background) md:p-12">
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
                <strong>GDPR/KVKK-oriented</strong> retention and erasure workflows
              </li>
              <li>Automatic archiving to cold storage</li>
            </ul>
          </div>

          <div className="flex flex-col gap-7.5 md:bg-(--background) md:p-12">
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
