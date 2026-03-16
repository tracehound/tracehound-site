import { Container } from '@/app/components/container'
import { Row } from '@/app/components/patterns/row'
import { Table } from '@/app/components/table'

const sections: {
  title: string
  items: { q: string; a: string }[]
}[] = [
  {
    title: 'Core Scope',
    items: [
      {
        q: 'What is Tracehound, exactly?',
        a: 'A deterministic, decision-free runtime security buffer. It consumes explicit external threat signals for the evidence path, applies native guardrails for bounded runtime control, and preserves forensic integrity.',
      },
      {
        q: 'Is it a WAF replacement?',
        a: 'No. WAF/detector layers classify threats; Tracehound does not classify. It provides deterministic containment, native guardrails, and evidence integrity around that detection boundary.',
      },
      {
        q: 'Do native guardrails require external threat signals?',
        a: 'No. Rate limiting and payload-size controls operate locally. Explicit external signals activate the evidence/quarantine path; they are not required for basic bounded controls.',
      },
      {
        q: 'What does it explicitly not do?',
        a: 'Semantic exploit detection, policy decision-making, and native global cross-instance coordination in core defaults.',
      },
      {
        q: 'Why decision-free architecture?',
        a: 'To keep responsibility boundaries clear: detection stays external, deterministic handling stays in Tracehound.',
      },
    ],
  },
  {
    title: 'API & Runtime',
    items: [
      {
        q: 'What is the primary API?',
        a: '`createTracehound(options)` from `@tracehound/core`.',
      },
      {
        q: 'What are InterceptResult statuses?',
        a: '`clean`, `rate_limited`, `payload_too_large`, `ignored`, `quarantined`, `error`.',
      },
      {
        q: 'How do I read watcher state?',
        a: 'Use `th.watcher.snapshot()`, not `getSnapshot`.',
      },
      {
        q: 'What is notifications for?',
        a: 'It is the event-emission surface for publishing runtime events to downstream systems. Async subscribers and webhook delivery are bounded, and webhook targets reject loopback, RFC1918, link-local, metadata-service, malformed, redirecting, and credential-in-URL destinations by policy.',
      },
    ],
  },
  {
    title: 'Reliability & Operations',
    items: [
      {
        q: 'Why fail-open?',
        a: 'To prevent the security layer from becoming a self-inflicted DoS vector. Application traffic is preserved during internal security-path failures.',
      },
      {
        q: 'Does fail-open introduce risk?',
        a: 'Yes, and that tradeoff is explicit in canonical docs: bounded risk plus telemetry and operational response.',
      },
      {
        q: 'Is runtime state local or global?',
        a: 'Local by default. Quarantine, rate limiter, and watcher state are per-instance in core.',
      },
      {
        q: 'How is multi-instance coordination handled?',
        a: 'Core does not provide native global sync. Coordination is handled via external layers/extension patterns.',
      },
    ],
  },
  {
    title: 'Storage, Security, Compliance',
    items: [
      {
        q: 'How does evidence lifecycle work?',
        a: 'Through bounded quarantine, priority eviction, optional TTL decay and cold-storage archival, and audit-trail continuity.',
      },
      {
        q: 'How is cold-storage security addressed?',
        a: 'Through transport security, integrity verification, least-privilege IAM, and key-rotation requirements.',
      },
      {
        q: 'What about GDPR and deletion workflows?',
        a: 'Policy docs include retention/erasure flows. Final compliance posture depends on your environment and operational controls.',
      },
      {
        q: 'What is the licensing model?',
        a: 'The public repository is Apache-2.0. Judge the shipped OSS runtime surface from implemented packages, changelog entries, and current docs together.',
      },
    ],
  },
  {
    title: 'Packages & Roadmap',
    items: [
      {
        q: 'Which packages are implemented in this repository today?',
        a: '`@tracehound/core`, `@tracehound/express`, `@tracehound/fastify`, `@tracehound/cli`.',
      },
      {
        q: 'Do roadmap or RFC package names count as current OSS runtime surface?',
        a: 'No. The shipped OSS runtime surface is the implemented package set in this repository, not draft or roadmap naming.',
      },
      {
        q: 'Where should I verify feature maturity?',
        a: 'Use package code, release changelog, and current docs together. Roadmap and RFC text describe direction, not shipped capability by themselves.',
      },
    ],
  },
]

