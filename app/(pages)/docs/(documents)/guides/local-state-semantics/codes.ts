export const localInstancesCode = `
import { createTracehound } from '@tracehound/core'

const a = createTracehound()
const b = createTracehound()
const source = { ip: '198.51.100.10', userAgent: 'curl/8.7.1' }

// Same source evaluated independently on each instance
a.rateLimiter.check(source)
b.rateLimiter.check(source)
`.trimStart()

export const duplicateScopeCode = `
// Duplicate detection is local to each instance
const resultA = a.agent.intercept(scent)
const resultB = b.agent.intercept(scent)

// Both can quarantine the same signature independently
`.trimStart()

export const aggregationPatternCode = `
import { createS3ColdStorage, encodeWithIntegrityAsync } from '@tracehound/core'

const archive = createS3ColdStorage({
  client: myS3Client,
  bucket: 'tracehound-evidence',
  prefix: 'cluster-a/',
})

if (result.status === 'quarantined') {
  const evidence = a.quarantine.get(result.handle.signature)
  if (!evidence) throw new Error('Quarantine lookup failed')

  const encoded = await encodeWithIntegrityAsync(new Uint8Array(evidence.bytes))
  await archive.write(result.handle.signature, encoded)
}
`.trimStart()

export const monitoringSnapshotCode = `
const snapshot = th.watcher.snapshot()
const limiter = th.rateLimiter.stats

console.log({
  threats: snapshot.threats.total,
  quarantineCount: snapshot.quarantine.count,
  blockedSources: limiter.blocked,
  trackedSources: limiter.sources,
})
`.trimStart()
