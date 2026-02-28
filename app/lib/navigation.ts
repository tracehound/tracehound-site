import { type Icon } from '@phosphor-icons/react'
import {
  BombIcon,
  BrowsersIcon,
  CastleTurretIcon,
  FilmReelIcon,
  HeadCircuitIcon,
  ListChecksIcon,
  ResizeIcon,
  ShieldStarIcon,
  TargetIcon,
} from '@phosphor-icons/react/dist/ssr'

export type Navigation = {
  slug: string
  title: string
  summary: string
  category: 'Getting Started' | 'References' | 'Guides' | 'Ecosystem'
  icon?: Icon
}

export const navigation: Navigation[] = [
  // Getting Started
  {
    slug: 'getting-started/introduction',
    title: 'Introduction',
    summary: 'Deterministic Runtime Security Buffer for Modern Applications.',
    category: 'Getting Started',
  },
  {
    slug: 'getting-started/quickstart',
    title: 'Quickstart',
    summary: 'Get Tracehound running in your Node.js application in under 5 minutes.',
    category: 'Getting Started',
  },

  // References
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

  // Guides
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
      "This document outlines the proven facts, known limitations, and architectural rationale behind Tracehound's design as a High-Assurance Security Substrate. It is intended for Security Operations (SecOps) teams and architecture reviewers to understand both the empirical resilience of the system and its theoretical threat model gaps.",
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
      "This document outlines the deterministic security boundaries, predictable failure modes, and legal/liability constraints of the Tracehound Resilience Edge. It is designed to provide a clear understanding of the product's operational behavior under extreme duress.",
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

  // Ecosystem
  {
    slug: 'ecosystem/core',
    title: 'Core',
    summary:
      'The main Tracehound package. Includes everything you need to quarantine threats and preserve evidence.',
    category: 'Ecosystem',
    icon: CastleTurretIcon,
  },
  {
    slug: 'ecosystem/horizon',
    title: 'Horizon',
    summary: 'Horizon is a config extender for the Tracehound substrate.',
    category: 'Ecosystem',
    icon: ResizeIcon,
  },
  {
    slug: 'ecosystem/argos',
    title: 'Argos',
    summary: 'Runtime behavioral observation for threat detection.',
    category: 'Ecosystem',
    icon: TargetIcon,
  },
  {
    slug: 'ecosystem/talos',
    title: 'Talos',
    summary: 'External policy execution and decision routing.',
    category: 'Ecosystem',
    icon: ShieldStarIcon,
  },
  {
    slug: 'ecosystem/huginn',
    title: 'Huginn',
    summary: 'Threat intelligence ingestion and correlation.',
    category: 'Ecosystem',
    icon: HeadCircuitIcon,
  },
  {
    slug: 'ecosystem/muninn',
    title: 'Muninn',
    summary: 'Historical ledger and time-series aggregation.',
    category: 'Ecosystem',
    icon: FilmReelIcon,
  },
  {
    slug: 'ecosystem/norns',
    title: 'Norns',
    summary: 'Pre-deployment security posture validation.',
    category: 'Ecosystem',
    icon: ListChecksIcon,
  },
  {
    slug: 'ecosystem/furies',
    title: 'Furies',
    summary: 'Chaos engineering for security infrastructure.',
    category: 'Ecosystem',
    icon: BombIcon,
  },
  {
    slug: 'ecosystem/watchtower',
    title: 'Watchtower',
    summary: 'Forensic cockpit and operational dashboards.',
    category: 'Ecosystem',
    icon: BrowsersIcon,
  },
]
