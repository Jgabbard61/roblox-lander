
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateApiKey, hashApiKey } from '@/lib/api-key'
import { z } from 'zod'

export const dynamic = "force-dynamic"

const generateKeySchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  regenerate: z.boolean().optional().default(false)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validationResult = generateKeySchema.safeParse(body)
    
    if (!validationResult?.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult?.error?.flatten?.()?.fieldErrors 
        },
        { status: 400 }
      )
    }

    const { userId, regenerate } = validationResult?.data

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { apiClient: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if API client already exists
    if (user?.apiClient && !regenerate) {
      return NextResponse.json(
        { 
          error: 'API key already exists',
          message: 'Set regenerate: true to create a new key'
        },
        { status: 409 }
      )
    }

    // Generate new API key
    const newApiKey = generateApiKey()
    const hashedKey = await hashApiKey(newApiKey)

    let apiClient

    if (user?.apiClient) {
      // Update existing API client
      apiClient = await prisma.apiClient.update({
        where: { userId },
        data: {
          apiKey: newApiKey,
          apiKeyHash: hashedKey,
          updatedAt: new Date()
        }
      })
    } else {
      // Create new API client
      apiClient = await prisma.apiClient.create({
        data: {
          userId,
          apiKey: newApiKey,
          apiKeyHash: hashedKey
        }
      })
    }

    // Log the transaction
    await prisma.apiTransaction.create({
      data: {
        apiClientId: apiClient?.id,
        type: regenerate ? 'key_regenerated' : 'key_generated',
        amount: 0,
        creditsChanged: 0,
        balanceBefore: user?.credits,
        balanceAfter: user?.credits,
        description: regenerate ? 'API key regenerated' : 'API key generated'
      }
    })

    return NextResponse.json(
      { 
        success: true,
        message: regenerate ? 'API key regenerated successfully' : 'API key generated successfully',
        apiKey: newApiKey, // Return the key only once
        clientId: apiClient?.id,
        createdAt: apiClient?.createdAt
      },
      { status: regenerate ? 200 : 201 }
    )

  } catch (error) {
    console.error('API key generation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to generate API key. Please try again.'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'API key generation endpoint. Use POST to generate keys.' 
    },
    { status: 200 }
  )
}
