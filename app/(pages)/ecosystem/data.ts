export type PackageStatus = 'WIP' | 'RELEASED' | 'RFC'

export type PackageCard = {
  name: string
  slug: string
  layer: string
  summary: string
  whenToUse: string
  input: string
  output: string
  status: PackageStatus
}

export const packages: PackageCard[] = [
  {
    name: 'Core',
    slug: 'core',
    layer: 'Runtime Control Plane',
    summary: 'Deterministic runtime buffer that enforces bounded intake and fail-open behavior.',
    whenToUse: 'Always; this is the foundation for all ecosystem packages.',
    input: 'External decisions and security signals.',
    output: 'Quarantined events and canonical runtime controls.',
    status: 'RELEASED',
  },
  {
    name: 'Argos',
    slug: 'argos',
    layer: 'Detection',
    summary: 'Runtime behavioral observation for threat detection and anomaly surfacing.',
    whenToUse: 'When you need live runtime detection telemetry.',
    input: 'Runtime metrics, behavior traces, request context.',
    output: 'Scored findings and suspicion signals.',
    status: 'WIP',
  },
  {
    name: 'Talos',
    slug: 'talos',
    layer: 'Policy & Decision Routing',
    summary: 'External policy execution boundary and decision routing orchestration.',
    whenToUse: 'When decision logic must remain outside the app runtime.',
    input: 'Policy bundles and Argos/Intel outcomes.',
    output: 'Action directives for runtime response.',
    status: 'RFC',
  },
  {
    name: 'Muninn',
    slug: 'muninn',
    layer: 'Evidence Pipeline',
    summary: 'Historical ledger and time-series aggregation for security evidence.',
    whenToUse: 'When evidence retention and queryability are mandatory.',
    input: 'Quarantine records and event streams.',
    output: 'Chain-linked evidence history and retention views.',
    status: 'RFC',
  },
  {
    name: 'Huginn',
    slug: 'huginn',
    layer: 'Threat Intel',
    summary: 'Threat intelligence ingestion and correlation enrichment.',
    whenToUse: 'When detections must be enriched with external intel context.',
    input: 'Threat feeds and indicators.',
    output: 'Correlated enrichment signals.',
    status: 'RFC',
  },
  {
    name: 'Heimdall',
    slug: 'heimdall',
    layer: 'Supply Chain Security',
    summary: 'Dependency integrity and supply-chain posture verification.',
    whenToUse: 'When build and deploy integrity checks are required.',
    input: 'Package manifests, lockfiles, artifact metadata.',
    output: 'Integrity findings and remediation signals.',
    status: 'RFC',
  },
  {
    name: 'Loki',
    slug: 'loki',
    layer: 'Deception & Friction',
    summary: 'Passive deception and tarpit controls for cost asymmetry against attackers.',
    whenToUse: 'When you need low-cost friction on hostile automation.',
    input: 'Suspicion scores and policy directives.',
    output: 'Controlled delay/deception actions.',
    status: 'RFC',
  },
  {
    name: 'Anubis',
    slug: 'anubis',
    layer: 'Post-Mortem Forensic',
    summary:
      'Offline forensic control pipeline that normalizes external logs into chain-linked evidence.',
    whenToUse: 'When incidents require retroactive evidence reconstruction from existing logs.',
    input: 'WAF, SIEM, RASP, and Tracehound export records.',
    output: 'Unified TEF evidence chains, manifests, and archive-ready forensic bundles.',
    status: 'RFC',
  },
  {
    name: 'Norns',
    slug: 'norns',
    layer: 'Pre-Deployment Validation',
    summary: 'Pre-release security posture verification before changes hit production.',
    whenToUse: 'When release gates require deterministic security checks.',
    input: 'Build artifacts and environment policies.',
    output: 'Gate outcomes and release readiness score.',
    status: 'RFC',
  },
  {
    name: 'Furies',
    slug: 'furies',
    layer: 'Chaos & Resilience Testing',
    summary: 'Chaos engineering workflows focused on security infrastructure.',
    whenToUse: 'When validating failure semantics and resilience boundaries.',
    input: 'Fault scenarios and runtime stress plans.',
    output: 'Resilience reports and boundary validation.',
    status: 'RFC',
  },
  {
    name: 'Watchtower',
    slug: 'watchtower',
    layer: 'Ops Cockpit',
    summary: 'Operational dashboard and forensic cockpit for analyst workflows.',
    whenToUse: 'When SecOps needs shared visibility and incident triage control.',
    input: 'Evidence streams, detection timelines, policy outcomes.',
    output: 'Analyst workflows, dashboards, and incident context.',
    status: 'RFC',
  },
]

export const architectureLayers = [
  {
    title: 'Runtime Control Plane',
    description: 'Keeps request handling stable while security logic executes off the hot path.',
    members: ['Core', 'Argos', 'Talos'],
  },
  {
    title: 'Evidence & Intelligence Plane',
    description: 'Preserves and enriches event history for investigation and correlation.',
    members: ['Muninn', 'Huginn', 'Watchtower'],
  },
  {
    title: 'Assurance Plane',
    description:
      'Validates upstream risk through integrity checks, chaos drills, and release gates.',
    members: ['Heimdall', 'Loki', 'Anubis', 'Norns', 'Furies'],
  },
]

export const operationalFlows = [
  {
    name: 'Incident Response',
    objective: 'Contain impact while preserving verifiable evidence for post-incident analysis.',
    sequence: [
      'Argos surfaces runtime anomalies and suspicion signals.',
      'Talos evaluates external policy and returns response directives.',
      'Core applies bounded runtime controls and quarantine semantics.',
      'Muninn persists chain-linked evidence with retention policy.',
      'Anubis reconstructs multi-source post-mortem timelines from historical logs.',
      'Watchtower drives analyst triage and cross-team coordination.',
    ],
    packages: ['Argos', 'Talos', 'Core', 'Muninn', 'Anubis', 'Watchtower'],
  },
  {
    name: 'Threat Hunting',
    objective: 'Correlate weak signals into actionable hypotheses without production disruption.',
    sequence: [
      'Huginn ingests and correlates intelligence indicators.',
      'Argos maps runtime behavior against enriched context.',
      'Muninn exposes historical evidence for timeline reconstruction.',
      'Anubis fuses external log sources into a unified forensic evidence chain.',
      'Watchtower supports pivoting across entities and sessions.',
    ],
    packages: ['Huginn', 'Argos', 'Muninn', 'Anubis', 'Watchtower'],
  },
  {
    name: 'Pre-Release Security Gate',
    objective: 'Prevent risky deployments from entering production under unknown conditions.',
    sequence: [
      'Heimdall verifies dependencies and supply-chain integrity.',
      'Norns evaluates release posture against security policies.',
      'Talos applies environment-specific policy routing.',
      'Furies runs resilience experiments for failure-mode confidence.',
    ],
    packages: ['Heimdall', 'Norns', 'Talos', 'Furies'],
  },
]

export const guarantees = [
  {
    title: 'Deterministic Failure Semantics',
    description: 'Failure outcomes are explicit and bounded, not emergent or heuristic.',
  },
  {
    title: 'Bounded Resource Behavior',
    description: 'Queue, buffer, and retention pressure degrade predictably under load.',
  },
  {
    title: 'Tamper-Evident Evidence Chain',
    description: 'Evidence records remain auditable with chain-linked integrity guarantees.',
  },
]

export const statusClass: Record<PackageStatus, string> = {
  WIP: 'border-(--warning) text-(--warning)',
  RELEASED: 'border-(--success) text-(--success)',
  RFC: 'border-(--foreground) text-(--foreground)',
}
