export const s3AdapterCode = `
import { createS3ColdStorage } from '@tracehound/core'
import type { S3LikeClient } from '@tracehound/core'

const client: S3LikeClient = {
  putObject: async (params) => {
    // SDK call
  },
  getObject: async (params) => {
    // SDK call
    return { Body: new Uint8Array() }
  },
  deleteObject: async (params) => {
    // SDK call
  },
  headBucket: async (params) => {
    // SDK call
  },
}

const coldStorage = createS3ColdStorage({
  client,
  bucket: 'tracehound-evidence',
  prefix: 'prod/evidence/',
})
`.trimStart()

export const integrityWriteCode = `
import { encodeWithIntegrityAsync } from '@tracehound/core'

const bytes = new Uint8Array(evidenceHandle.bytes)
const encoded = await encodeWithIntegrityAsync(bytes)
const write = await coldStorage.write(evidenceHandle.signature, encoded)

if (!write.success) {
  logger.error('cold storage write failed', write.error)
}
`.trimStart()

export const integrityReadCode = `
import { decodeWithIntegrityAsync, verify } from '@tracehound/core'

const read = await coldStorage.read(signature)
if (!read.success || !read.payload) {
  throw new Error('evidence not readable from cold storage')
}

if (!verify(read.payload)) {
  throw new Error('integrity verification failed')
}

const originalBytes = await decodeWithIntegrityAsync(read.payload)
`.trimStart()

export const leastPrivilegePolicyCode = `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::tracehound-evidence/*"
    }
  ]
}
`.trimStart()

export const availabilityCheckCode = `
const available = await coldStorage.isAvailable()
if (!available) {
  alertOps('cold storage unavailable')
}
`.trimStart()
