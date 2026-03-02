export const minimalExpressCode = `
import express from 'express'
import { createTracehound, generateSecureId } from '@tracehound/core'

const app = express()
app.use(express.json())

const th = createTracehound({
  quarantine: { maxCount: 2000, maxBytes: 150_000_000 },
  rateLimit: { windowMs: 60_000, maxRequests: 120, blockDurationMs: 300_000 },
})

function detectThreat(req: express.Request) {
  // Replace this with your WAF, SIEM, or custom detector output.
  if (typeof req.body?.query === 'string' && req.body.query.includes('DROP TABLE')) {
    return { category: 'injection' as const, severity: 'high' as const }
  }
  return undefined
}

app.use((req, res, next) => {
  const result = th.agent.intercept({
    id: generateSecureId(),
    timestamp: Date.now(),
    source: req.ip || 'unknown',
    payload: {
      method: req.method,
      path: req.path,
      body: req.body,
    },
    threat: detectThreat(req),
  })

  if (result.status === 'clean') return next()
  if (result.status === 'rate_limited') {
    return res.status(429).json({ error: 'Too many requests', retryAfter: result.retryAfter })
  }
  if (result.status === 'payload_too_large') {
    return res.status(413).json({ error: 'Payload too large', limit: result.limit })
  }
  if (result.status === 'quarantined' || result.status === 'ignored') {
    return res.status(403).json({ error: 'Blocked' })
  }

  return res.status(500).json({ error: 'Security pipeline failure' })
})

app.get('/health', (_req, res) => res.json({ ok: true }))
app.listen(3000)
`.trimStart()

export const expressAdapterCode = `
import express from 'express'
import { tracehound } from '@tracehound/express'
import { createTracehound, generateSecureId } from '@tracehound/core'

const app = express()
const th = createTracehound()

app.use(
  tracehound({
    agent: th.agent,
    extractScent: (req) => ({
      id: generateSecureId(),
      timestamp: Date.now(),
      source: req.ip || 'unknown',
      payload: {
        method: req.method,
        path: req.path,
        headers: req.headers,
      },
      threat: req.headers['x-waf-blocked'] === '1'
        ? { category: 'unknown', severity: 'medium' }
        : undefined,
    }),
    onIntercept: (result, _req, res) => {
      if (result.status === 'rate_limited') {
        return res.status(429).json({ error: 'Too many requests' })
      }
      if (result.status === 'quarantined' || result.status === 'ignored') {
        return res.status(403).json({ error: 'Forbidden' })
      }
      if (result.status === 'payload_too_large') {
        return res.status(413).json({ error: 'Payload too large' })
      }
      return res.status(500).json({ error: 'Internal security error' })
    },
  }),
)
`.trimStart()

export const fastifyAdapterCode = `
import fastify from 'fastify'
import { tracehoundPlugin } from '@tracehound/fastify'
import { createTracehound, generateSecureId } from '@tracehound/core'

const app = fastify()
const th = createTracehound({
  houndPool: {
    poolSize: 6,
    timeout: 20_000,
    onPoolExhausted: 'defer',
  },
})

app.register(tracehoundPlugin, {
  agent: th.agent,
  extractScent: (req) => ({
    id: generateSecureId(),
    timestamp: Date.now(),
    source: req.ip || 'unknown',
    payload: {
      method: req.method,
      path: req.url,
      body: req.body,
    },
    threat: req.headers['x-threat-score'] ? { category: 'flood', severity: 'high' } : undefined,
  }),
})
`.trimStart()

export const detectorAdapterCode = `
type DetectorSignal = {
  blocked: boolean
  reason?: string
  score?: number
}

function mapDetectorToThreat(signal: DetectorSignal) {
  if (!signal.blocked) return undefined

  if (signal.reason?.includes('sql')) {
    return { category: 'injection' as const, severity: 'high' as const }
  }
  if ((signal.score ?? 0) > 90) {
    return { category: 'ddos' as const, severity: 'critical' as const }
  }

  return { category: 'unknown' as const, severity: 'medium' as const }
}
`.trimStart()

export const envBasedConfigCode = `
import { createTracehound } from '@tracehound/core'

const th = createTracehound({
  maxPayloadSize: Number(process.env.TRACEHOUND_MAX_PAYLOAD_SIZE ?? 1_000_000),
  quarantine: {
    maxCount: Number(process.env.TRACEHOUND_QUARANTINE_MAX_COUNT ?? 10_000),
    maxBytes: Number(process.env.TRACEHOUND_QUARANTINE_MAX_BYTES ?? 100_000_000),
  },
  rateLimit: {
    windowMs: Number(process.env.TRACEHOUND_RATE_LIMIT_WINDOW_MS ?? 60_000),
    maxRequests: Number(process.env.TRACEHOUND_RATE_LIMIT_MAX_REQUESTS ?? 100),
    blockDurationMs: Number(process.env.TRACEHOUND_RATE_LIMIT_BLOCK_MS ?? 300_000),
  },
  watcher: {
    maxAlertsPerWindow: Number(process.env.TRACEHOUND_WATCHER_MAX_ALERTS ?? 10),
    alertWindowMs: Number(process.env.TRACEHOUND_WATCHER_WINDOW_MS ?? 60_000),
    quarantineHighWatermark: Number(process.env.TRACEHOUND_WATCHER_HIGH_WATERMARK ?? 0.8),
  },
})
`.trimStart()

export const observabilityCode = `
// 1) Pull current observability state
const snapshot = th.watcher.snapshot()
console.log({
  threats: snapshot.threats.total,
  alerts: snapshot.totalAlerts,
  quarantineCount: snapshot.quarantine.count,
  quarantineCapacity: snapshot.quarantine.capacityPercent,
})

// 2) Listen to event stream
th.notifications.on('threat.detected', (event) => {
  console.log('[threat.detected]', event.payload.category, event.payload.severity)
})

th.notifications.on('rate_limit.exceeded', (event) => {
  console.log('[rate_limit.exceeded]', event.payload.source, event.payload.retryAfterMs)
})
`.trimStart()

export const coldStorageCode = `
import { createS3ColdStorage, encodeWithIntegrityAsync } from '@tracehound/core'

const coldStorage = createS3ColdStorage({
  client: myS3LikeClient,
  bucket: 'tracehound-evidence',
  prefix: 'prod/evidence/',
})

async function archiveEvidence(handle: { signature: string; bytes: Uint8Array }) {
  const encoded = await encodeWithIntegrityAsync(handle.bytes)
  await coldStorage.write(handle.signature, encoded)
}
`.trimStart()
