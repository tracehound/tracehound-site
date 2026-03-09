export const interceptLatencyHarnessCode = `
import { createTracehound, generateSecureId } from '@tracehound/core'

const th = createTracehound()

const scent = {
  id: generateSecureId(),
  timestamp: Date.now(),
  source: { ip: '203.0.113.1' },
  payload: { method: 'GET', path: '/health' },
}

const N = 10000
const durations: number[] = []

for (let i = 0; i < N; i++) {
  const start = performance.now()
  th.agent.intercept(scent)
  durations.push(performance.now() - start)
}

durations.sort((a, b) => a - b)
const p50 = durations[Math.floor(N * 0.5)]
const p99 = durations[Math.floor(N * 0.99)]
console.log({ p50, p99 })
`.trimStart()

export const tuningProfileCode = `
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
  houndPool: {
    poolSize: 4,
    timeout: 30_000,
    onPoolExhausted: 'defer',
  },
})
`.trimStart()

export const pressureSignalsCode = `
const watcher = th.watcher.snapshot()
const pool = th.houndPool.stats
const limiter = th.rateLimiter.stats

console.log({
  quarantineCapacityPercent: watcher.quarantine.capacityPercent,
  watcherOverloaded: watcher.overloaded,
  totalTimeouts: pool.totalTimeouts,
  totalErrors: pool.totalErrors,
  rateLimitRejections: limiter.totalRejections,
})
`.trimStart()
