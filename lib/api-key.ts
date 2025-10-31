
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

/**
 * Generate a secure API key with the format: vl_live_abc123...
 */
export function generateApiKey(): string {
  const randomBytes = crypto.randomBytes(32)
  const randomString = randomBytes.toString('hex')
  return `vl_live_${randomString}`
}

/**
 * Hash an API key using bcrypt
 */
export async function hashApiKey(apiKey: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(apiKey, saltRounds)
}

/**
 * Verify an API key against a hash
 */
export async function verifyApiKey(apiKey: string, hash: string): Promise<boolean> {
  return bcrypt.compare(apiKey, hash)
}

/**
 * Mask an API key for display (show only first 8 chars + stars)
 */
export function maskApiKey(apiKey: string): string {
  if (apiKey?.length <= 8) return apiKey
  return `${apiKey?.slice(0, 8)}${'*'.repeat(Math.max(12, apiKey?.length - 8))}`
}
