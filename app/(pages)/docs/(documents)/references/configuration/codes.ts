export const createTracehoundExampleCode = `
import { createTracehound } from '@tracehound/core'

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
  watcher: {
    maxAlertsPerWindow: 10,
    alertWindowMs: 60_000,
    quarantineHighWatermark: 0.8,
  },
  houndPool: {
    poolSize: 4,
    timeout: 30_000,
    rotationJitterMs: 1000,
    onPoolExhausted: 'defer',
    deferQueueLimit: 100,
  },
})
`.trimStart()

export const tracehoundOptionsInterfaceCode = `
interface TracehoundOptions {
  maxPayloadSize?: number

  quarantine?: {
    maxCount?: number
    maxBytes?: number
  }

  rateLimit?: {
    windowMs?: number
    maxRequests?: number
    blockDurationMs?: number
  }

  watcher?: {
    maxAlertsPerWindow?: number
    alertWindowMs?: number
    quarantineHighWatermark?: number
  }

  houndPool?: {
    poolSize?: number
    timeout?: number
    rotationJitterMs?: number
    onPoolExhausted?: 'drop' | 'escalate' | 'defer'
    deferQueueLimit?: number
    processConstraints?: {
      maxMemoryMB?: number
      networkAccess?: false
      fileSystemWrite?: false
      childSpawn?: false
    }
  }
}
`.trimStart()

export const envMappingCode = `
import { createTracehound } from '@tracehound/core'

const th = createTracehound({
  maxPayloadSize: Number(process.env.TRACEHOUND_MAX_PAYLOAD_SIZE ?? 1_000_000),
  quarantine: {
    maxCount: Number(process.env.TRACEHOUND_QUARANTINE_MAX_COUNT ?? 10_000),
    maxBytes: Number(process.env.TRACEHOUND_QUARANTINE_MAX_BYTES ?? 100_000_000),
  },
  rateLimit: {
    windowMs: Number(process.env.TRACEHOUND_RATE_LIMIT_WINDOW_MS ?? 60_000),
    maxRequests: Number(process.env.TRACEHOUND_RATE_LIMIT_MAX_REQUESTS ?? 100),
    blockDurationMs: Number(process.env.TRACEHOUND_RATE_LIMIT_BLOCK_MS ?? 300_000),
  },
  watcher: {
    maxAlertsPerWindow: Number(process.env.TRACEHOUND_WATCHER_MAX_ALERTS ?? 10),
    alertWindowMs: Number(process.env.TRACEHOUND_WATCHER_WINDOW_MS ?? 60_000),
    quarantineHighWatermark: Number(process.env.TRACEHOUND_WATCHER_HIGH_WATERMARK ?? 0.8),
  },
  houndPool: {
    poolSize: Number(process.env.TRACEHOUND_HOUND_POOL_SIZE ?? 4),
    timeout: Number(process.env.TRACEHOUND_HOUND_TIMEOUT_MS ?? 30_000),
    rotationJitterMs: Number(process.env.TRACEHOUND_HOUND_JITTER_MS ?? 1000),
    onPoolExhausted:
      (process.env.TRACEHOUND_HOUND_EXHAUSTED as 'drop' | 'escalate' | 'defer') ?? 'defer',
    deferQueueLimit: Number(process.env.TRACEHOUND_HOUND_DEFER_LIMIT ?? 100),
  },
})
`.trimStart()
