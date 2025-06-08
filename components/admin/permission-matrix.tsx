"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Key, Save } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
}

interface Role {
  id: string
  name: string
}

export function PermissionMatrix() {
  const [permissions] = useState<Permission[]>([
    { id: "read", name: "Read", description: "View content and data" },
    { id: "write", name: "Write", description: "Create and edit content" },
    { id: "delete", name: "Delete", description: "Remove content and data" },
    { id: "admin", name: "Admin", description: "Full administrative access" },
    { id: "manage_users", name: "Manage Users", description: "Add, edit, and remove users" },
    { id: "manage_roles", name: "Manage Roles", description: "Create and modify roles" },
  ])

  const [roles] = useState<Role[]>([
    { id: "super_admin", name: "Super Admin" },
    { id: "admin", name: "Admin" },
    { id: "manager", name: "Manager" },
    { id: "user", name: "User" },
  ])

  const [matrix, setMatrix] = useState<Record<string, Record<string, boolean>>>({
    super_admin: {
      read: true,
      write: true,
      delete: true,
      admin: true,
      manage_users: true,
      manage_roles: true,
    },
    admin: {
      read: true,
      write: true,
      delete: true,
      admin: false,
      manage_users: true,
      manage_roles: false,
    },
    manager: {
      read: true,
      write: true,
      delete: false,
      admin: false,
      manage_users: false,
      manage_roles: false,
    },
    user: {
      read: true,
      write: false,
      delete: false,
      admin: false,
      manage_users: false,
      manage_roles: false,
    },
  })

  const togglePermission = (roleId: string, permissionId: string) => {
    setMatrix(prev => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permissionId]: !prev[roleId][permissionId]
      }
    }))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Permission Matrix
          </CardTitle>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 border-b font-medium">Permission</th>
                {roles.map((role) => (
                  <th key={role.id} className="text-center p-3 border-b font-medium min-w-[120px]">
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">
                    <div>
                      <div className="font-medium">{permission.name}</div>
                      <div className="text-sm text-gray-500">{permission.description}</div>
                    </div>
                  </td>
                  {roles.map((role) => (
                    <td key={role.id} className="p-3 border-b text-center">
                      <Switch
                        checked={matrix[role.id]?.[permission.id] || false}
                        onCheckedChange={() => togglePermission(role.id, permission.id)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Permission Guidelines</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Super Admin has all permissions by default</li>
            <li>• Admin role should have most permissions except role management</li>
            <li>• Manager role focuses on content and team management</li>
            <li>• User role has minimal permissions for basic functionality</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
