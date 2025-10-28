import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { packageName, credits, price, email, customerId, customerName } = body

    // Validate required fields
    if (!packageName || !credits || !price) {
      return NextResponse.json(
        { error: 'Missing required fields: packageName, credits, price' },
        { status: 400 }
      )
    }

    // Validate customer info
    if (!email && !customerId) {
      return NextResponse.json(
        { error: 'Either email or customerId is required' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
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
        customerId: customerId || '',
        customerEmail: email || '',
        customerName: customerName || '',
        source: 'landing_page',
      },
      // Important: This allows the webhook to receive the metadata
      payment_intent_data: {
        metadata: {
          packageName,
          credits: credits.toString(),
          price: price.toString(),
          customerId: customerId || '',
          customerEmail: email || '',
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
