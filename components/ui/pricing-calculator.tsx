"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Crown, Rocket } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"

interface PricingTier {
  name: string
  basePrice: number
  icon: React.ReactNode
  color: string
  features: string[]
  maxCampaigns: number
  maxPlatforms: number
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    basePrice: 29,
    icon: <Zap className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    features: ["Basic Analytics", "3 Platforms", "Email Support", "5 Campaigns"],
    maxCampaigns: 5,
    maxPlatforms: 3,
  },
  {
    name: "Professional",
    basePrice: 99,
    icon: <Crown className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    features: ["Advanced Analytics", "All Platforms", "Priority Support", "25 Campaigns", "Custom Branding"],
    maxCampaigns: 25,
    maxPlatforms: 8,
  },
  {
    name: "Enterprise",
    basePrice: 299,
    icon: <Rocket className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    features: ["Enterprise Analytics", "All Platforms", "24/7 Support", "Unlimited Campaigns", "Dedicated Manager"],
    maxCampaigns: 100,
    maxPlatforms: 8,
  },
]

export function PricingCalculator() {
  const [teamSize, setTeamSize] = useState([5])
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedTier, setSelectedTier] = useState(1)

  const calculatePrice = (basePrice: number) => {
    const teamMultiplier = Math.max(1, Math.floor(teamSize[0] / 5))
    const annualDiscount = isAnnual ? 0.8 : 1 // 20% discount for annual
    return Math.round(basePrice * teamMultiplier * annualDiscount)
  }

  const calculateSavings = (basePrice: number) => {
    if (!isAnnual) return 0
    const teamMultiplier = Math.max(1, Math.floor(teamSize[0] / 5))
    return Math.round(basePrice * teamMultiplier * 12 * 0.2)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Interactive Pricing Calculator</CardTitle>
        <p className="text-center text-gray-600">Customize your plan based on team size and billing preference</p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">Team Size: {teamSize[0]} members</label>
              <Badge variant="secondary">{Math.max(1, Math.floor(teamSize[0] / 5))}x multiplier</Badge>
            </div>
            <Slider value={teamSize} onValueChange={setTeamSize} max={50} min={1} step={1} className="w-full" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Billing Period</label>
              <p className="text-xs text-gray-600">Save 20% with annual billing</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm ${!isAnnual ? "font-medium" : "text-gray-500"}`}>Monthly</span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
              <span className={`text-sm ${isAnnual ? "font-medium" : "text-gray-500"}`}>Annual</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, index) => {
            const price = calculatePrice(tier.basePrice)
            const savings = calculateSavings(tier.basePrice)
            const isSelected = selectedTier === index

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${isSelected ? "scale-105" : ""}`}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 ${
                    isSelected ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedTier(index)}
                >
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Most Popular</Badge>
                    </div>
                  )}

                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <motion.div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${tier.color} text-white mb-3`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {tier.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                      <div className="mb-2">
                        <span className="text-3xl font-bold">
                          $<AnimatedCounter value={price} />
                        </span>
                        <span className="text-gray-600">/{isAnnual ? "year" : "month"}</span>
                      </div>
                      {savings > 0 && <div className="text-sm text-green-600 font-medium">Save ${savings}/year</div>}
                    </div>

                    <ul className="space-y-2 mb-6">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          : ""
                      }`}
                      variant={isSelected ? "default" : "outline"}
                    >
                      {isSelected ? "Selected Plan" : "Select Plan"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg"
        >
          <h4 className="font-semibold mb-2">Your Selected Plan: {pricingTiers[selectedTier].name}</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p>Team Size: {teamSize[0]} members</p>
              <p>Max Campaigns: {pricingTiers[selectedTier].maxCampaigns}</p>
            </div>
            <div>
              <p>Billing: {isAnnual ? "Annual" : "Monthly"}</p>
              <p>Platforms: {pricingTiers[selectedTier].maxPlatforms}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Cost:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${calculatePrice(pricingTiers[selectedTier].basePrice)}/{isAnnual ? "year" : "month"}
              </span>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
