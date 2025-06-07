import { type NextRequest, NextResponse } from "next/server"
import { Database } from "@/lib/database"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const { email, name, action } = await request.json()

    if (action === "login") {
      let user = await Database.getUserByEmail(email)

      if (!user) {
        user = await Database.createUser({ email, name })
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" })

      return NextResponse.json({
        success: true,
        user,
        token,
      })
    }

    return NextResponse.json({ success: false, error: "Invalid action" })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ success: false, error: "Authentication failed" })
  }
}
