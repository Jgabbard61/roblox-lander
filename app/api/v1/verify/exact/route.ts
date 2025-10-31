
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { authenticateApiRequest, checkCredits, deductCredits } from '@/lib/api-auth'
import { checkRateLimit, setCooldown } from '@/lib/rate-limit'
import { generateSearchHash, getCachedResult, setCachedResult } from '@/lib/cache'
import crypto from 'crypto'

export const dynamic = "force-dynamic"

// Exact verification schema - precise search
const exactVerifySchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  userId: z.string().optional(), // Roblox user ID if available
  strictMatch: z.boolean().optional().default(true),
  includeProfile: z.boolean().optional().default(true)
})

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const requestId = crypto.randomUUID()
  
  try {
    // Authenticate API request
    const authResult = await authenticateApiRequest(request)
    if (!authResult?.success) {
      return NextResponse.json(
        { 
          error: 'Authentication failed',
          message: authResult?.error
        },
        { 
          status: 401,
          headers: {
            'X-Request-ID': requestId
          }
        }
      )
    }

    const { client } = authResult
    const userId = client?.userId
    const apiClientId = client?.id

    // Validate request body
    const body = await request.json()
    const validationResult = exactVerifySchema.safeParse(body)
    
    if (!validationResult?.success) {
      await logApiUsage({
        apiClientId: apiClientId!,
        endpoint: 'exact_verify',
        requestId,
        creditsUsed: 0,
        wasSuccessful: false,
        wasDuplicate: false,
        responseTime: Date.now() - startTime,
        ipAddress: getClientIP(request),
        userAgent: request.headers.get('user-agent') || undefined,
        errorMessage: 'Validation failed'
      })

      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult?.error?.flatten?.()?.fieldErrors 
        },
        { 
          status: 400,
          headers: {
            'X-Request-ID': requestId
          }
        }
      )
    }

    const { username, userId: robloxUserId, strictMatch, includeProfile } = validationResult?.data

    // Check rate limit (5 seconds cooldown for exact verification)
    const rateLimitResult = await checkRateLimit(userId!, 'exact_verify', 5)
    if (!rateLimitResult?.success) {
      await logApiUsage({
        apiClientId: apiClientId!,
        endpoint: 'exact_verify',
        requestId,
        creditsUsed: 0,
        wasSuccessful: false,
        wasDuplicate: false,
        responseTime: Date.now() - startTime,
        ipAddress: getClientIP(request),
        userAgent: request.headers.get('user-agent') || undefined,
        errorMessage: 'Rate limit exceeded'
      })

      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: rateLimitResult?.error,
          retryAfter: rateLimitResult?.retryAfter
        },
        { 
          status: 429,
          headers: {
            'X-Request-ID': requestId,
            'Retry-After': rateLimitResult?.retryAfter?.toString() || '5',
            'X-RateLimit-Limit': '1',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + (rateLimitResult?.retryAfter || 5) * 1000).toISOString()
          }
        }
      )
    }

    // Generate search hash for caching
    const searchParams = { type: 'exact', username, userId: robloxUserId, strictMatch, includeProfile }
    const searchHash = generateSearchHash(searchParams)

    // Check cache first
    const cachedResult = await getCachedResult(userId!, searchHash)
    if (cachedResult) {
      await logApiUsage({
        apiClientId: apiClientId!,
        endpoint: 'exact_verify',
        requestId,
        creditsUsed: 0,
        wasSuccessful: true,
        wasDuplicate: true,
        responseTime: Date.now() - startTime,
        ipAddress: getClientIP(request),
        userAgent: request.headers.get('user-agent') || undefined
      })

      return NextResponse.json({
        success: true,
        data: cachedResult,
        fromCache: true,
        creditsUsed: 0,
        requestId
      }, {
        headers: {
          'X-Request-ID': requestId,
          'X-Cache': 'HIT'
        }
      })
    }

    // Check credits (100 credits for verification)
    const requiredCredits = 100
    if (!(await checkCredits(userId!, requiredCredits))) {
      await logApiUsage({
        apiClientId: apiClientId!,
        endpoint: 'exact_verify',
        requestId,
        creditsUsed: 0,
        wasSuccessful: false,
        wasDuplicate: false,
        responseTime: Date.now() - startTime,
        ipAddress: getClientIP(request),
        userAgent: request.headers.get('user-agent') || undefined,
        errorMessage: 'Insufficient credits'
      })

      return NextResponse.json(
        { 
          error: 'Insufficient credits',
          message: `This verification requires ${requiredCredits} credits. Please purchase more credits.`,
          requiredCredits,
          currentBalance: client?.user?.credits || 0
        },
        { 
          status: 402,
          headers: {
            'X-Request-ID': requestId
          }
        }
      )
    }

    // Perform exact verification
    const verificationResult = await performExactVerification(username, robloxUserId, strictMatch, includeProfile)

    if (verificationResult?.success) {
      // Deduct credits
      const creditResult = await deductCredits(
        userId!, 
        apiClientId!,
        requiredCredits,
        `Exact verification for ${username}`
      )

      if (!creditResult?.success) {
        throw new Error(creditResult?.error || 'Failed to deduct credits')
      }

      // Cache the result
      await setCachedResult(userId!, searchHash, verificationResult?.data, 30)

      // Set cooldown
      await setCooldown(userId!, 'exact_verify', 5)

      // Log successful usage
      await logApiUsage({
        apiClientId: apiClientId!,
        endpoint: 'exact_verify',
        requestId,
        creditsUsed: requiredCredits,
        wasSuccessful: true,
        wasDuplicate: false,
        responseTime: Date.now() - startTime,
        ipAddress: getClientIP(request),
        userAgent: request.headers.get('user-agent') || undefined
      })

      return NextResponse.json({
        success: true,
        data: verificationResult?.data,
        fromCache: false,
        creditsUsed: requiredCredits,
        currentBalance: creditResult?.newBalance,
        requestId
      }, {
        headers: {
          'X-Request-ID': requestId,
          'X-Cache': 'MISS',
          'X-Credits-Used': requiredCredits.toString(),
          'X-Credits-Remaining': creditResult?.newBalance?.toString() || '0'
        }
      })
    } else {
      // Verification failed - don't charge credits
      await logApiUsage({
        apiClientId: apiClientId!,
        endpoint: 'exact_verify',
        requestId,
        creditsUsed: 0,
        wasSuccessful: false,
        wasDuplicate: false,
        responseTime: Date.now() - startTime,
        ipAddress: getClientIP(request),
        userAgent: request.headers.get('user-agent') || undefined,
        errorMessage: verificationResult?.error || 'Verification failed'
      })

      return NextResponse.json(
        { 
          error: 'User not found',
          message: verificationResult?.error || 'Unable to find exact match for user',
          creditsUsed: 0,
          requestId
        },
        { 
          status: 404,
          headers: {
            'X-Request-ID': requestId
          }
        }
      )
    }

  } catch (error) {
    console.error('Exact verification error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Verification service temporarily unavailable',
        requestId
      },
      { 
        status: 500,
        headers: {
          'X-Request-ID': requestId
        }
      }
    )
  }
}

