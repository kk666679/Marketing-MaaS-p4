import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// Mock organization data
const mockOrganizations = [
  { id: "1", name: "Acme Corp", description: "Technology company", tier: "enterprise", member_count: 150, created_at: "2024-01-15T10:00:00Z" },
  { id: "2", name: "TechStart Inc", description: "Startup company", tier: "pro", member_count: 75, created_at: "2024-02-01T10:00:00Z" },
  { id: "3", name: "Global Solutions", description: "Consulting firm", tier: "enterprise", member_count: 200, created_at: "2024-01-20T10:00:00Z" },
]

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real app, you would check permissions here
    // For demo purposes, we'll return mock data
    return NextResponse.json(mockOrganizations)
  } catch (error) {
    console.error("Failed to fetch organizations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, description, tier } = await request.json()

    // In a real app, you would insert into database here
    const newOrganization = {
      id: String(mockOrganizations.length + 1),
      name,
      description,
      tier,
      member_count: 0,
      created_at: new Date().toISOString()
    }

    console.log("Mock creation of organization:", newOrganization)

    return NextResponse.json(newOrganization)
  } catch (error) {
    console.error("Failed to create organization:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
