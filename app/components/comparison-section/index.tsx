import {
  CheckCircleIcon,
  CircleHalfTiltIcon,
  EmptyIcon,
  ProhibitInsetIcon,
} from '@phosphor-icons/react/dist/ssr'
import { Badge } from '../badge'
import { Container } from '../container'
import { Row } from '../patterns/row'

export function ComparisonSection() {
  return (
    <section className="relative w-full py-16 lg:py-24 xl:py-30" data-background="light">
      <Container>
        <Row />

        <header className="flex flex-col mb-12 px-6 pt-6 lg:mb-16 xl:mb-25 xl:max-w-200 xl:px-12 xl:pt-12">
          <Badge variant="secondary">DIFFERENTIATION</Badge>
          <h3 className="mt-3 mb-5 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
            Comparison
          </h3>
          <p className="font-sans font-light text-lg md:text-2xl xl:text-[32px]">
            Tracehound vs. Traditional Solutions
          </p>
        </header>

        <article className="relative w-full overflow-x-auto flex flex-col justify-start gap-6 px-6 md:gap-12 xl:gap-18 lg:flex-row xl:px-12">
          <table className="w-full">
            <thead>
              <tr className="[&_tr]:border-b [&_tr]:border-(--border-accent)">
                <th className="text-foreground h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">Feature</p>
                </th>
                <th className="text-foreground h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">Tracehound</p>
                </th>
                <th className="text-foreground h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">Traditional WAF</p>
                </th>
                <th className="text-foreground h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">In-App RASP</p>
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0 [&_tr]:border-(--border-accent)">
              <tr className="hover:bg-(--background) border-b transition-colors">
                <td className="py-2 px-4 align-middle whitespace-nowrap font-medium">
                  <p className="inline-flex items-center gap-2">Detection Model</p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-(--success)" weight="fill" />
                    Deterministic containment
                  </p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-(--success)" weight="fill" />
                    Semantic classification
                  </p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-(--success)" weight="fill" />
                    Heuristic analysis
                  </p>
                </td>
              </tr>
              <tr className="hover:bg-(--background) border-b transition-colors">
                <td className="py-2 px-4 align-middle whitespace-nowrap font-medium">
                  <p className="inline-flex items-center gap-2">Latency Impact</p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-(--success)" weight="fill" /> &lt;
                    0.5ms p50
                  </p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <ProhibitInsetIcon size={16} className="text-(--error)" weight="fill" /> 5-50ms
                  </p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">10-100ms</p>
                </td>
              </tr>
              <tr className="hover:bg-(--background) border-b transition-colors">
                <td className="py-2 px-4 align-middle whitespace-nowrap font-medium">
                  <p className="inline-flex items-center gap-2">Failure Mode</p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-(--success)" weight="fill" />
                    Predictable <small>(fail-open/closed)</small>
                  </p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <ProhibitInsetIcon size={16} className="text-(--error)" weight="fill" /> Traffic
                    drop
                  </p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <ProhibitInsetIcon size={16} className="text-(--error)" weight="fill" /> App
                    crash risk
                  </p>
                </td>
              </tr>
              <tr className="hover:bg-(--background) border-b transition-colors">
                <td className="py-2 px-4 align-middle whitespace-nowrap font-medium">
                  <p className="inline-flex items-center gap-2">Memory Safety</p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-(--success)" weight="fill" /> Bounded
                    <small>(hard limits)</small>
                  </p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <EmptyIcon size={16} className="text-(--border-accent)" weight="fill" />
                    N/A
                  </p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <ProhibitInsetIcon size={16} className="text-(--error)" weight="fill" /> OOM
                    vulnerable
                  </p>
                </td>
              </tr>
              <tr className="hover:bg-(--background) border-b transition-colors">
                <td className="py-2 px-4 align-middle whitespace-nowrap font-medium">
                  <p className="inline-flex items-center gap-2">Evidence Chain</p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-(--success)" weight="fill" />
                    Crypto-hashed audit
                  </p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <CircleHalfTiltIcon size={16} className="text-(--warning)" weight="fill" />
                    Partial logging
                  </p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <CircleHalfTiltIcon size={16} className="text-(--warning)" weight="fill" />
                    Limited
                  </p>
                </td>
              </tr>
              <tr className="hover:bg-(--background) border-b transition-colors">
                <td className="py-2 px-4 align-middle whitespace-nowrap font-medium">
                  <p className="inline-flex items-center gap-2">Process Isolation</p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-(--success)" weight="fill" /> Child
                    process sandbox
                  </p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <ProhibitInsetIcon size={16} className="text-(--error)" weight="fill" /> Network
                    proxy
                  </p>
                </td>
                <td className="py-2 px-4 align-middle whitespace-nowrap">
                  <p className="inline-flex items-center gap-2">
                    <CircleHalfTiltIcon size={16} className="text-(--warning)" weight="fill" />
                    Same process
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </Container>
    </section>
  )
}
