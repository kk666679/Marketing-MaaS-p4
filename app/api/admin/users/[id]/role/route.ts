import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { role } = await request.json()
    const targetUserId = params.id

    // Get role ID
    const [roleRecord] = await sql`
      SELECT id FROM roles WHERE name = ${role}
    `

    if (!roleRecord) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    // Update user role
    await sql`
      UPDATE user_organizations 
      SET role_id = ${roleRecord.id}
      WHERE user_id = ${targetUserId}
    `

    // Log the action
    await sql`
      INSERT INTO audit_logs (user_id, action, resource_type, resource_id, details, severity)
      VALUES (${userId}, 'update_role', 'user', ${targetUserId}, ${JSON.stringify({ newRole: role })}, 'medium')
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to update user role:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
