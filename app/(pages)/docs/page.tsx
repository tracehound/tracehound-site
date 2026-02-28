import { Code } from '@/app/components/code'

const coreUsage = `
    import { createTracehound } from '@tracehound/core'

    const tracehound = createTracehound({
      quarantine: { maxCount: 1000 },
      rateLimit: { windowMs: 60000, maxRequests: 100 },
    })

    // Intercept a potential threat signal (Scent)
    const result = tracehound.agent.intercept({
      id: 'unique-id',
      timestamp: Date.now(),
      source: '127.0.0.1',
      payload: { path: '/api/v1/user', method: 'POST' },
    })

    if (result.status === 'quarantined') {
      console.log('Threat quarantined. Signature:', result.handle.signature)
    }

`
const expressIntegration = `
    import express from 'express'
    import { createTracehound } from '@tracehound/core'
    import { tracehound } from '@tracehound/express'

    const app = express()
    const th = createTracehound()

    // Mount the middleware
    app.use(tracehound({ agent: th.agent }))

    app.get('/', (req, res) => res.send('Protected by Tracehound'))

`
const fastifyIntegration = `
    import fastify from 'fastify'
    import { createTracehound } from '@tracehound/core'
    import { tracehoundPlugin } from '@tracehound/fastify'

    const app = fastify()
    const th = createTracehound()

    app.register(tracehoundPlugin, { agent: th.agent })

`

export default function Docs() {
  return (
    <div className="flex flex-col min-h-screen px-6 xl:px-12">
      <header className="w-full flex flex-col pb-6 xl:pb-12">
        <h2 className="mb-5 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-6xl/16">
          Summary
        </h2>

        <p className="font-sans font-light text-lg mb-2 md:text-xl xl:text-2xl xl:mb-4">
          Tracehound Core is a deterministic and fail-open runtime security layer designed to
          operate between detection systems and operational response.
        </p>
        <p className="font-sans font-light text-lg mb-2 md:text-xl xl:text-2xl xl:mb-4">
          It provides bounded ingestion, rate and buffer controls, controlled choke mechanisms, and
          reproducible event processing.
        </p>
        <p className="font-sans font-light text-lg md:text-xl xl:text-2xl">
          The system does not classify threats or enforce policies. Instead, it guarantees
          controlled runtime behavior and integrity of the resulting event chain.
        </p>
      </header>

      <article className="flex flex-col gap-6 lg:gap-8 xl:gap-12">
        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">
            About the project
          </h3>
          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb6 xl:mb-9">
            It doesn't use heuristics or "guess" if a request is malicious; instead, it acts as a
            high-integrity buffer for explicit security signals (Scents) from external detectors.
          </p>
          <p className="font-sans md:text-lg xl:text-xl">
            By quarantining suspicious events and preserving them in a tamper-evident AuditChain,
            Tracehound ensures that security events are forever auditable without disrupting
            production traffic.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">
            Why we built this
          </h3>

          <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb6 xl:mb-9">
            Modern security architectures often face a trade-off between "blocking and breaking" or
            "logging and losing" forensic details. We built Tracehound to solve the gap between
            real-time traffic and backend security analysis:
          </p>

          <ul className="pl-2 xl:list-disc xl:pl-6 text-lg">
            <li>
              <strong>Resilience:</strong> Fail-open semantics ensure security tooling never becomes
              a self-imposed DoS vector.
            </li>

            <li>
              <strong>Forensic Integrity:</strong> Tamper-evident AuditChain provides an immutable
              record of what actually happened, solving the "log tampering" problem.
            </li>

            <li>
              <strong>Decoupling:</strong> By trusting external logic for detection, Tracehound
              remains a lightweight, stable, and deterministic buffer that stays out of the way of
              your application logic.
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">
            Key features
          </h3>

          <ul className="pl-2 xl:list-disc xl:pl-6 text-lg">
            <li>
              <strong>Deterministic Security Buffer:</strong> No heuristics, no false positives. It
              only operates on explicit signals.
            </li>
            <li>
              <strong>Decision-Free Architecture:</strong> Trusts external detection logic, focusing
              on deterministic evidence handling and bounded ingestion safety.
            </li>
            <li>
              <strong>Fail-Open Semantics:</strong> Designed for high-velocity APIs where production
              availability is paramount.
            </li>
            <li>
              <strong>AuditChain:</strong> Merkle-chained, tamper-evident forensic logging of all
              security events.
            </li>
            <li>
              <strong>Bounded Runtime Controls:</strong> Size, queue, and timeout controls are
              enforced in core paths; performance envelope is deployment-dependent.
            </li>
            <li>
              <strong>Cold Storage Adapters:</strong> Automatic archival of evidence to S3, R2, or
              GCS.
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">
            Quick Start
          </h3>

          <h5 className="mb-3 font-heading font-bold text-base md:text-xl xl:text-2xl">
            Core Usage
          </h5>

          <Code code={coreUsage} />

          <h5 className="mb-3 mt-6 font-heading font-bold text-base md:text-xl xl:text-2xl">
            Express Integration
          </h5>

          <Code code={expressIntegration} />

          <h5 className="mb-3 mt-6 font-heading font-bold text-base md:text-xl xl:text-2xl">
            Fastify Integration
          </h5>

          <Code code={fastifyIntegration} />
        </div>

        <div className="flex flex-col">
          <h3 className="mb-5 font-heading font-bold text-xl md:text-2xl xl:text-4xl">
            Core principles
          </h3>

          <ul className="pl-2 xl:list-disc xl:pl-6 text-lg">
            <li>
              <strong>Decision-free:</strong> Tracehound never decides if a request is malicious. It
              only acts on external decisions.
            </li>
            <li>
              <strong>Detection is external:</strong> Use your existing WAF, SIEM, or ML engine to
              drive Tracehound.
            </li>
            <li>
              <strong>Forensics &gt; Visualization:</strong> Immutable evidence is our primary
              product, not pretty dashboards.
            </li>
            <li>
              <strong>Local-First:</strong> Operates within your application runtime for low-latency
              interception and auditability.
            </li>
          </ul>
        </div>
      </article>
    </div>
  )
}
