
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyApiKey } from '@/lib/api-key'
import { User, ApiClient } from '@prisma/client'

export interface AuthenticatedApiClient extends ApiClient {
  user: User
}

/**
 * Authenticate API requests using API key
 */
export async function authenticateApiRequest(
  request: NextRequest
): Promise<{ success: boolean; client?: AuthenticatedApiClient; error?: string }> {
  try {
    const apiKey = request.headers.get('X-API-Key') || request.headers.get('x-api-key')
    
    if (!apiKey) {
      return { success: false, error: 'Missing API key. Include X-API-Key header.' }
    }

    if (!apiKey?.startsWith('vl_live_')) {
      return { success: false, error: 'Invalid API key format. Keys must start with vl_live_' }
    }

    // Find API client by key prefix (we'll verify the full key with bcrypt)
    const keyPrefix = apiKey?.slice(0, 16) // vl_live_ + first 8 chars
    const apiClients = await prisma.apiClient.findMany({
      where: {
        apiKey: {
          startsWith: keyPrefix
        },
        isActive: true
      },
      include: {
        user: true
      }
    })

    // Verify the full API key against stored hashes
    for (const client of apiClients || []) {
      const isValid = await verifyApiKey(apiKey, client?.apiKeyHash)
      if (isValid) {
        // Update last used timestamp
        await prisma.apiClient.update({
          where: { id: client?.id },
          data: { lastUsedAt: new Date() }
        })

        return { success: true, client: client as AuthenticatedApiClient }
      }
    }

    return { success: false, error: 'Invalid API key' }
  } catch (error) {
    console.error('API authentication error:', error)
    return { success: false, error: 'Authentication failed' }
  }
}

/**
 * Check if user has sufficient credits
 */
export async function checkCredits(userId: string, requiredCredits: number): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })
  
  return (user?.credits || 0) >= requiredCredits
}

/**
 * Deduct credits from user account
 */
export async function deductCredits(
  userId: string, 
  apiClientId: string,
  credits: number, 
  description: string
): Promise<{ success: boolean; newBalance?: number; error?: string }> {
  try {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        return { success: false, error: 'User not found' }
      }

      if (user?.credits < credits) {
        return { success: false, error: 'Insufficient credits' }
      }

      const newBalance = user?.credits - credits

      // Update user credits
      await tx.user.update({
        where: { id: userId },
        data: { credits: newBalance }
      })

      // Log transaction
      await tx.apiTransaction.create({
        data: {
          apiClientId,
          type: 'debit',
          amount: credits,
          creditsChanged: -credits,
          balanceBefore: user?.credits,
          balanceAfter: newBalance,
          description
        }
      })

      return { success: true, newBalance }
    })
  } catch (error) {
    console.error('Credit deduction error:', error)
    return { success: false, error: 'Failed to deduct credits' }
  }
}
