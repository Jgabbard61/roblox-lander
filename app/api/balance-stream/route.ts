
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  // Get user ID from query parameters (in production, this should be from session)
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  
  if (!userId) {
    return new Response('User ID required', { status: 400 })
  }

  // Set up Server-Sent Events headers
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  })

  // Create a readable stream
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      
      // Send initial balance
      const sendBalance = async () => {
        try {
          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { credits: true }
          })
          
          const data = {
            credits: user?.credits || 0,
            timestamp: new Date().toISOString(),
            lowBalance: (user?.credits || 0) <= 5
          }
          
          const message = `data: ${JSON.stringify(data)}\n\n`
          controller.enqueue(encoder.encode(message))
        } catch (error) {
          console.error('Balance stream error:', error)
          const errorData = { error: 'Unable to fetch balance', timestamp: new Date().toISOString() }
          const message = `data: ${JSON.stringify(errorData)}\n\n`
          controller.enqueue(encoder.encode(message))
        }
      }

      // Send initial balance
      sendBalance()
      
      // Send heartbeat and check for balance updates every 10 seconds
      const interval = setInterval(() => {
        sendBalance()
      }, 10000)

      // Send periodic heartbeat to keep connection alive
      const heartbeat = setInterval(() => {
        const message = `data: ${JSON.stringify({ type: 'heartbeat', timestamp: new Date().toISOString() })}\n\n`
        controller.enqueue(encoder.encode(message))
      }, 30000)

      // Cleanup function
      return () => {
        clearInterval(interval)
        clearInterval(heartbeat)
      }
    },
    
    cancel() {
      // Stream was cancelled by client
    }
  })

  return new Response(stream, { headers })
}
