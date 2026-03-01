export const coreUsage = `
import { createTracehound, generateSecureId } from '@tracehound/core'

const tracehound = createTracehound({
  quarantine: { maxCount: 1000 },
  rateLimit: { windowMs: 60000, maxRequests: 100 },
})

// Intercept a potential threat signal (Scent)
const result = tracehound.agent.intercept({
  id: generateSecureId(), // or you can use your own
  timestamp: Date.now(),
  source: '127.0.0.1',
  payload: { path: '/api/v1/user', method: 'POST' },
})

if (result.status === 'quarantined') {
  console.log('Threat quarantined. Signature:', result.handle.signature)
}
`.trimStart()

export const expressIntegration = `
import express from 'express'
import { createTracehound } from '@tracehound/core'
import { tracehound } from '@tracehound/express'

const app = express()
const th = createTracehound()

// Mount the middleware
app.use(tracehound({ agent: th.agent }))

app.get('/', (req, res) => res.send('Protected by Tracehound'))
`.trimStart()

export const fastifyIntegration = `
import fastify from 'fastify'
import { createTracehound } from '@tracehound/core'
import { tracehoundPlugin } from '@tracehound/fastify'

const app = fastify()
const th = createTracehound()

app.register(tracehoundPlugin, { agent: th.agent })
`.trimStart()