const opsRunbook: { signal: string; check: string; action: string }[] = [
  {
    signal: 'Spike in `error` status',
    check: 'Inspect recent deploy/config changes and watcher overload flags',
    action: 'Keep fail-open path active, raise incident, restore known-good config',
  },
  {
    signal: 'Sustained `rate_limited` surge',
    check: 'Validate source distribution and window settings',
    action: 'Tune limits carefully, add upstream throttling if attack traffic persists',
  },
  {
    signal: 'High quarantine capacity',
    check: 'Read `watcher.snapshot()` and quarantine stats trend',
    action: 'Increase safe bounds or accelerate archival/eviction strategy',
  },
  {
    signal: 'Cold-storage write failures',
    check: 'Verify IAM/credentials/network and integrity pipeline',
    action:
      'Preserve hot-path stability, inspect archival sink health, and reconcile evidence flow after recovery',
  },
  {
    signal: 'Missing downstream notifications',
    check: 'Validate emitter subscribers/webhook targets and sink health',
    action: 'Recover sinks, reconcile gaps using audit and quarantine records',
  },
]

const boundaryRows: { row: string[] }[] = [
  {
    row: [
      'Deterministic handling of provided threat signals',
      'Semantic threat detection/classification',
    ],
  },
  {
    row: [
      'Bounded quarantine and priority-driven evidence management',
      'Guarantee of zero data loss under all sink failures',
    ],
  },
  {
    row: [
      'Fail-open behavior for internal security-path failures',
      'Absolute prevention of bypass risk during degraded windows',
    ],
  },
  {
    row: [
      'Per-instance local state semantics in core',
      'Built-in global multi-instance consensus in core defaults',
    ],
  },
  {
    row: [
      'Tamper-evident audit chaining at runtime scope',
      'Kernel/host-level tamper immunity against privileged attackers',
    ],
  },
]

const versionedRows: { row: string[] }[] = [
  {
    row: [
      'v1.6.0 operational truth',
      'Signed runtime snapshots, CLI integrity verification, named fastify export, shutdown/runtime snapshot surface',
    ],
  },
  {
    row: [
      'v1.7.0 evidence lifecycle',
      'TTL decay, bounded archival flow, raw ingress-byte hashing, stronger custody continuity',
    ],
  },
  {
    row: [
      'v1.8.x runtime hardening',
      'TLS source metadata, anti-rotation rate-limiter hardening, remediation closure wave',
    ],
  },
]

const conceptClarityRows: { row: string[] }[] = [
  {
    row: [
      'Tracehound',
      'Deterministic runtime containment and evidence integrity',
      'No semantic threat classification',
    ],
  },
  {
    row: ['WAF', 'Edge/network request filtering', 'No in-process forensic chain by default'],
  },
  {
    row: [
      'SIEM',
      'Aggregation, correlation, alerting, reporting',
      'Not an in-request containment engine',
    ],
  },
  {
    row: ['SOC', 'People + process + tooling for operations', 'Not a single software package'],
  },
]

const crashAndErrorRows: { row: string[] }[] = [
  {
    row: [
      'Agent processing error',
      '`intercept()` returns `{ status: "error" }` instead of throwing',
      'Fail-open path: log, alert, continue request flow',
    ],
  },
  {
    row: [
      'Hound worker timeout/crash',
      'Isolated child-process failure, replacement/recovery model',
      'Contain blast radius, preserve host availability',
    ],
  },
  {
    row: [
      'Cold storage sink outage',
      'Potential degradation in archival path',
      'Keep app traffic healthy; recover sink and reconcile later',
    ],
  },
  {
    row: [
      'Panic threshold conditions',
      'Warning/critical/emergency telemetry thresholds',
      'Trigger incident response without converting into hard traffic block',
    ],
  },
]

const performanceRows: { row: string[] }[] = [
  {
    row: [
      'Hot path model',
      'Interpret scenario-test latency as current measurement, not fixed contractual SLA',
    ],
  },
  {
    row: [
      'What is excluded from hot path',
      'Async hound analysis, cold-storage writes, downstream delivery latency',
    ],
  },
  {
    row: ['Memory model', 'Bounded buffers + eviction strategy; no unbounded growth by design'],
  },
  {
    row: [
      'Performance tradeoff',
      'Deterministic safety and evidence guarantees over deep inline analysis',
    ],
  },
]

