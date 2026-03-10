export const coreUsage = `
import { createTracehound, generateSecureId } from '@tracehound/core'

const tracehound = createTracehound({
  quarantine: { maxCount: 1000, maxBytes: 100_000_000 },
  rateLimit: { windowMs: 60_000, maxRequests: 100 },
})

const result = tracehound.agent.intercept({
  id: generateSecureId(),
  timestamp: Date.now(),
  source: { ip: '127.0.0.1' },
  payload: { path: '/api/v1/user', method: 'POST' },
  threat: { category: 'unknown', severity: 'medium' },
})

if (result.status === 'quarantined') {
  console.log('Threat quarantined. Signature:', result.handle.signature)
  console.log('Runtime membrane:', result.handle.membrane)
}

tracehound.shutdown()
`.trimStart()

export const expressIntegration = `
import { Buffer } from 'node:buffer'
import express from 'express'
import { createTracehound } from '@tracehound/core'
import { tracehound } from '@tracehound/express'

const app = express()
const th = createTracehound()

app.use(
  express.json({
    verify: (req, _res, buf) => {
      Reflect.set(req, 'rawBody', Buffer.from(buf))
    },
  }),
)

app.use(tracehound({ agent: th.agent }))

app.get('/', (_req, res) => res.send('Protected by Tracehound'))
`.trimStart()

export const fastifyIntegration = `
import fastify from 'fastify'
import { createTracehound } from '@tracehound/core'
import { tracehoundPlugin } from '@tracehound/fastify'

const app = fastify()
const th = createTracehound()

app.register(tracehoundPlugin, { agent: th.agent })
`.trimStart()
