import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email, role, organizationId } = await request.json()

    // Get role ID
    const [roleRecord] = await sql`
      SELECT id FROM roles WHERE name = ${role}
    `

    if (!roleRecord) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    // Create user invitation (in real app, this would send an email)
    const invitationId = crypto.randomUUID()

    // For demo purposes, we'll create a placeholder user
    const [user] = await sql`
      INSERT INTO users (id, email, first_name, last_name, status)
      VALUES (${invitationId}, ${email}, 'Invited', 'User', 'pending')
      RETURNING *
    `

    // Add user to organization with role
    await sql`
      INSERT INTO user_organizations (user_id, organization_id, role_id)
      VALUES (${user.id}, ${organizationId}, ${roleRecord.id})
    `

    // Log the action
    await sql`
      INSERT INTO audit_logs (user_id, action, resource_type, resource_id, details, severity)
      VALUES (${userId}, 'invite', 'user', ${user.id}, ${JSON.stringify({ email, role, organizationId })}, 'medium')
    `

    return NextResponse.json({ ...user, role })
  } catch (error) {
    console.error("Failed to invite user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
