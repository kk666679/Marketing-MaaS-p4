"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Clock, Search, Filter, Download } from "lucide-react"

interface AuditLog {
  id: number
  action: string
  user: string
  resource: string
  timestamp: string
  status: "success" | "warning" | "error"
  details: string
}

export function AuditLogger() {
  const [logs] = useState<AuditLog[]>([
    {
      id: 1,
      action: "User Login",
      user: "john.doe@example.com",
      resource: "Authentication",
      timestamp: "2024-03-20 14:30:00",
      status: "success",
      details: "Successful login from IP 192.168.1.1"
    },
    {
      id: 2,
      action: "Permission Update",
      user: "admin@example.com",
      resource: "Role Management",
      timestamp: "2024-03-20 14:25:00",
      status: "warning",
      details: "Modified permissions for Manager role"
    },
    {
      id: 3,
      action: "Delete User",
      user: "admin@example.com",
      resource: "User Management",
      timestamp: "2024-03-20 14:20:00",
      status: "error",
      details: "Failed to delete user due to active sessions"
    }
  ])

  const getStatusColor = (status: AuditLog["status"]) => {
    switch (status) {
      case "success": return "bg-green-100 text-green-800"
      case "warning": return "bg-yellow-100 text-yellow-800"
      case "error": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Audit Logs
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search audit logs..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{log.action}</h3>
                  <Badge className={getStatusColor(log.status)}>
                    {log.status}
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">{log.timestamp}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">User</p>
                  <p className="font-medium">{log.user}</p>
                </div>
                <div>
                  <p className="text-gray-500">Resource</p>
                  <p className="font-medium">{log.resource}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{log.details}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
