
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { authenticateApiRequest } from '@/lib/api-auth'
import { getRemainingCooldown } from '@/lib/rate-limit'

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    // Authenticate API request
    const authResult = await authenticateApiRequest(request)
    if (!authResult?.success) {
      return NextResponse.json(
        { 
          error: 'Authentication failed',
          message: authResult?.error
        },
        { status: 401 }
      )
    }

    const { client } = authResult
    const userId = client?.userId

    // Get user with additional account info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        companyName: true,
        credits: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get API client info
    const apiClient = await prisma.apiClient.findUnique({
      where: { userId },
      select: {
        id: true,
        isActive: true,
        lastUsedAt: true,
        createdAt: true
      }
    })

    // Get usage statistics for the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const usageStats = await prisma.apiUsageLog.aggregate({
      where: {
        apiClientId: apiClient?.id,
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      _count: {
        id: true
      },
      _sum: {
        creditsUsed: true
      }
    })

    const successfulRequests = await prisma.apiUsageLog.count({
      where: {
        apiClientId: apiClient?.id,
        wasSuccessful: true,
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    })

    const duplicateRequests = await prisma.apiUsageLog.count({
      where: {
        apiClientId: apiClient?.id,
        wasDuplicate: true,
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    })

    // Get remaining cooldowns
    const smartCooldown = await getRemainingCooldown(userId!, 'smart_verify', 30)
    const exactCooldown = await getRemainingCooldown(userId!, 'exact_verify', 5)

    // Get recent transactions
    const recentTransactions = await prisma.apiTransaction.findMany({
      where: { apiClientId: apiClient?.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        type: true,
        amount: true,
        creditsChanged: true,
        balanceAfter: true,
        description: true,
        createdAt: true
      }
    })

    const accountData = {
      user: {
        id: user?.id,
        email: user?.email,
        name: user?.name,
        companyName: user?.companyName,
        credits: user?.credits,
        isActive: user?.isActive,
        memberSince: user?.createdAt
      },
      apiAccess: {
        clientId: apiClient?.id,
        isActive: apiClient?.isActive,
        lastUsed: apiClient?.lastUsedAt,
        createdAt: apiClient?.createdAt
      },
      usage: {
        last30Days: {
          totalRequests: usageStats?._count?.id || 0,
          successfulRequests,
          duplicateRequests,
          totalCreditsUsed: usageStats?._sum?.creditsUsed || 0,
          successRate: usageStats?._count?.id ? 
            Math.round((successfulRequests / usageStats?._count?.id) * 100) : 0
        }
      },
      rateLimits: {
        smartVerify: {
          cooldownSeconds: 30,
          remainingCooldown: smartCooldown
        },
        exactVerify: {
          cooldownSeconds: 5,
          remainingCooldown: exactCooldown
        }
      },
      recentTransactions
    }

    return NextResponse.json({
      success: true,
      data: accountData
    })

  } catch (error) {
    console.error('Account info error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Unable to retrieve account information'
      },
      { status: 500 }
    )
  }
}
