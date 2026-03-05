export const instalCode = `npm install @tracehound/core`

export const quickStartCode = `
import { createTracehound } from '@tracehound/core'

const th = createTracehound({
  quarantine: { maxCount: 1000 },
})
`.trimStart()

export const interceptRequestCode = `
import { generateSecureId } from '@tracehound/core'

app.use((req, res, next) => {
  const scent = {
    id: generateSecureId(),
    timestamp: Date.now(),
    source: req.ip,
    payload: { method: req.method, path: req.path },
    threat: detectThreat(req), // Your WAF / Detector logic
  }

  const result = th.agent.intercept(scent)

  if (result.status === 'rate_limited') {
    return res.status(429).json({ error: 'Too many requests', retryAfter: result.retryAfter })
  }

  if (result.status === 'quarantined' || result.status === 'ignored') {
    return res.status(403).json({ error: 'Blocked' })
  }

  if (result.status === 'payload_too_large') {
    return res.status(413).json({ error: 'Payload too large', limit: result.limit })
  }

  if (result.status === 'error') {
    return res.status(500).json({ error: 'Security pipeline failure' })
  }

  return next()
})
`.trimStart()

export const expressInstallCode = `npm install @tracehound/core @tracehound/express`
export const expressSetupCode = `
import { tracehound } from '@tracehound/express'
import { createTracehound, generateSecureId } from '@tracehound/core'

const th = createTracehound()

app.use(
  tracehound({
    agent: th.agent,
    extractScent: (req) => ({
      id: generateSecureId(),
      timestamp: Date.now(),
      source: req.ip || 'unknown',
      payload: { method: req.method, path: req.path },
      threat: myWafCheck(req),
    }),
  }),
)
`.trimStart()

export const fastifyInstallCode = `npm install @tracehound/core @tracehound/fastify`
export const fastifySetupCode = `
import { tracehoundPlugin } from '@tracehound/fastify'
import { createTracehound, generateSecureId } from '@tracehound/core'

const th = createTracehound()

fastify.register(tracehoundPlugin, {
  agent: th.agent,
  extractScent: (req) => ({
    id: generateSecureId(),
    timestamp: Date.now(),
    source: req.ip || 'unknown',
    payload: { method: req.method, path: req.url },
    threat: myWafCheck(req),
  }),
})
`.trimStart()

export const wafIntegrationCode = `
const detectThreat = (req) => {
  // Check WAF headers set by your edge provider
  if (req.headers['cf-threat-score'] > 50) {
    return { category: 'unknown', severity: 'medium' }
  }
  return undefined // Clean request
}
`.trimStart()

export const customRateLimiting = `
const th = createTracehound({
  quarantine: { maxCount: 1000 },
  rateLimit: {
    windowMs: 60_000,
    maxRequests: 100,
    blockDurationMs: 300_000,
  },
})
`.trimStart()

export const coldStorageExport = `
import { createS3ColdStorage } from '@tracehound/core'

const coldStorage = createS3ColdStorage({
  client: myS3Client, // S3LikeClient interface
  bucket: 'my-evidence-bucket',
  prefix: 'prod/evidence/',
})

// Use this adapter in your own evidence archival workflow
`.trimStart()


export const snapshotRuntimeCode = `
import { createTracehound } from '@tracehound/core'

const th = createTracehound({
  quarantine: { maxCount: 1000 },
  snapshot: {
    path: process.env.TRACEHOUND_SYSTEM_SNAPSHOT_PATH!,
    secret: process.env.TRACEHOUND_SNAPSHOT_SECRET!,
    intervalMs: 1000,
  },
})
`.trimStart()

export const snapshotEnvCode = `
export TRACEHOUND_SYSTEM_SNAPSHOT_PATH=/var/run/tracehound/system-snapshot.json
export TRACEHOUND_SNAPSHOT_SECRET=replace-with-shared-secret
`.trimStart()
