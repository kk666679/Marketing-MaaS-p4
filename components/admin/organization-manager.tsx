"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building, Search, Plus } from "lucide-react"

interface Organization {
  id: number
  name: string
  members: number
  status: string
}

export function OrganizationManager() {
  const [organizations, setOrganizations] = useState<Organization[]>([
    { id: 1, name: "Acme Corp", members: 150, status: "active" },
    { id: 2, name: "TechStart Inc", members: 75, status: "active" },
    { id: 3, name: "Global Solutions", members: 200, status: "active" },
  ])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Organizations
          </CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Organization
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search organizations..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-4">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <h3 className="font-medium">{org.name}</h3>
                <p className="text-sm text-gray-500">{org.members} members</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {org.status}
                </span>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
