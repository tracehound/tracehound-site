export const interceptLifecycleCode = `
const result = th.agent.intercept(scent)

if (result.status === 'quarantined') {
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
q.neutralize('signature-value')
q.purge('signature-value', 'abort')
q.flush()
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
  const evidence = th.quarantine.get(result.handle.signature)
  if (!evidence) throw new Error('Quarantine lookup failed')

  const encoded = await encodeWithIntegrityAsync(new Uint8Array(evidence.bytes))
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
