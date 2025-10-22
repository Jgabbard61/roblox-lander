
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

export const dynamic = "force-dynamic"

const prisma = new PrismaClient()

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address').max(100),
  companyName: z.string().min(1, 'Company name is required').max(100),
  phoneNumber: z.string().max(20).optional().nullable(),
  estimatedUsage: z.enum(['1-100', '100-1,000', '1,000-10,000', '10,000+'], {
    errorMap: () => ({ message: 'Please select a valid usage range' })
  }),
  message: z.string().max(1000).optional().nullable()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validationResult = contactSchema.safeParse(body)
    
    if (!validationResult?.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult?.error?.flatten?.()?.fieldErrors 
        },
        { status: 400 }
      )
    }

    const { name, email, companyName, phoneNumber, estimatedUsage, message } = validationResult?.data

    // Save to database
    const contactForm = await prisma.contactForm.create({
      data: {
        name,
        email,
        companyName,
        phoneNumber: phoneNumber || null,
        estimatedUsage,
        message: message || null,
        status: 'new'
      }
    })

    // For production, you would integrate with an email service here
    // For now, we'll just log the submission
    console.log('New contact form submission:', {
      id: contactForm?.id,
      name,
      email,
      companyName,
      estimatedUsage,
      createdAt: contactForm?.createdAt
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: contactForm?.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form submission error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to submit contact form. Please try again.'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// Handle GET requests (optional - for testing)
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Contact API is working. Use POST to submit contact forms.' 
    },
    { status: 200 }
  )
}
