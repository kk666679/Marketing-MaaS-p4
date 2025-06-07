"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

const comparisonData = [
  {
    feature: "AI Content Generation",
    traditional: false,
    maas: true,
    description: "Automated content creation using advanced AI models",
  },
  {
    feature: "Multi-Platform Management",
    traditional: true,
    maas: true,
    description: "Manage multiple social media platforms from one dashboard",
  },
  {
    feature: "Real-time Trend Analysis",
    traditional: false,
    maas: true,
    description: "AI-powered trend prediction and analysis",
  },
  {
    feature: "Automated Optimization",
    traditional: false,
    maas: true,
    description: "Continuous campaign optimization based on performance data",
  },
  {
    feature: "24/7 Monitoring",
    traditional: false,
    maas: true,
    description: "Round-the-clock campaign monitoring and adjustments",
  },
  {
    feature: "Compliance Checking",
    traditional: false,
    maas: true,
    description: "Automated content safety and regulatory compliance",
  },
]

export function FeatureComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Traditional vs AI-Powered Marketing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-2">Feature</th>
                <th className="text-center py-4 px-2">Traditional Tools</th>
                <th className="text-center py-4 px-2">Marketing MaaS</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4 px-2">
                    <div>
                      <div className="font-medium">{item.feature}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </td>
                  <td className="text-center py-4 px-2">
                    {item.traditional ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="text-center py-4 px-2">
                    {item.maas ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
