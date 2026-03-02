export const createTracehoundCode = `
import { createTracehound } from '@tracehound/core'

const th = createTracehound({
  maxPayloadSize: 1_000_000,
  quarantine: {
    maxCount: 10_000,
    maxBytes: 100_000_000,
  },
  rateLimit: {
    windowMs: 60_000,
    maxRequests: 100,
    blockDurationMs: 300_000,
  },
  watcher: {
    maxAlertsPerWindow: 10,
    alertWindowMs: 60_000,
    quarantineHighWatermark: 0.8,
  },
  houndPool: {
    poolSize: 4,
    timeout: 30_000,
    rotationJitterMs: 1000,
    onPoolExhausted: 'defer',
  },
})
`.trimStart()

export const interceptCode = `
import { generateSecureId } from '@tracehound/core'

const result = th.agent.intercept({
  id: generateSecureId(),
  timestamp: Date.now(),
  source: req.ip || 'unknown',
  payload: {
    method: req.method,
    path: req.path,
    body: req.body,
  },
  threat: detectThreat(req), // undefined => clean
})
`.trimStart()

export const watcherCode = `
const snapshot = th.watcher.snapshot()

console.log(snapshot.threats.total)
console.log(snapshot.quarantine.capacityPercent)
console.log(snapshot.lastAlert?.type)
`.trimStart()

export const notificationsCode = `
th.notifications.on('threat.detected', (event) => {
  console.log(event.payload.category, event.payload.severity)
})

th.notifications.on('system.panic', (event) => {
  console.error(event.payload.level, event.payload.reason)
})
`.trimStart()

export const utilitiesCode = `
import {
  generateSecureId,
  isClean,
  isError,
  isQuarantined,
  isValidSecureId,
  hash,
  serialize,
  createS3ColdStorage,
} from '@tracehound/core'

const id = generateSecureId()
console.log(isValidSecureId(id))

const digest = hash('data')
const stableJson = serialize({ key: 'value' })

const coldStorage = createS3ColdStorage({
  client: myS3LikeClient,
  bucket: 'tracehound-evidence',
  prefix: 'prod/evidence/',
})

if (isQuarantined(result)) {
  console.log(result.handle.signature)
} else if (isError(result)) {
  console.error(result.error.code)
} else if (isClean(result)) {
  // continue
}
`.trimStart()
