export type Navigation = {
  slug: string
  title: string
  summary: string
  category: 'Getting Started' | 'References' | 'Guides'
}

export const navigation: Navigation[] = [
  {
    slug: 'getting-started/introduction',
    title: 'Introduction',
    summary: 'Deterministic runtime security buffer for high-velocity APIs.',
    category: 'Getting Started',
  },
  {
    slug: 'getting-started/quickstart',
    title: 'Quickstart',
    summary: 'Get Tracehound running in your Node.js application in under 5 minutes.',
    category: 'Getting Started',
  },
  {
    slug: 'references/configuration',
    title: 'Configuration',
    summary: 'All configuration options for Tracehound components with recommended defaults.',
    category: 'References',
  },
  {
    slug: 'references/api-reference',
    title: 'API Reference',
    summary: 'Complete reference for the @tracehound/core package.',
    category: 'References',
  },
  {
    slug: 'references/examples',
    title: 'Examples',
    summary: 'Real-world examples of Tracehound integration.',
    category: 'References',
  },
  {
    slug: 'references/advanced',
    title: 'Advanced',
    summary: 'Advanced configuration for production deployments.',
    category: 'References',
  },
  {
    slug: 'guides/concepts',
    title: 'Concepts',
    summary: "Understanding Tracehound's core concepts helps you use it effectively.",
    category: 'Guides',
  },
  {
    slug: 'guides/security-assurance',
    title: 'Security Assurance',
    summary:
      "Validated security posture, fail-open boundaries, chaos coverage, and forensic correctness notes for the current OSS release line.",
    category: 'Guides',
  },
  {
    slug: 'guides/evidence-lifecycle',
    title: 'Evidence Lifecycle Policy',
    summary: 'This document specifies evidence retention, eviction, and cleanup policies.',
    category: 'Guides',
  },
  {
    slug: 'guides/threat-model',
    title: 'Threat Model',
    summary:
      "Deterministic security boundaries, predictable failure modes, and runtime contract limits for the Tracehound forensic evidence substrate.",
    category: 'Guides',
  },
  {
    slug: 'guides/cold-storage-security',
    title: 'Cold Storage Security',
    summary:
      'Cold Storage is the long-term archival layer for evidence. This document specifies security requirements for production adapters (S3, R2, GCS).',
    category: 'Guides',
  },
  {
    slug: 'guides/fail-open-behaviour',
    title: 'Fail-Open Behavior',
    summary:
      'Tracehound follows fail-open semantics: when the security subsystem encounters an error, traffic passes through rather than blocking. This prevents security tooling from becoming a denial-of-service vector.',
    category: 'Guides',
  },
  {
    slug: 'guides/local-state-semantics',
    title: 'Local State Semantics',
    summary: 'This document outlines the general behaviour of the Tracehound instances.',
    category: 'Guides',
  },
  {
    slug: 'guides/performance-sla-specification',
    title: 'Performance SLA Specification',
    summary:
      'This document specifies latency guarantees and performance characteristics for Tracehound core operations.',
    category: 'Guides',
  },
]

