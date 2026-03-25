export const createTracehoundExampleCode = `
import { createTracehound, SYSTEM_SNAPSHOT_ENV } from '@tracehound/core'

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
  snapshot: {
    path: '/var/run/tracehound/system-snapshot.json',
    secret: process.env[SYSTEM_SNAPSHOT_ENV.SECRET],
    intervalMs: 1000,
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

  snapshot?: {
    path: string
    secret?: string
    intervalMs?: number
  }
}
`.trimStart()

export const envMappingCode = `
import { createTracehound, SYSTEM_SNAPSHOT_ENV } from '@tracehound/core'

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
  snapshot:
    process.env[SYSTEM_SNAPSHOT_ENV.PATH] && process.env[SYSTEM_SNAPSHOT_ENV.SECRET]
      ? {
          path: process.env[SYSTEM_SNAPSHOT_ENV.PATH],
          secret: process.env[SYSTEM_SNAPSHOT_ENV.SECRET],
          intervalMs: Number(process.env.TRACEHOUND_SNAPSHOT_INTERVAL_MS ?? 1000),
        }
      : undefined,
})
`.trimStart()

export const adapterOptionsInterfaceCode = `
// Shared by @tracehound/express (TracehoundMiddlewareOptions)
// and @tracehound/fastify (TracehoundPluginOptions)
interface AdapterOptions {
  // Required: agent instance from createTracehound()
  agent: IAgent

  // Body clone guard. Should match the agent's maxPayloadSize.
  // When Content-Length exceeds this value, body clone is skipped to
  // prevent memory amplification before agent rejection.
  // ingressBytes (rawBody) is still captured for signature computation.
  maxPayloadSize?: number

  // Custom IP resolver.
  // SECURITY: req.ip follows the framework's trust proxy setting.
  // If misconfigured behind a CDN/LB, X-Forwarded-For spoofing can
  // bypass rate limiting. Override to use a trusted source.
  resolveSourceIp?: (req: Request) => string

  // Include evidence signature in HTTP 403 body.
  // false by default — prevents correlation attacks.
  emitSignatureInResponse?: boolean

  // Emit x-tracehound-trace-id on quarantined responses.
  // false by default — disable in privacy-sensitive environments.
  emitTraceIdHeader?: boolean

  // Override full scent extraction. When set, maxPayloadSize and
  // resolveSourceIp are ignored (custom function takes full responsibility).
  extractScent?: (req: Request) => Scent

  // Override HTTP response logic for non-clean intercept results.
  onIntercept?: (result: InterceptResult, req: Request, res: Response) => void
}
`.trimStart()

export const adapterOptionsExampleCode = `
import { tracehound } from '@tracehound/express'
import { createTracehound } from '@tracehound/core'

const th = createTracehound({ maxPayloadSize: 1_000_000 })

app.use(
  tracehound({
    agent: th.agent,

    // Match agent maxPayloadSize to prevent memory amplification
    // from body cloning before the agent rejects oversized requests.
    maxPayloadSize: 1_000_000,

    // Use direct connection IP instead of X-Forwarded-For to prevent
    // rate-limit bypass via IP spoofing (relevant behind CDN/LB).
    resolveSourceIp: (req) => req.socket.remoteAddress ?? 'unknown',
  }),
)
`.trimStart()

export const snapshotEnvKeysCode = `
import { SYSTEM_SNAPSHOT_ENV } from '@tracehound/core'

process.env[SYSTEM_SNAPSHOT_ENV.PATH] = '/var/run/tracehound/system-snapshot.json'
process.env[SYSTEM_SNAPSHOT_ENV.SECRET] = 'replace-with-shared-secret'
process.env[SYSTEM_SNAPSHOT_ENV.MAX_AGE_MS] = '5000'
process.env[SYSTEM_SNAPSHOT_ENV.MAX_FUTURE_SKEW_MS] = '5000'
`.trimStart()
