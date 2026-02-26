import { Button } from '../button'

export function Hero() {
  return (
    <div className="flex justify-between flex-col gap-6 xl:flex-row xl:items-center xl:gap-0">
      <h2 className="text-4xl leading-9 tracking-normal font-normal font-heading flex flex-col whitespace-nowrap xl:text-6xl xl:leading-16">
        Deterministic
        <strong className="font-bold">runtime security buffer</strong>
        for modern applications
      </h2>

      <div className="text-base flex flex-col gap-10 xl:text-xl xl:max-w-5/12">
        <p className="xl:pr-8 md:max-w-7/12 xl:max-w-full">
          Tracehound actively contains security-relevant runtime anomalies in a bounded,
          deterministic layer. It isolates, rate-limits, and quarantines threats <br />
          <strong> — without making security decisions.</strong>
        </p>

        <div className="flex flex-col gap-4 md:gap-10 md:flex-row md:items-center">
          <Button variant="primary" href="/services">
            INIT RUNTIME
          </Button>
          <Button variant="secondary" href="/docs">
            READ THE DOCUMENTS
          </Button>
        </div>
      </div>
    </div>
  )
}
