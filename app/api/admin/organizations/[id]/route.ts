import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// Mock organization data
const mockOrganizations = [
  { id: "1", name: "Acme Corp", members: 150 },
  { id: "2", name: "TechStart Inc", members: 75 },
  { id: "3", name: "Global Solutions", members: 200 },
]

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orgId = params.id

    // Check if organization exists in mock data
    const organization = mockOrganizations.find(org => org.id === orgId)

    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    // In a real app, you would delete from database here
    // For demo purposes, we'll just return success
    console.log(`Mock deletion of organization: ${organization.name}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete organization:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
