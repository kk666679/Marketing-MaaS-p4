"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Crown, Search, Plus, Users, Shield } from "lucide-react"

interface Role {
  id: number
  name: string
  description: string
  permissions: string[]
  userCount: number
  color: string
}

export function RoleManager() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: "Super Admin",
      description: "Full system access",
      permissions: ["read", "write", "delete", "admin"],
      userCount: 2,
      color: "bg-red-100 text-red-800"
    },
    {
      id: 2,
      name: "Manager",
      description: "Team management access",
      permissions: ["read", "write", "manage_team"],
      userCount: 8,
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      name: "User",
      description: "Basic user access",
      permissions: ["read"],
      userCount: 45,
      color: "bg-gray-100 text-gray-800"
    }
  ])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Crown className="w-5 h-5 mr-2" />
            Role Management
          </CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search roles..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium">{role.name}</h3>
                  <Badge className={role.color}>
                    <Crown className="w-3 h-3 mr-1" />
                    {role.name}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {role.userCount} users
                  </span>
                  <span className="flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    {role.permissions.length} permissions
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {role.permissions.map((permission) => (
                    <Badge key={permission} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Permissions
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
