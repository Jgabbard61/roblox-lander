
import crypto from 'crypto'
import { prisma } from '@/lib/db'

/**
 * Generate cache hash from search parameters
 */
export function generateSearchHash(params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result, key) => {
      result[key] = params[key]
      return result
    }, {} as Record<string, any>)
  
  const paramString = JSON.stringify(sortedParams)
  return crypto.createHash('sha256').update(paramString).digest('hex')
}

/**
 * Check cache for existing search results
 */
export async function getCachedResult(
  userId: string,
  searchHash: string
): Promise<any | null> {
  try {
    const cached = await prisma.verificationCache.findFirst({
      where: {
        userId,
        searchHash,
        expiresAt: {
          gt: new Date()
        }
      }
    })
    
    return cached?.resultData || null
  } catch (error) {
    console.error('Cache retrieval error:', error)
    return null
  }
}

/**
 * Store search results in cache
 */
export async function setCachedResult(
  userId: string,
  searchHash: string,
  resultData: any,
  ttlDays: number = 30
): Promise<void> {
  try {
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + ttlDays)
    
    await prisma.verificationCache.upsert({
      where: {
        searchHash
      },
      update: {
        resultData,
        expiresAt
      },
      create: {
        userId,
        searchHash,
        resultData,
        expiresAt
      }
    })
  } catch (error) {
    console.error('Cache storage error:', error)
    // Non-critical error, don't throw
  }
}

/**
 * Clean expired cache entries
 */
export async function cleanExpiredCache(): Promise<void> {
  try {
    await prisma.verificationCache.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    })
  } catch (error) {
    console.error('Cache cleanup error:', error)
  }
}
