import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// Mock audit log data
const mockLogs = [
  {
    created_at: "2024-03-20T14:30:00Z",
    user_email: "john.doe@example.com",
    action: "User Login",
    resource_type: "Authentication",
    resource_id: "auth_1",
    severity: "info",
    ip_address: "192.168.1.1",
    details: { message: "Successful login" }
  },
  {
    created_at: "2024-03-20T14:25:00Z",
    user_email: "admin@example.com",
    action: "Permission Update",
    resource_type: "Role",
    resource_id: "role_1",
    severity: "warning",
    ip_address: "192.168.1.2",
    details: { message: "Modified permissions for Manager role" }
  },
  {
    created_at: "2024-03-20T14:20:00Z",
    user_email: "admin@example.com",
    action: "Delete User",
    resource_type: "User",
    resource_id: "user_1",
    severity: "error",
    ip_address: "192.168.1.2",
    details: { message: "Failed to delete user due to active sessions" }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Convert to CSV
    const csvHeaders = "Timestamp,User,Action,Resource Type,Resource ID,Severity,IP Address,Details\n"
    const csvRows = mockLogs
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
