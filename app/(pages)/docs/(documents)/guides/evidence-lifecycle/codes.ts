export const interceptLifecycleCode = `
const result = th.agent.intercept(scent)

if (result.status === 'quarantined') {
  // Evidence is now in quarantine and tracked by signature
  console.log(result.handle.signature)
}
`.trimStart()

export const quarantineOpsCode = `
const q = th.quarantine

// Inspect
const stats = q.stats
console.log(stats.count, stats.bytes, stats.bySeverity)

// Lookup
const found = q.get('signature-value')
const exists = q.has('signature-value')

// Lifecycle actions
q.neutralize('signature-value') // remove + append neutralization record
q.purge('signature-value', 'abort') // explicit purge reason
q.flush() // neutralize all stored evidence
`.trimStart()

export const purgeReasonsCode = `
// Valid purge reasons in current core API:
q.purge(signature, 'timeout')
q.purge(signature, 'error')
q.purge(signature, 'abort')
q.purge(signature, 'panic')
`.trimStart()

export const archivePatternCode = `
import { createS3ColdStorage, encodeWithIntegrityAsync } from '@tracehound/core'

const storage = createS3ColdStorage({
  client: myS3LikeClient,
  bucket: 'tracehound-evidence',
  prefix: 'prod/evidence/',
})

if (result.status === 'quarantined') {
  // Copy bytes without transferring ownership from quarantine
  const bytes = new Uint8Array(result.handle.bytes)
  const encoded = await encodeWithIntegrityAsync(bytes)
  await storage.write(result.handle.signature, encoded)
}
`.trimStart()

export const policyChecklistCode = `
const snapshot = {
  quarantineCount: th.quarantine.stats.count,
  quarantineBytes: th.quarantine.stats.bytes,
  auditChainLength: th.auditChain.length,
  auditChainValid: th.auditChain.verify(),
}

console.log(snapshot)
`.trimStart()
