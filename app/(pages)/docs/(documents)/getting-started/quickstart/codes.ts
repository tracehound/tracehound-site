export const instalCode = `npm install @tracehound/core`

export const quickStartCode = `
import { createTracehound } from '@tracehound/core'

const th = createTracehound({
  maxPayloadSize: 1_000_000,
  quarantine: { maxCount: 1000, maxBytes: 100_000_000 },
  rateLimit: { windowMs: 60_000, maxRequests: 100 },
})
`.trimStart()

export const interceptRequestCode = `
import { generateSecureId } from '@tracehound/core'

app.use((req, res, next) => {
  const scent = {
    id: generateSecureId(),
    timestamp: Date.now(),
    source: {
      ip: req.ip || 'unknown',
      userAgent:
        typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : undefined,
    },
    payload: { method: req.method, path: req.path },
    threat: mapThreatSignal(req),
  }

  const result = th.agent.intercept(scent)

  if (result.status === 'rate_limited') {
    return res.status(429).json({ error: 'Too many requests', retryAfter: result.retryAfter })
  }

  if (result.status === 'quarantined') {
    return res.status(403).json({ error: 'Blocked', signature: result.handle.signature })
  }

  if (result.status === 'payload_too_large') {
    return res.status(413).json({ error: 'Payload too large', limit: result.limit })
  }

  if (result.status === 'ignored' || result.status === 'error') {
    return next()
  }

  return next()
})
`.trimStart()

export const expressInstallCode = `npm install @tracehound/core @tracehound/express`
export const expressSetupCode = `
import { Buffer } from 'node:buffer'
import express from 'express'
import { tracehound } from '@tracehound/express'
import { createTracehound, generateSecureId } from '@tracehound/core'

const app = express()
const th = createTracehound()

app.use(
  express.json({
    verify: (req, _res, buf) => {
      Reflect.set(req, 'rawBody', Buffer.from(buf))
    },
  }),
)

app.use(
  tracehound({
    agent: th.agent,
    extractScent: (req) => ({
      id: generateSecureId(),
      timestamp: Date.now(),
      source: {
        ip: req.ip || 'unknown',
        userAgent:
          typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : undefined,
      },
      payload: { method: req.method, path: req.path },
      threat: mapThreatSignal(req),
    }),
  }),
)
`.trimStart()

export const fastifyInstallCode = `npm install @tracehound/core @tracehound/fastify`
export const fastifySetupCode = `
import fastify from 'fastify'
import { tracehoundPlugin } from '@tracehound/fastify'
import { createTracehound, generateSecureId } from '@tracehound/core'

const app = fastify()
const th = createTracehound()

app.register(tracehoundPlugin, {
  agent: th.agent,
  extractScent: (req) => ({
    id: generateSecureId(),
    timestamp: Date.now(),
    source: {
      ip: req.ip || 'unknown',
      userAgent:
        typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : undefined,
    },
    payload: { method: req.method, path: req.url },
    threat: mapThreatSignal(req),
  }),
})
`.trimStart()

export const externalSignalMappingCode = `
const mapThreatSignal = (req) => {
  if (req.headers['x-risk-score'] === 'critical') {
    return { category: 'unknown', severity: 'critical' }
  }

  if (Number(req.headers['cf-threat-score'] ?? 0) > 50) {
    return { category: 'unknown', severity: 'medium' }
  }

  return undefined
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
import { createS3ColdStorage, encodeWithIntegrityAsync } from '@tracehound/core'

const coldStorage = createS3ColdStorage({
  client: myS3Client,
  bucket: 'my-evidence-bucket',
  prefix: 'prod/evidence/',
})

async function archiveQuarantined(signature) {
  const evidence = th.quarantine.get(signature)
  if (!evidence) return

  const encoded = await encodeWithIntegrityAsync(new Uint8Array(evidence.bytes))
  await coldStorage.write(signature, encoded)
}
`.trimStart()

export const snapshotRuntimeCode = `
import { createTracehound, SYSTEM_SNAPSHOT_ENV } from '@tracehound/core'

const th = createTracehound({
  quarantine: { maxCount: 1000 },
  snapshot: {
    path: process.env[SYSTEM_SNAPSHOT_ENV.PATH]!,
    secret: process.env[SYSTEM_SNAPSHOT_ENV.SECRET]!,
    intervalMs: 1000,
  },
})
`.trimStart()

export const snapshotEnvCode = `
export TRACEHOUND_SYSTEM_SNAPSHOT_PATH=/var/run/tracehound/system-snapshot.json
export TRACEHOUND_SNAPSHOT_SECRET=replace-with-shared-secret
export TRACEHOUND_SNAPSHOT_MAX_AGE_MS=5000
export TRACEHOUND_SNAPSHOT_MAX_FUTURE_SKEW_MS=5000
`.trimStart()
