export const scentModelCode = `
import { generateSecureId, type Scent, type ThreatSignal } from '@tracehound/core'

function detectorToThreat(req: Request): ThreatSignal | undefined {
  // External detector logic (WAF / SIEM / custom rules)
  if (req.headers.get('x-waf-blocked') === '1') {
    return { category: 'unknown', severity: 'medium' }
  }
  return undefined
}

const scent: Scent = {
  id: generateSecureId(),
  timestamp: Date.now(),
  source: '203.0.113.10',
  payload: { method: 'POST', path: '/login' },
  threat: detectorToThreat(request),
}
`.trimStart()

export const interceptOutcomesCode = `
const result = th.agent.intercept(scent)

switch (result.status) {
  case 'clean':
    // No threat signal
    break
  case 'rate_limited':
    // Sliding window or block penalty
    break
  case 'payload_too_large':
    // Payload exceeded maxPayloadSize
    break
  case 'ignored':
    // Duplicate signature already quarantined
    break
  case 'quarantined':
    // Evidence is in quarantine and linked into runtime pipeline
    break
  case 'error':
    // Structured TracehoundError payload
    break
}
`.trimStart()

export const localStateCode = `
import { createTracehound } from '@tracehound/core'

const instanceA = createTracehound()
const instanceB = createTracehound()

// State is local per instance:
// - separate rate limiter maps
// - separate quarantine store
// - separate watcher counters

instanceA.rateLimiter.check('198.51.100.7')
instanceB.rateLimiter.check('198.51.100.7')
`.trimStart()

export const auditIntegrityCode = `
const ok = th.auditChain.verify()

if (!ok) {
  // Integrity chain mismatch means historical tampering or corruption
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