const testAssuranceRows: { row: string[] }[] = [
  {
    row: [
      'Local chaos suite',
      '`pnpm test:chaos` exercises fail-open availability, burst recovery, and audit-path I/O degradation scenarios',
    ],
  },
  {
    row: [
      'Process-separation evidence',
      'Worker pressure and crash scenarios are used to validate reduced blast radius, not absolute OS isolation',
    ],
  },
  {
    row: [
      'I/O failure simulation',
      'Audit-path write failures are tested for graceful degradation behavior',
    ],
  },
  {
    row: [
      'Pipeline confidence signals',
      'CI/static analysis workflows (CodeQL/Semgrep/CI) are part of repository baseline',
    ],
  },
]

const tradeoffRows: { row: string[] }[] = [
  {
    row: [
      'Fail-open by design',
      'Preserves uptime under internal failure',
      'Possible short bypass window under degradation',
    ],
  },
  {
    row: [
      'Local-first state',
      'Low latency and simple defaults',
      'No native global coordination in core',
    ],
  },
  {
    row: [
      'Decision-free model',
      'Clear trust boundaries and deterministic behavior',
      'External detector quality directly affects outcomes',
    ],
  },
  {
    row: [
      'Bounded storage',
      'Predictable memory and eviction behavior',
      'Potential evidence loss under sustained pressure without archival',
    ],
  },
]

const k8sRows: { row: string[] }[] = [
  {
    row: [
      'Deployment shape',
      'In-process library inside each app pod, not a separate Tracehound service',
    ],
  },
  {
    row: [
      'Readiness model',
      'Do not gate readiness on Tracehound degradation; fail-open keeps app flow',
    ],
  },
  {
    row: [
      'Rate limiter and quarantine',
      'Per-pod local state unless external coordination is introduced',
    ],
  },
  {
    row: ['Cold storage', 'Shared S3/R2/GCS layer is the cross-pod archival aggregation path'],
  },
  {
    row: [
      'Scaling',
      'HPA should be tuned against app profile; keep hound process limits bounded per pod',
    ],
  },
]

const packageRequirementRows: { row: string[] }[] = [
  {
    row: ['`@tracehound/core`', 'Yes', 'Primary runtime and API surface'],
  },
  {
    row: ['`@tracehound/express`', 'Yes', 'Express adapter wrapping the core agent'],
  },
  {
    row: ['`@tracehound/fastify`', 'Yes', 'Fastify adapter wrapping the core agent'],
  },
  {
    row: ['`@tracehound/cli`', 'No (runtime)', 'Inspection/evaluation tooling, used separately'],
  },
]

