"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const platforms = [
  {
    name: "Instagram",
    logo: "/placeholder.svg?height=40&width=40&text=IG",
    color: "from-pink-500 to-purple-600",
    features: ["Stories", "Reels", "Posts", "IGTV"],
    users: "2B+",
  },
  {
    name: "TikTok",
    logo: "/placeholder.svg?height=40&width=40&text=TT",
    color: "from-black to-red-500",
    features: ["Short Videos", "Live", "Ads"],
    users: "1B+",
  },
  {
    name: "LinkedIn",
    logo: "/placeholder.svg?height=40&width=40&text=LI",
    color: "from-blue-600 to-blue-800",
    features: ["Posts", "Articles", "Stories"],
    users: "900M+",
  },
  {
    name: "Twitter/X",
    logo: "/placeholder.svg?height=40&width=40&text=X",
    color: "from-gray-800 to-black",
    features: ["Tweets", "Threads", "Spaces"],
    users: "450M+",
  },
  {
    name: "Facebook",
    logo: "/placeholder.svg?height=40&width=40&text=FB",
    color: "from-blue-500 to-blue-700",
    features: ["Posts", "Stories", "Reels"],
    users: "3B+",
  },
  {
    name: "YouTube",
    logo: "/placeholder.svg?height=40&width=40&text=YT",
    color: "from-red-500 to-red-700",
    features: ["Videos", "Shorts", "Live"],
    users: "2.7B+",
  },
]

export function PlatformShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {platforms.map((platform, index) => (
        <motion.div
          key={platform.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <Card className="relative overflow-hidden group">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity`}
            />
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={platform.logo || "/placeholder.svg"}
                  alt={platform.name}
                  className="w-10 h-10 rounded-lg mr-3"
                />
                <div>
                  <h4 className="font-semibold text-lg">{platform.name}</h4>
                  <p className="text-sm text-gray-600">{platform.users} users</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {platform.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
