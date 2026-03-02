export const runtimeFlowCode = `
Request
  -> External detector (WAF / SIEM / custom rules)
  -> Scent + ThreatSignal
  -> agent.intercept(scent)
      1) rateLimiter.check(source)
      2) if no threat => clean
      3) evidenceFactory.create(...) (encode/hash/signature)
      4) quarantine insert + capacity eviction
      5) houndPool.activate(evidence) (async, fire-and-forget)
      6) watcher + notifications updates
  -> InterceptResult
`.trimStart()

export const lowLevelCompositionCode = `
import {
  AuditChain,
  Quarantine,
  createAgent,
  createEvidenceFactory,
  createHoundPool,
  createNotificationEmitter,
  createRateLimiter,
  createWatcher,
} from '@tracehound/core'

const auditChain = new AuditChain()
const notifications = createNotificationEmitter()

const quarantine = new Quarantine(
  {
    maxCount: 10_000,
    maxBytes: 100_000_000,
    evictionPolicy: 'priority',
  },
  auditChain,
)

const rateLimiter = createRateLimiter({
  windowMs: 60_000,
  maxRequests: 100,
  blockDurationMs: 300_000,
})

const watcher = createWatcher({
  maxAlertsPerWindow: 10,
  alertWindowMs: 60_000,
  quarantineHighWatermark: 0.8,
})

const evidenceFactory = createEvidenceFactory()
const houndPool = createHoundPool({
  poolSize: 4,
  timeout: 30_000,
  rotationJitterMs: 1000,
  onPoolExhausted: 'defer',
  deferQueueLimit: 100,
})

const agent = createAgent(
  { maxPayloadSize: 1_000_000 },
  quarantine,
  rateLimiter,
  evidenceFactory,
  houndPool,
  watcher,
  notifications,
)
`.trimStart()

export const manualWiringCode = `
// Optional: wire hound outcomes to operational signals
houndPool.onResult((result) => {
  if (result.status === 'timeout') {
    watcher.alert({
      type: 'hound_timeout',
      severity: 'warning',
      message: \`Hound timeout after \${result.durationMs}ms\`,
      context: { signature: result.signature, processId: result.processId },
    })

    notifications.emit('system.panic', {
      level: 'warning',
      reason: \`hound_timeout: signature=\${result.signature}\`,
    })
  }
})
`.trimStart()

export const houndPoolTuningCode = `
import { createHoundPool } from '@tracehound/core'

const houndPool = createHoundPool({
  poolSize: 8,
  timeout: 20_000,
  rotationJitterMs: 750,
  onPoolExhausted: 'defer',
  deferQueueLimit: 500,
  processConstraints: {
    maxMemoryMB: 192,
    networkAccess: false,
    fileSystemWrite: false,
    childSpawn: false,
  },
})

// Observe pool health
console.log(houndPool.stats)
`.trimStart()

export const failSafeCode = `
import { createFailSafe } from '@tracehound/core'

const failSafe = createFailSafe({
  memory: { warning: 0.7, critical: 0.85, emergency: 0.95 },
  quarantine: { warning: 0.7, critical: 0.85, emergency: 0.95 },
  errorRate: { warning: 10, critical: 50, emergency: 100 },
})

failSafe.on('critical', (event) => {
  console.error('[failsafe:critical]', event.reason, event.context)
})

failSafe.on('emergency', () => {
  // Example emergency action
  quarantine.flush()
})

// Example checks from your telemetry loop
failSafe.checkMemory(usedBytes, totalBytes)
failSafe.checkQuarantine(quarantine.stats.count, 10_000)
failSafe.checkErrorRate(errorsPerMinute)
`.trimStart()

export const schedulerCleanupCode = `
import { createScheduler } from '@tracehound/core'

const scheduler = createScheduler({
  tickInterval: 5_000,
  jitterMs: 1_000,
  skipIfBusy: true,
})

scheduler.setBusyChecker(() => {
  // Example signal
  return houndPool.stats.activeProcesses >= houndPool.stats.totalProcesses
})

scheduler.schedule({
  id: 'rate-limiter-cleanup',
  intervalMs: 60_000,
  execute: () => {
    const removed = rateLimiter.cleanup()
    if (removed > 0) {
      console.log('cleaned stale rate limit entries:', removed)
    }
  },
})

scheduler.start()
`.trimStart()

export const trustBoundaryCode = `
import { shouldVerifyDetector, validateTrustBoundary } from '@tracehound/core'

const boundary = {
  detector: {
    source: 'external' as const,
    trustLevel: 'verify' as const,
  },
  coldStorage: {
    endpoint: 'https://storage.example.internal',
    trustLevel: 'write-only' as const,
  },
}

const errors = validateTrustBoundary(boundary)
if (errors.length > 0) {
  throw new Error('Invalid trust boundary: ' + errors.join(', '))
}

if (shouldVerifyDetector(boundary)) {
  // Add cross-checking and additional validation for detector outputs
}
`.trimStart()

export const testingHookCode = `
import { createHoundPool, createMockAdapter } from '@tracehound/core'

const adapter = createMockAdapter()
const houndPool = createHoundPool({
  poolSize: 2,
  timeout: 1000,
  rotationJitterMs: 100,
  adapter,
})

houndPool.onResult((result) => {
  console.log(result.status, result.signature)
})
`.trimStart()
