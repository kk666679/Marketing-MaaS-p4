import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orgId = params.id

    // Check if organization exists and get details for logging
    const [organization] = await sql`
      SELECT * FROM organizations WHERE id = ${orgId}
    `

    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    // Delete organization (cascade will handle related records)
    await sql`DELETE FROM organizations WHERE id = ${orgId}`

    // Log the action
    await sql`
      INSERT INTO audit_logs (user_id, action, resource_type, resource_id, details, severity)
      VALUES (${userId}, 'delete', 'organization', ${orgId}, ${JSON.stringify({ name: organization.name })}, 'high')
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete organization:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
