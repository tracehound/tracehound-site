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

export const operatorSignalsCode = `
th.notifications.on('system.panic', (event) => {
  logger.warn('tracehound_panic', {
    level: event.payload.level,
    reason: event.payload.reason,
  })
})

const watcher = th.watcher.snapshot()
console.log({
  overloaded: watcher.overloaded,
  alertsInWindow: watcher.alertsInWindow,
})
`.trimStart()
