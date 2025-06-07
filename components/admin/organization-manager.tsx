"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"

interface Organization {
  id: string
  name: string
  description: string
  tier: string
}

const OrganizationManager = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newOrg, setNewOrg] = useState({ name: "", description: "", tier: "starter" })
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    // Fetch organizations from API (replace with your actual API endpoint)
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("/api/admin/organizations")
        if (response.ok) {
          const data = await response.json()
          setOrganizations(data)
        }
      } catch (error) {
        console.error("Failed to fetch organizations:", error)
      }
    }

    fetchOrganizations()
  }, [])

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      const response = await fetch("/api/admin/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrg),
      })

      if (response.ok) {
        const createdOrg = await response.json()
        setOrganizations([...organizations, createdOrg])
        setNewOrg({ name: "", description: "", tier: "starter" })
        setShowCreateForm(false)
      }
    } catch (error) {
      console.error("Failed to create organization:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteOrganization = async (orgId: string) => {
    if (!confirm("Are you sure you want to delete this organization?")) return

    try {
      const response = await fetch(`/api/admin/organizations/${orgId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setOrganizations(organizations.filter((org) => org.id !== orgId))
      }
    } catch (error) {
      console.error("Failed to delete organization:", error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewOrg({ ...newOrg, [e.target.name]: e.target.value })
  }

  const handleTierChange = (value: string) => {
    setNewOrg({ ...newOrg, tier: value })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Organization Management</h1>
        <Button onClick={() => setShowCreateForm(true)}>Create Organization</Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Organization</CardTitle>
            <CardDescription>Fill out the form below to create a new organization.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateOrganization}>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" name="name" value={newOrg.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    value={newOrg.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="tier">Tier</Label>
                  <Select onValueChange={handleTierChange} defaultValue={newOrg.tier}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="mt-4" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {organizations.map((org) => (
          <Card key={org.id}>
            <CardHeader>
              <CardTitle>{org.name}</CardTitle>
              <CardDescription>{org.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Tier: {org.tier}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => handleDeleteOrganization(org.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default OrganizationManager
