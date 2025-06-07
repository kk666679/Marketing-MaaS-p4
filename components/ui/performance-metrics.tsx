"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"

interface Metric {
  label: string
  value: number
  change: number
  trend: "up" | "down" | "stable"
  prefix?: string
  suffix?: string
}

export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: "Active Users", value: 12500, change: 12.5, trend: "up" },
    { label: "Campaigns Created", value: 3420, change: 8.2, trend: "up", suffix: " this month" },
    { label: "Content Generated", value: 45600, change: 15.3, trend: "up", suffix: " pieces" },
    { label: "Platform Integrations", value: 8, change: 0, trend: "stable" },
    { label: "Average ROI", value: 285, change: 23.1, trend: "up", suffix: "%" },
    { label: "Customer Satisfaction", value: 98.5, change: 2.1, trend: "up", suffix: "%" },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.value + Math.floor(Math.random() * 10) - 5,
          change: metric.change + (Math.random() - 0.5) * 2,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-50"
      case "down":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Live Platform Metrics
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600">Updated in real-time</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{metric.label}</span>
                  {getTrendIcon(metric.trend)}
                </div>

                <div className="text-2xl font-bold mb-2">
                  {metric.prefix}
                  <AnimatedCounter value={metric.value} />
                  {metric.suffix}
                </div>

                <Badge className={`text-xs ${getTrendColor(metric.trend)}`}>
                  {metric.change > 0 ? "+" : ""}
                  {metric.change.toFixed(1)}%
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Platform Growth</span>
          </div>
          <p className="text-sm text-blue-700">
            Our platform is experiencing exceptional growth with 25% month-over-month increase in active campaigns and
            98.5% customer satisfaction rate.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
