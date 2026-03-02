export const ingressHardeningCode = `
import express from 'express'

const app = express()

// Upstream hardening before Tracehound interception
app.use(
  express.json({
    limit: '1mb',
    strict: true,
  }),
)
`.trimStart()

export const detectorContractCode = `
import type { ThreatSignal } from '@tracehound/core'

type DetectorOutput = {
  blocked: boolean
  family?: string
  confidence?: number
}

function toThreatSignal(out: DetectorOutput): ThreatSignal | undefined {
  if (!out.blocked) return undefined

  if (out.family === 'sql-injection') {
    return { category: 'injection', severity: 'high' }
  }
  if ((out.confidence ?? 0) > 0.9) {
    return { category: 'ddos', severity: 'critical' }
  }
  return { category: 'unknown', severity: 'medium' }
}
`.trimStart()

export const failOpenHandlingCode = `
const result = th.agent.intercept(scent)

if (result.status === 'error') {
  // Fail-open policy is an application choice.
  // Recommended: preserve availability and alert operations.
  logger.error(result.error)
  return next()
}
`.trimStart()

export const riskMonitoringCode = `
const watcher = th.watcher.snapshot()
const pool = th.houndPool.stats
const limiter = th.rateLimiter.stats

if (watcher.quarantine.capacityPercent > 85) alert('quarantine pressure')
if (pool.totalTimeouts > timeoutBaseline) alert('worker timeout spike')
if (limiter.totalRejections > rejectionBaseline * 3) alert('rate anomaly')
`.trimStart()
