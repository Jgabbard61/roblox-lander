import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe only when the API key is available (not during build)
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16' as any,
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { packageName, credits, price, email, customerId, userId, customerName } = body

    // Validate required fields
    if (!packageName || !credits || !price) {
      return NextResponse.json(
        { error: 'Missing required fields: packageName, credits, price' },
        { status: 400 }
      )
    }

    // Validate customer info
    if (!email || !customerId || !userId) {
      return NextResponse.json(
        { error: 'Email, customerId, and userId are required after registration' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${packageName} - ${credits} Credits`,
              description: `VerifyLens Credit Package: ${credits} credits for Roblox user verification`,
            },
            unit_amount: price, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/credits/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/credits?canceled=true`,
      customer_email: email,
      metadata: {
        packageName,
        credits: credits.toString(),
        price: price.toString(),
        customer_id: customerId.toString(),
        user_id: userId.toString(),
        package_id: '1', // Default package ID (can be updated if needed)
        customerEmail: email,
        customerName: customerName || '',
        source: 'landing_page',
      },
      // Important: This allows the webhook to receive the metadata
      payment_intent_data: {
        metadata: {
          packageName,
          credits: credits.toString(),
          price: price.toString(),
          customer_id: customerId.toString(),
          user_id: userId.toString(),
          package_id: '1', // Default package ID (can be updated if needed)
          customerEmail: email,
          customerName: customerName || '',
          source: 'landing_page',
        },
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
