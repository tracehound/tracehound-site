export const interceptHandlingCode = `
const result = th.agent.intercept(scent)

switch (result.status) {
  case 'clean':
  case 'quarantined':
  case 'ignored':
  case 'rate_limited':
  case 'payload_too_large':
    // Normal typed outcomes
    break

  case 'error':
    // Recommended fail-open handling:
    // keep request path alive, log and alert
    logger.error('tracehound_error', result.error)
    next()
    break
}
`.trimStart()

export const antiPatternCode = `
// Anti-pattern: turning Tracehound errors into hard 500 blocks
if (result.status === 'error') {
  return res.status(500).json({ error: 'Security subsystem failed' })
}
`.trimStart()

export const failSafeUsageCode = `
import { createFailSafe } from '@tracehound/core'

const failSafe = createFailSafe({
  memory: { warning: 0.7, critical: 0.85, emergency: 0.95 },
  quarantine: { warning: 0.7, critical: 0.85, emergency: 0.95 },
  errorRate: { warning: 10, critical: 50, emergency: 100 },
})

failSafe.on('warning', (event) => {
  logger.warn('failsafe_warning', event)
})

failSafe.on('critical', (event) => {
  alertOps('failsafe_critical', event)
})

failSafe.on('emergency', (event) => {
  alertOps('failsafe_emergency', event)
  // Optional: emergency containment action
  // quarantine.flush()
})
`.trimStart()
