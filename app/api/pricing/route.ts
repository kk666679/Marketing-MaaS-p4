import { NextResponse } from "next/server"
import { Database } from "@/lib/database"

export async function GET() {
  try {
    const plans = await Database.getSubscriptionPlans()
    return NextResponse.json({ success: true, plans })
  } catch (error) {
    console.error("Pricing fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch pricing" })
  }
}
