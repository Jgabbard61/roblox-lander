
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { authenticateApiRequest } from '@/lib/api-auth'

export const dynamic = "force-dynamic"

const usageQuerySchema = z.object({
  page: z.string().transform(val => parseInt(val, 10)).refine(val => val > 0).optional().default('1'),
  limit: z.string().transform(val => parseInt(val, 10)).refine(val => val > 0 && val <= 100).optional().default('20'),
  endpoint: z.enum(['smart_verify', 'exact_verify', 'all']).optional().default('all'),
  success: z.enum(['true', 'false', 'all']).optional().default('all'),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional()
})

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
    const apiClientId = client?.id

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const queryParamsObject = Object.fromEntries(searchParams)
    
    const validationResult = usageQuerySchema.safeParse(queryParamsObject)
    
    if (!validationResult?.success) {
      return NextResponse.json(
        { 
          error: 'Invalid query parameters', 
          details: validationResult?.error?.flatten?.()?.fieldErrors 
        },
        { status: 400 }
      )
    }

    const { page, limit, endpoint, success, dateFrom, dateTo } = validationResult?.data

    // Build filters
    const whereClause: any = {
      apiClientId
    }

    if (endpoint !== 'all') {
      whereClause.endpoint = endpoint
    }

    if (success !== 'all') {
      whereClause.wasSuccessful = success === 'true'
    }

    if (dateFrom || dateTo) {
      whereClause.createdAt = {}
      if (dateFrom) {
        whereClause.createdAt.gte = new Date(dateFrom)
      }
      if (dateTo) {
        whereClause.createdAt.lte = new Date(dateTo)
      }
    }

    // Get total count for pagination
    const totalCount = await prisma.apiUsageLog.count({
      where: whereClause
    })

    const totalPages = Math.ceil(totalCount / limit)
    const offset = (page - 1) * limit

    // Get usage logs
    const usageLogs = await prisma.apiUsageLog.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
      select: {
        id: true,
        endpoint: true,
        requestId: true,
        creditsUsed: true,
        wasSuccessful: true,
        wasDuplicate: true,
        responseTime: true,
        ipAddress: true,
        userAgent: true,
        errorMessage: true,
        createdAt: true
      }
    })

    // Get summary statistics for the filtered period
    const summaryStats = await prisma.apiUsageLog.aggregate({
      where: whereClause,
      _count: {
        id: true
      },
      _sum: {
        creditsUsed: true,
        responseTime: true
      },
      _avg: {
        responseTime: true
      }
    })

    const successfulCount = await prisma.apiUsageLog.count({
      where: {
        ...whereClause,
        wasSuccessful: true
      }
    })

    const duplicateCount = await prisma.apiUsageLog.count({
      where: {
        ...whereClause,
        wasDuplicate: true
      }
    })

    // Endpoint breakdown
    const endpointStats = await prisma.apiUsageLog.groupBy({
      by: ['endpoint'],
      where: whereClause,
      _count: {
        id: true
      },
      _sum: {
        creditsUsed: true
      }
    })

    const summary = {
      totalRequests: summaryStats?._count?.id || 0,
      successfulRequests: successfulCount,
      duplicateRequests: duplicateCount,
      totalCreditsUsed: summaryStats?._sum?.creditsUsed || 0,
      totalResponseTime: summaryStats?._sum?.responseTime || 0,
      averageResponseTime: Math.round(summaryStats?._avg?.responseTime || 0),
      successRate: summaryStats?._count?.id ? 
        Math.round((successfulCount / summaryStats?._count?.id) * 100) : 0,
      duplicateRate: summaryStats?._count?.id ?
        Math.round((duplicateCount / summaryStats?._count?.id) * 100) : 0,
      endpointBreakdown: endpointStats?.map(stat => ({
        endpoint: stat?.endpoint,
        requests: stat?._count?.id,
        creditsUsed: stat?._sum?.creditsUsed || 0
      })) || []
    }

    const pagination = {
      currentPage: page,
      totalPages,
      totalCount,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }

    return NextResponse.json({
      success: true,
      data: {
        logs: usageLogs,
        summary,
        pagination
      }
    })

  } catch (error) {
    console.error('Usage retrieval error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Unable to retrieve usage information'
      },
      { status: 500 }
    )
  }
}
