export const scentModelCode = `
import { generateSecureId, type Scent, type ThreatSignal } from '@tracehound/core'

function detectorToThreat(req: Request): ThreatSignal | undefined {
  if (req.headers.get('x-waf-blocked') === '1') {
    return { category: 'unknown', severity: 'medium' }
  }
  return undefined
}

const scent: Scent = {
  id: generateSecureId(),
  timestamp: Date.now(),
  source: {
    ip: '203.0.113.10',
    userAgent: 'curl/8.7.1',
  },
  payload: { method: 'POST', path: '/login' },
  threat: detectorToThreat(request),
}
`.trimStart()

export const interceptOutcomesCode = `
const result = th.agent.intercept(scent)

switch (result.status) {
  case 'clean':
    break
  case 'rate_limited':
    break
  case 'payload_too_large':
    break
  case 'ignored':
    // Duplicate signature already quarantined; adapters pass through by default.
    break
  case 'quarantined':
    // Runtime handle is metadata-only; forensic bytes stay in quarantine.
    console.log(result.handle.signature, result.handle.membrane)
    break
  case 'error':
    // Internal Tracehound failure; host app should stay fail-open.
    break
}
`.trimStart()

export const localStateCode = `
import { createTracehound } from '@tracehound/core'

const instanceA = createTracehound()
const instanceB = createTracehound()
const source = { ip: '198.51.100.7', userAgent: 'curl/8.7.1' }

// State is local per instance:
// - separate rate limiter maps
// - separate quarantine store
// - separate watcher counters

instanceA.rateLimiter.check(source)
instanceB.rateLimiter.check(source)
`.trimStart()

export const auditIntegrityCode = `
const ok = th.auditChain.verify()

if (!ok) {
  alertSecurityTeam()
}
`.trimStart()

export const trustBoundaryCode = `
import { validateTrustBoundary } from '@tracehound/core'

const boundary = {
  detector: { source: 'external' as const, trustLevel: 'verify' as const },
  coldStorage: { endpoint: 'https://storage.internal', trustLevel: 'write-only' as const },
}

const errors = validateTrustBoundary(boundary)
if (errors.length > 0) {
  throw new Error(errors.join(', '))
}
`.trimStart()
