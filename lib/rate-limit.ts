
import redis from '@/lib/redis'

export interface RateLimitResult {
  success: boolean
  retryAfter?: number
  error?: string
}

/**
 * Check and enforce rate limits for API endpoints
 */
export async function checkRateLimit(
  userId: string, 
  endpoint: string, 
  cooldownSeconds: number
): Promise<RateLimitResult> {
  try {
    const key = `cooldown:${userId}:${endpoint}`
    const lastRequest = await redis.get(key)
    
    if (lastRequest) {
      const lastRequestTime = parseInt(lastRequest, 10)
      const now = Math.floor(Date.now() / 1000)
      const timeDiff = now - lastRequestTime
      
      if (timeDiff < cooldownSeconds) {
        const retryAfter = cooldownSeconds - timeDiff
        return {
          success: false,
          retryAfter,
          error: `Rate limit exceeded. Retry after ${retryAfter} seconds.`
        }
      }
    }
    
    return { success: true }
  } catch (error) {
    console.error('Rate limit check error:', error)
    // If Redis fails, allow the request to proceed
    return { success: true }
  }
}

/**
 * Set cooldown after successful API request
 */
export async function setCooldown(
  userId: string, 
  endpoint: string, 
  cooldownSeconds: number
): Promise<void> {
  try {
    const key = `cooldown:${userId}:${endpoint}`
    const now = Math.floor(Date.now() / 1000)
    await redis.setex(key, cooldownSeconds, now.toString())
  } catch (error) {
    console.error('Set cooldown error:', error)
    // Non-critical error, don't throw
  }
}

/**
 * Get remaining cooldown time
 */
export async function getRemainingCooldown(
  userId: string, 
  endpoint: string, 
  cooldownSeconds: number
): Promise<number> {
  try {
    const key = `cooldown:${userId}:${endpoint}`
    const lastRequest = await redis.get(key)
    
    if (!lastRequest) return 0
    
    const lastRequestTime = parseInt(lastRequest, 10)
    const now = Math.floor(Date.now() / 1000)
    const timeDiff = now - lastRequestTime
    
    return Math.max(0, cooldownSeconds - timeDiff)
  } catch (error) {
    console.error('Get remaining cooldown error:', error)
    return 0
  }
}
