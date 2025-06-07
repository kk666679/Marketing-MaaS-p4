import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import jwt from "jsonwebtoken"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ success: false, error: "No token provided" })
    }

    const user = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
    const { planId, planName, price } = await request.json()

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Marketing MaaS - ${planName}`,
              description: `${planName} subscription plan`,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
      customer_email: user.email,
      metadata: {
        userId: user.userId,
        planId: planId,
        planName: planName,
      },
    })

    return NextResponse.json({ success: true, sessionId: session.id })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ success: false, error: "Failed to create checkout session" })
  }
}
