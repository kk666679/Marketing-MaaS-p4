"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  isSystem?: boolean
}

const RoleManager = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [newRole, setNewRole] = useState({ name: "", description: "" })
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/admin/roles")
      if (response.ok) {
        const data = await response.json()
        setRoles(data)
      }
    } catch (error) {
      console.error("Failed to fetch roles:", error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRole({ ...newRole, [e.target.name]: e.target.value })
  }

  const handlePermissionChange = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission],
    )
  }

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      const response = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newRole,
          permissions: selectedPermissions,
        }),
      })

      if (response.ok) {
        const createdRole = await response.json()
        setRoles([...roles, createdRole])
        setNewRole({ name: "", description: "" })
        setSelectedPermissions([])
        setShowCreateForm(false)
      }
    } catch (error) {
      console.error("Failed to create role:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteRole = async (roleId: string) => {
    const role = roles.find((r) => r.id === roleId)
    if (role?.isSystem) {
      alert("Cannot delete system roles")
      return
    }

    if (!confirm("Are you sure you want to delete this role?")) return

    try {
      const response = await fetch(`/api/admin/roles/${roleId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setRoles(roles.filter((role) => role.id !== roleId))
      }
    } catch (error) {
      console.error("Failed to delete role:", error)
    }
  }

  const handleUpdateRolePermissions = async (roleId: string, permissions: string[]) => {
    try {
      const response = await fetch(`/api/admin/roles/${roleId}/permissions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissions }),
      })

      if (response.ok) {
        setRoles(roles.map((role) => (role.id === roleId ? { ...role, permissions } : role)))
      }
    } catch (error) {
      console.error("Failed to update role permissions:", error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>

      <Button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? "Cancel" : "Create New Role"}
      </Button>

      {showCreateForm && (
        <form onSubmit={handleCreateRole} className="mt-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" value={newRole.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                id="description"
                name="description"
                value={newRole.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Permissions</Label>
              <div className="flex flex-wrap gap-2">
                {["read", "write", "update", "delete"].map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission}
                      checked={selectedPermissions.includes(permission)}
                      onCheckedChange={() => handlePermissionChange(permission)}
                    />
                    <Label htmlFor={permission}>{permission}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Role"}
            </Button>
          </div>
        </form>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Existing Roles</h3>
        {roles.length === 0 ? (
          <p>No roles found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      {role.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{role.description}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {role.permissions.join(", ") || "No permissions"}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRole(role.id)}
                        disabled={role.isSystem}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoleManager
