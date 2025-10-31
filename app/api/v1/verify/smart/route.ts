
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { authenticateApiRequest, checkCredits, deductCredits } from '@/lib/api-auth'
import { checkRateLimit, setCooldown } from '@/lib/rate-limit'
import { generateSearchHash, getCachedResult, setCachedResult } from '@/lib/cache'
import crypto from 'crypto'

export const dynamic = "force-dynamic"

// Smart verification schema - flexible search
const smartVerifySchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  filters: z.object({
    minAge: z.number().min(0).max(20).optional(),
    maxAge: z.number().min(0).max(20).optional(),
    hasAvatar: z.boolean().optional(),
    hasDescription: z.boolean().optional(),
    minFriends: z.number().min(0).optional(),
    verifiedBadge: z.boolean().optional()
  }).optional().default({}),
  includeHistory: z.boolean().optional().default(false)
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
    const validationResult = smartVerifySchema.safeParse(body)
    
    if (!validationResult?.success) {
      await logApiUsage({
        apiClientId: apiClientId!,
        endpoint: 'smart_verify',
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

    const { username, filters, includeHistory } = validationResult?.data

    // Check rate limit (30 seconds cooldown for smart verification)
    const rateLimitResult = await checkRateLimit(userId!, 'smart_verify', 30)
    if (!rateLimitResult?.success) {
      await logApiUsage({
        apiClientId: apiClientId!,
        endpoint: 'smart_verify',
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
            'Retry-After': rateLimitResult?.retryAfter?.toString() || '30',
            'X-RateLimit-Limit': '1',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + (rateLimitResult?.retryAfter || 30) * 1000).toISOString()
          }
        }
      )
    }

    // Generate search hash for caching
    const searchParams = { type: 'smart', username, filters, includeHistory }
    const searchHash = generateSearchHash(searchParams)

    // Check cache first
    const cachedResult = await getCachedResult(userId!, searchHash)
    if (cachedResult) {
      await logApiUsage({
        apiClientId: apiClientId!,
        endpoint: 'smart_verify',
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
        endpoint: 'smart_verify',
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

    // Perform smart verification (mock implementation)
    const verificationResult = await performSmartVerification(username, filters, includeHistory)

    if (verificationResult?.success) {
      // Deduct credits
      const creditResult = await deductCredits(
        userId!, 
        apiClientId!,
        requiredCredits,
        `Smart verification for ${username}`
      )

      if (!creditResult?.success) {
        throw new Error(creditResult?.error || 'Failed to deduct credits')
      }

      // Cache the result
      await setCachedResult(userId!, searchHash, verificationResult?.data, 30)

      // Set cooldown
      await setCooldown(userId!, 'smart_verify', 30)

      // Log successful usage
      await logApiUsage({
        apiClientId: apiClientId!,
        endpoint: 'smart_verify',
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
        endpoint: 'smart_verify',
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
          error: 'Verification failed',
          message: verificationResult?.error || 'Unable to verify user',
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
    console.error('Smart verification error:', error)
    
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

// Mock smart verification function (replace with actual implementation)
async function performSmartVerification(
  username: string, 
  filters: any, 
  includeHistory: boolean
): Promise<{ success: boolean; data?: any; error?: string }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
  
  // Mock successful verification with realistic data
  const mockData = {
    user: {
      id: `mock_${Date.now()}`,
      username: username,
      displayName: username,
      joinDate: '2020-06-15T00:00:00Z',
      avatar: `https://i.ytimg.com/vi/_YLG2UmHzOs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDoIdVF-DZYCiR6UGf7Hudmymzw-A`,
      description: 'Verified Roblox user',
      friendsCount: Math.floor(Math.random() * 1000),
      followersCount: Math.floor(Math.random() * 5000),
      verified: Math.random() > 0.7,
      age: Math.floor(Math.random() * 10) + 8,
      lastOnline: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    verificationScore: Math.floor(Math.random() * 40) + 60,
    flags: {
      suspiciousActivity: Math.random() < 0.1,
      recentlyCreated: Math.random() < 0.2,
      hasValidAvatar: Math.random() > 0.3
    }
  }

  if (includeHistory) {
    mockData.user = {
      ...mockData.user,
      // Add mock history data
      gameHistory: [
        { gameName: 'Adopt Me!', lastPlayed: '2024-10-30T12:00:00Z' },
        { gameName: 'Brookhaven', lastPlayed: '2024-10-29T15:30:00Z' }
      ]
    }
  }

  // Apply filters
  if (filters?.minAge && mockData?.user?.age < filters?.minAge) {
    return { success: false, error: 'User does not meet minimum age requirement' }
  }
  
  if (filters?.verifiedBadge && !mockData?.user?.verified) {
    return { success: false, error: 'User does not have verified badge' }
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
      message: 'Smart verification endpoint. Use POST with username and optional filters.',
      requiredCredits: 100,
      cooldownSeconds: 30,
      documentation: '/api-docs'
    },
    { status: 200 }
  )
}
