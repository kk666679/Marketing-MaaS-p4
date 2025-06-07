import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action") || ""
    const severity = searchParams.get("severity") || ""
    const startDate = searchParams.get("startDate") || ""
    const endDate = searchParams.get("endDate") || ""
    const search = searchParams.get("search") || ""

    let query = `
      SELECT 
        al.*,
        u.email as user_email,
        u.first_name,
        u.last_name
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      WHERE 1=1
    `

    const params: any[] = []
    let paramIndex = 1

    if (action) {
      query += ` AND al.action = $${paramIndex}`
      params.push(action)
      paramIndex++
    }

    if (severity) {
      query += ` AND al.severity = $${paramIndex}`
      params.push(severity)
      paramIndex++
    }

    if (startDate) {
      query += ` AND al.created_at >= $${paramIndex}`
      params.push(startDate)
      paramIndex++
    }

    if (endDate) {
      query += ` AND al.created_at <= $${paramIndex}`
      params.push(endDate)
      paramIndex++
    }

    if (search) {
      query += ` AND (u.email ILIKE $${paramIndex} OR al.details::text ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    query += ` ORDER BY al.created_at DESC`

    const logs = await sql(query, params)

    // Convert to CSV
    const csvHeaders = "Timestamp,User,Action,Resource Type,Resource ID,Severity,IP Address,Details\n"
    const csvRows = logs
      .map((log) => {
        const timestamp = new Date(log.created_at).toISOString()
        const user = log.user_email || "System"
        const details = JSON.stringify(log.details).replace(/"/g, '""')

        return `"${timestamp}","${user}","${log.action}","${log.resource_type}","${log.resource_id}","${log.severity}","${log.ip_address}","${details}"`
      })
      .join("\n")

    const csv = csvHeaders + csvRows

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="audit-logs-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error("Failed to export audit logs:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
