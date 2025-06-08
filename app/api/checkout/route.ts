import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ success: false, error: "No token provided" })
    }

    const user = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
    const { planId, planName, price } = await request.json()

    // Mock checkout session for demo purposes
    const mockSessionId = `cs_mock_${Date.now()}`
    
    console.log(`Mock checkout session created for user ${user.email}:`, {
      planId,
      planName,
      price,
      sessionId: mockSessionId
    })

    return NextResponse.json({ success: true, sessionId: mockSessionId })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ success: false, error: "Failed to create checkout session" })
  }
}
