import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user has admin permissions
    const userPermissions = await sql`
      SELECT p.name 
      FROM permissions p
      JOIN role_permissions rp ON p.id = rp.permission_id
      JOIN user_organizations uo ON rp.role_id = uo.role_id
      WHERE uo.user_id = ${userId}
    `

    const hasAdminAccess = userPermissions.some((p) => p.name === "admin.full")
    if (!hasAdminAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const organizations = await sql`
      SELECT 
        o.*,
        COUNT(uo.user_id) as member_count
      FROM organizations o
      LEFT JOIN user_organizations uo ON o.id = uo.organization_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `

    return NextResponse.json(organizations)
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

    const [organization] = await sql`
      INSERT INTO organizations (name, description, tier)
      VALUES (${name}, ${description}, ${tier})
      RETURNING *
    `

    // Log the action
    await sql`
      INSERT INTO audit_logs (user_id, action, resource_type, resource_id, details, severity)
      VALUES (${userId}, 'create', 'organization', ${organization.id}, ${JSON.stringify({ name, tier })}, 'medium')
    `

    return NextResponse.json(organization)
  } catch (error) {
    console.error("Failed to create organization:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
