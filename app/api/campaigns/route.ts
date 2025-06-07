import { type NextRequest, NextResponse } from "next/server"
import { Database } from "@/lib/database"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

function getUserFromToken(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) throw new Error("No token provided")

  return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromToken(request)
    const campaignData = await request.json()

    const campaign = await Database.createCampaign({
      ...campaignData,
      user_id: user.userId,
    })

    return NextResponse.json({ success: true, campaign })
  } catch (error) {
    console.error("Campaign creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create campaign" })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromToken(request)
    const campaigns = await Database.getCampaignsByUserId(user.userId)

    return NextResponse.json({ success: true, campaigns })
  } catch (error) {
    console.error("Campaigns fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch campaigns" })
  }
}