// Mock exact verification function (replace with actual implementation)
async function performExactVerification(
  username: string, 
  robloxUserId?: string,
  strictMatch: boolean = true,
  includeProfile: boolean = true
): Promise<{ success: boolean; data?: any; error?: string }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 500))
  
  // Simulate random failures for non-existent users
  if (Math.random() < 0.15) {
    return { success: false, error: 'User not found or does not exist' }
  }

  // Mock exact verification with precise data
  const mockData = {
    user: {
      id: robloxUserId || `exact_${Date.now()}`,
      username: username,
      displayName: username,
      joinDate: '2019-03-12T00:00:00Z',
      avatar: `https://i.ytimg.com/vi/8Ea9HlbIBew/maxresdefault.jpg`,
      hasVerifiedBadge: Math.random() > 0.8,
      isOnline: Math.random() > 0.6,
      lastSeen: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      accountAge: Math.floor(Math.random() * 1000) + 100, // days
    },
    verification: {
      exact: true,
      confidence: Math.floor(Math.random() * 20) + 80,
      method: 'direct_api',
      timestamp: new Date().toISOString()
    },
    security: {
      accountSecure: Math.random() > 0.1,
      suspiciousActivity: Math.random() < 0.05,
      recentPasswordChange: Math.random() < 0.2
    }
  }

  if (includeProfile) {
    (mockData as any).profile = {
      description: 'Exact match verified user',
      friendsCount: Math.floor(Math.random() * 2000),
      followingCount: Math.floor(Math.random() * 500),
      followersCount: Math.floor(Math.random() * 3000),
      groupsCount: Math.floor(Math.random() * 50),
      gamesBadgeCount: Math.floor(Math.random() * 100),
      profileViews: Math.floor(Math.random() * 10000)
    }
  }

  return { success: true, data: mockData }
}

// Helper functions
function getClientIP(request: NextRequest): string {
  return request.ip || 
         request.headers.get('x-forwarded-for')?.split(',')[0] ||
         request.headers.get('x-real-ip') ||
         'unknown'
}

async function logApiUsage(log: {
  apiClientId: string
  endpoint: string
  requestId: string
  creditsUsed: number
  wasSuccessful: boolean
  wasDuplicate: boolean
  responseTime: number
  ipAddress?: string
  userAgent?: string
  errorMessage?: string
}) {
  try {
    await prisma.apiUsageLog.create({ data: log })
  } catch (error) {
    console.error('Failed to log API usage:', error)
    // Don't throw - logging failures shouldn't break the API
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Exact verification endpoint. Use POST with username for precise matching.',
      requiredCredits: 100,
      cooldownSeconds: 5,
      documentation: '/api-docs'
    },
    { status: 200 }
  )
}
