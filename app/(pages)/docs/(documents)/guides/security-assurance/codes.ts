export const chaosSuiteCode = `
# Recommended (pnpm workspace root)
pnpm test:chaos

# Alternative
npm run test:chaos
`.trimStart()

export const panicMonitoringCode = `
const th = createTracehound()

th.notifications.on('system.panic', (event) => {
  // Event payload includes level + reason
  console.error('[system.panic]', event.payload.level, event.payload.reason)
})

setInterval(() => {
  const snapshot = th.watcher.snapshot()
  console.log({
    threats: snapshot.threats.total,
    quarantineCapacityPercent: snapshot.quarantine.capacityPercent,
    overloaded: snapshot.overloaded,
    lastAlertType: snapshot.lastAlert?.type,
  })
}, 5000)
`.trimStart()

export const upstreamHardeningCode = `
import express from 'express'

const app = express()

// Upstream parser limits should be set before Tracehound middleware.
app.use(
  express.json({
    limit: '1mb',
    strict: true,
  }),
)
`.trimStart()

export const secOpsChecklistCode = `
// Example operational checks (pseudo code)
if (watcherSnapshot.quarantine.capacityPercent > 85) alert('quarantine pressure')
if (houndPoolStats.totalTimeouts > timeoutThreshold) alert('worker timeout spike')
if (rateLimiterStats.totalRejections > rejectionBaseline * 3) alert('rate anomaly')
if (!auditChain.verify()) alert('audit chain integrity failure')
`.trimStart()
