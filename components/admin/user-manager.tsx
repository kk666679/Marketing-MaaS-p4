"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"

interface User {
  id: string
  email: string
  role: string
  status: string
  organizationId: string
}

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([])
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [newUser, setNewUser] = useState({
    email: "",
    role: "viewer",
    organizationId: "",
  })
  const [isInviting, setIsInviting] = useState(false)

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users")
        if (response.ok) {
          const data = await response.json()
          setUsers(data)
        }
      } catch (error) {
        console.error("Failed to fetch users:", error)
      }
    }

    fetchUsers()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setNewUser({ ...newUser, role: e.target.value as string })
  }

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsInviting(true)

    try {
      const response = await fetch("/api/admin/users/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        const invitedUser = await response.json()
        setUsers([...users, { ...invitedUser, status: "pending" }])
        setNewUser({ email: "", role: "viewer", organizationId: "" })
        setShowInviteForm(false)
      }
    } catch (error) {
      console.error("Failed to invite user:", error)
    } finally {
      setIsInviting(false)
    }
  }

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })

      if (response.ok) {
        setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
      }
    } catch (error) {
      console.error("Failed to update user role:", error)
    }
  }

  const handleSuspendUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: "PATCH",
      })

      if (response.ok) {
        setUsers(users.map((user) => (user.id === userId ? { ...user, status: "suspended" } : user)))
      }
    } catch (error) {
      console.error("Failed to suspend user:", error)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId))
      }
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <Button onClick={() => setShowInviteForm(!showInviteForm)}>Invite User</Button>

      {showInviteForm && (
        <form onSubmit={handleInviteUser} className="mt-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" value={newUser.email} onChange={handleInputChange} required />
          </div>
          <div className="grid gap-2 mt-2">
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 mt-2">
            <Label htmlFor="organizationId">Organization ID</Label>
            <Input
              type="text"
              id="organizationId"
              name="organizationId"
              value={newUser.organizationId}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" disabled={isInviting} className="mt-4">
            {isInviting ? "Inviting..." : "Invite"}
          </Button>
        </form>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Current Users</h3>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select value={user.role} onValueChange={(value) => handleUpdateUserRole(user.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuspendUser(user.id)}
                        disabled={user.status === "suspended"}
                      >
                        {user.status === "suspended" ? "Suspended" : "Suspend"}
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
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

export default UserManager
