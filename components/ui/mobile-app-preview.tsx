"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Star, Apple, Play } from "lucide-react"

export function MobileAppPreview() {
  const features = [
    "Real-time campaign monitoring",
    "Push notifications for performance alerts",
    "Quick content approval workflow",
    "Mobile-optimized analytics dashboard",
    "Offline content creation",
  ]

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile App
          </Badge>
          <h3 className="text-3xl font-bold mb-4">Manage Campaigns On-the-Go</h3>
          <p className="text-lg text-gray-600 mb-6">
            Take control of your marketing campaigns anywhere with our powerful mobile app. Monitor performance, approve
            content, and stay connected to your AI agents.
          </p>

          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                {feature}
              </motion.li>
            ))}
          </ul>

          <div className="flex gap-4">
            <Button className="flex items-center gap-2 bg-black hover:bg-gray-800">
              <Apple className="w-5 h-5" />
              App Store
            </Button>
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Play className="w-5 h-5" />
              Google Play
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.8</span>
            </div>
            <span>•</span>
            <span>10K+ downloads</span>
            <span>•</span>
            <span>Free to download</span>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Phone Frame */}
          <div className="relative mx-auto w-64 h-[500px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
              {/* Status Bar */}
              <div className="bg-gray-900 text-white text-xs p-2 flex justify-between items-center">
                <span>9:41</span>
                <span>100%</span>
              </div>

              {/* App Content */}
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold">Dashboard</h4>
                  <div className="w-8 h-8 bg-blue-600 rounded-full" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3">
                    <div className="text-xs text-gray-600">Active Campaigns</div>
                    <div className="text-lg font-bold">12</div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-xs text-gray-600">Total Reach</div>
                    <div className="text-lg font-bold">125K</div>
                  </Card>
                </div>

                <Card className="p-3">
                  <div className="text-xs text-gray-600 mb-2">Recent Activity</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs">Campaign approved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-xs">Content generated</span>
                    </div>
                  </div>
                </Card>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                  <div className="text-xs font-medium text-blue-800">AI Recommendation</div>
                  <div className="text-xs text-blue-600 mt-1">
                    Increase Instagram posting frequency by 20% for better engagement
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute -top-4 -right-4 bg-green-500 text-white p-2 rounded-full text-xs font-medium"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Live
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-2 rounded-lg text-xs"
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            +25% ROI
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
