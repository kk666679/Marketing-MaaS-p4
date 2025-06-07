"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Save, Loader2 } from "lucide-react"

interface Permission {
  id: string
  name: string
}

interface Role {
  id: string
  name: string
}

interface PermissionMatrixProps {
  permissions: Permission[]
  roles: Role[]
  rolePermissions: { [roleId: string]: string[] }
}

const PermissionMatrix: React.FC<PermissionMatrixProps> = ({ permissions, roles, rolePermissions }) => {
  const [matrix, setMatrix] = useState<{ [roleId: string]: { [permissionId: string]: boolean } }>({})
  const [changes, setChanges] = useState<{ [roleId: string]: string[] }>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Initialize the matrix based on the provided rolePermissions
    const initialMatrix: { [roleId: string]: { [permissionId: string]: boolean } } = {}
    roles.forEach((role) => {
      initialMatrix[role.id] = {}
      permissions.forEach((permission) => {
        initialMatrix[role.id][permission.id] = rolePermissions[role.id]?.includes(permission.id) || false
      })
    })
    setMatrix(initialMatrix)
  }, [permissions, roles, rolePermissions])

  const handleCheckboxChange = (roleId: string, permissionId: string, checked: boolean) => {
    // Update the matrix state
    setMatrix((prevMatrix) => ({
      ...prevMatrix,
      [roleId]: {
        ...prevMatrix[roleId],
        [permissionId]: checked,
      },
    }))

    // Update the changes state
    setChanges((prevChanges) => {
      const currentChanges = { ...prevChanges }

      if (!currentChanges[roleId]) {
        currentChanges[roleId] = rolePermissions[roleId] ? [...rolePermissions[roleId]] : []
      }

      const permissionIndex = currentChanges[roleId].indexOf(permissionId)

      if (checked && permissionIndex === -1) {
        // Add permission to changes if checked and not already present
        currentChanges[roleId] = [...currentChanges[roleId], permissionId]
      } else if (!checked && permissionIndex !== -1) {
        // Remove permission from changes if unchecked and present
        currentChanges[roleId] = [
          ...currentChanges[roleId].slice(0, permissionIndex),
          ...currentChanges[roleId].slice(permissionIndex + 1),
        ]
      }

      // Remove role from changes if no changes for that role
      if (currentChanges[roleId].length === 0 && rolePermissions[roleId]?.length === 0) {
        delete currentChanges[roleId]
      }

      return currentChanges
    })
  }

  const handleSaveChanges = async () => {
    setSaving(true)

    try {
      const response = await fetch("/api/admin/permissions/bulk-update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ changes }),
      })

      if (response.ok) {
        setChanges({})
        // Show success message
        alert("Permissions updated successfully!")
      }
    } catch (error) {
      console.error("Failed to save permission changes:", error)
      alert("Failed to save changes. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th></th>
              {roles.map((role) => (
                <th
                  key={role.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {permissions.map((permission) => (
              <tr key={permission.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{permission.name}</td>
                {roles.map((role) => (
                  <td key={role.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Checkbox
                      checked={matrix[role.id]?.[permission.id] || false}
                      onCheckedChange={(checked) => handleCheckboxChange(role.id, permission.id, !!checked)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Button
          onClick={handleSaveChanges}
          disabled={Object.keys(changes).length === 0 || saving}
          className="bg-green-600 hover:bg-green-700"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes ({Object.keys(changes).length})
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default PermissionMatrix
