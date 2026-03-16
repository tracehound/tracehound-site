export type PackageStatus = 'RELEASED'

export type PackageCard = {
  name: string
  slug: string
  href: string
  layer: string
  summary: string
  whenToUse: string
  input: string
  output: string
  status: PackageStatus
}

export const packages: PackageCard[] = [
  {
    name: '@tracehound/core',
    slug: 'core',
    href: '/docs/references/api-reference',
    layer: 'Runtime Engine',
    summary:
      'Decision-free forensic runtime that owns intercept flow, quarantine, AuditChain, watcher, notifications, and cold-storage integrations.',
    whenToUse: 'Always; this is the canonical runtime surface and package root.',
    input: 'Canonical Scent objects, optional ingress bytes, explicit ThreatSignal metadata.',
    output: 'Typed InterceptResult outcomes, metadata-only runtime handles, and bounded runtime subsystems.',
    status: 'RELEASED',
  },
  {
    name: '@tracehound/express',
    slug: 'express',
    href: '/docs/getting-started/quickstart',
    layer: 'Ingress Adapter',
    summary:
      'Thin Express middleware adapter that maps HTTP request state into Scent and preserves fail-open adapter semantics.',
    whenToUse: 'When your service stack is Express and you want standard request interception wiring.',
    input: 'Express Request/Response flow plus optional req.rawBody for deterministic ingress-byte hashing.',
    output: 'Framework-native pass-through, 403, 413, and 429 behavior driven by core intercept outcomes.',
    status: 'RELEASED',
  },
  {
    name: '@tracehound/fastify',
    slug: 'fastify',
    href: '/docs/getting-started/quickstart',
    layer: 'Ingress Adapter',
    summary:
      'Thin Fastify plugin adapter built around tracehoundPlugin, with the same core runtime contract as Express.',
    whenToUse: 'When your service stack is Fastify and you want native plugin-based interception.',
    input: 'Fastify request lifecycle plus optional req.rawBody for deterministic ingress-byte hashing.',
    output: 'Framework-native reply behavior driven by core intercept outcomes and optional custom extractScent.',
    status: 'RELEASED',
  },
  {
    name: '@tracehound/cli',
    slug: 'cli',
    href: '/docs/getting-started/quickstart',
    layer: 'Operator Surface',
    summary:
      'CLI and TUI operator tooling for status, stats, watch, and trace inspection backed by signed runtime snapshots.',
    whenToUse: 'When operators need local inspection workflows without inventing runtime state.',
    input: 'Verified system snapshot file plus explicit snapshot freshness and secret controls.',
    output: 'Operational status, stats, watch dashboards, and trace-oriented inspection workflows.',
    status: 'RELEASED',
  },
]

export const architectureLayers = [
  {
    title: 'Runtime Engine',
    description: 'Core deterministic intercept, evidence custody, and bounded subsystem ownership.',
    members: ['@tracehound/core'],
  },
  {
    title: 'Ingress Adapters',
    description:
      'Framework bindings that translate HTTP request context into Scent without adding detector or policy logic.',
    members: ['@tracehound/express', '@tracehound/fastify'],
  },
  {
    title: 'Operator Surface',
    description:
      'Snapshot-backed tooling for inspecting live runtime state without fabricating healthy defaults.',
    members: ['@tracehound/cli'],
  },
]

export const operationalFlows = [
  {
    name: 'Embedded Runtime',
    objective: 'Accept explicit threat signals and return deterministic intercept outcomes in-process.',
    sequence: [
      'Application or adapter maps request state into a canonical Scent.',
      'Core runs rate limiting, payload bounds, and threat-bearing evidence flow.',
      'Quarantine and AuditChain preserve evidence custody under bounded policy.',
    ],
    packages: ['@tracehound/core'],
  },
  {
    name: 'Framework Ingress',
    objective: 'Bind Tracehound to HTTP frameworks without leaking business logic into adapters.',
    sequence: [
      'Express or Fastify adapter extracts request metadata and optional rawBody.',
      'Adapter invokes core agent.intercept() and maps result to framework-native behavior.',
      'Custom extractScent remains the only place where upstream detector metadata is translated.',
    ],
    packages: ['@tracehound/core', '@tracehound/express', '@tracehound/fastify'],
  },
  {
    name: 'Operator Inspection',
    objective: 'Expose truthful runtime state to operators through verified snapshot input.',
    sequence: [
      'Core exports a signed runtime snapshot with explicit freshness bounds.',
      'CLI verifies signature and timestamp before reading runtime state.',
      'Operators use status, stats, watch, and inspect flows without fabricated fallback output.',
    ],
    packages: ['@tracehound/core', '@tracehound/cli'],
  },
]

export const guarantees = [
  {
    title: 'Deterministic Failure Semantics',
    description: 'Failure outcomes are typed, bounded, and observable rather than heuristic or emergent.',
  },
  {
    title: 'Metadata-Only Runtime Membrane',
    description: 'Runtime code receives metadata handles; forensic byte access remains quarantine-local.',
  },
  {
    title: 'Snapshot-Backed Operator Truth',
    description: 'CLI surfaces depend on verified runtime snapshots instead of guessed healthy state.',
  },
]

export const statusClass: Record<PackageStatus, string> = {
  RELEASED: 'border-(--success) text-(--success)',
}