export default function FAQ() {
  return (
    <Container>
      <section className="relative flex flex-col">
        <header className="w-full flex flex-col p-6 xl:p-12">
          <h3 className="my-3 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
            FAQ
          </h3>
          <p className="font-sans font-light text-base md:text-xl xl:text-2xl">
            Comprehensive, verifiable, and operations-focused answers about Tracehound.
          </p>
        </header>

        <Row />

        <article className="grid grid-cols-1 gap-6 p-6 xl:p-12">
          <div className="overflow-x-auto">
            <Table
              head={['Quick Fact', 'Answer']}
              body={[
                { row: ['Primary API', '`createTracehound(options)`'] },
                { row: ['Watcher method', '`watcher.snapshot()`'] },
                { row: ['Core state model', 'Per-instance local state'] },
                { row: ['Fail behavior', 'Fail-open on internal security-path failures'] },
                {
                  row: [
                    'Native guardrails',
                    'Rate limiting + payload-size controls operate without external threat signals',
                  ],
                },
                {
                  row: [
                    'Canonical runtime source',
                    'Current `tracehound` monorepo code + changelog + docs',
                  ],
                },
              ]}
            />
          </div>
        </article>

        <Row />

        <article className="grid grid-cols-1 gap-8 p-6 xl:p-12">
          <h4 className="font-heading font-bold text-xl md:text-2xl">Ops Runbook</h4>
          <p className="mt-3 font-sans text-sm md:text-base">
            Incident checklist: what to inspect first, and what to do without destabilizing
            production traffic.
          </p>
          <div className="mt-5 overflow-x-auto">
            <Table
              head={['Signal', 'Check First', 'Immediate Action']}
              body={opsRunbook.map((item) => ({
                row: [item.signal, item.check, item.action],
              }))}
            />
          </div>
        </article>

        <Row />

        <article className="grid grid-cols-1 gap-8 p-6 xl:p-12">
          <div className="p-6">
            <h4 className="font-heading font-bold text-xl md:text-2xl">
              What It Is / What It Is Not / How
            </h4>
            <p className="mt-3 font-sans text-sm md:text-base">
              Concept-clarity matrix to reduce category mistakes during architecture and procurement
              decisions.
            </p>
            <div className="mt-5 overflow-x-auto">
              <Table
                head={['System', 'Primary Role', 'Not Meant To Be']}
                body={conceptClarityRows}
              />
            </div>
          </div>

          <div className="p-6">
            <h4 className="font-heading font-bold text-xl md:text-2xl">Crash & Error Management</h4>
            <p className="mt-3 font-sans text-sm md:text-base">
              Canonical handling model for failure states, consistent with fail-open and isolation
              principles.
            </p>
            <div className="mt-5 overflow-x-auto">
              <Table
                head={['Scenario', 'System Behavior', 'Recommended Handling']}
                body={crashAndErrorRows}
              />
            </div>
          </div>

          <div className="p-6">
            <h4 className="font-heading font-bold text-xl md:text-2xl">Performance Concerns</h4>
            <div className="mt-5 overflow-x-auto">
              <Table head={['Topic', 'Explanation']} body={performanceRows} />
            </div>
          </div>

          <div className="p-6">
            <h4 className="font-heading font-bold text-xl md:text-2xl">
              Test & Assurance Evidence
            </h4>
            <p className="mt-3 font-sans text-sm md:text-base">
              Confidence signals that can be shared with engineering leadership and security
              reviewers.
            </p>
            <div className="mt-5 overflow-x-auto">
              <Table head={['Evidence Area', 'What Is Documented']} body={testAssuranceRows} />
            </div>
          </div>

          <div className="p-6">
            <h4 className="font-heading font-bold text-xl md:text-2xl">Trade-Offs (Explicit)</h4>
            <div className="mt-5 overflow-x-auto">
              <Table head={['Design Choice', 'Benefit', 'Cost / Risk']} body={tradeoffRows} />
            </div>
          </div>

          <div className="p-6">
            <h4 className="font-heading font-bold text-xl md:text-2xl">
              Kubernetes / Clusterized Operation
            </h4>
            <p className="mt-3 font-sans text-sm md:text-base">
              Multi-instance behavior and operational implications based on K8s and local-state
              documents.
            </p>
            <div className="mt-5 overflow-x-auto">
              <Table head={['Topic', 'Guidance']} body={k8sRows} />
            </div>
          </div>

          <div className="p-6">
            <h4 className="font-heading font-bold text-xl md:text-2xl">
              Package Requirements & Dependencies
            </h4>
            <div className="mt-5 overflow-x-auto">
              <Table
                head={['Package', 'Requires `@tracehound/core`', 'Notes']}
                body={packageRequirementRows}
              />
            </div>
          </div>
        </article>

        <Row />

        <article className="grid grid-cols-1 gap-8 p-6 xl:p-12">
          {sections.map((section) => (
            <div key={section.title} className="p-6">
              <h4 className="font-heading font-bold text-xl md:text-2xl">{section.title}</h4>
              <div className="mt-6 flex flex-col gap-5">
                {section.items.map((item) => (
                  <div key={item.q}>
                    <h5 className="font-heading font-bold text-base md:text-lg">{item.q}</h5>
                    <p className="mt-2 font-sans text-sm md:text-base text-(--foreground)">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </article>

        <Row />

        <article className="grid grid-cols-1 gap-8 p-6 xl:p-12">
          <div className="p-6">
            <h4 className="font-heading font-bold text-xl md:text-2xl">
              Security / Legal Boundary
            </h4>
            <p className="mt-3 font-sans text-sm md:text-base">
              Clear line between what is guaranteed by documented design and what is explicitly out
              of scope.
            </p>
            <div className="mt-5 overflow-x-auto">
              <Table head={['Guaranteed / Intended', 'Not Guaranteed']} body={boundaryRows} />
            </div>
          </div>

          <div className="p-6">
            <h4 className="font-heading font-bold text-xl md:text-2xl">Versioned FAQ</h4>
            <p className="mt-3 font-sans text-sm md:text-base">
              Read answers based on release maturity: implemented runtime behavior first, roadmap
              statements second.
            </p>
            <div className="mt-5 overflow-x-auto">
              <Table head={['Version / Track', 'Scope']} body={versionedRows} />
            </div>
          </div>
        </article>
      </section>
    </Container>
  )
}
