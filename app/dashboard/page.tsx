"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCard } from "@/components/ui/animated-card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useUser } from "@clerk/nextjs"
import { Plus, BarChart3, Users, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Campaign {
  id: string
  name: string
  status: string
  target_platforms: string[]
  budget: number
  created_at: string
}

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded) {
      fetchCampaigns()
    }
  }, [isLoaded])

  const fetchCampaigns = async () => {
    try {
      // Simulate API call - replace with actual API call
      setTimeout(() => {
        setCampaigns([
          {
            id: "1",
            name: "Summer Sale Campaign",
            status: "active",
            target_platforms: ["Instagram", "Facebook", "TikTok"],
            budget: 5000,
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Product Launch",
            status: "draft",
            target_platforms: ["LinkedIn", "Twitter"],
            budget: 3000,
            created_at: new Date().toISOString(),
          },
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Failed to fetch campaigns:", error)
      setLoading(false)
    }
  }

  const stats = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      label: "Active Campaigns",
      value: campaigns.filter((c) => c.status === "active").length,
    },
    { icon: <Users className="w-6 h-6" />, label: "Total Reach", value: "125K" },
    { icon: <Zap className="w-6 h-6" />, label: "Engagement Rate", value: "4.2%" },
    { icon: <TrendingUp className="w-6 h-6" />, label: "ROI", value: "+32%" },
  ]

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
          </h1>
          <p className="text-gray-600">Manage your AI-powered marketing campaigns from your dashboard.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <AnimatedCard key={index} delay={index * 0.1}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>

        {/* Campaigns Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Campaigns</CardTitle>
                <Link href="/campaigns/new">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    New Campaign
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {campaigns.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <BarChart3 className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
                    <p className="text-gray-600 mb-4">
                      Create your first AI-powered marketing campaign to get started.
                    </p>
                    <Link href="/campaigns/new">
                      <Button>Create Campaign</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {campaigns.map((campaign, index) => (
                      <motion.div
                        key={campaign.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{campaign.name}</h4>
                            <p className="text-sm text-gray-600">
                              {campaign.target_platforms.join(", ")} • ${campaign.budget}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              campaign.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <AnimatedCard delay={0.3}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/campaigns/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </Link>
              </CardContent>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  )
}
