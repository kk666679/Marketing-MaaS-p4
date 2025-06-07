"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@clerk/nextjs"
import {
  Users,
  Shield,
  Building,
  Activity,
  Settings,
  UserPlus,
  Eye,
  Crown,
  Key,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { OrganizationManager } from "@/components/admin/organization-manager"
import { UserManager } from "@/components/admin/user-manager"
import { RoleManager } from "@/components/admin/role-manager"
import { AuditLogger } from "@/components/admin/audit-logger"
import { PermissionMatrix } from "@/components/admin/permission-matrix"

export default function AdminDashboard() {
  const { user, isLoaded } = useUser()
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrganizations: 0,
    activeRoles: 0,
    recentActivity: 0,
  })

  useEffect(() => {
    if (isLoaded) {
      fetchStats()
    }
  }, [isLoaded])

  const fetchStats = async () => {
    try {
      // Simulate API call - replace with actual API
      setStats({
        totalUsers: 1247,
        totalOrganizations: 89,
        activeRoles: 12,
        recentActivity: 156,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Organizations",
      value: stats.totalOrganizations.toLocaleString(),
      icon: <Building className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Active Roles",
      value: stats.activeRoles.toLocaleString(),
      icon: <Shield className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+3%",
      changeType: "positive",
    },
    {
      title: "Recent Activity",
      value: stats.recentActivity.toLocaleString(),
      icon: <Activity className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+24%",
      changeType: "positive",
    },
  ]

  const quickActions = [
    {
      title: "Invite User",
      description: "Add new user to organization",
      icon: <UserPlus className="w-5 h-5" />,
      action: () => setActiveTab("users"),
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Create Role",
      description: "Define new role with permissions",
      icon: <Crown className="w-5 h-5" />,
      action: () => setActiveTab("roles"),
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Security Review",
      description: "Review security settings",
      icon: <Shield className="w-5 h-5" />,
      action: () => setActiveTab("security"),
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Audit Logs",
      description: "View recent activity logs",
      icon: <Eye className="w-5 h-5" />,
      action: () => setActiveTab("audit"),
      color: "bg-orange-600 hover:bg-orange-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage users, roles, permissions, and organizational settings</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Shield className="w-4 h-4 mr-1" />
                Super Admin
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <span
                          className={`text-xs font-medium ${
                            stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">vs last month</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <div className={stat.color}>{stat.icon}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="w-5 h-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-gray-50"
                    onClick={action.action}
                  >
                    <div className={`p-2 rounded-md text-white ${action.color}`}>{action.icon}</div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-gray-500">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
              <TabsTrigger value="overview" className="flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="organizations" className="flex items-center">
                <Building className="w-4 h-4 mr-2" />
                Organizations
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex items-center">
                <Crown className="w-4 h-4 mr-2" />
                Roles
              </TabsTrigger>
              <TabsTrigger value="permissions" className="flex items-center">
                <Key className="w-4 h-4 mr-2" />
                Permissions
              </TabsTrigger>
              <TabsTrigger value="audit" className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Audit
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                      Security Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-medium text-yellow-800">Unusual Login Activity</p>
                          <p className="text-sm text-yellow-600">3 failed login attempts detected</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium text-blue-800">Permission Changes</p>
                          <p className="text-sm text-blue-600">2 role modifications this week</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New user registered</p>
                          <p className="text-xs text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Role permissions updated</p>
                          <p className="text-xs text-gray-500">15 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Organization created</p>
                          <p className="text-xs text-gray-500">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="organizations">
              <OrganizationManager />
            </TabsContent>

            <TabsContent value="users">
              <UserManager />
            </TabsContent>

            <TabsContent value="roles">
              <RoleManager />
            </TabsContent>

            <TabsContent value="permissions">
              <PermissionMatrix />
            </TabsContent>

            <TabsContent value="audit">
              <AuditLogger />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
